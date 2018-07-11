package gw.plugin.billing.bc300
uses soap.BCBillingSystemAPI.entity.BillingInstructionInfo
uses java.math.BigDecimal

@Export
enhancement BillingInstructionInfoEnhancement : BillingInstructionInfo
{
  function syncBasicPolicyInfo(period : PolicyPeriod){
    startSyncBasicPolicyInfo(period)
    this.ChargeInfos = ChargeInfoUtil.getChargeInfos( period )
  }
  
  function syncBasicPolicyInfoForPreview(period : PolicyPeriod){
    startSyncBasicPolicyInfo(period)
    this.ChargeInfos = ChargeInfoUtil.getInstallmentInfos( period )
  }
  
  private function startSyncBasicPolicyInfo(period : PolicyPeriod){
    this.TermNumber = period.TermNumber
    this.PolicyNumber = period.PolicyNumber
    this.EffectiveDate = period.EditEffectiveDate.toCalendar()
    this.Description = period.Job.Description
    this.DepositRequirement = calculateDeposit(period)
    this.HasScheduledFinalAudit = period.hasScheduledFinalAudit() or period.hasOpenFinalAudit()
  }
  
  private function calculateDeposit(period : PolicyPeriod) : BigDecimal{
    var job = period.Job
    if(job typeis Audit and job.AuditInformation.AuditScheduleType == TC_PREMIUMREPORT){
      return null
    }
    return period.PolicyTerm.DepositReleased ? BigDecimal.ZERO : period.PolicyTerm.DepositAmount.Amount
  }
}
