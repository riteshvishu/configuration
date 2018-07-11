package gw.plugin.billing.bc300

uses gw.plugin.billing.IBillingSystemPlugin
uses java.util.ArrayList
uses soap.BCBillingSystemAPI.api.BillingAPI
uses java.util.HashSet
uses soap.BCBillingSystemAPI.entity.CancelPolicyInfo
uses soap.BCBillingSystemAPI.entity.IssuePolicyInfo
uses soap.BCBillingSystemAPI.entity.PCAccountInfo
uses soap.BCBillingSystemAPI.entity.PolicyChangeInfo
uses soap.BCBillingSystemAPI.entity.ReinstatementInfo
uses soap.BCBillingSystemAPI.entity.RenewalInfo
uses soap.BCBillingSystemAPI.entity.RewriteInfo
uses soap.BCBillingSystemAPI.entity.FinalAuditInfo
uses soap.BCBillingSystemAPI.entity.PCContactInfo
uses soap.BCBillingSystemAPI.entity.PCPolicyPeriodInfo
uses soap.BCBillingSystemAPI.entity.PCProducerInfo
uses java.lang.IllegalArgumentException
uses soap.BCBillingSystemAPI.entity.ProducerCodeInfo
uses soap.BCBillingSystemAPI.entity.NewProducerCodeInfo
uses soap.BCBillingSystemAPI.entity.PCAccountInfo
uses soap.BCBillingSystemAPI.entity.PremiumReportInfo
uses soap.BCBillingSystemAPI.entity.PCContactInfo
uses gw.plugin.billing.AgencyBillPlanSummary
uses gw.plugin.billing.CommissionPlanSummary
uses gw.plugin.billing.PolicyPeriodBillingInfo
uses gw.plugin.billing.PaymentPreviewItem
uses soap.BCBillingSystemAPI.entity.InvoiceItemPreview
uses soap.BCBillingSystemAPI.fault.AlreadyExecutedException
uses soap.BCBillingSystemAPI.enums.InvoiceItemType
uses gw.api.system.PCLoggerCategory
uses gw.plugin.billing.BillingInvoiceStreamInfo
uses soap.BCBillingSystemAPI.fault.BadIdentifierException
uses java.lang.Integer
uses gw.plugin.billing.BillingAccountSearchResult
uses gw.plugin.billing.BillingAccountSearchCriteriaJava
uses gw.plugin.billing.BillingPaymentInstrumentJava
uses gw.plugin.billing.BillingUnappliedFundInfoJava

/**
* This is the implementation of IBillingSystemPlugin which connect to Guidewire BillingCenter
* via SOAP
*/
@Export
class BCBillingSystemPlugin implements IBillingSystemPlugin {

  var _logger : org.slf4j.Logger
  var billingAPI : BillingAPI

  construct(){
    billingAPI = new BillingAPI()
    billingAPI.addGWAuthentication()
    _logger = gw.pl.logging.LoggerFactory.getLogger( "BillingIntegration" )
  }

  protected function callUpdate<T>(call : block(api : BillingAPI) : T) : T {
    try {
      return call(billingAPI)
    } catch(e : AlreadyExecutedException) {
      // already executed, just ignored this call
    }
    return null
  }

  public override function createAccount(account : Account, transactionID : String) : String {
    var accountInfo = new PCAccountInfo()
    accountInfo.sync(account)
    PCLoggerCategory.BILLING_SYSTEM_PLUGIN.info("Sending account ${account} to Billing System")
    return callUpdate(\ b -> billingAPI.createAccount(accountInfo, transactionID))
  }

  override function retrieveAllPaymentPlans(policyPeriod : PolicyPeriod) : PaymentPlanSummary[] {
    var bcPaymentPlans = billingAPI.getAllPaymentPlans()
    var plans = new ArrayList()

    for (i in bcPaymentPlans) {
      var planDetail = new PaymentPlanSummary(policyPeriod)
      planDetail.BillingId = i.PublicID
      if (i.Reporting)
        planDetail.PaymentCode = i.PublicID
      else {
        planDetail.Name = i.Name
        // the values is defaulted in datamodel (PaymentPlanSummary.eti)
//        planDetail.AllowResponsive = true
//        planDetail.InvoiceFrequency = TC_MONTHLY
      }
      plans.add( planDetail )
    }

    return plans as entity.PaymentPlanSummary[]
  }

  override function isAccountExist( accountNumber: String ) : boolean
  {
    return billingAPI.isAccountExist( accountNumber )
  }

  override function getAvailableBillingMethods( producerCode : String ) : BillingMethod[]
  {
    var billingMethods = billingAPI.getAvailableBillingMethods(producerCode)
    var temp = new ArrayList<BillingMethod>()
    billingMethods.each(\ b -> { temp.add( BillingMethod.get( b )) })
    return temp.toTypedArray()
  }

  override function retrieveInstallmentsPlanPreview(policyPeriod : PolicyPeriod) : PaymentPreviewItem[]
  {
    var issuePolicyInfo = createIssuePolicyInfoForPreview(policyPeriod)

    var bcInvoiceItems = billingAPI.previewInstallmentsPlanInvoices( issuePolicyInfo)
    return covertToPolicyCenterPaymentPreviewItems(bcInvoiceItems, policyPeriod.PreferredSettlementCurrency)
  }

  private function createIssuePolicyInfoForPreview(policyPeriod : PolicyPeriod) : IssuePolicyInfo {
    var issuePolicyInfo = new IssuePolicyInfo()

    //issuePolicyInfo.sync(policyPeriod)
    issuePolicyInfo.syncBasicPolicyInfoForPreview(policyPeriod)
    issuePolicyInfo.PeriodStart = policyPeriod.PeriodStart.toCalendar()
    issuePolicyInfo.PeriodEnd = policyPeriod.PeriodEnd.toCalendar()
    issuePolicyInfo.PaymentPlanPublicId = policyPeriod.PaymentPlanID

    return issuePolicyInfo
  }

  private function covertToPolicyCenterPaymentPreviewItems(bcInvoiceItems : InvoiceItemPreview[], expectedCurrency : Currency) : PaymentPreviewItem[] {
    var invoices = new HashSet<PaymentPreviewItem>()
    bcInvoiceItems.each( \ i -> {var invoiceItem = new PaymentPreviewItem()
                                 invoiceItem.DueDate = i.InvoiceDueDate.Time
                                 invoiceItem.Amount = i.Amount.ofCurrency(expectedCurrency)
                                 invoiceItem.Type = i.Type.toCode()
                                 invoices.add(invoiceItem)} )

    return invoices.toTypedArray()
  }
  /**
  * Issue a policy period in Billing Center
  * @param period: the policy period
  * @param transactionID: the unique transaction id to make this call idempotent
  */
  override function createPolicyPeriod( period: PolicyPeriod, transactionID : String) : String
  {
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
  override function cancelPolicyPeriod( period: PolicyPeriod, transactionID : String) : void
  {
    var cancelInfo = new CancelPolicyInfo()
    cancelInfo.sync(period)
    callUpdate(\ b -> b.cancelPolicyPeriod(cancelInfo, transactionID))
  }

  /**
  * Issue a policy change in Billing Center
  * @param period: the policy period
  * @param transactionID: the unique transaction id to make this call idempotent
  */
  override function issuePolicyChange( period: PolicyPeriod, transactionID: String ) : void
  {
    var policyChangeInfo = new PolicyChangeInfo()
    policyChangeInfo.syncPolicyChange(period)
    callUpdate(\ b -> b.changePolicyPeriod(policyChangeInfo,  transactionID))
  }

  override function issueReinstatement( period: PolicyPeriod, transactionID: String ) : void
  {
    var reinstatementInfo = new ReinstatementInfo()
    reinstatementInfo.syncBasicPolicyInfo(period)
    reinstatementInfo.Description = period.Reinstatement.Description

    callUpdate(\ b -> b.reinstatePolicyPeriod(reinstatementInfo,  transactionID))
  }


  override function renewPolicyPeriod( period: PolicyPeriod, transactionID: String ) : void
  {
    var renewalInfo = new RenewalInfo()
    renewalInfo.sync(period)
    renewalInfo.PriorTermNumber = period.BasedOn.TermNumber
    renewalInfo.PriorPolicyNumber = period.BasedOn.PolicyNumber
    callUpdate(\ b -> b.renewPolicyPeriod( renewalInfo,  transactionID))
  }


  override function issueFinalAudit( period: PolicyPeriod, transactionID: String ) : void
  {
    var finalAuditInfo = new FinalAuditInfo()
    finalAuditInfo.syncBasicPolicyInfo(period)

    callUpdate(\ b -> b.issueFinalAudit( finalAuditInfo,  transactionID ))
  }


  override function createProducer( organization: Organization, transactionId: String ) : String
  {
    if(not organization.Producer){
      throw new IllegalArgumentException("Cannot create producer from an non-producer organization")
    }
    var producerInfo = new PCProducerInfo()
    producerInfo.sync( organization )
    return callUpdate(\ b -> b.createProducer( producerInfo,  transactionId ))
  }

  override function retrieveAllAgencyBillPlans() : AgencyBillPlanSummary[]
  {
    var summaries = new ArrayList<AgencyBillPlanSummary>()

    var plans = billingAPI.getAllAgencyBillPlans()

    for(p in plans){
      var summary = new AgencyBillPlanSummary()
      summary.Name = p.Name
      summary.Id = p.PublicID
      summaries.add( summary )
    }

    return summaries.toTypedArray()
  }


  override function isProducerExist( producerId: String ) : boolean
  {
    return billingAPI.isProducerExist( producerId )
  }


  override function createProducerCode( producerCode: ProducerCode, transactionId: String ) : String
  {
    var producerCodeInfo = new NewProducerCodeInfo()
    producerCodeInfo.sync(producerCode)
    return callUpdate(\ b -> b.createProducerCode( producerCodeInfo, transactionId))
  }

  override function retrieveAllCommissionPlans() : CommissionPlanSummary[]
  {
    var summaries = new ArrayList<CommissionPlanSummary>()

    var plans = billingAPI.getAllCommissionPlans()

    for(p in plans){
      var summary = new CommissionPlanSummary()
      summary.Name = p.Name
      summary.Id = p.PublicID
      summary.AllowedTiers = new Tier[p.AllowedTiers.length]
      for(t in p.AllowedTiers index i){
        summary.AllowedTiers[i] = t
      }
      summaries.add( summary )
    }

    return summaries.toTypedArray()
  }

  override function updateProducerCode( producerCode: ProducerCode, transactionId : String ) : void
  {
    var producerCodeInfo = new ProducerCodeInfo()
    producerCodeInfo.PublicID = producerCode.PublicID
    producerCodeInfo.Code = producerCode.Code
    var status = producerCode.ProducerStatus
    producerCodeInfo.Active = status == ProducerStatus.TC_ACTIVE or status ==  ProducerStatus.TC_LIMITED
    callUpdate(\ b -> b.updateProducerCode( producerCodeInfo, transactionId))
  }

  override function updateProducer( organization: Organization, transactionId : String ) : void
  {
    if(not organization.Producer){
      throw new IllegalArgumentException("Cannot create producer from an non-producer organization")
    }
    var producerInfo = new PCProducerInfo()
    producerInfo.sync( organization )
    callUpdate(\ b -> b.updateProducer( producerInfo, transactionId))
  }


  override function updateAccount( account: Account, transactionId: String ) : void
  {
    var accountInfo = new PCAccountInfo()
    accountInfo.sync( account )
    callUpdate(\ b -> b.updateAccount( accountInfo, transactionId))
  }

  override function rewritePolicyPeriod( period: PolicyPeriod, transactionId: String ) : void
  {
    var renewalInfo = new RewriteInfo()
    renewalInfo.sync(period)
    renewalInfo.PriorTermNumber = period.BasedOn.TermNumber
    renewalInfo.PriorPolicyNumber = period.BasedOn.PolicyNumber

    callUpdate(\ b -> b.rewritePolicyPeriod(renewalInfo, transactionId))
  }

  override function issuePremiumReport( period: PolicyPeriod, transactionId: String ) : void
  {
    var premiumReportInfo = new PremiumReportInfo()
    premiumReportInfo.sync( period )
    callUpdate(\ b -> b.issuePremiumReport(premiumReportInfo, transactionId))
  }

  override function updateContact( contact: Contact, transactionId: String ) : void
  {
    var updateContactInfo = new PCContactInfo()
    updateContactInfo.sync( contact )
    callUpdate(\ b -> b.updateContact(updateContactInfo, transactionId))
  }


  override function waiveFinalAudit( period: PolicyPeriod, transactionId: String ) : void
  {
    var policyPeriodInfo = new PCPolicyPeriodInfo()
    policyPeriodInfo.PolicyNumber = period.PolicyNumber
    policyPeriodInfo.TermNumber = period.TermNumber
    callUpdate(\ b -> b.waiveFinalAudit( policyPeriodInfo, transactionId ))
  }

  override function scheduleFinalAudit( period: PolicyPeriod, transactionId: String ) : void
  {
    var policyPeriodInfo = new PCPolicyPeriodInfo()
    policyPeriodInfo.PolicyNumber = period.PolicyNumber
    policyPeriodInfo.TermNumber = period.TermNumber
    callUpdate(\ b -> b.scheduleFinalAudit( policyPeriodInfo, transactionId ))
  }


  override function getPeriodInfo( period: PolicyPeriod ) : PolicyPeriodBillingInfo
  {
    var policyPeriodInfo = new PCPolicyPeriodInfo()
    policyPeriodInfo.PolicyNumber = period.PolicyNumber
    policyPeriodInfo.TermNumber = period.TermNumber
    try{
      var bcPeriod = billingAPI.getPolicyPeriod( policyPeriodInfo )
      return new PolicyPeriodBillingInfo(){
        :BillingMethod = bcPeriod.BillingMethodCode,
        :PaymentPlanID = bcPeriod.PaymentPlanPublicId
      }
    }catch(e : BadIdentifierException){
      return null
    }
  }


  override function transferPolicyPeriods(accountNumber : String,
                                  periods : PolicyPeriod[], transactionId : String) {
    var policyPeriodInfos = periods.map(\ p -> new PCPolicyPeriodInfo(){
      :TermNumber = p.TermNumber,
      :PolicyNumber = p.PolicyNumber
    })
    callUpdate(\ b -> {
      b.transferPolicyPeriods(policyPeriodInfos, accountNumber, transactionId)
      return null
    })
  }

  override function setDownPaymentInstallmentTotalForAllInstallmentsPlans(period : PolicyPeriod) {
    period.PaymentPlans.getInstallmentPlans().each(\ i -> {
      var issuePolicyInfo = createIssuePolicyInfoForPreview(period)

      issuePolicyInfo.PaymentPlanPublicId = i.BillingId
      var bcInvoiceItems = billingAPI.previewInstallmentsPlanInvoices(issuePolicyInfo)

      var paymentPreviewItems = covertToPolicyCenterPaymentPreviewItems(bcInvoiceItems, period.PreferredSettlementCurrency)
      var paymentPlan = period.PaymentPlans.getById(i.BillingId)
      var downPaymentItem =  paymentPreviewItems.firstWhere(\ p -> p.Type == InvoiceItemType.TC_deposit.toCode())
      if (downPaymentItem != null) {
        paymentPlan.DownPayment = downPaymentItem.Amount
      }
      else {
        // Need to set to zero because otherwise the amount from a prior preview calc will remain in this field
        paymentPlan.DownPayment = 0bd.ofCurrency(period.PreferredSettlementCurrency)
      }

      var installmentItems = paymentPreviewItems.where(\ p -> p.Type == InvoiceItemType.TC_installment.toCode())
      if (installmentItems.HasElements) {
        paymentPlan.Installment = installmentItems.max(\ p -> p.Amount )
      }
      else {
        // Need to set to zero because otherwise the amount from a prior preview calc will remain in this field
        paymentPlan.Installment = 0bd.ofCurrency(period.PreferredSettlementCurrency)
      }

      paymentPlan.Total = paymentPreviewItems.sum(period.PreferredSettlementCurrency, \ p -> p.Amount)
    })
  }

  override function getSubAccounts(p0 : String) : BillingAccountSearchResult[] {
    // BC 300 does not support this function, if customer wants they can change their implementation
    // of BC 300 to support it and change this method accordingly.
    return {}
  }

  override function getInvoiceStreams(p0 : String) : BillingInvoiceStreamInfo[] {
    // BC 300 does not support this function, if customer wants they can change their implementation
    // of BC 300 to support it and change this method accordingly.
    return {}
  }

  override function searchForAccounts(p0 : BillingAccountSearchCriteriaJava, p1 : Integer) : BillingAccountSearchResult[] {
    // BC 300 does not support this function, if customer wants they can change their implementation
    // of BC 300 to support it and change this method accordingly.
    return {}
  }

  override property get CompatibilityMode() : String {
    return "4.0.0"
  }

  override function addPaymentInstrumentTo(accountNumber : String, paymentInstrument : BillingPaymentInstrumentJava) : BillingPaymentInstrumentJava {
    // BC 300 does not support this function, if customer wants they can change their implementation
    // of BC 300 to support it and change this method accordingly.
    return null
  }

  override function getExistingPaymentInstruments(accountNumber : String) : BillingPaymentInstrumentJava[] {
    // BC 300 does not support this function, if customer wants they can change their implementation
    // of BC 300 to support it and change this method accordingly.
    return {}
  }

  override function updatePolicyPeriodTermConfirmed(policyNumber : String, termNumber : int,
                                           isConfirmed : Boolean) : void{
  // BC 300 does not support this function, if customer wants they can change their implementation
  // of BC 300 to support it and change this method accordingly.
  }

  override function retrieveAccountUnappliedFunds(accountNumber : String) : BillingUnappliedFundInfoJava[] {
    return {}
    // BC 300 does not support this function, if customer wants they can change their implementation
    // of BC 300 to support it and change this method accordingly.
  }

}
