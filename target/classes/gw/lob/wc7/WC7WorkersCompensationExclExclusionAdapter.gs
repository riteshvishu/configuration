package gw.lob.wc7
uses gw.coverage.ExclusionAdapterBase

@Export
class WC7WorkersCompensationExclExclusionAdapter extends ExclusionAdapterBase {
  var _owner : WC7WorkersCompExcl
  
  construct(owner : WC7WorkersCompExcl) {
    super(owner)
    _owner = owner
  }

  override property get CoverageState() : Jurisdiction {
    return(_owner.WCLine.BaseState)
  }

  override property get PolicyLine() : PolicyLine {
    return(_owner.WCLine)
  }

  override property get OwningCoverable() : Coverable {
    return(_owner.WCLine)
  }

  override function addToExclusionArray( excl: Exclusion ) : void {
     _owner.WCLine.addToWC7LineExclusions( excl as WC7WorkersCompExcl ) 
  }

  override function removeFromParent() : void {
    _owner.WCLine.removeExclusionFromCoverable( _owner )
  }

}
