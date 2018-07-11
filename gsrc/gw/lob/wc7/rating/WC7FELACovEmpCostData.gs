package gw.lob.wc7.rating

uses java.util.Date
uses gw.api.effdate.EffDatedUtil
uses entity.windowed.WC7FedCoveredEmployeeVersionList

/**
 * FELA Covered Employee Cost Data
 * 
 * An implementation of {@link CostData} for {@link WC7FedCoveredEmployee}
 */
@Export
class WC7FELACovEmpCostData extends WC7BaseCovEmpCostData<WC7FELACovEmpCost> {
  
  private var _costType : WC7FELACovEmpCostType as readonly CostType
  
  construct(effDate : Date, expDate : Date, empIDArg : Key, covIDArg : Key, stateArg : Jurisdiction, theCostType : WC7FELACovEmpCostType, c : Currency) {
    super(effDate, expDate, empIDArg, covIDArg, stateArg, c)
    assertKeyType(empIDArg, WC7FedCoveredEmployee)
    assertKeyType(covIDArg, WC7WorkersCompCov)
    _costType = theCostType
  }

  override function getVersionedCosts(line : WC7WorkersCompLine) : List<com.guidewire.commons.entity.effdate.EffDatedVersionList> {
    var empVL = EffDatedUtil.createVersionList( line.Branch, EmpID ) as WC7FedCoveredEmployeeVersionList
    return empVL.WC7Costs.where( \ vl -> vl.AllVersions.first().WC7FELACovEmpCostType == CostType ).toList()
  }

  override function setCoveredEmployee(coveredEmployeeFixedID : Key, cost : WC7FELACovEmpCost) {
    cost.setFieldValue("WC7FELACoveredEmployee", EmpID)
  }

  override function setCoverage(coverageFixedID : Key, cost : WC7FELACovEmpCost) {
    cost.setFieldValue("WC7FELACov", CovID)
  }
  
  override property get KeyValues() : List<Object> {
    return {CovID, EmpID, CostType}  
  }

  override function setSpecificFieldsOnCost(line : WC7WorkersCompLine, cost : WC7FELACovEmpCost) {
    super.setSpecificFieldsOnCost( line, cost )
    cost.WC7FELACovEmpCostType = CostType
  }
}
