package gw.lob.wc7

uses gw.api.domain.CoverableAdapter
uses java.util.Date
uses gw.policy.PolicyLineConfiguration

@Export
class WC7LineCoverableAdapter implements CoverableAdapter {
  var _owner : WC7WorkersCompLine
  
  construct(owner : WC7WorkersCompLine) {
    _owner = owner
  }

  override property get PolicyLine() : PolicyLine {
    return _owner
  }

  override property get PolicyLocations() : PolicyLocation[] {
    //assumption is that WC is never in a package
    return _owner.Branch.PolicyLocations
  }

  override property get State() : Jurisdiction{
    return _owner.BaseState
  }

  override property get AllCoverages() : Coverage[] {
    return _owner.WC7LineCoverages
  }

  override function addCoverage( p0: Coverage ) : void {
    _owner.addToWC7LineCoverages( p0 as WC7WorkersCompCov )
  }

  override function removeCoverage( p0: Coverage ) : void {
    _owner.removeFromWC7LineCoverages( p0 as WC7WorkersCompCov )
  }

  override property get AllExclusions() : Exclusion[] {
    return _owner.WC7LineExclusions
  }

  override function addExclusion( p0: Exclusion ) : void {
    _owner.addToWC7LineExclusions( p0 as WC7WorkersCompExcl )
  }

  override function removeExclusion( p0: Exclusion ) : void {
    _owner.removeFromWC7LineExclusions( p0 as WC7WorkersCompExcl )
  }

  override property get AllConditions() : PolicyCondition[] {
    return _owner.WC7LineConditions
  }

  override function addCondition( p0: PolicyCondition ) : void {
    _owner.addToWC7LineConditions( p0 as WC7WorkersCompCond )
  }

  override function removeCondition( p0: PolicyCondition ) : void {
    _owner.removeFromWC7LineConditions( p0 as WC7WorkersCompCond )
  }

  override property get ReferenceDateInternal() : Date {
    return _owner.ReferenceDateInternal
  }
  
  override property set ReferenceDateInternal( date : Date )  {
    _owner.ReferenceDateInternal = date
  }

  override property get DefaultCurrency() : Currency {
    return _owner.Branch.PreferredCoverageCurrency
  }

  override property get AllowedCurrencies() : List<Currency> {
    return PolicyLineConfiguration.get(InstalledPolicyLine.TC_WC7).AllowedCurrencies
  }
}
