package gw.lob.ba.rating
uses java.util.Date
uses gw.api.effdate.EffDatedUtil
uses entity.windowed.BusinessVehicleCovVersionList

@Export
/**
* This Cost Data is used for vehicle coverages
*/
class BusinessVehicleCovCostData extends BACostData<BusinessVehicleCovCost> {
  
  var _covID : Key
  
  construct(effDate : Date, expDate : Date, jurisdiction : BAJurisdiction, covIDArg : Key, vehicleIDArg : Key) {
    super(effDate, expDate, "CoveragePremium", jurisdiction, vehicleIDArg)
    assertKeyType(covIDArg, BusinessVehicleCov)
    assertKeyType(vehicleIDArg, BusinessVehicle)
    //assertKeyType(jurisdictionIDArg, BAJurisdiction)
    init(covIDArg)
  }

  construct(effDate : Date, expDate : Date, c : Currency, jurisdiction : BAJurisdiction, covIDArg : Key) {
    super(effDate, expDate, c, "CoveragePremium", jurisdiction, null)
    assertKeyType(covIDArg, BusinessVehicleCov)
    //assertKeyType(jurisdictionIDArg, BAJurisdiction)
    init(covIDArg)
  }

  construct(effDate : Date, expDate : Date, c : Currency, jurisdiction : BAJurisdiction, covIDArg : Key, vehicleIDArg : Key) {
    super(effDate, expDate, c, "CoveragePremium", jurisdiction, vehicleIDArg)
    assertKeyType(covIDArg, BusinessVehicleCov)
    assertKeyType(vehicleIDArg, BusinessVehicle)
    //assertKeyType(jurisdictionIDArg, BAJurisdiction)
    init(covIDArg)
  }

  construct(cost : BusinessVehicleCovCost) {
    super(cost)
    init(cost.BusinessVehicleCov.FixedId  )
  }

  private function init(covIDArg : Key) {
    _covID = covIDArg
  }
  
  override function setSpecificFieldsOnCost(line : BusinessAutoLine, cost : BusinessVehicleCovCost) : void {
    super.setSpecificFieldsOnCost( line, cost )
    cost.setFieldValue("BusinessVehicleCov", _covID)
  }

  override function getVersionedCosts(line : BusinessAutoLine) : List<com.guidewire.commons.entity.effdate.EffDatedVersionList> {
    var covVL = EffDatedUtil.createVersionList( line.Branch, _covID ) as BusinessVehicleCovVersionList
    return covVL.Costs
  }

  protected override property get KeyValues() : List<Object> {
    return {_covID, JurisdictionArg}
  }
}
