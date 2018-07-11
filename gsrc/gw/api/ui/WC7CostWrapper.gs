package gw.api.ui

uses gw.pl.currency.MonetaryAmount
uses java.lang.Integer

/**
 * A wrapper class to help with UI presentation of a {@link WC7Cost}
 * 
 * @see entity.WC7Cost
 * @see CostWrapper
 */
class WC7CostWrapper extends CostWrapper {

  construct(_cost : Cost) {
    super((_cost as WC7Cost).CalcOrder, _cost.DisplayName, null, null)
    Cost = _cost
  }
  
  construct(_order : double, _description : String, aTotal : MonetaryAmount, _bold : boolean) {
    super(_order, _description, aTotal, _bold )
  }
  
  override property get Mode() : String {
    return Cost == null ? "total" : "WC7"
  }

  override property get LocNumber() : Integer {
    return (Cost typeis WC7Cost) ? Cost.LocationNum : null
  }
  
  override property get Visible() : boolean {
    if(Cost == null){
      return true
    } 
    return not Cost.ActualAmount.IsZero 
      or Cost.Basis.IsZero // adj converted rate != 0
      or (Cost typeis WC7JurisdictionCost and Cost.JurisdictionCostType == typekey.WC7JurisdictionCostType.TC_EXPMOD) 
  }
  
}