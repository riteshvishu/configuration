package gw.api.databuilder.wc7
uses gw.api.builder.PolicyConditionBuilder
uses gw.api.builder.ExclusionBuilder

class WC7LineScheduleExclBuilder extends ExclusionBuilder {

  construct() {
    super(WC7LineScheduleExcl)
  }
  
  function withScheduledItem(item: WC7LineScheduleExclItemBuilder) : WC7LineScheduleExclBuilder {
    addAdditiveArrayElement(WC7LineScheduleExcl.Type.TypeInfo.getProperty("WC7LineScheduleExclItems"), item)
    return this
  }
}
