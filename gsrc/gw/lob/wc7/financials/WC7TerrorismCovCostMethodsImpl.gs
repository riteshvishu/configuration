package gw.lob.wc7.financials

/**
 * Methods to implement {@link WC7CostMethods} for {@link WC7TerrorismCovCost}
 */
@Export
class WC7TerrorismCovCostMethodsImpl extends WC7GenericWC7CostMethodsImpl<WC7TerrorismCovCost>{

  construct(owner : WC7TerrorismCovCost) {
    super(owner)
  }

  override property get JurisdictionState() : Jurisdiction {
    return Cost.Jurisdiction
  }
  
  override property get ClassCode() : String {
    return Cost.StatCode
  }
  
  override property get Description() : String {
    return Cost.WC7WorkersCompCov.Pattern.DisplayName
  }
  
}