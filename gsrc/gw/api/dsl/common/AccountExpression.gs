package gw.api.dsl.common

uses gw.api.builder.AccountBuilder

class AccountExpression extends DataBuilderExpression<AccountBuilder> {

  internal construct() {
    super(new AccountBuilder())
  }
  
  function with(accLoc : AccountLocationExpression) : AccountExpression {
    _builder.withAccountLocation(accLoc.DataBuilder)
    return this
  }
  
  function withPrimaryLocation(primaryLoc : AccountLocationExpression) : AccountExpression {
    _builder.withPrimaryLocation(primaryLoc.DataBuilder)
    return this
  }
}
