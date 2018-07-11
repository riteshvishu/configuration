package gw.lob.wc7

uses gw.coverage.CoverageAdapterBase
uses gw.api.reinsurance.ReinsurableCoverable

@Export
class WC7WorkersCompCovCoverageAdapter extends CoverageAdapterBase
{
  var _owner : WC7WorkersCompCov  
  
  construct(owner : WC7WorkersCompCov)
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

  override function addToCoverageArray( p0: Coverage ) : void
  {
    _owner.WCLine.addToWC7LineCoverages( p0 as WC7WorkersCompCov )
  }

  override function removeFromParent() : void
  {
    _owner.WCLine.removeFromWC7LineCoverages( _owner )
  }

  override property get ReinsurableCoverable() : ReinsurableCoverable {
    return typeSafeReinsurableCoverable(_owner.BranchValue)
  }
}
