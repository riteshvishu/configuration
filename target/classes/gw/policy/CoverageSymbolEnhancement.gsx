package gw.policy
uses gw.api.productmodel.CoverageSymbolPattern

enhancement CoverageSymbolEnhancement : entity.CoverageSymbol {
  
  property get CoverageSymbol() : CoverageSymbolPattern {
    return CoverageSymbolPattern.getByCode(this.PatternCode)
  }
  
  function getCoverageSymbolDiffDisplay() : String {
    var symbol =  CoverageSymbolPattern.getByCode(this.PatternCode)
    var groupName = symbol.CoverageSymbolGroupPattern.Name
    var symbolTypeDesc = symbol.CoverageSymbolType.Description
    return displaykey.Web.Differences.LOB.Common.CoverageSymbol(symbolTypeDesc, groupName)
  }
}
