package gw.job

uses gw.api.job.JobProcessLogger
uses gw.plugin.Plugins
uses gw.plugin.billing.IBillingSystemPlugin
uses gw.plugin.policy.IPolicyPaymentPlugin

@Export
abstract class NewTermProcess extends JobProcess {

  private property get BillingSystemPlugin() : IBillingSystemPlugin{
    // don't make this an static variable or else it won't be automatically reloaded
    // when we switch Plugin definition using Run Command
    return  Plugins.get(IBillingSystemPlugin)
  }

  construct(period : PolicyPeriod, jobSpecificTypePermissions : JobTypePermissions) {
    super(period, jobSpecificTypePermissions)
  }

  override function setPaymentInfoWithNewQuote() {
    if(_branch.PaymentPlans.IsEmpty){
      // default all billing information to that of the previous term in Billing System.
      retrieveAllPaymentPlansFromBillingSystemAndAddToPeriod()
      if(_branch.BasedOn <> null){
        updateInformationFromBillingSystem()
      }
      if(_branch.BillingMethod == null){
        var availableBillingMethods = _branch.AvailableBillingMethods
        _branch.BillingMethod = availableBillingMethods.contains(TC_DIRECTBILL)
          ? TC_DIRECTBILL : availableBillingMethods.first()
      }
      if(_branch.PaymentPlanID == null){
        _branch.selectPaymentPlan(_branch.PaymentPlans.first())
      }
      if(_branch.NewInvoiceStream == null){
        _branch.NewInvoiceStream = new BillingInvoiceStream(_branch)
      }
      if(_branch.InvoiceStreamCode == null){
        _branch.InvoiceStreamCode = _branch.AvailableInvoiceStreams.first().PublicID
      }
      _branch.updateInvoiceStreamAccordingToPaymentPlan()
    }
    JobProcessLogger.logInfo("Setting downpayment, installment and total amount for all installments plans, branch: " + _branch)
    BillingSystemPlugin.setDownPaymentInstallmentTotalForAllInstallmentsPlans(_branch)
    super.setPaymentInfoWithNewQuote()
  }

  /**
   * Update the billing payment plans cached in the period.
   *
   * This should be invoked when the BillingMethod or AltBillingAccountNumber
   * for the branch have been changed. This should only be invoked after the
   * branch has been quoted.
   */
  function updatePaymentPlans() {
    /* retrieves all payment plans from the billing system and adds each to the period. */
    retrieveAllPaymentPlansFromBillingSystemAndAddToPeriod()

    _branch.updateInvoiceStreamAccordingToPaymentPlan()
  }

  /**
   * Retrieve available payment plans from Billing System and cache them in the policy period.
   */
  private function retrieveAllPaymentPlansFromBillingSystemAndAddToPeriod() {
    JobProcessLogger.logInfo("Retrieving available payment plans from Billing System, branch: " + _branch)
    var paymentPlans = BillingSystemPlugin.retrieveAllPaymentPlans(_branch)
    var plans =  Plugins.get(IPolicyPaymentPlugin).filterReportingPlans( _branch.Policy, paymentPlans)
    var auditable = _branch.IsAuditable
    _branch.PaymentPlans = {}
    for(plan in plans){
      if(auditable or not plan.IsReporting){
        _branch.addToPaymentPlans(plan)
      }
    }
    JobProcessLogger.logInfo(_branch.PaymentPlans.Count + " payment plans retrieved, branch: " + _branch)
  }

  /**
   * Retrieve billing information for the current term in Billing System and set as default values
   * for this new term.
  */
  private function updateInformationFromBillingSystem(){
    JobProcessLogger.logInfo("Retrieving billing information of pervious term from Billing System.")
    var bcPeriod = BillingSystemPlugin.getPeriodInfo(_branch.BasedOn)
    if(bcPeriod == null){
      return
    }
    //select the billing method if matches
    if(_branch.AvailableBillingMethods.hasMatch(\ b -> b == bcPeriod.BillingMethod)) {
      _branch.BillingMethod = bcPeriod.BillingMethod
    }
    //select the payment plan if matches
    var matchingPlan = _branch.PaymentPlans
      .firstWhere(\ p -> p.BillingId == bcPeriod.PaymentPlanID
        and (p.IsReporting == _branch.IsAuditable)) // this rarely changes between terms
    if (matchingPlan <> null) {
      _branch.selectPaymentPlan(matchingPlan)
    }
    _branch.AltBillingAccountNumber = bcPeriod.AltBillingAccountNumber
    _branch.InvoiceStreamCode = bcPeriod.InvoiceStreamCode
  }

  override protected function runPreQuote() {
    setRateAsOfDate()
  }

  private function setRateAsOfDate() {
    _branch.RateAsOfDate = java.util.Date.CurrentDate
  }
}
