package gw.lob.wc7
uses gw.api.util.JurisdictionMappingUtil

enhancement WC7FedCoveredEmployeeEnhancement : WC7FedCoveredEmployee {

  property get ClassCodeShortDescription() : String {
    return (this.ClassCode != null) ? this.ClassCode.ShortDesc : null
  }

  property get ClassCodeBasisDescription() : String {
    return (this.ClassCode != null) ? this.ClassCode.Basis.Description : null
  }

  property set ClassCodeShortDescription(shortDesc : String) {
    var criteria = new WC7ClassCodeSearchCriteria()
    criteria.Code = this.ClassCode.Code
    criteria.ShortDesc = shortDesc
    var jurisdiction = gw.api.util.JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(this.LocationWM).Code
    criteria.Jurisdiction = jurisdiction
    criteria.EffectiveAsOfDate = this.Branch.WC7Line.getReferenceDateForCurrentJob(jurisdiction)
    criteria.ClassCodeType = WC7ClassCodeType.TC_FELA
    
    var result = criteria.performSearch()
    this.ClassCode = result.FirstResult
  }
}
