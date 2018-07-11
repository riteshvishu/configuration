package gw.api.databuilder.wc7

uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.BuilderContext
uses java.util.Date

class WC7LineScheduleCondItemBuilder extends DataBuilder<WC7LineScheduleCondItem, WC7LineScheduleCondItemBuilder> {

  construct() {
    super(WC7LineScheduleCondItem)
  }
  
  protected override function createBean(context : BuilderContext) : WC7LineScheduleCondItem{
    var cov = context.ParentBean as WC7LineScheduleCond
    var scheduledItem = new WC7LineScheduleCondItem(cov.Branch)
    cov.addToWC7LineScheduleCondItems(scheduledItem)
    return scheduledItem
  }

  function withString1(string1: String) : WC7LineScheduleCondItemBuilder {
    set(WC7LineScheduleCondItem.Type.TypeInfo.getProperty("StringCol1"), string1)
    return this
  }
  
  function withTypeKey1(typeKeyCol1: String) : WC7LineScheduleCondItemBuilder {
    set(WC7LineScheduleCondItem.Type.TypeInfo.getProperty("TypeKeyCol1"), typeKeyCol1)
    return this
  }
  
  function withDate1(date1: Date) : WC7LineScheduleCondItemBuilder {
    set(WC7LineScheduleCondItem.Type.TypeInfo.getProperty("DateCol1"), date1)
    return this
  }
  
  function withInt1(int1: int) : WC7LineScheduleCondItemBuilder {
    set(WC7LineScheduleCondItem.Type.TypeInfo.getProperty("IntCol1"), int1)
    return this
  }
  
  function withInt2(int2: int) : WC7LineScheduleCondItemBuilder {
    set(WC7LineScheduleCondItem.Type.TypeInfo.getProperty("IntCol2"), int2)
    return this
  }

}
