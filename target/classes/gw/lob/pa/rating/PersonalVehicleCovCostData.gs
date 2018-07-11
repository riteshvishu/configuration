package gw.lob.pa.rating
uses java.util.Date
uses gw.api.effdate.EffDatedUtil
uses entity.windowed.PersonalVehicleCovVersionList

@Export
class PersonalVehicleCovCostData extends PACostData<PersonalVehicleCovCost> {
  var _covID : Key
  
  construct(effDate : Date, expDate : Date, c : Currency, covIDArg : Key) {
    super(effDate, expDate, c)
    init(covIDArg)
  }

  construct(effDate : Date, expDate : Date, covIDArg : Key) {
    super(effDate, expDate)
    init(covIDArg)
  }

  private function init(covIDArg : Key) {
    assertKeyType(covIDArg, PersonalVehicleCov)
    _covID = covIDArg
  }

  construct(c : PersonalVehicleCovCost) {
    super(c)
    _covID = c.PersonalVehicleCov.FixedId  
  }

  override function setSpecificFieldsOnCost(line : PersonalAutoLine, cost : PersonalVehicleCovCost) : void {
    super.setSpecificFieldsOnCost(line, cost)
    cost.setFieldValue("PersonalVehicleCov", _covID)
  }

  override function getVersionedCosts(line : PersonalAutoLine) : List<com.guidewire.commons.entity.effdate.EffDatedVersionList> {
    var covVL = EffDatedUtil.createVersionList( line.Branch, _covID ) as PersonalVehicleCovVersionList
    return covVL.Costs
  }

  protected override property get KeyValues() : List<Object> {
    return {_covID}
  }
}
