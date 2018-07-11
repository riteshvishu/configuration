package gw.lob.wc7.schedule

uses gw.api.domain.Clause
uses gw.lob.wc7.schedule.WC7SpecificScheduledItem

/**
 * The implementation of {@link WC7SpecificScheduledItem} for {@link entity.WC7IncludedLaborContactDetail}
 */
@Export
class WC7IncludedLaborContactDetailScheduledItemImpl implements WC7SpecificScheduledItem {
  
  var _includedLaborContact : WC7IncludedLaborContactDetail as readonly Owner
  
  construct(includedLaborContact : WC7IncludedLaborContactDetail) {
    _includedLaborContact = includedLaborContact
  }

  override property get ParentClause() : Clause {
    return _includedLaborContact.LaborContactCondition
  }
}
