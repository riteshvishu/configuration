package gw.lob.wc7.rating
uses java.util.Date
uses gw.api.effdate.EffDatedUtil
uses entity.windowed.WC7AircraftSeatVersionList

class WC7AircraftSeatCostData extends WC7JurisdictionCostData<WC7AircraftSeatCost> {

  private var _aircraftSeatID : Key as readonly AircraftSeatID
  
  construct(effDate : Date, expDate : Date, aJurisdiction : WC7Jurisdiction , airseatID : Key, c : Currency) {
    super(effDate, expDate, aJurisdiction.FixedId, aJurisdiction.Jurisdiction, getRatingStepData(), c)
    _aircraftSeatID = airseatID
  }
  
  override function getVersionedCosts(line : WC7WorkersCompLine) : List<com.guidewire.commons.entity.effdate.EffDatedVersionList> {
    var expVL = EffDatedUtil.createVersionList( line.Branch, AircraftSeatID ) as WC7AircraftSeatVersionList
    return expVL.Costs
  }

  override property get KeyValues() : List<Object> {
    var costKeyValues = super.KeyValues
    costKeyValues.add(AircraftSeatID)
    return costKeyValues
  }

  private function setWC7AircraftSeat(cost : WC7AircraftSeatCost) {    
    cost.setFieldValue("WC7AircraftSeat", AircraftSeatID)
  }
  
  override function setSpecificFieldsOnCost(line : WC7WorkersCompLine, cost : WC7AircraftSeatCost) {
    super.setSpecificFieldsOnCost( line, cost )
    setWC7AircraftSeat(cost)
  }
  
  static private function getRatingStepData() : WC7RatingStepData {
    return new WC7RatingStepData(WC7JurisdictionCostType.TC_AIRCRAFTSEATSURCHARGE, RateAmountType.TC_STDPREMIUM, null, 202)
  }
  
  // We do not want to preserve the discount percent for Aircraft costs because they are balanced
  override property get PreserveOverrideDiscounts() : boolean {
    return false
  }
}
