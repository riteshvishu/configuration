package gw.lob.common.datatypes

uses java.lang.Integer
uses gw.lang.reflect.IPropertyInfo
uses gw.datatype.def.IDataTypeDefValidationErrors
uses com.guidewire.pl.metadata.datatype2.impl.FieldValidatorBasedDataTypeDef

abstract class FieldValidatorBasedIntegerRangeDataTypeDef extends FieldValidatorBasedDataTypeDef {
  var _minimum : Integer as Minimum
  var _maximum : Integer as Maximum

  override function validate(prop : IPropertyInfo, errors : IDataTypeDefValidationErrors) {
    super.validate(prop, errors)
    if (_minimum == null || _maximum == null) {
      errors.addError("Range values cannot be null.")
    }
  }
}
