package gw.lob.wc7
uses gw.api.domain.ModifiableAdapter
uses java.util.Date

@Export
class WC7JurisdictionModifiableAdapter implements ModifiableAdapter {
  var _owner : WC7Jurisdiction
  
  construct(owner : WC7Jurisdiction) {
    _owner = owner
  }

  override property get PolicyLine() : PolicyLine {
    return _owner.WCLine
  }

  override property get PolicyPeriod() : PolicyPeriod {
    return PolicyLine.Branch
  }

  override property get State() : Jurisdiction{
    return _owner.Jurisdiction
  }

  override property get AllModifiers() : Modifier[] {
    return _owner.WC7Modifiers
  }

  override function addToModifiers(element : Modifier) {
    _owner.addToWC7Modifiers(element as WC7Modifier)
  }

  override function removeFromModifiers(element : Modifier) {
    _owner.removeFromWC7Modifiers(element as WC7Modifier)
  }

  override function createRawModifier() : Modifier {
    return new WC7Modifier(_owner.Branch)
  }

  override function postUpdateModifiers() {
    _owner.splitModifiers()
  }

  override property get ReferenceDateInternal() : Date {
    return _owner.ReferenceDate
  }
  
  override property set ReferenceDateInternal(date : Date) {
    _owner.ReferenceDate = date
  }
}
