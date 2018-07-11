package gw.lob.wc7.financials

/**
 * Methods to implement {@link WC7CostMethods} for {@link WC7CovCost}
 */
@Export
class WC7CovCostMethodsImpl extends WC7GenericWC7CostMethodsImpl<WC7CovCost>{

  construct(owner : WC7CovCost) {
    super(owner)
  }

  override property get ClassCode() : String {
    return Cost.StatCode
  }
  
  override property get Description() : String {
    return Cost.WC7WorkersCompCov.Pattern.Description
  }
}
