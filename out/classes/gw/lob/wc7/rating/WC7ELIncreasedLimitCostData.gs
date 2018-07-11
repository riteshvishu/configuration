package gw.lob.wc7.rating

uses java.util.Date
uses gw.api.effdate.EffDatedUtil
uses entity.windowed.WC7WorkersCompCovVersionList

class WC7ELIncreasedLimitCostData extends WC7CostData<WC7ELIncreasedLimitCost> {

  private var _covID : Key as readonly CovID
  private var _costType : WC7ELIncrLimitCostType as readonly CostType
  private var _jurisdiction : Jurisdiction as readonly Jurisdiction
  private var _statCode : String as StatCode
  
  construct(effDate : Date, expDate : Date, covIDArg : Key, aJurisdiction : Jurisdiction, costTypeArg : WC7ELIncrLimitCostType, c : Currency) {
    super(effDate, expDate, c)
    _covID = covIDArg
    _costType = costTypeArg
    _jurisdiction = aJurisdiction
  }

  override function getVersionedCosts(line : WC7WorkersCompLine) : List<com.guidewire.commons.entity.effdate.EffDatedVersionList> {
    var wcCovVL = EffDatedUtil.createVersionList(line.Branch, CovID) as WC7WorkersCompCovVersionList
    //match costs on: Cost Subtype, WC7ELIncreasedLimitCostType, and Jurisdiction
    //This will ensure that "Increase Limits Charge" costs don't collide with "Increased Limit Factor" costs from the same rating period
    var matchingCosts = wcCovVL.Costs.where(\ v -> {
      var firstVersion = v.AllVersions.first() 
      var matches = (firstVersion typeis WC7ELIncreasedLimitCost) 
        and firstVersion.WC7ELIncreasedLimitCostType == this._costType
        and firstVersion.Jurisdiction == this.Jurisdiction
      return matches})
    return matchingCosts.toList()
  }

  override property get KeyValues() : List<Object> {
    return {CovID, CostType, Jurisdiction}
  }

  override function setSpecificFieldsOnCost(line : WC7WorkersCompLine, cost : WC7ELIncreasedLimitCost) {
    super.setSpecificFieldsOnCost(line, cost)
    setCoverage(cost)
    cost.WC7ELIncreasedLimitCostType = CostType
    cost.Jurisdiction = Jurisdiction
    cost.StatCode = StatCode
  }

  private function setCoverage(cost : WC7ELIncreasedLimitCost) {    
    cost.setFieldValue("WC7WorkersCompCov", CovID)
  }
  
  // We do not want to preserve the discount percent for Increased Limits Charge as it is essentially a Balance Cost
  override property get PreserveOverrideDiscounts() : boolean {
    if (CostType == WC7ELIncrLimitCostType.TC_INCRLIMITCHARGE) {
      return false
    } else {
      return super.PreserveOverrideDiscounts
    }
  }

}
