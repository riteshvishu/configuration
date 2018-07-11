package gw.lob.cp.rating

@Export
class CPBuildingCovBroadCostData extends CPBuildingCovCostData<CPBuildingCovBroadCost> {

  construct(effDate : DateTime, expDate : DateTime, covID : Key, stateArg : Jurisdiction) {
    super(effDate, expDate, covID, stateArg)
  }

  construct(effDate : DateTime, expDate : DateTime, c : Currency, covID : Key, stateArg : Jurisdiction) {
    super(effDate, expDate, c, covID, stateArg)
  }

  construct(cost : CPBuildingCovBroadCost) {
    super(cost)  
  }
  
  override function setSpecificFieldsOnCost(line : CommercialPropertyLine, cost : CPBuildingCovBroadCost) {
    super.setSpecificFieldsOnCost(line, cost)
  }
  
  override function toString() : String {
    return super.toString() + " Coverage : Broad"  // no need for i18n
  }
  
}
