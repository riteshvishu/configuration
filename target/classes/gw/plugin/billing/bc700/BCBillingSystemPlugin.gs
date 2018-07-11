package gw.plugin.billing.bc700

uses gw.api.system.PCLoggerCategory
uses gw.plugin.billing.AgencyBillPlanSummary
uses gw.plugin.billing.BillingAccountSearchCriteria
uses gw.plugin.billing.BillingAccountSearchCriteriaJava
uses gw.plugin.billing.BillingAccountSearchResult
uses gw.plugin.billing.BillingInvoiceStreamInfo
uses gw.plugin.billing.CommissionPlanSummary
uses gw.plugin.billing.IBillingSystemPlugin
uses gw.plugin.billing.PaymentPreviewItem
uses gw.plugin.billing.PolicyPeriodBillingInfo
uses java.util.ArrayList
uses java.util.HashSet
uses java.lang.IllegalArgumentException
uses java.lang.IllegalStateException
uses java.lang.Integer
uses wsi.remote.gw.webservice.bc.bc700.billingapi.BillingAPI
uses wsi.remote.gw.webservice.bc.bc700.billingapi.enums.InvoiceItemType
uses wsi.remote.gw.webservice.bc.bc700.billingapi.faults.AlreadyExecutedException
uses wsi.remote.gw.webservice.bc.bc700.billingapi.faults.BadIdentifierException
uses wsi.remote.gw.webservice.bc.bc700.billingapi.types.complex.BCAccountSearchCriteria
uses wsi.remote.gw.webservice.bc.bc700.billingapi.types.complex.InvoiceItemPreview
uses wsi.remote.gw.webservice.bc.bc700.entity.types.complex.CancelPolicyInfo
uses wsi.remote.gw.webservice.bc.bc700.entity.types.complex.FinalAuditInfo
uses wsi.remote.gw.webservice.bc.bc700.entity.types.complex.IssuePolicyInfo
uses wsi.remote.gw.webservice.bc.bc700.entity.types.complex.NewProducerCodeInfo
uses wsi.remote.gw.webservice.bc.bc700.entity.types.complex.PCAccountInfo
uses wsi.remote.gw.webservice.bc.bc700.entity.types.complex.PCContactInfo
uses wsi.remote.gw.webservice.bc.bc700.entity.types.complex.PCPolicyPeriodInfo
uses wsi.remote.gw.webservice.bc.bc700.entity.types.complex.PCProducerInfo
uses wsi.remote.gw.webservice.bc.bc700.entity.types.complex.PolicyChangeInfo
uses wsi.remote.gw.webservice.bc.bc700.entity.types.complex.PremiumReportInfo
uses wsi.remote.gw.webservice.bc.bc700.entity.types.complex.ProducerCodeInfo
uses wsi.remote.gw.webservice.bc.bc700.entity.types.complex.ReinstatementInfo
uses wsi.remote.gw.webservice.bc.bc700.entity.types.complex.RenewalInfo
uses wsi.remote.gw.webservice.bc.bc700.entity.types.complex.RewriteInfo
uses wsi.remote.gw.webservice.bc.bc700.entity.types.complex.PaymentPlanInfo
uses wsi.remote.gw.webservice.bc.bc700.paymentinstrumentapi.PaymentInstrumentAPI
uses gw.plugin.billing.BillingPaymentInstrument
uses gw.plugin.billing.BillingPaymentInstrumentJava
uses gw.plugin.billing.BillingUnappliedFundInfoJava

/**
* This is the implementation of IBillingSystemPlugin which connect to Guidewire BillingCenter
* via SOAP
*/
@Export
class BCBillingSystemPlugin implements IBillingSystemPlugin {

  var _logger : org.slf4j.Logger
  var _billingAPI : BillingAPI
  var _paymentAPI : PaymentInstrumentAPI

  construct() {
    _billingAPI = new BillingAPI()
    _paymentAPI = new PaymentInstrumentAPI()
    _logger = gw.pl.logging.LoggerFactory.getLogger("BillingIntegration")
  }

  protected function callUpdate<T>(call : block(api : BillingAPI) : T) : T {
    try {
      return call(_billingAPI)
    } catch(e : AlreadyExecutedException) {
      // already executed, just ignored this call
    }
    return null
  }

  override function createAccount(account : Account, transactionID : String) : String {
    var accountInfo = new PCAccountInfo()
    accountInfo.sync(account)
    PCLoggerCategory.BILLING_SYSTEM_PLUGIN.info("Sending account ${account} to Billing System")
    return callUpdate(\ b -> _billingAPI.createAccount(accountInfo, transactionID))
  }

  override function retrieveAllPaymentPlans(policyPeriod : PolicyPeriod) : PaymentPlanSummary[] {
    
    var bcPaymentPlans : PaymentPlanInfo[]
    if (policyPeriod.BillingMethod == BillingMethod.TC_LISTBILL){
      PCLoggerCategory.BILLING_SYSTEM_PLUGIN.info("Getting payment plans for account ${policyPeriod.AltBillingAccountNumber}")
      if(policyPeriod.AltBillingAccountNumber != null){
        bcPaymentPlans = _billingAPI.getPaymentPlansForAccount(policyPeriod.AltBillingAccountNumber)
      }
    }
    else{
      PCLoggerCategory.BILLING_SYSTEM_PLUGIN.info("Getting all payment plans")
      bcPaymentPlans = _billingAPI.getAllPaymentPlans()
    }
    
    var plans = new ArrayList()

    for (i in bcPaymentPlans) {
      var planDetail = new PaymentPlanSummary(policyPeriod)
      planDetail.BillingId = i.PublicID
      if (i.Reporting) {
        planDetail.PaymentCode = i.PublicID
      }
      else {
        planDetail.Name = i.Name
        var paymentMethods = i.AllowedPaymentMethods.map(\ s -> AccountPaymentMethod.get(s))
        planDetail.addAllowedPaymentMethods(paymentMethods)
        if (i.InvoiceFrequency <> null) {
          planDetail.InvoiceFrequency = i.InvoiceFrequency
        }// else use the default value from datamodel which is 'monthly'
      }
      plans.add(planDetail)
    }

    return plans as entity.PaymentPlanSummary[]
  }

  override function isAccountExist(accountNumber: String) : boolean {
    return _billingAPI.isAccountExist(accountNumber)
  }

  override function getAvailableBillingMethods(producerCode : String) : BillingMethod[] {
    var billingMethods = _billingAPI.getAvailableBillingMethods(producerCode)
    var temp = new ArrayList<BillingMethod>()
    billingMethods.each(\ b -> { temp.add(BillingMethod.get(b)) })
    temp.add(BillingMethod.TC_LISTBILL)
    return temp.toTypedArray()
  }

  override function retrieveInstallmentsPlanPreview(policyPeriod : PolicyPeriod) : PaymentPreviewItem[] {
    var issuePolicyInfo = createIssuePolicyInfoForPreview(policyPeriod)

    var bcInvoiceItems = _billingAPI.previewInstallmentsPlanInvoices(issuePolicyInfo)
    return convertToPolicyCenterPaymentPreviewItems(bcInvoiceItems, policyPeriod.PreferredSettlementCurrency)
  }

  private function createIssuePolicyInfoForPreview(policyPeriod : PolicyPeriod) : IssuePolicyInfo {
    var issuePolicyInfo = new IssuePolicyInfo()
    issuePolicyInfo.syncForPreview(policyPeriod)
    return issuePolicyInfo
  }

  private function convertToPolicyCenterPaymentPreviewItems(bcInvoiceItems : InvoiceItemPreview[], expectedCurrency : Currency) : PaymentPreviewItem[] {
    var invoices = new HashSet<PaymentPreviewItem>()
    bcInvoiceItems.each(\ i -> {var invoiceItem = new PaymentPreviewItem()
                                 invoiceItem.DueDate = i.InvoiceDueDate
                                 invoiceItem.Amount = i.Amount.ofCurrency(expectedCurrency)
                                 invoiceItem.Type = i.Type.GosuValue
                                 invoices.add(invoiceItem)})

    return invoices.toTypedArray()
  }
  /**
  * Issue a policy period in Billing Center
  * @param period: the policy period
  * @param transactionID: the unique transaction id to make this call idempotent
  */
  override function createPolicyPeriod(period: PolicyPeriod, transactionID : String) : String {
    var issuePolicyInfo = new IssuePolicyInfo()
    issuePolicyInfo.sync(period)
    PCLoggerCategory.BILLING_SYSTEM_PLUGIN.info("Sending policy ${period} to Billing System")
    return callUpdate(\ b -> b.issuePolicyPeriod(issuePolicyInfo, transactionID))
  }

  /**
  * Cancel a policy period in Billing Center
  * @param period: the policy period
  * @param transactionID: the unique transaction id to make this call idempotent
  */
  override function cancelPolicyPeriod(period: PolicyPeriod, transactionID : String) : void {
    var cancelInfo = new CancelPolicyInfo()
    cancelInfo.sync(period)
    callUpdate(\ b -> b.cancelPolicyPeriod(cancelInfo, transactionID))
  }

  /**
  * Issue a policy change in Billing Center
  * @param period: the policy period
  * @param transactionID: the unique transaction id to make this call idempotent
  */
  override function issuePolicyChange(period: PolicyPeriod, transactionID: String) : void {
    var policyChangeInfo = new PolicyChangeInfo()
    policyChangeInfo.syncPolicyChange(period)
    callUpdate(\ b -> b.changePolicyPeriod(policyChangeInfo,  transactionID))
  }

  override function issueReinstatement(period: PolicyPeriod, transactionID: String) : void {
    var reinstatementInfo = new ReinstatementInfo()
    reinstatementInfo.syncBasicPolicyInfo(period)
    reinstatementInfo.Description = period.Reinstatement.Description

    callUpdate(\ b -> b.reinstatePolicyPeriod(reinstatementInfo,  transactionID))
  }


  override function renewPolicyPeriod(period: PolicyPeriod, transactionID: String) : void {
    var renewalInfo = new RenewalInfo()
    renewalInfo.sync(period)
    renewalInfo.PriorTermNumber = period.BasedOn.TermNumber
    renewalInfo.PriorPolicyNumber = period.BasedOn.PolicyNumber
    callUpdate(\ b -> b.renewPolicyPeriod(renewalInfo,  transactionID))
  }


  override function issueFinalAudit(period: PolicyPeriod, transactionID: String) : void {
    var finalAuditInfo = new FinalAuditInfo()
    finalAuditInfo.syncBasicPolicyInfo(period)

    callUpdate(\ b -> b.issueFinalAudit(finalAuditInfo,  transactionID))
  }


  override function createProducer(organization: Organization, transactionId: String) : String {
    if (not organization.Producer) {
      throw new IllegalArgumentException("Cannot create producer from an non-producer organization")
    }
    var producerInfo = new PCProducerInfo()
    producerInfo.sync(organization)
    return callUpdate(\ b -> b.createProducer(producerInfo,  transactionId))
  }

  override function retrieveAllAgencyBillPlans() : AgencyBillPlanSummary[] {
    var summaries = new ArrayList<AgencyBillPlanSummary>()

    var plans = _billingAPI.getAllAgencyBillPlans()

    for (p in plans) {
      var summary = new AgencyBillPlanSummary()
      summary.Name = p.Name
      summary.Id = p.PublicID
      summaries.add(summary)
    }

    return summaries.toTypedArray()
  }


  override function isProducerExist(producerId: String) : boolean {
    return _billingAPI.isProducerExist(producerId)
  }


  override function createProducerCode(producerCode: ProducerCode, transactionId: String) : String {
    var producerCodeInfo = new NewProducerCodeInfo()
    producerCodeInfo.sync(producerCode)
    return callUpdate(\ b -> b.createProducerCode(producerCodeInfo, transactionId))
  }

  override function retrieveAllCommissionPlans() : CommissionPlanSummary[] {
    var summaries = new ArrayList<CommissionPlanSummary>()

    var plans = _billingAPI.getAllCommissionPlans()

    for (p in plans) {
      var summary = new CommissionPlanSummary()
      summary.Name = p.Name
      summary.Id = p.PublicID
      summary.AllowedTiers = new Tier[p.AllowedTiers.Count]
      for (t in p.AllowedTiers index i) {
        summary.AllowedTiers[i] = t
      }
      summaries.add(summary)
    }

    return summaries.toTypedArray()
  }

  override function updateProducerCode(producerCode: ProducerCode, transactionId : String) : void {
    var producerCodeInfo = new ProducerCodeInfo()
    producerCodeInfo.PublicID = producerCode.PublicID
    producerCodeInfo.Code = producerCode.Code
    var status = producerCode.ProducerStatus
    producerCodeInfo.Active = status == ProducerStatus.TC_ACTIVE or status ==  ProducerStatus.TC_LIMITED
    callUpdate(\ b -> b.updateProducerCode(producerCodeInfo, transactionId))
  }

  override function updateProducer(organization: Organization, transactionId : String) : void {
    if (not organization.Producer) {
      throw new IllegalArgumentException("Cannot create producer from an non-producer organization")
    }
    var producerInfo = new PCProducerInfo()
    producerInfo.sync(organization)
    callUpdate(\ b -> b.updateProducer(producerInfo, transactionId))
  }


  override function updateAccount(account: Account, transactionId: String) : void {
    var accountInfo = new PCAccountInfo()
    accountInfo.sync(account)
    callUpdate(\ b -> b.updateAccount(accountInfo, transactionId))
  }

  override function rewritePolicyPeriod(period: PolicyPeriod, transactionId: String) : void {
    var renewalInfo = new RewriteInfo()
    renewalInfo.sync(period)
    renewalInfo.PriorTermNumber = period.BasedOn.TermNumber
    renewalInfo.PriorPolicyNumber = period.BasedOn.PolicyNumber

    callUpdate(\ b -> b.rewritePolicyPeriod(renewalInfo, transactionId))
  }

  override function issuePremiumReport(period: PolicyPeriod, transactionId: String) : void {
    var premiumReportInfo = new PremiumReportInfo()
    premiumReportInfo.sync(period)
    callUpdate(\ b -> b.issuePremiumReport(premiumReportInfo, transactionId))
  }

  override function updateContact(contact: Contact, transactionId: String) : void {
    var updateContactInfo = new PCContactInfo()
    updateContactInfo.sync(contact)
    callUpdate(\ b -> b.updateContact(updateContactInfo, transactionId))
  }


  override function waiveFinalAudit(period: PolicyPeriod, transactionId: String) : void {
    var policyPeriodInfo = new PCPolicyPeriodInfo()
    policyPeriodInfo.PolicyNumber = period.PolicyNumber
    policyPeriodInfo.TermNumber = period.TermNumber
    callUpdate(\ b -> b.waiveFinalAudit(policyPeriodInfo, transactionId))
  }

  override function scheduleFinalAudit(period: PolicyPeriod, transactionId: String) : void {
    var policyPeriodInfo = new PCPolicyPeriodInfo()
    policyPeriodInfo.PolicyNumber = period.PolicyNumber
    policyPeriodInfo.TermNumber = period.TermNumber
    callUpdate(\ b -> b.scheduleFinalAudit(policyPeriodInfo, transactionId))
  }

  override function getPeriodInfo(period: PolicyPeriod) : PolicyPeriodBillingInfo {
    var policyPeriodInfo = new PCPolicyPeriodInfo()
    policyPeriodInfo.PolicyNumber = period.PolicyNumber
    policyPeriodInfo.TermNumber = period.TermNumber
    var bcPeriod = _billingAPI.getPolicyPeriod(policyPeriodInfo)
    if (bcPeriod == null) {
      return null
    }
    return new PolicyPeriodBillingInfo() {
      :BillingMethod = bcPeriod.BillingMethodCode,
      :PaymentPlanID = bcPeriod.PaymentPlanPublicId,
      :AltBillingAccountNumber = bcPeriod.AltBillingAccountNumber,
      :InvoiceStreamCode = bcPeriod.InvoiceStreamId
    }
  }

  override function transferPolicyPeriods(accountNumber : String,
                                  periods : PolicyPeriod[], transactionId : String) {
    var policyPeriodInfos = periods.map(\ p -> new PCPolicyPeriodInfo() {
      :TermNumber = p.TermNumber,
      :PolicyNumber = p.PolicyNumber
    })
    callUpdate(\ b -> {
      b.transferPolicyPeriods(policyPeriodInfos, accountNumber, transactionId)
      return null
    })
  }

  override function setDownPaymentInstallmentTotalForAllInstallmentsPlans(period : PolicyPeriod) {
    period.PaymentPlans.InstallmentPlans.each(\ i -> {
      var issuePolicyInfo = createIssuePolicyInfoForPreview(period)

      issuePolicyInfo.PaymentPlanPublicId = i.BillingId
      var bcInvoiceItems = _billingAPI.previewInstallmentsPlanInvoices(issuePolicyInfo)

      var paymentPreviewItems = convertToPolicyCenterPaymentPreviewItems(bcInvoiceItems, period.PreferredSettlementCurrency)
      var paymentPlan = period.PaymentPlans.getById(i.BillingId)
      var downPaymentItem =  paymentPreviewItems.firstWhere(\ p -> p.Type == InvoiceItemType.Deposit.GosuValue)
      if (downPaymentItem != null) {
        paymentPlan.DownPayment = downPaymentItem.Amount
      }
      else {
        // Need to set to zero because otherwise the amount from a prior preview calc will remain in this field
        paymentPlan.DownPayment = 0bd.ofCurrency(period.PreferredSettlementCurrency)
      }

      var installmentItems = paymentPreviewItems.where(\ p -> p.Type == InvoiceItemType.Installment.GosuValue)
      if (installmentItems.HasElements) {
        paymentPlan.Installment = installmentItems.max(\ p -> p.Amount)
      }
      else {
        // Need to set to zero because otherwise the amount from a prior preview calc will remain in this field
        paymentPlan.Installment = 0bd.ofCurrency(period.PreferredSettlementCurrency)
      }

      paymentPlan.Total = paymentPreviewItems.sum(period.PreferredSettlementCurrency, \ p -> p.Amount)
    })
  }

  override function getSubAccounts(accountNumber : String) : BillingAccountSearchResult[] {
    if (accountNumber == null) {
      throw new IllegalStateException("This method should never be called will null account number.")
    }
    try {
      var bcResults = _billingAPI.getAllSubAccounts(accountNumber)
      return bcResults.map(\ b -> new BCBillingAccountSearchResult(b))
    } catch(e : BadIdentifierException) { 
      // this is for the case when the account has not been sent to BC yet, probably
      // because this is the first policy period bound for that account.
      return {}
    }
  }


  override function getInvoiceStreams(accountNumber : String) : BillingInvoiceStreamInfo[] {
    if (accountNumber == null) {
      throw new IllegalStateException("This method should never be called will null account number.")
    }
    PCLoggerCategory.BILLING_SYSTEM_PLUGIN.info("Getting invoice streams for account: ${accountNumber}")
    var infos = _billingAPI.getAccountInvoiceStreams(accountNumber)
    return infos.map(\ i -> new BCBillingInvoiceStreamInfo(i))
  }
  
  /**
   * This method expect the specific BillingAccountSearchCriteria implementation of the 
   * BillingAccountSearchCriteriaJava interface, not just some implementation.
   */
  override function searchForAccounts(criteria : BillingAccountSearchCriteriaJava, limit : Integer) : BillingAccountSearchResult[] {
    if (criteria typeis BillingAccountSearchCriteria) {
      var bcCriteria = new BCAccountSearchCriteria() {
        :AccountName = criteria.AccountName,
        :AccountNumber = criteria.AccountNumber,
        :IsListBill = criteria.ListBill
      }
      var bcResults = _billingAPI.searchForAccounts(bcCriteria, limit)
            
      return bcResults.map(\ b -> new BCBillingAccountSearchResult(b))
    }else{
      throw new IllegalStateException("Criteria should be of gosu type: ${typeof BillingAccountSearchCriteria}")
    }
  }

  override property get CompatibilityMode() : String {
    return "7.0.0"
  }
  
  override function getExistingPaymentInstruments(accountNumber : String) : BillingPaymentInstrument[] {
    try{
      var instruments = _paymentAPI.getPaymentInstrumentsForAccount(accountNumber)
      return instruments
        .where(\ p -> p.PaymentMethod <> wsi.remote.gw.webservice.bc.bc700.paymentinstrumentapi.enums.PaymentMethod.Responsive) // filter out responsive
        .map(\ p -> createBillingPaymentInstrument(p))
    }catch(e : wsi.remote.gw.webservice.bc.bc700.paymentinstrumentapi.faults.BadIdentifierException){
      // account is new, just ignore the exception and return empty list
      _logger.info("Trying to get payment instruments for account that not exist in BC yet")
      return {}
    }
  }

  override function addPaymentInstrumentTo(accountNumber : String, paymentInstrument : BillingPaymentInstrumentJava) : BillingPaymentInstrumentJava {
    var accountExist = isAccountExist(accountNumber)
    if(not accountExist){
      var account = Account.finder.findAccountByAccountNumber(accountNumber)
      createAccount(account, null)
    }
    var instrument = paymentInstrument as BillingPaymentInstrument
    var bcInstrument = new wsi.remote.gw.webservice.bc.bc700.paymentinstrumentapi.types.complex.PaymentInstrumentRecord(){
      :PaymentMethod = wsi.remote.gw.webservice.bc.bc700.paymentinstrumentapi.enums.PaymentMethod.forGosuValue(instrument.PaymentMethod.Code),
      :OneTime = false,
      :Token = instrument.Token
    }
    bcInstrument = _paymentAPI.createPaymentInstrumentOnAccount(accountNumber, bcInstrument)
    return createBillingPaymentInstrument(bcInstrument)
  }

  override function updatePolicyPeriodTermConfirmed(policyNumber : String, termNumber : int,
                                           isConfirmed : Boolean) : void{
    _billingAPI.updatePolicyPeriodTermConfirmed(policyNumber, termNumber, isConfirmed)
  }
  
  private function createBillingPaymentInstrument(p : wsi.remote.gw.webservice.bc.bc700.paymentinstrumentapi.types.complex.PaymentInstrumentRecord) : BillingPaymentInstrument{
    return new BillingPaymentInstrument(){
        :PublicID = p.PublicID,
        :PaymentMethod = AccountPaymentMethod.get(p.PaymentMethod.GosuValue),
        :OneTime = p.OneTime,
        :DisplayName = p.DisplayName,
        :Token = p.Token
    }
  }

  override function retrieveAccountUnappliedFunds(accountNumber : String) : BillingUnappliedFundInfoJava[] {
    return {}
    // BC 700 does not support this function, if customer wants they can change their implementation
    // of BC 700 to support it and change this method accordingly.
  }
}