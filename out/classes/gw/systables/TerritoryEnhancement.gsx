package gw.systables

enhancement TerritoryEnhancement : entity.Territory {
  property get State() : Jurisdiction {
    return this.DBTerritory.State
  }
  
  property get County() : String {
    return this.DBTerritory.County
  }
  
  property get City() : String {
    return this.DBTerritory.City
  }
  
  property get PostalCode() : String {
    return this.DBTerritory.PostalCode
  }
  
  property get Description() : String {
    return this.DBTerritory.Description
  }
  
  property get Code() : String {
    return this.DBTerritory.Code
  }
  
  property get PolicyLinePattern() : gw.api.productmodel.PolicyLinePattern {
    return gw.api.productmodel.PolicyLinePattern.getByCode(this.DBTerritory.PolicyLinePatternCode)
  }
}
