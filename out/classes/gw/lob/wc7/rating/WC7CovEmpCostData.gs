package gw.lob.wc7.rating

uses java.util.Date
uses gw.api.effdate.EffDatedUtil
uses entity.windowed.WC7CoveredEmployeeVersionList

/**
 * Covered Employee Cost Data
 * 
 * An implementation of {@link CostData} for {@link WC7CoveredEmployee}
 */
@Export
class WC7CovEmpCostData extends WC7BaseCovEmpCostData<WC7CovEmpCost> {
  private var _costType : WC7CovEmpCostType as readonly CostType
  
  construct(effDate : Date, expDate : Date, empIDArg : Key, covIDArg : Key, stateArg : Jurisdiction, theCostType : WC7CovEmpCostType, c : Currency) {
    super(effDate, expDate, empIDArg, covIDArg, stateArg, c)
    assertKeyType(empIDArg, WC7CoveredEmployee)
    assertKeyType(covIDArg, WC7WorkersCompCov)
    _costType = theCostType
  }

  override function setSpecificFieldsOnCost(line : WC7WorkersCompLine, cost : WC7CovEmpCost) {
    super.setSpecificFieldsOnCost( line, cost )
    cost.WC7CovEmpCostType = CostType
  }

  override function getVersionedCosts(line : WC7WorkersCompLine) : List<com.guidewire.commons.entity.effdate.EffDatedVersionList> {
    var empVL = EffDatedUtil.createVersionList( line.Branch, EmpID ) as WC7CoveredEmployeeVersionList
    return empVL.WC7Costs.where( \ vl -> vl.AllVersions.first().WC7CovEmpCostType == CostType ).toList()
  }
  
  override function setCoveredEmployee(coveredEmployeeFixedID : Key, cost : WC7CovEmpCost) {    
    cost.setFieldValue("WC7CoveredEmployee", EmpID)
  }

  override function setCoverage(coverageFixedID : Key, cost : WC7CovEmpCost) {    
    cost.setFieldValue("WC7WorkersCompCov", CovID)
  }
    
  override property get KeyValues() : List<Object> {
    return {CovID, EmpID, CostType}  
  }

}
