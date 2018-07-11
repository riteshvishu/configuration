package gw.api.databuilder.wc7
uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.BuilderContext

class WC7LineScheduleExclItemBuilder extends DataBuilder<WC7LineScheduleExclItem, WC7LineScheduleExclItemBuilder> {

  construct() {
    super(WC7LineScheduleExclItem)
  }
  
  protected override function createBean(context : BuilderContext) : WC7LineScheduleExclItem{
    var cov = context.ParentBean as WC7LineScheduleExcl
    var scheduledItem = new WC7LineScheduleExclItem(cov.Branch)
    cov.addToWC7LineScheduleExclItems(scheduledItem)
    return scheduledItem
  }

  function withString1(string1: String) : WC7LineScheduleExclItemBuilder {
    set(WC7LineScheduleExclItem.Type.TypeInfo.getProperty("StringCol1"), string1)
    return this
  }
  
  function withTypeKey1(typeKeyCol1: String) : WC7LineScheduleExclItemBuilder {
    set(WC7LineScheduleExclItem.Type.TypeInfo.getProperty("TypeKeyCol1"), typeKeyCol1)
    return this
  }
}
