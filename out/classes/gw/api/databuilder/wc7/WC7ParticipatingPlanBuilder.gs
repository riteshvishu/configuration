package gw.api.databuilder.wc7

uses gw.api.databuilder.DataBuilder
uses java.math.BigDecimal

@Export
class WC7ParticipatingPlanBuilder extends DataBuilder<WC7ParticipatingPlan, WC7ParticipatingPlanBuilder> {

  construct() {
    super(WC7ParticipatingPlan)
    withPlanID("1ystd")
    withRetentionAmount(1)
    withLossConversionFactor(2)
  }
  
  final function withPlanID(id : WC7ParticipatingPlanID) : WC7ParticipatingPlanBuilder {
    set(WC7ParticipatingPlan.Type.TypeInfo.getProperty("PlanID"), id)
    return this
  }

  final function withRetentionAmount(amount : BigDecimal) : WC7ParticipatingPlanBuilder {
    set(WC7ParticipatingPlan.Type.TypeInfo.getProperty("Retention"), amount)
    return this
  }    
  
  final function withLossConversionFactor(factor : BigDecimal) : WC7ParticipatingPlanBuilder {
    set(WC7ParticipatingPlan.Type.TypeInfo.getProperty("LossConversionFactor"), factor)
    return this
  }  
}
