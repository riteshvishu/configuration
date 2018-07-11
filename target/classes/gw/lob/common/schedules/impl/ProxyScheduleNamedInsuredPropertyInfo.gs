package gw.lob.common.schedules.impl

uses gw.api.productmodel.Schedule
uses gw.api.productmodel.SchedulePropertyInfo
uses gw.api.productmodel.ScheduleNamedInsuredPropertyInfo

class ProxyScheduleNamedInsuredPropertyInfo extends ProxyScheduleForeignKeyPropertyInfo {

  construct(colName : String, colLabel : String, 
    valRangeGetterClassName : String, isRequired : boolean) {

    super(colName, colLabel, valRangeGetterClassName, isRequired)
  }

  override function toSchedulePropertyInfo<T extends Schedule>(owner : T) : SchedulePropertyInfo {
    var valRangeGetter = newValueRangeGetterInstance(owner)    
    return new ScheduleNamedInsuredPropertyInfo(ColumnName, 
      ColumnLabel, valRangeGetter, Required)
  }
}
