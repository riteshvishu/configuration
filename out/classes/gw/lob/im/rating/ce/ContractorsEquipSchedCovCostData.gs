package gw.lob.im.rating.ce

uses com.guidewire.commons.entity.effdate.EffDatedVersionList
uses entity.windowed.ContractorsEquipCovVersionList
uses gw.api.effdate.EffDatedUtil
uses gw.lob.im.rating.IMCostData
uses java.util.Date

@Export
class ContractorsEquipSchedCovCostData extends IMCostData<ContrEquipCovCost> {
  
  private var _covID : Key
  private var _partID : Key

  construct(effDate : DateTime, expDate : DateTime, covID : Key, partID : Key) {
    super(effDate, expDate)
    assertKeyType(covID, ContractorsEquipCov) 
    assertKeyType(partID, ContractorsEquipPart)
    init(covID, partID)
  }

  construct(effDate : DateTime, expDate : DateTime, c : Currency, covID : Key, partID : Key) {
    super(effDate, expDate, c)
    assertKeyType(covID, ContractorsEquipCov) 
    assertKeyType(partID, ContractorsEquipPart)
    init(covID, partID)
  }

  private function init(covID : Key, partID : Key) {
    _covID = covID
    _partID = partID
  }

  override function setSpecificFieldsOnCost(line : InlandMarineLine, cost : ContrEquipCovCost) {
    super.setSpecificFieldsOnCost(line, cost)
    cost.setFieldValue("ContractorsEquipCov", _covID)
    cost.setFieldValue("ContractorsEquipPart", _partID)
  }

  override function getVersionedCosts(line : InlandMarineLine) : List<EffDatedVersionList> {
    var covVL = EffDatedUtil.createVersionList(line.Branch, _covID) as ContractorsEquipCovVersionList
    return covVL.Costs
  }

  override property get KeyValues() : List<Object> {
    return {_covID}  
  }
}
