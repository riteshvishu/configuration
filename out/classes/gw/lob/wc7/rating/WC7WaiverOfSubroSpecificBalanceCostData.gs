package gw.lob.wc7.rating

uses java.util.Date
uses com.guidewire.commons.entity.effdate.EffDatedVersionList
uses gw.api.effdate.EffDatedUtil
uses entity.windowed.WC7JurisdictionVersionList

class WC7WaiverOfSubroSpecificBalanceCostData extends WC7CostData<WC7WaiverOfSubroSpecificBalanceCost> {
  
  var _jobID : String as readonly JobID
  var _jurisdiction : typekey.Jurisdiction
  var _wc7jurisdictionID : Key
  var _statCode : String as StatCode
  
  construct(effDate : Date, expDate : Date, aJurisdiction : WC7Jurisdiction , aJobID : String, c : Currency) {
    super(effDate, expDate, c)
    _jurisdiction = aJurisdiction.Jurisdiction
    _wc7jurisdictionID = aJurisdiction.FixedId
    _jobID = aJobID
  }

  override property get KeyValues() : List<Object> {
    return {JobID, _wc7jurisdictionID}
  }
  
  override function setSpecificFieldsOnCost(line : WC7WorkersCompLine, cost : WC7WaiverOfSubroSpecificBalanceCost) {
    super.setSpecificFieldsOnCost( line, cost )
    cost.JurisdictionCostType = typekey.WC7JurisdictionCostType.TC_WAIVERBALANCE
    cost.WC7Jurisdiction = line.getJurisdiction(_jurisdiction)
    cost.JobID = JobID
    cost.StatCode = _statCode
  }

  override function getVersionedCosts(line : WC7WorkersCompLine) : List<EffDatedVersionList> {
    var jurisdictionVL = EffDatedUtil.createVersionList( line.Branch, _wc7jurisdictionID ) as WC7JurisdictionVersionList
    var jurisdictionCost = jurisdictionVL.Costs*.AllVersions*.first()
    var balanceWaiverCosts = jurisdictionCost.whereTypeIs(WC7WaiverOfSubroSpecificBalanceCost)
    var balanceWaiverCostVL = balanceWaiverCosts.where(\ w -> w.JobID == _jobID)*.VersionList.toList()
    return balanceWaiverCostVL
  }

  override property get Jurisdiction() : Jurisdiction {
    return _jurisdiction 
  }
  
  // We do not want to preserve the discount percent for Balance costs
  override property get PreserveOverrideDiscounts() : boolean {
    return false
  }

}
