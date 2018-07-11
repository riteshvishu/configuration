package gw.lob.common.dependency

uses gw.validation.PCValidationContext
uses java.util.Map
uses gw.lang.reflect.IPropertyInfo

interface FieldDependency {
  function updateDependentFields()
  function updateDependentFields(changeMap : Map<IPropertyInfo, Object>)
  function validateDependentFields(valContext : PCValidationContext)
}
