package gw.lob.wc7

uses gw.coverage.CoverageAdapterBase
uses gw.api.reinsurance.ReinsurableCoverable

@Export
class WC7JurisdictionCovCoverageAdapter extends CoverageAdapterBase
{
  var _owner : WC7JurisdictionCov
  
  construct(owner : WC7JurisdictionCov)
  {
    super(owner)
    _owner = owner
  }

  override property get CoverageState() : Jurisdiction
  {
    return(_owner.WC7Jurisdiction.Jurisdiction)
  }

  override property get PolicyLine() : PolicyLine
  {
    return(_owner.WC7Jurisdiction.WCLine)
  }

  override property get OwningCoverable() : Coverable
  {
    return(_owner.WC7Jurisdiction)
  }

  override function addToCoverageArray( p0: Coverage ) : void
  {
    _owner.WC7Jurisdiction.addToCoverages( p0 as WC7JurisdictionCov )
  }

  override function removeFromParent() : void
  {
    _owner.WC7Jurisdiction.removeFromCoverages( _owner )
  }

  override property get ReinsurableCoverable() : ReinsurableCoverable {
    return typeSafeReinsurableCoverable(_owner.BranchValue)
  }
}
