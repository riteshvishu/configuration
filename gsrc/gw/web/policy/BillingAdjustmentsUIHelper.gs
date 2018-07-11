package gw.web.policy

uses gw.api.database.Query
uses gw.api.util.LocaleUtil
uses gw.api.util.LocationUtil
uses gw.api.web.PebblesUtil
uses gw.billing.ReportingPlan
uses gw.plugin.billing.BillingInvoiceStreamInfo
uses gw.plugin.billing.BillingUnappliedFundInfo
uses pcf.BillingAdjustmentPreviewPaymentsPopup
uses pcf.api.Location

@Export
class BillingAdjustmentsUIHelper {

  private static var KANJI_LOCALES = {LocaleType.TC_JA_JP}

  var _location : Location
  var _policyPeriod : PolicyPeriod as PolicyPeriod
  var _newInvoicing : boolean as NewInvoicing
  var _newUnappliedFund : boolean as NewUnappliedFund
  var _installmentPlans : PaymentPlanSummary[] as InstallmentPlans
  var _reportingPlans : ReportingPlan[] as ReportingPlans
  var _selectedReportingPlan : ReportingPlan as SelectedReportingPlan
  var _paymentMethodChoice : PaymentMethod as PaymentMethodChoice

  var _invoiceStreams : BillingInvoiceStreamInfo[] as InvoiceStreams
  var _unappliedFunds : BillingUnappliedFundInfo[] as UnappliedFunds

  construct(location : Location, policyPeriod : PolicyPeriod) {
    _location = location
    PolicyPeriod = policyPeriod
    initBillingInfo()
    if (PolicyPeriod.PaymentPlanID == null) {
      initPaymentPlan()
    }
    updateSelectedReportingPlan()
  }

  static function showKanjiFields() : boolean {
    return KANJI_LOCALES.
        contains(LocaleUtil.getCurrentUserLocale())
  }

  function updateSelectedReportingPlan() {
    SelectedReportingPlan = PolicyPeriod.PaymentPlans.ReportingPlans.firstWhere(
        \ p -> p.BillingId == PolicyPeriod.PaymentPlanID)
  }

  function getAvailableBillingMethods() : BillingMethod[]{
    try{
      var supportedMethods = PolicyPeriod.AvailableBillingMethods
      if(supportedMethods.Count == 1){
        PolicyPeriod.BillingMethod = supportedMethods[0]
      }
      return supportedMethods
    }catch(e : java.lang.Exception){
      LocationUtil.addRequestScopedErrorMessage(displaykey.Web.BillingAdjustmentsDV.Error.RetrieveBillingMethods)
      e.printStackTrace()
      PolicyPeriod.BillingMethod = null
      return new BillingMethod[0]
    }
  }

  function getInitialPaymentMethodChoice() : PaymentMethod {
    if (PolicyPeriod.BillingMethod == TC_LISTBILL and PolicyPeriod.AltBillingAccountNumber == null) {
      // For List Bill, payment method option is available only if alt billing account is selected.
      // By default, if no alt account is selected, we just show empty installment plans
      return PaymentMethod.TC_INSTALLMENTS
    }
    if (PolicyPeriod.ReportingPlanSelected and ReportingPlans.Count > 0) {
      return PaymentMethod.TC_REPORTINGPLAN
    }
    else if (PolicyPeriod.InstallmentsPlanSelected and InstallmentPlans.Count > 0 ) {
      return PaymentMethod.TC_INSTALLMENTS
    }
    else {
      if (InstallmentPlans.Count == 0 and ReportingPlans.Count == 0)
        LocationUtil.addRequestScopedErrorMessage(displaykey.Web.BillingAdjustmentsDV.Error.RetrievePaymentPlans)
      if (ReportingPlans.Count > 0 and InstallmentPlans.Count == 0)
        return PaymentMethod.TC_REPORTINGPLAN
      else
        return PaymentMethod.TC_INSTALLMENTS
    }
  }

  function previewPayments(){
    try {
      var previewItems = PolicyPeriod.JobProcess.retrieveInstallmentsPlanPreviewFromBillingSystem()
      BillingAdjustmentPreviewPaymentsPopup.push( previewItems )
    } catch (e : java.lang.Exception) {
      LocationUtil.addRequestScopedErrorMessage(
          displaykey.Web.BillingAdjustmentsDV.Error.RetrieveInstallmentsPlanPreview(e.Message))
    }
  }

  function getSubAccounts() : gw.plugin.billing.BillingAccountSearchResult[] {
    try {
      var subAccounts = PolicyPeriod.getSubAccounts()
      if(subAccounts.IsEmpty){
        return {new gw.plugin.billing.impl.MockBillingAccountSearchResult(){
            :AccountNumber = "",
            :AccountName = displaykey.Web.Policy.Billing.NoSubAccounts
        }}
      }
      return subAccounts
    } catch (e : java.lang.Throwable) {
      LocationUtil.addRequestScopedErrorMessage(displaykey.Web.BillingAdjustmentsDV.Error.RetrieveSubAccounts)
      e.printStackTrace()
      return {}
    }
  }

  function formatAccount(accountNumber  : String) : String {

    var result = Query.make(Account).compare("AccountNumber", Equals, accountNumber).select()
    if(result.HasElements){
      return accountNumber + " (" + result.FirstResult.AccountHolderContact.DisplayName + ")"
    }
    return accountNumber

  }

  function resetBillingInfo() {
    PolicyPeriod.AltBillingAccountNumber = null
    PolicyPeriod.unsetPaymentPlan()
    PolicyPeriod.updatePaymentPlans()
    switch(PolicyPeriod.BillingMethod) {
      case TC_LISTBILL:
          NewInvoicing = false
          PolicyPeriod.NewInvoiceStream.Selected = true
          NewUnappliedFund = NewInvoicing
          break
      case TC_DIRECTBILL:
          NewInvoicing = (PolicyPeriod.InvoiceStreamCode == null)
          PolicyPeriod.JobProcess.setPaymentInfoWithNewQuote()
          NewUnappliedFund = NewInvoicing
          break
        default:
        break
    }
    InstallmentPlans = PolicyPeriod.AvailableInstallmentsPlans
    InvoiceStreams = getAvailableInvoiceStreams()
    PaymentMethodChoice = getInitialPaymentMethodChoice()
    ReportingPlans = PolicyPeriod.AvailableReportingPlans
    if (PolicyPeriod.PaymentPlanID == null) {
      initPaymentPlan()
    }
    updateSelectedReportingPlan()
  }

  function hasBothInstallmentsAndReportPlans() : boolean {
    return ReportingPlans.HasElements and InstallmentPlans.HasElements
  }

  function initBillingInfo() {
    NewInvoicing = PolicyPeriod.InvoiceStreamCode == null
    NewUnappliedFund = PolicyPeriod.NewInvoiceStream.UnappliedFundID == null
    InstallmentPlans = PolicyPeriod.AvailableInstallmentsPlans
    InvoiceStreams = getAvailableInvoiceStreams()
    ReportingPlans = PolicyPeriod.AvailableReportingPlans
    PaymentMethodChoice = getInitialPaymentMethodChoice()
    UnappliedFunds = PolicyPeriod.UnappliedFunds
  }

  function setAltBillingAccount(accountNumber : String) {
    PolicyPeriod.AltBillingAccountNumber = accountNumber
    PolicyPeriod.updatePaymentPlans()
    initBillingInfo()
    initPaymentPlan()
    updateSelectedReportingPlan()
    UnappliedFunds = PolicyPeriod.UnappliedFunds
    PebblesUtil.invalidateIterators(_location, entity.PaymentPlanSummary)
    PebblesUtil.invalidateIterators(_location, BillingInvoiceStreamInfo)
  }

  function initPaymentPlan() {
    PolicyPeriod.unsetPaymentPlan()
    if (PaymentMethodChoice == PaymentMethod.TC_INSTALLMENTS) {
      PolicyPeriod.selectPaymentPlan(InstallmentPlans.first())
    } else if (PaymentMethodChoice == PaymentMethod.TC_REPORTINGPLAN) {
      SelectedReportingPlan = ReportingPlans.first()
      PolicyPeriod.selectReportingPlan(SelectedReportingPlan)
      PolicyPeriod.updateInvoiceStreamAccordingToPaymentPlan()
    }
  }

  function invoicingOptionChanged() {
    PolicyPeriod.InvoiceStreamCode = null
    if (NewInvoicing){
      NewUnappliedFund = true
    } else {
      PolicyPeriod.updateInvoiceStreamAccordingToPaymentPlan()
    }
  }

  function getAvailableInvoiceStreams() : BillingInvoiceStreamInfo[] {
    try{
      return PolicyPeriod.getAvailableInvoiceStreams()
    }catch(e : java.lang.Throwable){
      LocationUtil.addRequestScopedErrorMessage(displaykey.Web.BillingAdjustmentsDV.Error.RetrieveInvoiceStreams)
      e.printStackTrace()
      return {}
    }
  }

  function unappliedFundOptionChanged() {
    if (NewUnappliedFund) {
      PolicyPeriod.NewInvoiceStream.UnappliedFundID = null
    } else {
      PolicyPeriod.NewInvoiceStream.UnappliedFundID = UnappliedFunds.first()?.PublicID
    }
  }
}