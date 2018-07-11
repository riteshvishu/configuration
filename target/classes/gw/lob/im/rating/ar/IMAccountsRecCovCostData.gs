package gw.lob.im.rating.ar

uses com.guidewire.commons.entity.effdate.EffDatedVersionList
uses entity.windowed.IMAccountsRecCovVersionList
uses gw.api.effdate.EffDatedUtil
uses gw.lob.im.rating.IMCostData

@Export
class IMAccountsRecCovCostData  extends IMCostData<IMAccountsRecCovCost> {

  private var _cov : IMAccountsRecCov as Cov
  private var _covID : Key
  private var _partID : Key

  construct(effDate : DateTime, expDate : DateTime, covID : Key, partID : Key) {
    super(effDate, expDate)
    assertKeyType(covID, IMAccountsRecCov)
    assertKeyType(partID, IMAccountsRecPart)
    init(covID, partID)
  }

  construct(effDate : DateTime, expDate : DateTime, c : Currency, covID : Key, partID : Key) {
    super(effDate, expDate, c)
    assertKeyType(covID, IMAccountsRecCov)
    assertKeyType(partID, IMAccountsRecPart)
    init(covID, partID)
  }

  private function init(covID : Key, partID : Key) {
    _covID = covID
    _partID = partID
  }
  
  override function getVersionedCosts(line: InlandMarineLine) : List<EffDatedVersionList> {
    var covVL = EffDatedUtil.createVersionList(line.Branch, _covID) as IMAccountsRecCovVersionList
    return covVL.Costs
  }

  override function setSpecificFieldsOnCost(line: InlandMarineLine, cost: IMAccountsRecCovCost) : void {
    super.setSpecificFieldsOnCost(line, cost)
    cost.setFieldValue("IMAccountsRecCov", _covID)
    cost.setFieldValue("IMAccountsRecPart", _partID)
  }

  override property get KeyValues() : List<Object> {
    return {_covID}  
  }
}
