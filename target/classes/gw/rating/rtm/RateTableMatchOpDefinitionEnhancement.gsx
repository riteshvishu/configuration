package gw.rating.rtm

uses gw.rating.rtm.matchop.MatchOperation
uses gw.rating.rtm.matchop.MatchOperationFactory
uses gw.rating.rtm.query.RateQueryParam
uses gw.rating.rtm.validation.MatchOpValidator
uses java.util.Set
uses gw.systables.verifier.RateTableMatchOpDefinitionVerifier
uses java.util.HashSet

enhancement RateTableMatchOpDefinitionEnhancement : entity.RateTableMatchOpDefinition {
  
  function matchOperation(matchOp : RateTableMatchOp, param : RateQueryParam) : MatchOperation {
    var factory = MatchOperationFactory.getFactoryByName(this.ImplClass)
    return factory.createMatchOperation(matchOp, param)
  }

  property get AllowedParameterTypeSet(): Set<RateTableDataType>{
    var dataTypeString = this.AllowedParameterTypes
    var temptypelist = dataTypeString.split(RateTableMatchOpDefinitionVerifier.DELIMITER).toList()
    var typeList = new HashSet<RateTableDataType>()
    temptypelist.each(\ code -> {
      var dataType = RateTableDataType.get(code.trim())
      typeList.add(dataType)
    })
    return typeList
  }
  
  function validator() : MatchOpValidator {
    var factory = MatchOperationFactory.getFactoryByName(this.ImplClass)
    return factory.createValidator()
  }

  function isEqual(other : RateTableMatchOpDefinition) : boolean {
    return (this.OpCode == other.OpCode) and
           (this.OpName == other.OpName) and
           (this.ImplClass == other.ImplClass) 
  }
}
