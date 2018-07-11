package gw.lob.cp.rating

@Export
class CPBuildingCovGroup1CostData extends CPBuildingCovCostData<CPBuildingCovGrp1Cost>
{
  construct(effDate : DateTime, expDate : DateTime, covID : Key, stateArg : Jurisdiction) {
    super(effDate, expDate, covID, stateArg)
  }

  construct(effDate : DateTime, expDate : DateTime, c : Currency, covID : Key, stateArg : Jurisdiction) {
    super(effDate, expDate, c, covID, stateArg)
  }

  construct(cost : CPBuildingCovGrp1Cost) {
    super(cost)  
  }

  override function setSpecificFieldsOnCost(line : CommercialPropertyLine, cost : CPBuildingCovGrp1Cost) {
    super.setSpecificFieldsOnCost(line, cost)
  }

  override function toString() : String {
    return super.toString() + " Coverage : Group I"  // no need for i18n
  }
}
