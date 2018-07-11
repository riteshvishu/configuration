package gw.lob.wc7
uses gw.coverage.ConditionAdapterBase

@Export
class WC7WorkersCompensationCondConditionAdapter extends ConditionAdapterBase {
  var _owner : WC7WorkersCompCond
  
  construct(owner : WC7WorkersCompCond)
  {
    super(owner)
    _owner = owner
  }

  override property get CoverageState() : Jurisdiction
  {
    return(_owner.WCLine.BaseState)
  }

  override property get PolicyLine() : PolicyLine
  {
    return(_owner.WCLine)
  }

  override property get OwningCoverable() : Coverable
  {
    return(_owner.WCLine)
  }

  override function addToConditionArray( condition: PolicyCondition ) : void
  {
     _owner.WCLine.addToWC7LineConditions( condition as WC7WorkersCompCond ) 
  }

  override function removeFromParent() : void
  {
    _owner.WCLine.removeConditionFromCoverable( _owner )
  }

}
