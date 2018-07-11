package gw.lob.wc7.schedule

uses gw.lob.common.AbstractScheduleImpl
uses gw.api.productmodel.SchedulePropertyInfo
uses gw.lang.reflect.IPropertyInfo

/**
 * The implementation of schedules for line coverages.
 * 
 * Any newly defined line coverages schedules should include a switch case in #PropertyInfos to define what the schedule column values are.
 * 
 * @see entity.WC7LineScheduleCov
 * @see AbstractScheduleImpl
 */
@Export
class WC7LineScheduleCovImpl extends AbstractScheduleImpl<entity.WC7LineScheduleCov> {

  construct(delegateOwner : entity.WC7LineScheduleCov) {
    super(delegateOwner)
  }

  override property get ScheduledItems() : ScheduledItem[] {
    return Owner.WC7LineScheduleCovItems
  }

  override function createAndAddScheduledItem() : ScheduledItem {
    var scheduledItem = new WC7LineScheduleCovItem(Owner.Branch)
    createAutoNumber(scheduledItem)
    Owner.addToWC7LineScheduleCovItems(scheduledItem)
    initializeScheduledItem(scheduledItem)
    return scheduledItem
  }

  override property get PropertyInfos() : SchedulePropertyInfo[] {
    switch (typeof Owner) {
        default:
          return super.PropertyInfos
    }
  }
  
  override function removeScheduledItem(item : ScheduledItem) {
    Owner.removeFromWC7LineScheduleCovItems(item as WC7LineScheduleCovItem)
    renumberAutoNumberSequence()
  }

  override property get CurrentAndFutureScheduledItems() : KeyableBean[] {
    var schedItems = Owner.ScheduledItems.toList()

    Owner.Branch.OOSSlices
      .where(\ p ->  p.WC7Line != null)
      .each(\ p ->  {
        var matchingSlicedScheduleCov = p.WC7Line.CoveragesFromCoverable.firstWhere(\ c -> c.FixedId == Owner.FixedId) as WC7LineScheduleCov
        if (matchingSlicedScheduleCov != null){
          matchingSlicedScheduleCov.ScheduledItems.each(\ s -> {
            if(!schedItems.contains(s)) {
              schedItems.add(s)
            }
          })
        }
      })

    return schedItems.map(\ item -> item as WC7LineScheduleCovItem).toTypedArray()
  }

  override property get ScheduleNumberPropInfo() : IPropertyInfo {
    return WC7LineScheduleCovItem.Type.TypeInfo.getProperty("ScheduleNumber")
  }
}
