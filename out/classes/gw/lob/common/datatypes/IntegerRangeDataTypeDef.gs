package gw.lob.common.datatypes

uses gw.lob.common.datatypes.FieldValidatorBasedIntegerRangeDataTypeDef
uses java.lang.Integer
uses gw.datatype.handler.IDataTypeConstraintsHandler
uses gw.datatype.handler.IDataTypePresentationHandler
uses gw.datatype.handler.IDataTypePersistenceHandler
uses gw.datatype.handler.IDataTypeValueHandler
uses com.guidewire.pl.metadata.datatype2.constraints.FieldValidatorBasedIntegerConstraintsHandler
uses com.guidewire.pl.metadata.datatype2.presentation.FieldValidatorBasedPresentationHandler
uses gw.datatype.impl.SimplePersistenceHandler
uses gw.datatype.impl.SimpleValueHandler
uses gw.datatype.JdbcType
uses gw.api.util.Range

class IntegerRangeDataTypeDef extends FieldValidatorBasedIntegerRangeDataTypeDef {

  override property get ConstraintsHandler() : IDataTypeConstraintsHandler {
    return new FieldValidatorBasedIntegerConstraintsHandler(null, getValidator(), Range.closed(Minimum, Maximum))
  }

  override property get PersistenceHandler() : IDataTypePersistenceHandler {
    return new SimplePersistenceHandler(JdbcType.INTEGER)
  }

  override property get PresentationHandler() : IDataTypePresentationHandler {
    return new FieldValidatorBasedPresentationHandler(getValidator())
  }

  override property get ValueHandler() : IDataTypeValueHandler {
    return new SimpleValueHandler(Integer)
  }

}
