package gw.lob.wc7
uses gw.api.domain.RateFactorAdapter

@Export
class WC7RateFactorAdapter implements RateFactorAdapter
{
  var _owner : WC7RateFactor
  
  construct(rateFactor : WC7RateFactor) {
    _owner = rateFactor
  }

  override property get Modifier() : Modifier {
    return _owner.WC7Modifier
  }
}
