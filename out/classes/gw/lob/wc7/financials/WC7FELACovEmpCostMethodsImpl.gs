package gw.lob.wc7.financials

/**
 * Methods to implement {@link WC7CostMethods} for {@link WC7FedCovEmpCost}
 */
@Export
class WC7FELACovEmpCostMethodsImpl extends WC7BaseCovEmpCostMethodsImpl<WC7FELACovEmpCost>{
  
  construct(owner : WC7FELACovEmpCost) {
    super(owner)
  }
  
  override property get CoveredEmployee() : WC7CoveredEmployeeBase {
    return Cost.WC7FELACoveredEmployee
  }

  override property get ClassCode() : String {
    if (Cost.StatCode != null) {
      return Cost.StatCode
    }
    return super.ClassCode
  }
}
