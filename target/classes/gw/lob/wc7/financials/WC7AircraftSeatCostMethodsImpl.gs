package gw.lob.wc7.financials

/**
 * Methods to implement {@link WC7CostMethods} for {@link WC7AircraftSeatCost}
 */
@Export
class WC7AircraftSeatCostMethodsImpl extends WC7GenericWC7CostMethodsImpl<WC7AircraftSeatCost>{
  
  construct(owner : WC7AircraftSeatCost)  {
    super(owner)
  }
  
  override property get JurisdictionState() : Jurisdiction {
    return Cost.WC7AircraftSeat.Jurisdiction
  }

  override property get ClassCode() : String {
    return Cost.StatCode
  }

  override property get Description() : String {
    return Cost.JurisdictionCostType.DisplayName
  }

}
