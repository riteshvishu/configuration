package gw.lob.wc7.rating

uses java.util.Date
uses gw.api.effdate.EffDatedUtil
uses entity.windowed.WC7SupplDiseaseExposureVersionList

class WC7SupplDiseaseCostData extends WC7CostData<WC7SupplDiseaseCost>{

  private var _exposure : Key as readonly ExposureID
  private var _jurisdiction : Jurisdiction as readonly State
  
  construct(effDate : Date, expDate : Date, theJurisdiction : Jurisdiction, exposure : Key, c : Currency) {
    super(effDate, expDate, c)
    _exposure = exposure
    _jurisdiction = theJurisdiction
  }
  

  override property get Jurisdiction() : Jurisdiction {
    return State 
  }

  override function getVersionedCosts(line : WC7WorkersCompLine) : List<com.guidewire.commons.entity.effdate.EffDatedVersionList> {
    var expVL = EffDatedUtil.createVersionList( line.Branch, ExposureID ) as WC7SupplDiseaseExposureVersionList
    return expVL.Costs
  }

  override property get KeyValues() : List<Object> {
    return {ExposureID}  
  }

  private function setWC7SupplDiseaseExposure(cost : WC7SupplDiseaseCost) {    
    cost.setFieldValue("WC7SupplDiseaseExposure", ExposureID)
  }
  
  override function setSpecificFieldsOnCost(line : WC7WorkersCompLine, cost : WC7SupplDiseaseCost) {
    super.setSpecificFieldsOnCost( line, cost )
    setWC7SupplDiseaseExposure(cost)
  }

}
