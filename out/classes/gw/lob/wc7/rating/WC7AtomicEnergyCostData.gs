package gw.lob.wc7.rating
uses java.util.Date
uses gw.api.effdate.EffDatedUtil
uses entity.windowed.WC7AtomicEnergyExposureVersionList

/**
 * Atomic Enerdy Cost Data
 */
@Export
class WC7AtomicEnergyCostData extends WC7CostData<WC7AtomicEnergyCost> {

  private var _exposure : Key as readonly ExposureID
  private var _jurisdiction : Jurisdiction as readonly State
  private var _statCode : String as StatCode
  
  construct(effDate : Date, expDate : Date, theJurisdiction : Jurisdiction, exposure : Key, c : Currency) {
    super(effDate, expDate, c)
    _exposure = exposure
    _jurisdiction = theJurisdiction
  }
  
  override property get Jurisdiction() : Jurisdiction {
    return State 
  }
  
  override function setSpecificFieldsOnCost(line : WC7WorkersCompLine, cost : WC7AtomicEnergyCost) {
    super.setSpecificFieldsOnCost( line, cost )
    cost.setFieldValue("WC7AtomicEnergyExposure", ExposureID)
    cost.StatCode = StatCode
  }
  
  override function getVersionedCosts(line : WC7WorkersCompLine) : List<com.guidewire.commons.entity.effdate.EffDatedVersionList> {
    var expVL = EffDatedUtil.createVersionList(line.Branch, ExposureID) as WC7AtomicEnergyExposureVersionList
    return expVL.WC7Costs
  }

  override property get KeyValues() : List<Object> {
    return {ExposureID}  
  }
}
