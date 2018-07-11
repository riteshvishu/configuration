package gw.solr

uses com.guidewire.pl.system.dependency.PLDependencies
uses gw.api.config.PCConfigResourceKeys
uses gw.solr.request.IMessageRequest
uses gw.solr.SolrPolicyIndexRequest
uses gw.solr.utils.PCSolrUtils
uses gw.solr.utils.SolrUpdateMessage
uses java.lang.Exception
uses gw.plugin.solr.ISolrMessageTransportPlugin
uses gw.solr.utils.SolrIndexContext
uses gw.util.ILogger
uses gw.solr.consistency.ConsistencyTrackerBuilder
uses java.util.concurrent.TimeUnit
uses gw.solr.utils.PCSolrMessageAggregator
uses java.util.Set

/**
 * Listens for udpates to contacts and policy periods and, if pertinent changes are detected,
 * creates a SOLR index request
 */
@Export
class PCSolrMessageTransportPlugin extends AbstractSolrMessageTransportPlugin implements ISolrMessageTransportPlugin  {

  protected static final var LOGGER : ILogger = PCSolrUtils.getLogger()

  public static final var DEST_ID : int = 69

  static final var CONTACT_INDEX_FIELDS = {"HomePhone", "WorkPhone", "CellPhone", "FaxPhone", "PrimaryPhoneValue", "TaxID"}
  static final var ADDRESS_INDEX_FIELDS = {"AddressLine1", "City", "State", "PostalCode"}
  static final var TRANSACTION_PROCESSED = "_solrTransactionProcessed"

  var _consistencyTracker = new ConsistencyTrackerBuilder()
      .withReconstructor( new PCDocumentReconstructor())
      .withKeyGenerator( new PCCacheKeyGenerator() )
      .withCacheSize(2500).withCacheTiming(30, TimeUnit.SECONDS).build()

  construct() {
    super("PCSolrMessageTransportPlugin")
  }

  override function send(message : Message, data : String) {
    LOGGER.trace("${this.IntrinsicType.Name}.send(${message.PublicID}, ${data})")
    try {
      var solrMsgList = PCSolrMessageAggregator.parse(data)
      for(solrMsg in solrMsgList) {
        var updateRequest = _consistencyTracker.maybeCorrectMessage(solrMsg.JsonPayload)
        var response = updateRequest.process(PLDependencies.getSolrServerMgr().findServer(solrMsg.DocType))

        if(LOGGER.TraceEnabled) LOGGER.trace("Solr update response: " + response)
        if(response.getStatus() != 0) {
          throw new SolrException("Solr update request " + updateRequest.XML + 
              " for " + solrMsg.DocType + " failed with status code " + response.Status)
        }
      }
    } catch (e : Exception) {
      // TODO is this the proper handling here or do we need to do something more?
      LOGGER.warn(e)
      //message.reportError()
    } finally {
      message.reportAck()
    }
  }

  /**********************************************************************************************
   * Event Handling
   **********************************************************************************************/
  override function handleContactChangedEvent(messageContext : MessageContext) {
    LOGGER.debug("${this.IntrinsicType.Name}.handleContactChangedEvent: ${messageContext.EventName} event")
    processChanges(messageContext)
  }

  override function handlePeriodChangedEvent(messageContext : MessageContext) {
    LOGGER.debug("${this.IntrinsicType.Name}.handlePeriodChangedEvent: ${messageContext.EventName} event")
    processChanges(messageContext)
  }

  override function handlePeriodCreatedEvent(messageContext : MessageContext) {
    LOGGER.debug("${this.IntrinsicType.Name}.handlePeriodCreatedEvent: ${messageContext.EventName} event")
    processChanges(messageContext)
  }

  override function handlePeriodDeletedEvent(messageContext : MessageContext, purgedPeriods: Set<PolicyPeriod>) {
    LOGGER.debug("${this.IntrinsicType.Name}.handlePeriodDeletedEvent: ${messageContext.EventName} event")
    processChanges(messageContext, purgedPeriods)
  }

  override function handlePolicyAddressChangedEvent(messageContext : MessageContext) {
    LOGGER.debug("${this.IntrinsicType.Name}.handlePolicyAddressChangedEvent: ${messageContext.EventName} event")
    processChanges(messageContext)
  }

  /**********************************************************************************************
   * Support methods
   **********************************************************************************************/
  static function hasRelevantChangesInPolicyPeriod(period : PolicyPeriod) : boolean{
    return period.Status != TC_Quoting and
        (  period.New or
           period.Status == TC_Bound or
           period.PolicyAddress.HasChangedPolicyEntityFields or // policy address changes are not automatically detected by platform
           hasRelevantChanges(period, PCConfigResourceKeys.POLICY_SEARCH_CONFIG.File))
  }

  static function contactHasRelevantChanges(contact : Contact) : boolean {
    if (contact.New || contact.ChangedFields.intersect(CONTACT_INDEX_FIELDS).Count > 0 || officialIdsChanges(contact) ) {
       return true
    }
    return addressHasRelevantChanges(contact.PrimaryAddress)
  }

  static function addressHasRelevantChanges(addr : Address) : boolean {
    if (addr.New || addr.ChangedFields.intersect(ADDRESS_INDEX_FIELDS).Count > 0) {
       return true
    }
    return false
  }

  private function processChanges(context : MessageContext, purgedPeriods : Set<PolicyPeriod> = null) {
    // Process all changes in the bundle one time so as to create a single set of delete/update commands for the solr server
    // This should minimize the number of http requests
    if (context.SessionMarker.getFromTempMap(TRANSACTION_PROCESSED) == null){
      context.SessionMarker.addToTempMap(TRANSACTION_PROCESSED, true)
      processBeansInBundle(context, purgedPeriods ?: {})        
    }
  }

  private function processBeansInBundle(messageContext : MessageContext, purgedPeriods : Set<PolicyPeriod>) {

    final var root = messageContext.Root as KeyableBean
    final var bundle = root.Bundle
    // We are not sure that the purgedPeriods wont show up in the removed beans list of the bundle,
    // but in our tests they were not in out bundle that's why we are passing the purgedPeriods separately. 
    final var removedBeans = bundle.RemovedBeans.toSet()
                      .union(purgedPeriods)
     
    final var changedBeans = bundle.InsertedBeans.toSet()
                      .union(bundle.UpdatedBeans.toSet())
                      .union(removedBeans)
                
    // If the entity.Address is modified, a contact change event is sent on the
    // contact that owns the address, even if the contact itself is unchanged.
    // Force a contact update in this case, so that we re-index policy
    // periods associated with the contact which owns the changed address
    final var includeContact = ( root typeis Contact ) 
                             and not changedBeans.contains(root) 
                             and addressHasRelevantChanges(root.PrimaryAddress)
    
    final var changedAccounts = (changedBeans.whereTypeIs(Contact)*.AccountContacts*.Account).toSet()
                        .union( (changedBeans.whereTypeIs(PolicyPeriod)*.Policy*.Account).toSet()  )
                        .union( (changedBeans.whereTypeIs(PolicyAddress)*.Branch*.Policy*.Account).toSet()  )
                        .union( includeContact ? ((root as Contact).AccountContacts*.Account).toSet() : {} )
    
    for (account in changedAccounts) {    

      final var solrContext = new SolrIndexContext(bundle, account)
      
      if (includeContact) {
        processUpdate(root, solrContext)
      }
        
      bundle.InsertedBeans.each(\ bean -> {
        processUpdate(bean, solrContext)
      })  
      bundle.UpdatedBeans.each(\ bean -> {
        processUpdate(bean, solrContext)
      })  
      bundle.RemovedBeans.each(\ bean -> {
        processDeletion(bean, solrContext)
      })
      purgedPeriods.each(\ p -> {
        processDeletion(p, solrContext, true)
      })
     
      createMessages(account, messageContext, {solrContext.DeleteRequest, solrContext.IndexRequest})
    }
    
  }

  private function processUpdate(bean : KeyableBean, solrContext : SolrIndexContext){

    switch(typeof bean){
      case PolicyPeriod:
        if (bean.Policy.Account == solrContext.Account) {
          // only do this if period pertains to the right account
          if (bean.Preempted) { 
            processDeletion(bean, solrContext)
          } else {
            handlePeriodChanged(bean, solrContext)
          }
        }
        break
      case PolicyAddress:
        if (bean.Branch.Policy.Account == solrContext.Account) {
          // only do this if period pertains to the right account
          handlePeriodChanged(bean.Branch, solrContext)
        }
        break
      case Contact:
      case Person:
      case Company:
        // this one can pertain to multiple accounts, so it will have to be account-aware
        handleContactChanged(bean as Contact, solrContext)
    }
  }

  private function handlePeriodChanged(period : PolicyPeriod, solrContext : SolrIndexContext){
    LOGGER.trace("${this.IntrinsicType.Name}.handlePeriodChanged(${period.PublicID}, SolrIndexContext)")
    if (PCSolrUtils.shouldIndexPeriod(period)){
      period = period.getSlice(period.EditEffectiveDate)
      if (hasRelevantChangesInPolicyPeriod(period)) {
        solrContext.DeleteRequest.processPeriod(period, solrContext)
        solrContext.IndexRequest.processPeriod(period, solrContext)
      }
    }
  }

  private function handleContactChanged(contact : Contact, solrContext : SolrIndexContext){
    LOGGER.trace("${this.IntrinsicType.Name}.handleContactChanged(${contact.PublicID}, SolrIndexContext)")
    if (contactHasRelevantChanges(contact)){
      solrContext.DeleteRequest.processContact(contact, solrContext)
      solrContext.IndexRequest.processContact(contact, solrContext)
    }
  }

  private function processDeletion(bean : KeyableBean, solrContext : SolrIndexContext, isPurged : boolean = false){
    LOGGER.trace("${this.IntrinsicType.Name}.processDeletetion(${bean.PublicID}, SolrIndexContext)")
    if (bean typeis PolicyPeriod) {
      if (bean.Status == TC_BOUND) {
        LOGGER.warn("Will not remove ${bean.PublicID} because it is bound")
        return
      }
      // the period is not bound, so removing this cannot delete a historical index record.
      solrContext.DeleteRequest.processPeriod(bean, solrContext, isPurged)
    }
  }
  
  protected function createMessages(account : Account, messageContext : MessageContext, requestList : List<IMessageRequest>) {
    var msg = PCSolrMessageAggregator.aggregateMessages(requestList)
    if(msg?.HasContent) {
      var newMessage = messageContext.createMessage(msg)
      // If the event that got us here was fired on a PolicyPeriod, the messageContext will use PolicyPeriod 
      // as its root, and set the PolicyPeriod foreign key.   Most of the time that is fine, but if the event
      // is a purge, this foreign key will cause the purge to fail.  (You can't create a FK reference to an
      // object and then purge it -- that's a FK constraint violation.)
      // 
      // We explicitly set the account FK on messages anyway, because we want all messages safe-ordered on 
      // account.   Therefore we don't really need the PolicyPeriod FK, and it is safe to clear it.
      // Have to do this using setFieldValue, because the setter is hidden from Gosu.
      newMessage.setFieldValue("PolicyPeriod", null)
      newMessage.Account = account // must set the safe order object explicitly
      if(LOGGER.TraceEnabled) LOGGER.trace("Created message " + msg)
    }
  }

  private static function officialIdsChanges(contact : Contact) : boolean{
    return contact.OfficialIDs.hasMatch(\ o -> o.Changed)
  }

}
