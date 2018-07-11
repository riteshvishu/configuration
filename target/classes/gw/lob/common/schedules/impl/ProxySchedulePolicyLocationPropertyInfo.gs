package gw.lob.common.schedules.impl

uses gw.lang.reflect.IType
uses gw.api.productmodel.Schedule
uses gw.api.productmodel.SchedulePropertyInfo
uses gw.api.productmodel.SchedulePolicyLocationPropertyInfo

class ProxySchedulePolicyLocationPropertyInfo extends ProxyScheduleForeignKeyPropertyInfo {

  construct(scheduledItemType : IType, colName : String, colLabel : String, 
    valRangeGetterClassName : String, isRequired : boolean) {

    super(scheduledItemType, colName, colLabel, valRangeGetterClassName, isRequired)
  }

  override function toSchedulePropertyInfo<T extends Schedule>(owner : T) : SchedulePropertyInfo {
    var valRangeGetter = newValueRangeGetterInstance(owner)    
    return new SchedulePolicyLocationPropertyInfo(ItemType, ColumnName, 
      ColumnLabel, valRangeGetter, Required)
  }
}
