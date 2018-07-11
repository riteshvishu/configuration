package gw.lob.bop.rating
uses java.util.Date
uses gw.api.effdate.EffDatedUtil
uses entity.windowed.BusinessOwnersCovVersionList

@Export
class BOPCovCostData extends BOPCostData<BOPCovCost> {
  
  protected var _covID : Key
  
  construct(effDate : Date, expDate : Date, stateArg : Jurisdiction, covID : Key) {
    super(effDate, expDate, stateArg)
    assertKeyType(covID, BusinessOwnersCov)
    init(covID)
  }

  construct(effDate : Date, expDate : Date, c : Currency, stateArg : Jurisdiction, covID : Key) {
    super(effDate, expDate, c, stateArg)
    assertKeyType(covID, BusinessOwnersCov)
    init(covID)
  }

  construct(cost : BOPCovCost) {
    super(cost)
    init(cost.BusinessOwnersCov.FixedId)
  }

  private function init(covID : Key) {
    _covID = covID
  }

  override function setSpecificFieldsOnCost(line : BOPLine, cost : BOPCovCost) {
    super.setSpecificFieldsOnCost( line, cost )
    cost.setFieldValue("BusinessOwnersCov", _covID)
  }

  override function getVersionedCosts(line : BOPLine) : List<com.guidewire.commons.entity.effdate.EffDatedVersionList> {
    var covVL = EffDatedUtil.createVersionList( line.Branch, _covID ) as BusinessOwnersCovVersionList
    return covVL.Costs
  }
  
  protected override property get KeyValues() : List<Object> {
    return {_covID}
  }
}
