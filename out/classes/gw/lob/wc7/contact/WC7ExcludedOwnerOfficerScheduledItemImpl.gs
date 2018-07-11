package gw.lob.wc7.contact

uses gw.api.domain.Clause
uses gw.lob.wc7.schedule.WC7SpecificScheduledItem

/**
 * The implementation of {@link WC7SpecificScheduledItem} for {@link entity.WC7ExcludedOwnerOfficer}
 */
@Export
class WC7ExcludedOwnerOfficerScheduledItemImpl implements WC7SpecificScheduledItem {
  
  var _excludedOwnerOfficer : WC7ExcludedOwnerOfficer as readonly Owner
  
  construct(excludedOwnerOfficer : WC7ExcludedOwnerOfficer) {
    _excludedOwnerOfficer = excludedOwnerOfficer
  }

  override property get ParentClause() : Clause {
    return _excludedOwnerOfficer.OwnerOfficerExclusion
  }
}
