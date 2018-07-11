package gw.api.databuilder.wc7

uses gw.api.builder.PolicyConditionBuilder

class WC7LineScheduleCondBuilder extends PolicyConditionBuilder {

  construct() {
    super(WC7LineScheduleCond)
  }
  
  function withScheduledItem(item: WC7LineScheduleCondItemBuilder) : WC7LineScheduleCondBuilder {
    addAdditiveArrayElement(WC7LineScheduleCond.Type.TypeInfo.getProperty("WC7LineScheduleCondItems"), item)
    return this
  }

}
