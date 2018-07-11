package gw.lob.common.schedules.impl

uses com.guidewire.commons.config.APIConfigFileAccess
uses gw.api.productmodel.Schedule
uses gw.api.productmodel.SchedulePropertyInfo
uses gw.api.productmodel.SchedulePropertyValueProvider
uses gw.lob.common.schedules.ScheduleConfigSource
uses gw.lob.common.schedules.schemas.schedule_config.Clause
uses gw.lob.common.schedules.schemas.schedule_config.ScheduleConfig
uses gw.api.productmodel.SchedulePropertyValueProvider
uses java.util.Map
uses gw.lob.common.schedules.schemas.schedule_config.Clause
uses gw.api.productmodel.Schedule
uses java.util.LinkedHashMap

uses java.util.LinkedHashMap
uses java.util.Map

class ScheduleConfigXMLSource implements ScheduleConfigSource {

  var _scheduleConfigFileName : String
  
  var _propInfoProvider = new ScheduleConfigXMLInfoProvider()
  
  /*
   * a map of clause pattern (or owner relative name) to its schedule property infos,
   * which are, in turn, mapped by their name (as defined in the config XML file)
   */
  var _schedulePropertyInfos : Map<String, LinkedHashMap<String, SchedulePropertyInfo>> = {}

  construct() {
    this("config/resources/schedule-config.xml")
  }
  
  construct(scheduleConfigFileName : String) {
    _scheduleConfigFileName = scheduleConfigFileName
    initSchedulePropertyInfos()    
  }

  private function initSchedulePropertyInfos() {
    var scheduleConfig =  getScheduleConfig()    
    for (clause in scheduleConfig.Clause) {      
      initSchedulePropertyInfosForClause(clause)
    }
  }
  
  private function getScheduleConfig() : ScheduleConfig {
    var scheduleConfigFile = APIConfigFileAccess.INSTANCE.getConfigFile(_scheduleConfigFileName)
    if (scheduleConfigFile == null or not scheduleConfigFile.exists()) {
      throw "could not find ${_scheduleConfigFileName}"
    }    
    return ScheduleConfig.parse(scheduleConfigFile) 
  }
  
  private function initSchedulePropertyInfosForClause(clause : Clause) {
    var clauseSchedPropertyInfos = new LinkedHashMap<String, SchedulePropertyInfo>()
    clause.PropertyInfos.orderBy(\ p -> p.Priority).each(\ p -> {    
      clauseSchedPropertyInfos.put(p.Name, _propInfoProvider.newSchedulePropertyInfo(p))  
    })    
    _schedulePropertyInfos.put(clause.Pattern, clauseSchedPropertyInfos)
  }

  override function getPropertyInfos<T extends Schedule>(owner : T) : SchedulePropertyInfo[] {       
    var clauseSchedPropertyInfos = _schedulePropertyInfos.get((typeof owner).RelativeName)
    if (clauseSchedPropertyInfos == null) {
      throw "no schedule properties defined for ${(typeof owner).RelativeName}"
    }
    /* 
     * this returns a new array of the property infos;
     * the property infos themselves are immutable, making them safe to export   
     */
    return clauseSchedPropertyInfos
      .Values
      .map(\ info -> {
        if (ProxyScheduleForeignKeyPropertyInfo.Type.isAssignableFrom(typeof info)) {
          return (info as ProxyScheduleForeignKeyPropertyInfo).toSchedulePropertyInfo(owner)
        }
        return info 
      })
      .toTypedArray()
  }
  
  override function getScheduledItemValueProvider<V>(name : String, 
    item : ScheduledItem) : SchedulePropertyValueProvider<V> {
    
    var provider : SchedulePropertyValueProvider<V> = null  
    var clausePattern = (typeof item.ScheduleParent).RelativeName
    var clauseSchedPropertyInfos = _schedulePropertyInfos.get(clausePattern)
    if (clauseSchedPropertyInfos <> null) {
      var schedPropertyInfo = clauseSchedPropertyInfos.get(name)
      if (schedPropertyInfo <> null) {
        
        var propInfo = schedPropertyInfo.PropertyInfo
        if (ProxyScheduleForeignKeyPropertyInfo.Type
              .isAssignableFrom(typeof schedPropertyInfo)) {
          propInfo = (schedPropertyInfo as ProxyScheduleForeignKeyPropertyInfo)
                       .getPropertyInfo(item.ScheduleParent)
        }
        provider = new SchedulePropertyValueProvider<V>(item, propInfo)
      }
    }
    
    if (provider == null) {
      throw "could not find schedule info property with " + 
        "name ${name} for owner ${typeof item.ScheduleParent}"  
    }
    return provider
  }
}
