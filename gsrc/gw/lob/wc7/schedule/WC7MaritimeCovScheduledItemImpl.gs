package gw.lob.wc7.schedule

uses gw.api.domain.Clause

/**
 * The implementation of {@link WC7SpecificScheduledItem} for {@link entity.WC7MaritimeCoveredEmployee}
 */
@Export
class WC7MaritimeCovScheduledItemImpl implements WC7SpecificScheduledItem {
  
  var _maritimeCovEmp : WC7MaritimeCoveredEmployee as readonly Owner
  
  construct(maritimeCovEmp : WC7MaritimeCoveredEmployee) {
    _maritimeCovEmp = maritimeCovEmp
  }

  override property get ParentClause() : Clause {
    return _maritimeCovEmp.MaritimeCoverage
  }
}
