package gw.productmodel
uses gw.api.database.Query
uses gw.api.productmodel.PolicyLinePattern

enhancement PolicyLinePatternEnhancement : gw.api.productmodel.PolicyLinePattern {

  /** 
   *  Returns all the FormPatterns associated with this policy line
   */ 
  property get FormPatterns() : List<FormPattern> {
    var q = Query.make(FormPattern)
    q.compare("PolicyLinePatternCode", Equals, this.Code)
    return q.select().toList()
  }

  //Ordering used by coverable adapters when determining currency to use when default is not in available currencies
  property get AvailableCurrenciesByPriority() : List<Currency> {
    return this.AvailableCoverageCurrencies*.Currency.orderBy(\ elt -> elt.Priority)
  }

  static function DisplayNameForCode(code : String) : String {
    return PolicyLinePattern.getByCode(code).DisplayName
  }
}
