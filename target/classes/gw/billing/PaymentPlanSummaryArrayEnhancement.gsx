package gw.billing
uses gw.api.productmodel.SeriesAuditSchedulePattern
uses java.util.ArrayList

enhancement PaymentPlanSummaryArrayEnhancement : PaymentPlanSummary[]
{
  property get InstallmentPlans() : PaymentPlanSummary[] {
    return this.where( \ p -> p.PaymentCode == null )
  }

  property get ReportingPlans() : ReportingPlan[] {
    var allPCReportPatterns = SeriesAuditSchedulePattern.getAll()
    var plans = new ArrayList<ReportingPlan>()
    allPCReportPatterns.each(\ a -> {
      if (a.PaymentPlanCode != null) {
        var matchedPaymentPlanSummary = this.firstWhere(\ p -> a.PaymentPlanCode == p.PaymentCode)
        if (matchedPaymentPlanSummary != null){
          plans.add(new ReportingPlan(a, matchedPaymentPlanSummary))
        }
      }
    })
    return plans.toTypedArray()
  }
  
  function getById(id : String) : PaymentPlanSummary{
    return this.firstWhere( \ p -> p.BillingId == id )
  }
}
