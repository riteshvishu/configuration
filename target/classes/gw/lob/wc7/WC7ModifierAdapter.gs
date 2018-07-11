package gw.lob.wc7
uses gw.api.domain.ModifierAdapter

@Export
class WC7ModifierAdapter implements ModifierAdapter
{
  var _owner : WC7Modifier
  
  construct(modifier : WC7Modifier) {
    _owner = modifier
  }
  
  override property get OwningModifiable() : Modifiable {
    return _owner.WC7Jurisdiction
  }
  
  override property get RateFactors() : RateFactor[] {
    return _owner.WC7RateFactors
  }

  override function addToRateFactors(element : RateFactor) {
    _owner.addToWC7RateFactors(element as WC7RateFactor)
  }

  override function removeFromRateFactors(element : RateFactor) {
    _owner.removeFromWC7RateFactors(element as WC7RateFactor)
  }

  override function createRawRateFactor() : RateFactor {
    return new WC7RateFactor(_owner.WC7Jurisdiction.Branch)
  }
}
