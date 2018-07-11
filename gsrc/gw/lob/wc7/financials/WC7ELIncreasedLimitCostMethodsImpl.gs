package gw.lob.wc7.financials

/**
 * Methods to implement {@link WC7CostMethods} for {@link WC7ELIncreasedLimitCost}
 */
@Export
class WC7ELIncreasedLimitCostMethodsImpl extends WC7GenericWC7CostMethodsImpl<WC7ELIncreasedLimitCost>{

  construct(owner : WC7ELIncreasedLimitCost) {
    super(owner)
  }

  override property get JurisdictionState() : Jurisdiction {
    return Cost.Jurisdiction
  }
  
  override property get ClassCode() : String {
    return Cost.StatCode
  }
  
  override property get Description() : String {
    return Cost.WC7ELIncreasedLimitCostType.DisplayName
  }
  
}
