package gw.lob.wc7.financials

/**
 * Methods to implement {@link WC7CostMethods} for {@link WC7CovEmpCost}
 */
@Export
class WC7CovEmpCostMethodsImpl extends WC7BaseCovEmpCostMethodsImpl<WC7CovEmpCost>{
  
  construct(owner : WC7CovEmpCost) {
    super(owner)
  }
  
  override property get CoveredEmployee() : WC7CoveredEmployeeBase {
    return Cost.WC7CoveredEmployee
  }
  
  override property get ClassCode() : String {
    if (Cost.StatCode != null) {
      return Cost.StatCode
    }
    return super.ClassCode
  }

  override property get Description() : String {
    if (Cost.WC7CovEmpCostType != WC7CovEmpCostType.TC_MANUALPREMIUM) {
      return displaykey.Web.Policy.WC7.Cost.CoveredEmployee(Cost.WC7CovEmpCostType.DisplayName, CoveredEmployee.ClassCode.Classification)
    } else {
      return super.Description
    }
  }
}
