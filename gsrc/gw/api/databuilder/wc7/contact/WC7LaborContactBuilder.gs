package gw.api.databuilder.wc7.contact

uses gw.api.builder.PolicyContactRoleBuilder
uses gw.entity.IEntityType

abstract class WC7LaborContactBuilder<T extends WC7LaborContact, B extends WC7LaborContactBuilder<T,B>> extends PolicyContactRoleBuilder<T, B> {

  construct(type : IEntityType) {
    super(type)
  }
  
  function withDetail(detail : WC7LaborContactDetailBuilder) : B  {
    addArrayElement(WC7LaborContact.Type.TypeInfo.getProperty("WC7Details"), detail)
    return this as B
  }

}
