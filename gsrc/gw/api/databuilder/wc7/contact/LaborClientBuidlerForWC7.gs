package gw.api.databuilder.wc7.contact

uses gw.api.builder.AccountContactRoleBuilder
uses gw.api.builder.CompanyBuilder

/**
 * gw.api.databuilder.LaborClient doesn't specify that it creates a Company instead of a Person... 
 * so this class does the same thing, but backs it with a company
 */
class LaborClientBuidlerForWC7 extends  AccountContactRoleBuilder<LaborClient, LaborClientBuidlerForWC7> {

//  public LaborClientBuilder() {
//    this(0);
//  }
//
//  public LaborClientBuilder(int _code) {
//    super(LaborClient.TYPE.get(), _code);
//
//    withContact(new CompanyBuilder(_code));
//  }

  construct(){
    super(entity.LaborClient)
  }
  
  
}
