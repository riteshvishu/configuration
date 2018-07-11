package gw.lob.cp.rating

@Export
class CPBuildingCovSpecialCostData extends CPBuildingCovCostData<CPBuildingCovSpecCost> {

  construct(effDate : DateTime, expDate : DateTime, covID : Key, stateArg : Jurisdiction) {
    super(effDate, expDate, covID, stateArg)
  }

  construct(effDate : DateTime, expDate : DateTime, c : Currency, covID : Key, stateArg : Jurisdiction) {
    super(effDate, expDate, c, covID, stateArg)
  }

  construct(cost : CPBuildingCovSpecCost) {
    super(cost)  
  }
   
  override function setSpecificFieldsOnCost(line : CommercialPropertyLine, cost : CPBuildingCovSpecCost) {
    super.setSpecificFieldsOnCost(line, cost)
  }
  
  override function toString() : String {
    return super.toString() + " Coverage : Special"  // no need for i18n
  }

}
