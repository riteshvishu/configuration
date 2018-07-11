package gw.billing

uses gw.api.productmodel.AuditSchedulePattern
uses gw.api.productmodel.SeriesAuditSchedulePattern
uses gw.api.util.MonetaryAmounts
uses gw.pl.currency.MonetaryAmount
uses gw.plugin.Plugins
uses gw.plugin.billing.IBillingSystemPlugin
uses gw.plugin.billing.BillingAccountSearchResult
uses gw.plugin.billing.BillingInvoiceStreamInfo
uses gw.plugin.billing.BillingPaymentInstrument
uses gw.plugin.policyperiod.IPolicyPeriodPlugin

uses java.lang.IllegalStateException
uses gw.plugin.billing.BillingUnappliedFundInfo

enhancement PolicyPeriodBillingEnhancement : entity.PolicyPeriod {

  /**
   * An array of available billing methods for this policy period.
   */
  property get AvailableBillingMethods() : BillingMethod[] {
    var policyPeriodPlugin = Plugins.get(IPolicyPeriodPlugin)
    var supportedMethods = policyPeriodPlugin.getSupportedBillingMethods(this)
    if (supportedMethods.Count > 1) {
      var BillingSystem = Plugins.get(IBillingSystemPlugin)
      var bcBillingMethods = BillingSystem
        .getAvailableBillingMethods(this.ProducerCodeOfRecord.PublicID)
      supportedMethods = supportedMethods.where(\ b -> bcBillingMethods.contains(b))
    }
    return supportedMethods
  }

  /**
   * The selected payment plan for this policy period.
   *
   * Only available for new term.
   */
  public property get SelectedPaymentPlan() : PaymentPlanSummary {
    return this.PaymentPlans.firstWhere(\ p -> p.BillingId == this.PaymentPlanID)
  }

  /**
   * The selected billing invoice stream for this policy period.
   *
   * Only available for new term.
   */
  public property get SelectedInvoiceStream() : BillingInvoiceStreamInfo {
    if (this.InvoiceStreamCode == null) {
      return null
    }
    return this.AvailableInvoiceStreams.firstWhere(\ s -> s.PublicID == this.InvoiceStreamCode)
  }

  /**
   * Update this period's job process payment plans if it is a new term process.
   */
  function updatePaymentPlans() {
    if (this.JobProcess typeis gw.job.NewTermProcess) {
      this.JobProcess.updatePaymentPlans()
    }
  }

  /**
   * Return whether the specified billing invoice stream can be selected
   *    for this policy period based on its selected payment plan.
   *
   * @param stream The billing invoice stream
   */
  function canSelectInvoiceStream(stream : BillingInvoiceStreamInfo) : boolean {
    var paymentPlan = SelectedPaymentPlan
    if (paymentPlan == null) return true

    var validInterval = stream.Interval == this.PaymentFrequency
    var validPaymentMethod = paymentPlan.AllowResponsive or (stream.PaymentMethod <> TC_RESPONSIVE)
    return paymentPlan == null or (validInterval and validPaymentMethod)
  }

  /**
   * The payment frequency for this policy period.
   */
  public property get PaymentFrequency() : BillingPeriodicity {
    var invoiceFrequency = SelectedPaymentPlan.InvoiceFrequency
    switch(invoiceFrequency) {
      case TC_TWICEPERMONTH: return TC_TWICEPERMONTH
      case TC_EVERYWEEK: return TC_EVERYWEEK
      case TC_EVERYOTHERWEEK: return TC_EVERYOTHERWEEK
      default: return TC_MONTHLY
    }
  }

  /**
   * The available payment instruments for this policy period.
   */
  public property get AvailablePaymentInstruments() : BillingPaymentInstrument[] {
    return callBillingSystemPlugin(\ plugin ->
      plugin.getExistingPaymentInstruments(this.BillingAccountNumber)).cast(BillingPaymentInstrument)
  }

  /**
   * Whether the selected payment plan for this policy period is "Responsive".
   */
  public property get AllowResponsive() : boolean {
    var paymentPlan = this.SelectedPaymentPlan
    return paymentPlan == null or paymentPlan.IsReporting or paymentPlan.AllowResponsive
  }

  /**
   * Return the billing sub-accounts for this policy period.
   */
  function getSubAccounts() : BillingAccountSearchResult[] {
    return callBillingSystemPlugin(\ plugin ->
      plugin.getSubAccounts(BillingAccountNumber) as BillingAccountSearchResult[])
  }

  /**
   * The available billing invoice streams for this policy period.
   */
  property get AvailableInvoiceStreams() : BillingInvoiceStreamInfo[] {
    return callBillingSystemPlugin(\ plugin ->
      plugin.getInvoiceStreams(BillingAccountNumber)).cast(BillingInvoiceStreamInfo)
  }

  /**
   * The unapplied funds for the Billing Account
   */
  property get UnappliedFunds() : BillingUnappliedFundInfo[] {
    return callBillingSystemPlugin(\ plugin ->
        plugin.retrieveAccountUnappliedFunds(BillingAccountNumber)).cast(BillingUnappliedFundInfo)
  }

  /**
   * The billing account number of this policy period.
   *
   * It is either the policy's account number or an alternate billing account
   * number specified for this period.
   */
  property get BillingAccountNumber() : String {
    return this.AltBillingAccountNumber == null
      ? this.Policy.Account.AccountNumber
      : this.AltBillingAccountNumber
  }

  private function callBillingSystemPlugin<T>(_call : block(plugin : IBillingSystemPlugin) : T) : T{
    var plugin = Plugins.get(IBillingSystemPlugin)
    return _call(plugin)
  }

  /**
   * The billing contact for this policy period.
   */
  property get BillingContact() : PolicyBillingContact {
    return this.EffectiveDatedFields.BillingContact
  }

  /**
   * Whether a reporting plan is selected for this policy period.
   */
  property get ReportingPlanSelected() : boolean {
    return this.ReportingPatternCode != null
        and this.PaymentPlanName != null
        and this.PaymentPlanID != null
        //and SelectedPaymentPlanIsValid
  }

  /**
   * The reporting audit schedule pattern for this policy period.
   */
  property get ReportingPattern() : AuditSchedulePattern {
    if (not ReportingPlanSelected)
      throw "No reporting plan is selected"
    var allPCReportPatterns = SeriesAuditSchedulePattern.getAll()
    return allPCReportPatterns.firstWhere(\ a -> a.Code == this.ReportingPatternCode )
  }

  /**
   * Whether an installments plan is selected for this policy period.
   */
  property get InstallmentsPlanSelected() : boolean {
    return this.ReportingPatternCode == null
          and this.PaymentPlanName != null
          and this.PaymentPlanID != null
         // and SelectedPaymentPlanIsValid
  }

  /**
   * The available installment payment plans for this policy period.
   */
  property get AvailableInstallmentsPlans() : PaymentPlanSummary[] {
    return this.PaymentPlans.getInstallmentPlans()
  }

  /**
   * The available reporting plans for this policy period.
   */
  property get AvailableReportingPlans() : ReportingPlan[] {
    return this.PaymentPlans.getReportingPlans()
  }

  /**
   * Unset the selected payment plan for this policy period.
   *
   * This includes clearing the reporting pattern code, the deposit amount,
   * and the deposit override percent.
   */
  function unsetPaymentPlan() {
    this.PaymentPlanID = null
    this.PaymentPlanName = null
    this.ReportingPatternCode = null

    this.DepositOverridePct = null
    this.DepositAmount = null
  }

  /**
   * Calculate and set the deposit amount for this policy period
   *    based on the total subject to reporting and override percent.
   */
  function calculateAndSetDepositAmountOnReporting() : MonetaryAmount {
    var depositAmt : MonetaryAmount
    if (this.TotalSubjectToReporting != null and this.DepositOverridePct != null) {
      depositAmt = this.TotalSubjectToReporting * this.DepositOverridePct / 100
    } else if (this.TotalSubjectToReporting != null and this.ReportingPattern.ReportingDefaultDepositPct != null) {
      depositAmt = this.TotalSubjectToReporting * this.ReportingPattern.ReportingDefaultDepositPct / 100
    } else {
      depositAmt = null
    }
    if (depositAmt != null) {
      depositAmt = MonetaryAmounts.roundToCurrencyScale(depositAmt.Amount, depositAmt.Currency, HALF_EVEN)
    }
    this.DepositAmount = depositAmt
    return depositAmt
  }

  /**
   * Set the specified payment plan for this policy period.
   *
   * @param plan The payment plan to be selected for this period.
   */
  function selectPaymentPlan(plan : PaymentPlanSummary) {
    if (plan != null and plan.BillingId <> this.PaymentPlanID) {
      if (plan.IsReporting) {
        var pcReportingPlan = SeriesAuditSchedulePattern.getAll()
          .firstWhere(\ a -> a.PaymentPlanCode == plan.PaymentCode)
         if (pcReportingPlan <> null) {
            selectReportingPlan(new ReportingPlan(pcReportingPlan, plan))
         }
      } else {
        unsetPaymentPlan()
        this.PaymentPlanID = plan.BillingId
        this.PaymentPlanName = plan.Name
        updateInvoiceStreamAccordingToPaymentPlan()
      }
    }
  }

  /**
   * Update the invoice stream for this policy period based on its selected payment plan.
   */
  function updateInvoiceStreamAccordingToPaymentPlan(){
    var validInvoiceStreams = this.AvailableInvoiceStreams.where(\ b -> canSelectInvoiceStream(b))*.PublicID
    if (not validInvoiceStreams.contains(this.InvoiceStreamCode)) {
      this.InvoiceStreamCode = validInvoiceStreams.first()
    }
    this.NewInvoiceStream.Interval = this.PaymentFrequency
    if (not (this.NewInvoiceStream.Automatic or this.AllowResponsive)) {
      this.NewInvoiceStream.Automatic = true
    }
  }

  /**
   * Sets the specified reporting plan for this policy period.
   *
   * @param plan The reporting plan to be selected for this period.
   */
  function selectReportingPlan(plan : ReportingPlan) {
    unsetPaymentPlan()
    this.ReportingPatternCode = plan.ReportingPatternCode
    this.PaymentPlanID = plan.BillingId
    this.PaymentPlanName = plan.ReportingPatternName
    this.FinalAuditOption = FinalAuditOption.TC_YES
    this.DepositAmount =  this.TotalSubjectToReporting * plan.DefaultDepositPercent / 100
    this.DepositOverridePct = null
  }

  /**
   * Returns whether the deposit amount can be overridden for this policy period.
   */
  function canOverrideDeposit() : boolean {
    return this.Submission != null or this.Issuance != null or this.Reinstatement != null
      or (this.PolicyChange != null and not this.PolicyTerm.DepositReleased)
  }

  /**
   * Updates deposit in this policy term, whose value to be sent to BC later
   * Currently updatePolicyTermDepositAmount() is called during submission, rewrite, renewal, issuance,
   * policy change and reinstatement in WC reporting policies.
   * see calculateDeposit() in PolicyInfoEnhancement for more information
   */
  function updatePolicyTermDepositAmount() {
    if(not this.PolicyTerm.DepositReleased){
      this.PolicyTerm.DepositAmount = this.DepositAmount
    }
  }

  /**
   * Waive any changes to the deposit amount for this policy period.
   */
  function waiveDepositChange() {
    this.DepositOverridePct = this.BasedOn.DepositOverridePct
    this.DepositAmount = this.BasedOn.DepositAmount
  }

  /**
   * The previous deposit amount for this policy period.
   */
  property get PrevDepositAmount() : MonetaryAmount {
    return this.PolicyTerm.DepositReleased ? 0bd.ofCurrency(this.PreferredSettlementCurrency) : this.BasedOn.DepositAmount
  }

  /**
   * The difference in the deposit amount from the previous period.
   */
  property get DepositChangeFromBasedOnPeriod() : MonetaryAmount {
    var currentDepositAmount = this.DepositAmount
    return currentDepositAmount.subtract(PrevDepositAmount == null ? 0bd.ofCurrency(this.PreferredSettlementCurrency) : PrevDepositAmount)
  }

  /**
   * Create a new payment instrument for this period using the specified
   *    payment method and token.
   */
  function createPaymentInstrument(paymentMethod : AccountPaymentMethod, token : String) {
    if (paymentMethod == null) {
      throw new IllegalStateException("Payment method cannot be null.")
    }
    if (this.Status == PolicyPeriodStatus.TC_BOUND) {
      throw new IllegalStateException("Cannot add payment instrument on bound policy")
    }
    var plugin = gw.plugin.Plugins.get(gw.plugin.billing.IBillingSystemPlugin)
    var paymentInstrument = new gw.plugin.billing.BillingPaymentInstrument()
    paymentInstrument.PaymentMethod = paymentMethod
    paymentInstrument.Token = token
    var accountNumber = this.BillingAccountNumber
    var newInstrument = plugin.addPaymentInstrumentTo(accountNumber, paymentInstrument) as BillingPaymentInstrument
    this.NewInvoiceStream.PaymentInstrumentID = newInstrument.PublicID
    this.NewInvoiceStream.PaymentMethod = newInstrument.PaymentMethod

    this.Bundle.commit()
  }
}