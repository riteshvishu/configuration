package gw.plugin.billing.bc300

uses soap.BCBillingSystemAPI.entity.IssuePolicyInfo
uses gw.api.util.DateUtil
uses gw.plugin.job.IPolicyRenewalPlugin
uses gw.plugin.Plugins

@Export
enhancement IssuePolicyInfoEnhancement : IssuePolicyInfo
{
  function sync(period : PolicyPeriod) : IssuePolicyInfo{
    this.syncPolicyChange(period)
    this.AccountNumber = period.Policy.Account.AccountNumber
    this.AssignedRisk = period.AssignedRisk
    this.PaymentPlanPublicId = period.PaymentPlanID
    this.ProducerCodeOfRecordId = period.ProducerCodeOfRecord.PublicID
    this.ProductCode = period.Policy.ProductCode
    this.UWCompanyCode = period.UWCompany.Code.Code
    if (period.ModelDate != null)
      this.ModelDate = period.ModelDate.toCalendar()
    else
      this.ModelDate = DateUtil.currentDate().toCalendar()
    this.StateCode = period.BaseState.Code
    this.BillingMethodCode = period.BillingMethod.Code
    this.PeriodStart = period.PeriodStart.toCalendar()
    this.PeriodEnd = period.PeriodEnd.toCalendar()
    this.TermNumber = period.TermNumber
    var plugin = Plugins.get(IPolicyRenewalPlugin)
    if(plugin.isRenewalOffered(period)){
      this.OfferNumber = period.Job.JobNumber
    }
    return this
  }
}
