package gw.lob.wc7.financials

/**
 * An implementation of {@link WC7CostMethods} for {@link WC7JurisdictionCost}.
 * The linked {@link WC7Jurisdiction} associated with the cost is used to provide most of the values.
 */
@Export
class WC7JurisdictionCostMethodsImpl extends WC7GenericWC7CostMethodsImpl<WC7JurisdictionCost>{
  construct( owner : WC7JurisdictionCost ) {
    super( owner )
  }

  override property get JurisdictionState() : Jurisdiction {
    return Cost.WC7Jurisdiction.Jurisdiction
  }

  override property get ClassCode() : String {
    return Cost.StatCode
  }

  override property get Description() : String {
    return Cost.JurisdictionCostType.DisplayName
  }

  override property get RatesOverridable() : boolean {
    return _owner.Overridable and
        _owner.JurisdictionCostType != WC7JurisdictionCostType.TC_EXPENSECONST and
        _owner.JurisdictionCostType != WC7JurisdictionCostType.TC_PREMDIS and
        _owner.JurisdictionCostType != WC7JurisdictionCostType.TC_MINPREM and
        _owner.JurisdictionCostType != WC7JurisdictionCostType.TC_MINPREMFELAMARITIME
  }
}
