package gw.lob.wc7.availability

uses gw.api.productmodel.ClausePattern
uses gw.entity.ITypeFilter
uses java.util.Set

class WC7StateFilterFactory {
    var _availability : WC7ClauseAvailability
    var _policyJurisdictions : Set<Jurisdiction>
    
    construct(availability : WC7ClauseAvailability, policyJurisdictions : Set<Jurisdiction>) {
      _availability = availability
      _policyJurisdictions = policyJurisdictions
    }
    
    function createFilterForClause(clausePattern : ClausePattern) : ITypeFilter<Jurisdiction> {
      return \ -> _policyJurisdictions.where(
          \ state -> _availability.includesClause(clausePattern, state))
    }
  }