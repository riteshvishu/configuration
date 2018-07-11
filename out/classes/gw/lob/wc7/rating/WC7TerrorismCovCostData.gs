package gw.lob.wc7.rating

uses java.util.Date
uses gw.api.effdate.EffDatedUtil
uses entity.windowed.WC7WorkersCompCovVersionList

@Export
class WC7TerrorismCovCostData extends WC7CostData<WC7TerrorismCovCost> {

  private var _covID : Key as readonly CovID
  private var _jurisdiction : Jurisdiction as readonly Jurisdiction
  private var _statCode : String as StatCode
  
  construct(effDate : Date, expDate : Date, covIDArg : Key, aJurisdiction : Jurisdiction, c : Currency) {
    super(effDate, expDate, c)
    _covID = covIDArg
    _jurisdiction = aJurisdiction
  }

  override function getVersionedCosts(line : WC7WorkersCompLine) : List<com.guidewire.commons.entity.effdate.EffDatedVersionList> {
    var wcCovVL = EffDatedUtil.createVersionList(line.Branch, CovID) as WC7WorkersCompCovVersionList
    //match costs on: Cost Subtype and Jurisdiction
    var matchingCosts = wcCovVL.Costs.where(\ v -> {
      var firstVersion = v.AllVersions.first() 
      var matches = (firstVersion typeis WC7TerrorismCovCost) 
        and firstVersion.Jurisdiction == this.Jurisdiction
      return matches})
    return matchingCosts.toList()
  }

  override property get KeyValues() : List<Object> {
    return {CovID, Jurisdiction}
  }

  override function setSpecificFieldsOnCost(line : WC7WorkersCompLine, cost : WC7TerrorismCovCost) {
    super.setSpecificFieldsOnCost(line, cost)
    setCoverage(cost)
    cost.Jurisdiction = Jurisdiction
    cost.StatCode = StatCode
  }

  private function setCoverage(cost : WC7TerrorismCovCost) {    
    cost.setFieldValue("WC7WorkersCompCov", CovID)
  }

}
