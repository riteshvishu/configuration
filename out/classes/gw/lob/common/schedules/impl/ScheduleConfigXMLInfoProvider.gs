package gw.lob.common.schedules.impl

uses gw.api.productmodel.SchedulePropertyInfo
uses gw.lob.common.schedules.schemas.schedule_config.types.complex.PropertyInfoType
uses gw.lob.common.schedules.schemas.schedule_config.types.complex.AutoNumberPropertyInfoType
uses gw.lob.common.schedules.schemas.schedule_config.types.complex.StringPropertyInfoType
uses gw.lob.common.schedules.schemas.schedule_config.types.complex.BooleanPropertyInfoType
uses gw.lob.common.schedules.schemas.schedule_config.types.complex.IntegerPropertyInfoType
uses gw.lob.common.schedules.schemas.schedule_config.types.complex.DatePropertyInfoType
uses gw.lob.common.schedules.schemas.schedule_config.types.complex.TypeKeyPropertyInfoType
uses gw.lob.common.schedules.schemas.schedule_config.types.complex.ForeignKeyPropertyInfoType
uses gw.lob.common.schedules.schemas.schedule_config.types.complex.PolicyLocationPropertyInfoType
uses gw.lob.common.schedules.schemas.schedule_config.types.complex.NamedInsuredPropertyInfoType
uses gw.api.productmodel.ScheduleAutoNumberPropertyInfo
uses gw.api.productmodel.ScheduleStringPropertyInfo
uses gw.api.productmodel.ScheduleBooleanPropertyInfo
uses gw.api.productmodel.ScheduleIntegerPropertyInfo
uses gw.api.productmodel.ScheduleDatePropertyInfo
uses gw.api.productmodel.ScheduleTypeKeyPropertyInfo
uses gw.lang.reflect.TypeSystem
uses gw.lang.reflect.IType
uses gw.entity.ITypeFilter

class ScheduleConfigXMLInfoProvider {

  construct() {}

  function newSchedulePropertyInfo(p : PropertyInfoType) : SchedulePropertyInfo {
    switch (typeof p) {
      case AutoNumberPropertyInfoType :        
        return newScheduleAutoNumberPropertyInfo(p)
      case StringPropertyInfoType :
        return newScheduleStringPropertyInfo(p)
      case BooleanPropertyInfoType :
        return newScheduleBooleanPropertyInfo(p)
      case IntegerPropertyInfoType :
        return newScheduleIntegerPropertyInfo(p)
      case DatePropertyInfoType :
        return newScheduleDatePropertyInfo(p)
      case TypeKeyPropertyInfoType :
        return newScheduleTypeKeyPropertyInfo(p)
      case ForeignKeyPropertyInfoType :
        return newScheduleForeignKeyProxyPropertyInfo(p)
      case PolicyLocationPropertyInfoType :
        return newSchedulePolicyLocationProxyPropertyInfo(p)
      case NamedInsuredPropertyInfoType :
        return newScheduleNamedInsuredProxyPropertyInfo(p)
      default:
        throw "unknown SchedulePropertyInfo type ${typeof p}"   
    }
  }
  
  private function newScheduleAutoNumberPropertyInfo(propInfo : AutoNumberPropertyInfoType) 
    : ScheduleAutoNumberPropertyInfo {
    return new ScheduleAutoNumberPropertyInfo(propInfo.ColumnName, getLabel(propInfo), propInfo.Required)
  }
  
  private function newScheduleStringPropertyInfo(propInfo : StringPropertyInfoType) 
    : ScheduleStringPropertyInfo {    
    
    if (propInfo.ScheduledItemType <> null) {
      var schedItemType = getEntityTypeFromName(propInfo)
      return new ScheduleStringPropertyInfo(schedItemType, propInfo.ColumnName, getLabel(propInfo), propInfo.Required)
    }
    return new ScheduleStringPropertyInfo(propInfo.ColumnName, getLabel(propInfo), propInfo.Required)
  }
  
  private function newScheduleBooleanPropertyInfo(propInfo : BooleanPropertyInfoType) 
    : ScheduleBooleanPropertyInfo {
      
    if (propInfo.ScheduledItemType <> null) {
      var schedItemType = getEntityTypeFromName(propInfo)
      return new ScheduleBooleanPropertyInfo(schedItemType, propInfo.ColumnName, getLabel(propInfo), propInfo.Required)
    }
    return new ScheduleBooleanPropertyInfo(propInfo.ColumnName, getLabel(propInfo), propInfo.Required)
  }
  
  private function newScheduleIntegerPropertyInfo(propInfo : IntegerPropertyInfoType) 
    : ScheduleIntegerPropertyInfo {
    
    if (propInfo.ScheduledItemType <> null) {
      var schedItemType = getEntityTypeFromName(propInfo)
      return new ScheduleIntegerPropertyInfo(schedItemType, propInfo.ColumnName, getLabel(propInfo), propInfo.Required)
    }
    return new ScheduleIntegerPropertyInfo(propInfo.ColumnName, getLabel(propInfo), propInfo.Required)
  }
  
  private function newScheduleDatePropertyInfo(propInfo : DatePropertyInfoType) 
    : ScheduleDatePropertyInfo {
    
    if (propInfo.ScheduledItemType <> null) {
      var schedItemType = getEntityTypeFromName(propInfo)
      return new ScheduleDatePropertyInfo(schedItemType, propInfo.ColumnName, getLabel(propInfo), propInfo.Required)
    }
    return new ScheduleDatePropertyInfo(propInfo.ColumnName, getLabel(propInfo), propInfo.Required)
  }
  
  private function newScheduleTypeKeyPropertyInfo(propInfo : TypeKeyPropertyInfoType)
    : ScheduleTypeKeyPropertyInfo {
    
    var typeListName = propInfo.TypeList
    var typeList = TypeSystem.getByFullName("typekey.${typeListName}") as gw.entity.ITypeList
    var typeFilter : ITypeFilter = null
    if (propInfo.ScheduledItemType <> null) {
      var schedItemType = getEntityTypeFromName(propInfo)
      return new ScheduleTypeKeyPropertyInfo(schedItemType, propInfo.ColumnName, getLabel(propInfo), typeList, typeFilter, propInfo.Required)
    }
    if (propInfo.TypeFilter <> null) {
      typeFilter = typeList.TypeInfo.Properties.firstWhere(\ p -> p.Name == propInfo.TypeFilter).Accessor?.getValue(typeList) as ITypeFilter
    }
    return new ScheduleTypeKeyPropertyInfo(propInfo.ColumnName, getLabel(propInfo), typeList, typeFilter, propInfo.Required)
  }
  
  private function newScheduleForeignKeyProxyPropertyInfo(propInfo : ForeignKeyPropertyInfoType) : SchedulePropertyInfo {
    
    if (propInfo.ScheduledItemType <> null) {
      var schedItemType = getEntityTypeFromName(propInfo)
      return new ProxyScheduleForeignKeyPropertyInfo(schedItemType, propInfo.ColumnName, 
        getLabel(propInfo), propInfo.ValueRangeGetter, propInfo.Required)
    }
    return new ProxyScheduleForeignKeyPropertyInfo(propInfo.ColumnName, getLabel(propInfo), propInfo.ValueRangeGetter, propInfo.Required)
  }
  
  private function newSchedulePolicyLocationProxyPropertyInfo(propInfo : PolicyLocationPropertyInfoType) : SchedulePropertyInfo {
    var schedItemType = getEntityTypeFromName(propInfo)
    return new ProxySchedulePolicyLocationPropertyInfo(schedItemType, propInfo.ColumnName, 
        getLabel(propInfo), propInfo.ValueRangeGetter, propInfo.Required)
  }
  
  private function newScheduleNamedInsuredProxyPropertyInfo(propInfo : NamedInsuredPropertyInfoType) : SchedulePropertyInfo {
    return new ProxyScheduleNamedInsuredPropertyInfo(propInfo.ColumnName, 
        getLabel(propInfo), propInfo.ValueRangeGetter, propInfo.Required)
  }

  private function getEntityTypeFromName(propInfo : PropertyInfoType) : IType {
    return TypeSystem.getByFullName("entity.${propInfo.ScheduledItemType}")
  }
  
  private function getLabel(propInfo : PropertyInfoType) : String {
    var key = propInfo.ColumnLabel.replaceFirst("displaykey.", "")    
    return gw.api.domain.DisplayKey.getDisplayKeyValue(key)
  }
}
