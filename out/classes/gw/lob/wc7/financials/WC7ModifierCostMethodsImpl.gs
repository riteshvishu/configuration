package gw.lob.wc7.financials

/**
 * An implementation of {@link WC7CostMethods} for {@link WC7ModifierCost}.
 * The linked {@link WC7Modifier} associated with the cost is used to provide modifier specific values.
 */
@Export
class WC7ModifierCostMethodsImpl extends WC7GenericWC7CostMethodsImpl<WC7ModifierCost> {

  construct(owner : WC7ModifierCost) {
    super(owner)
  }

  override property get JurisdictionState() : Jurisdiction {
    return Cost.WC7Jurisdiction.Jurisdiction
  }

  override property get Description() : String {
    return Cost.JurisdictionCostType.DisplayName
  }
  
}