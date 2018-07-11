package gw.lob.wc7.rating

uses java.util.Date
uses com.guidewire.commons.entity.effdate.EffDatedVersionList
uses gw.api.effdate.EffDatedUtil
uses entity.windowed.WC7JurisdictionCovVersionList

/**
 * JurisdictionCov Cost Data
 * 
 * An implementation of {@link CostData} for {@link WC7JurisdictionCov}
 */

@Export
class WC7JurisdictionCovCostData extends WC7CostData<WC7JurisdictionCovCost> {

  var _covID : Key as readonly CovID
  var _costType : WC7JurisdictionCostType as readonly CostType
  var _wc7Jurisdiction : WC7Jurisdiction
  var _statCode : String as StatCode
  
  construct(effDate : Date, expDate : Date, covIDArg : Key, aWC7Jurisdiction : WC7Jurisdiction, costTypeArg : WC7JurisdictionCostType, c : Currency) {
    super(effDate, expDate, c)
    _covID = covIDArg
    _costType = costTypeArg
    _wc7Jurisdiction = aWC7Jurisdiction
  }

  override property get Jurisdiction() : Jurisdiction {
    return _wc7Jurisdiction.Jurisdiction 
  }

  override property get KeyValues() : List<Object> {
    return {CovID, CostType}  
  }

  override function getVersionedCosts(line : WC7WorkersCompLine) : List<EffDatedVersionList> {
    var wcJurisdictionCovVL = EffDatedUtil.createVersionList(line.Branch, CovID) as WC7JurisdictionCovVersionList
    return wcJurisdictionCovVL.Costs.where(\ v -> v.AllVersions.first() typeis WC7JurisdictionCovCost).toList()   
  }
  
  override function setSpecificFieldsOnCost(line : WC7WorkersCompLine, cost : WC7JurisdictionCovCost) {
    super.setSpecificFieldsOnCost(line, cost)
    setCoverage(cost)
    cost.JurisdictionCostType = CostType
    cost.WC7Jurisdiction = _wc7Jurisdiction
    cost.StatCode = _statCode
  }

  private function setCoverage(cost : WC7JurisdictionCovCost) {
    cost.setFieldValue("WC7JurisdictionCov", CovID)
  }


}
