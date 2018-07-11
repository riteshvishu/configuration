package gw.lob.wc7
uses gw.api.domain.CoverableAdapter
uses java.lang.UnsupportedOperationException
uses java.util.Date
uses gw.api.util.StateJurisdictionMappingUtil
uses gw.policy.PolicyLineConfiguration

@Export
class WC7JurisdictionCoverableAdapter implements CoverableAdapter {
  var _owner : WC7Jurisdiction
  
  construct(owner : WC7Jurisdiction) {
    _owner = owner
  }

  override property get PolicyLine() : PolicyLine {
    return _owner.WCLine
  }

  override property get PolicyLocations() : PolicyLocation[] {
    return _owner.Branch.PolicyLocations.where(\ p -> p.State == StateJurisdictionMappingUtil.getStateMappingForJurisdiction(_owner.Jurisdiction ))
  }

  override property get State() : Jurisdiction {
    return _owner.Jurisdiction
  }

  override property get AllCoverages() : Coverage[] {
    return _owner.Coverages
  }

  override function addCoverage( p0: Coverage ) : void {
    _owner.addToCoverages(p0 as WC7JurisdictionCov)
  }

  override function removeCoverage( p0: Coverage ) : void {
    _owner.removeFromCoverages(p0 as WC7JurisdictionCov)    
  }

  override property get AllExclusions() : Exclusion[] {
    return new Exclusion[0]
  }

  override function addExclusion( p0: Exclusion ) : void {
    throw new UnsupportedOperationException(displaykey.CoverableAdapter.Error.ExclusionsNotImplemented)
  }

  override function removeExclusion( p0: Exclusion ) : void {
    throw new UnsupportedOperationException(displaykey.CoverableAdapter.Error.ExclusionsNotImplemented)
  }

  override property get AllConditions() : PolicyCondition[] {
    return new PolicyCondition[0]
  }

  override function addCondition( p0: PolicyCondition ) : void {
    throw new UnsupportedOperationException(displaykey.CoverableAdapter.Error.ConditionsNotImplemented)
  }

  override function removeCondition( p0: PolicyCondition ) : void {
    throw new UnsupportedOperationException(displaykey.CoverableAdapter.Error.ConditionsNotImplemented)
  }

  override property get ReferenceDateInternal() : Date {
    return _owner.ReferenceDate
  }
  
  override property set ReferenceDateInternal( date : Date )  {
    _owner.ReferenceDate = date
  }
  
  override property get DefaultCurrency() : Currency {
    return _owner.WCLine.PreferredCoverageCurrency
  }

  override property get AllowedCurrencies() : List<Currency> {
    return PolicyLineConfiguration.get(InstalledPolicyLine.TC_WC7).AllowedCurrencies
  }
}
