package gw.datatype.persistence

uses com.guidewire.pl.metadata.datatype2.persistence.FieldValidatorBasedVarcharPersistenceHandler
uses java.lang.Boolean
uses gw.entity.IEntityPropertyInfo
uses gw.pl.persistence.core.Bean
uses gw.api.util.PhoneUtil
uses gw.lang.reflect.TypeSystem
uses gw.lang.reflect.ReflectUtil

@Export
class PhoneDataTypePersistenceHandler extends FieldValidatorBasedVarcharPersistenceHandler {

  construct(dataTypeName: String, encrypt: Boolean, trimWhitespace: Boolean, lingustic: Boolean){
    super(dataTypeName,encrypt,trimWhitespace, lingustic)


  }

  override function applicationToBean(ctx: gw.pl.persistence.core.Bean, prop : IEntityPropertyInfo, applicationValue: Object) : Object{
    return PhoneUtil.normalize(applicationValue)
  }


}