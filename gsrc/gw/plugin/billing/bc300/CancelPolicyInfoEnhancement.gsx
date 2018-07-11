package gw.plugin.billing.bc300

uses soap.BCBillingSystemAPI.entity.CancelPolicyInfo
uses soap.BCBillingSystemAPI.enums.CancellationType

@Export
enhancement CancelPolicyInfoEnhancement : CancelPolicyInfo
{
  function sync(period : PolicyPeriod){
    this.syncBasicPolicyInfo(period)
    this.CancellationType = CancellationType.fromCode(period.RefundCalcMethod.Code)
    this.CancellationReason = period.Cancellation.CancelReasonCode.Description
    
  }
}
