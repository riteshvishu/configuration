package gw.lob.common.dependency

uses java.util.List
uses gw.validation.PCValidationContext
uses java.util.Map
uses gw.lang.reflect.IPropertyInfo
uses java.util.HashMap

abstract class AbstractFieldDependency<T> implements FieldDependency {
  var _dependant : T as Dependant
  var _changeMap : Map<IPropertyInfo, Object> as readonly ChangeMap

  construct(entity : T) {
    _dependant = entity
  }

  final override function updateDependentFields() {
    updateDependentFields(null)
  }
  
  final override function updateDependentFields(initialChangeMap : Map<IPropertyInfo, Object>) {
    if(initialChangeMap == null){
      _changeMap = new HashMap<IPropertyInfo, Object>()
    }else{
      _changeMap = initialChangeMap
    }
    doUpdate()
    Children*.updateDependentFields(_changeMap)
  }

  final override function validateDependentFields(valContext : PCValidationContext) {
    if(_changeMap == null){
      _changeMap = new HashMap<IPropertyInfo, Object>()
    }
    doValidate(valContext)
    Children*.validateDependentFields(valContext)
  }
  
  abstract protected function doUpdate()
  abstract protected function doValidate(valContext : PCValidationContext)
  abstract protected property get Children() : List<FieldDependency>
}
