package gw.lob.common.schedules

uses gw.api.productmodel.SchedulePropertyInfo
uses gw.api.productmodel.SchedulePropertyValueProvider
uses gw.api.productmodel.Schedule

interface ScheduleConfigSource {

  function getPropertyInfos<T extends Schedule>(owner : T) : SchedulePropertyInfo[]

  function getScheduledItemValueProvider<V>(name : String, item : ScheduledItem) : SchedulePropertyValueProvider<V>
}
