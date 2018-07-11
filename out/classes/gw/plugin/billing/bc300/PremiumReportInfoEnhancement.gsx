package gw.plugin.billing.bc300
uses java.math.BigDecimal

@Export
enhancement PremiumReportInfoEnhancement : soap.BCBillingSystemAPI.entity.PremiumReportInfo
{
  function sync(period : PolicyPeriod){
    this.syncBasicPolicyInfo(period)
    var auditInfo = period.Audit.AuditInformation
    this.AuditPeriodEndDate = auditInfo.AuditPeriodEndDate.toCalendar()
    this.AuditPeriodStartDate = auditInfo.AuditPeriodStartDate.toCalendar()
    var paymentReceived = period.Audit.PaymentReceived
    this.PaymentReceived = paymentReceived != null 
      and paymentReceived.Amount.compareTo( BigDecimal.ZERO ) > 0
  }
}
