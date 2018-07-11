package gw.lob.wc7.rating

uses java.util.Date
uses gw.api.effdate.EffDatedUtil
uses entity.windowed.WC7MaritimeCoveredEmployeeVersionList

/**
 * Maritime Covered Employee Cost Data
 * 
 * An implementation of {@link CostData} for {@link WC7MaritimeCoveredEmployee}
 */
@Export
class WC7MaritimeCovEmpCostData extends WC7BaseCovEmpCostData<WC7MaritimeCovEmpCost> {
  
  private var _costType : WC7MaritimeCovEmpCostType as readonly CostType
  
  construct(effDate : Date, expDate : Date, empIDArg : Key, covIDArg : Key, stateArg : Jurisdiction, theCostType : WC7MaritimeCovEmpCostType, c : Currency) {
    super(effDate, expDate, empIDArg, covIDArg, stateArg, c)
    assertKeyType(empIDArg, WC7MaritimeCoveredEmployee)
    assertKeyType(covIDArg, WC7WorkersCompCov)
    _costType = theCostType
  }
  
  override function setSpecificFieldsOnCost(line : WC7WorkersCompLine, cost : WC7MaritimeCovEmpCost) {
    super.setSpecificFieldsOnCost( line, cost )
    cost.WC7MaritimeCovEmpCostType = CostType
  }

  override function getVersionedCosts(line : WC7WorkersCompLine) : List<com.guidewire.commons.entity.effdate.EffDatedVersionList> {
    var empVL = EffDatedUtil.createVersionList( line.Branch, EmpID ) as WC7MaritimeCoveredEmployeeVersionList
    return empVL.WC7Costs.where( \ vl -> vl.AllVersions.first().WC7MaritimeCovEmpCostType == CostType ).toList()
  }

  override function setCoveredEmployee(coveredEmployeeFixedID : Key, cost : WC7MaritimeCovEmpCost) {
    cost.setFieldValue("WC7MaritimeCoveredEmployee", EmpID)
  }
  
  override property get KeyValues() : List<Object> {
    return {CovID, EmpID, CostType}  
  }

  override function setCoverage(coverageFixedID : Key, cost : WC7MaritimeCovEmpCost) {
    cost.setFieldValue("WC7MaritimeCov", CovID)
  }
}
