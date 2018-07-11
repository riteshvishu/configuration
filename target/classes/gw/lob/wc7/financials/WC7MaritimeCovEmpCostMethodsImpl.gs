package gw.lob.wc7.financials

/**
 * Methods to implement {@link WC7CostMethods} for {@link WC7MaritimeCovEmpCost}
 */
@Export
class WC7MaritimeCovEmpCostMethodsImpl extends WC7BaseCovEmpCostMethodsImpl<WC7MaritimeCovEmpCost>{
  
  construct(owner : WC7MaritimeCovEmpCost) {
    super(owner)
  }
  
  override property get CoveredEmployee() : WC7CoveredEmployeeBase {
    return Cost.WC7MaritimeCoveredEmployee
  }

  override property get ClassCode() : String {
    if (Cost.StatCode != null) {
      return Cost.StatCode
    }
    return super.ClassCode
  }
}
