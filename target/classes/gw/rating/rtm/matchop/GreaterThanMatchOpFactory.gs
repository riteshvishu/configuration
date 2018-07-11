package gw.rating.rtm.matchop
uses java.lang.Comparable
uses gw.rating.rtm.query.RateQueryParam
uses gw.rating.rtm.validation.NoOpValidator
uses gw.rating.rtm.validation.MatchOpValidator

class GreaterThanMatchOpFactory extends MatchOperationFactory<GreaterThanMatchOp> {

  override function createMatchOperation(matchOp : RateTableMatchOp, param : RateQueryParam<Comparable<Object>>) : GreaterThanMatchOp {
    return new GreaterThanMatchOp(matchOp, param)
  }

  override function createValidator() : MatchOpValidator {
    return NoOpValidator.Instance
  }
}
