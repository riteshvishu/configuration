package gw.lob.gl.rating
uses com.guidewire.commons.entity.effdate.EffDatedVersionList
uses java.util.Date
uses entity.windowed.GLStateCostVersionList

@Export
class GLStateCostData extends GLCostData<GLStateCost> {
  var _stateCostType : GLStateCostType as StateCostType

  construct(effDate : Date, expDate : Date, __state : Jurisdiction, __stateCostType : GLStateCostType) {
    super(effDate, expDate, __state)
    init(__stateCostType)
  }

  construct(effDate : Date, expDate : Date, c : Currency, __state : Jurisdiction, __stateCostType : GLStateCostType) {
    super(effDate, expDate, c, __state)
    init(__stateCostType)
  }

  private function init(__stateCostType : GLStateCostType) {
    _stateCostType = __stateCostType
    if (StateCostType == "TAX") {
      RateAmountType = "TaxSurcharge"
    }
  }

  override function setSpecificFieldsOnCost(line : GeneralLiabilityLine, cost: GLStateCost ) : void {
    super.setSpecificFieldsOnCost(line, cost)
    cost.GLState = State
    cost.StateCostType = _stateCostType
  }

  override function getVersionedCosts(line : GeneralLiabilityLine) : List<EffDatedVersionList> {
    var glCostVLs = line.VersionList.GLCosts
    return glCostVLs.whereTypeIs(GLStateCostVersionList).where( \ g -> isMyCost(g.AsOf(EffectiveDate)) ).toList()
  }
  
  private function isMyCost(cost : GLStateCost) : boolean {
    return State == cost.State
        && StateCostType == cost.StateCostType
  }


  override property get GLKeyValues() : List<Object> {
    return {State, StateCostType}
  }

}
