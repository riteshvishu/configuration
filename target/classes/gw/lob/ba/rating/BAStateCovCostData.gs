package gw.lob.ba.rating
uses java.util.Date
uses gw.api.effdate.EffDatedUtil
uses entity.windowed.BAStateCovVersionList

@Export
/**
* This Cost Data is no longer used OOTB
*/
class BAStateCovCostData extends BACostData<BAStateCovCost> {
  
  var _covID : Key
  
  construct(effDate : Date, expDate : Date, jurisdiction : BAJurisdiction, covIDArg : Key) {
    super(effDate, expDate, "CoveragePremium", jurisdiction, null) 
    assertKeyType(covIDArg, BAStateCov)
    init(covIDArg)
    Basis = 1
  }

  construct(effDate : Date, expDate : Date, c : Currency, jurisdiction : BAJurisdiction, covIDArg : Key) {
    super(effDate, expDate, c, "CoveragePremium", jurisdiction, null) 
    assertKeyType(covIDArg, BAStateCov)
    init(covIDArg)
    Basis = 1
  }

  construct(cost : BAStateCovCost) {
    super(cost)
    init(cost.BAStateCov.FixedId)
  }

  private function init(covIDArg : Key) {
    _covID = covIDArg
  }

  override function setSpecificFieldsOnCost(line : BusinessAutoLine, cost : BAStateCovCost) : void {
    super.setSpecificFieldsOnCost( line, cost )
    cost.setFieldValue("BAStateCov", _covID)
  }

  override function getVersionedCosts(line : BusinessAutoLine) : List<com.guidewire.commons.entity.effdate.EffDatedVersionList> {
    var covVL = EffDatedUtil.createVersionList( line.Branch, _covID ) as BAStateCovVersionList
    return covVL.Costs
  }
 
  protected override property get KeyValues() : List<Object> {
    return {_covID, JurisdictionArg}
  }
}
