package gw.plugin.job.impl
uses gw.plugin.job.IAuditSchedulePatternSelectorPlugin
uses gw.api.productmodel.AuditSchedulePattern


@Export
class AuditSchedulePatternSelectorPlugin implements IAuditSchedulePatternSelectorPlugin {
  
  construct() {
  }

  override function selectFinalAuditCancellationSchedulePattern(period : PolicyPeriod ) : AuditSchedulePattern {
    return AuditSchedulePattern.getAll().firstWhere(\ f -> f.Code == "CancellationPhone")
  }

  override function selectFinalAuditExpirationSchedulePattern(period : PolicyPeriod ) : AuditSchedulePattern {
    return AuditSchedulePattern.getAll().firstWhere(\ f -> f.Code == "ExpirationPhysical")
  }

}
