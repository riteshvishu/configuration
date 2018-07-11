package gw.lob.wc7.schedule

uses gw.lob.common.AbstractScheduleImpl
uses gw.api.productmodel.SchedulePropertyInfo
uses gw.lang.reflect.IPropertyInfo
uses gw.api.productmodel.ScheduleTypeKeyPropertyInfo
uses gw.api.productmodel.ScheduleStringPropertyInfo

/**
 * The implementation of schedules for line exclusions.
 * 
 * Any newly defined line coverages exclusions should include a switch case in #PropertyInfos to define what the schedule column values are.
 * 
 * @see entity.WC7LineScheduleExcl
 * @see AbstractScheduleImpl
 */
@Export
class WC7LineScheduleExclImpl extends AbstractScheduleImpl<entity.WC7LineScheduleExcl> {

  construct(delegateOwner : entity.WC7LineScheduleExcl) {
    super(delegateOwner)
  }

  override property get ScheduledItems() : ScheduledItem[] {
    return Owner.WC7LineScheduleExclItems
  }

  override function createAndAddScheduledItem() : ScheduledItem {
    var scheduledItem = new WC7LineScheduleExclItem(Owner.Branch)
    createAutoNumber(scheduledItem)
    Owner.addToWC7LineScheduleExclItems(scheduledItem)
    initializeScheduledItem(scheduledItem)
    return scheduledItem
  }

  override property get PropertyInfos() : SchedulePropertyInfo[] {
    switch (typeof Owner) {
        case WC7DomesticAndAgriculturalWorkersExclEndorsemeExcl:
          return {
            new ScheduleStringPropertyInfo("StringCol1", displaykey.Web.Policy.WC7.Schedule.NameOrType, false),
            new ScheduleTypeKeyPropertyInfo("TypeKeyCol1", displaykey.Web.Policy.WC7.Schedule.TypeWorker, typekey.WC7WorkerKind, null, true)
          }
        default:
          return super.PropertyInfos
    }
  }
  
  override function removeScheduledItem(item : ScheduledItem) {
    Owner.removeFromWC7LineScheduleExclItems(item as WC7LineScheduleExclItem)
    renumberAutoNumberSequence()
  }

  override property get CurrentAndFutureScheduledItems() : KeyableBean[] {
    var schedItems = Owner.ScheduledItems.toList()

    Owner.Branch.OOSSlices
      .where(\ p ->  p.WC7Line != null)
      .each(\ p ->  {
        var matchingSlicedScheduleExcl = p.WC7Line.ExclusionsFromCoverable.firstWhere(\ c -> c.FixedId == Owner.FixedId) as WC7LineScheduleExcl
        if (matchingSlicedScheduleExcl != null){
          matchingSlicedScheduleExcl.ScheduledItems.each(\ s -> {
            if(!schedItems.contains(s)) {
              schedItems.add(s)
            }
          })
        }
      })

    return schedItems.map(\ item -> item as WC7LineScheduleExclItem).toTypedArray()
  }

  override property get ScheduleNumberPropInfo() : IPropertyInfo {
    return WC7LineScheduleExclItem.Type.TypeInfo.getProperty("ScheduleNumber")
  }
}
