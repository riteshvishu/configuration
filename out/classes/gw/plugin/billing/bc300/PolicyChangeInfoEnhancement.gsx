package gw.plugin.billing.bc300
uses soap.BCBillingSystemAPI.entity.PCContactInfo

@Export
enhancement PolicyChangeInfoEnhancement : soap.BCBillingSystemAPI.entity.PolicyChangeInfo
{
  function syncPolicyChange(period : PolicyPeriod){
    this.syncBasicPolicyInfo( period )
    this.Description = period.PolicyChange.Description
    this.StateCode = period.BaseState.Code
    this.PeriodStart = period.PeriodStart.toCalendar()
    this.PeriodEnd = period.PeriodEnd.toCalendar()
    var PCContactInfo = new PCContactInfo()
    PCContactInfo.sync( period.PrimaryNamedInsured.AccountContactRole.AccountContact.Contact )
    this.PrimaryNamedInsuredContact = PCContactInfo
  }
}
