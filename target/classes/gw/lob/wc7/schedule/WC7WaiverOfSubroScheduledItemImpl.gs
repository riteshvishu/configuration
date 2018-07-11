package gw.lob.wc7.schedule

uses gw.api.domain.Clause

/**
 * The implementation of {@link WC7SpecificScheduledItem} for {@link entity.WC7WaiverOfSubro}
 */
@Export
class WC7WaiverOfSubroScheduledItemImpl implements WC7SpecificScheduledItem {
  
  var _waiver : WC7WaiverOfSubro as readonly Owner
  
  construct(waiver : WC7WaiverOfSubro) {
    _waiver = waiver
  }

  override property get ParentClause() : Clause {
    return _waiver.WaiverCondition
  }
}
