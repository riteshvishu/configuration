package gw.lob.wc7.schedule

uses gw.api.domain.Clause
uses gw.lob.wc7.schedule.WC7SpecificScheduledItem

/**
 * The implementation of {@link WC7SpecificScheduledItem} for {@link entity.WC7ExcludedLaborContactDetail}
 */
@Export
class WC7ExcludedLaborContactDetailScheduledItemImpl implements WC7SpecificScheduledItem {
  
  var _excludedLaborContact : WC7ExcludedLaborContactDetail as readonly Owner

  construct(ExcludedLaborContact : WC7ExcludedLaborContactDetail) {
    _excludedLaborContact = ExcludedLaborContact
  }

  override property get ParentClause() : Clause {
    return _excludedLaborContact.LaborContactExclusion
  }
}
