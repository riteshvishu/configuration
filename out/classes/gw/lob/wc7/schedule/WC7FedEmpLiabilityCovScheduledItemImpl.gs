package gw.lob.wc7.schedule

uses gw.api.domain.Clause

/**
 * The implementation of {@link WC7SpecificScheduledItem} for {@link entity.WC7FedCoveredEmployee}
 */
@Export
class WC7FedEmpLiabilityCovScheduledItemImpl implements WC7SpecificScheduledItem {
  
  var _fedCovEmp : WC7FedCoveredEmployee as readonly Owner
  
  construct(fedCovEmp : WC7FedCoveredEmployee) {
    _fedCovEmp = fedCovEmp
  }

  override property get ParentClause() : Clause {
    return _fedCovEmp.FedEmpLiabCoverage
  }
}
