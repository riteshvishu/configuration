package gw.lob.wc7.contact

uses gw.api.domain.Clause
uses gw.lob.wc7.schedule.WC7SpecificScheduledItem

/**
 * The implementation of {@link WC7SpecificScheduledItem} for {@link entity.WC7IncludedOwnerOfficer}
 */
@Export
class WC7IncludedOwnerOfficerScheduledItemImpl implements WC7SpecificScheduledItem {
  
  var _includedOwnerOfficer : WC7IncludedOwnerOfficer as readonly Owner
  
  construct(includedOwnerOfficer : WC7IncludedOwnerOfficer) {
    _includedOwnerOfficer = includedOwnerOfficer
  }

  override property get ParentClause() : Clause {
    return _includedOwnerOfficer.OwnerOfficerCondition
  }
}
