package gw.lob.wc7.schedule

uses gw.lob.common.AbstractScheduleImpl
uses gw.api.productmodel.SchedulePropertyInfo
uses gw.lang.reflect.IPropertyInfo
uses gw.api.productmodel.ScheduleStringPropertyInfo
uses gw.api.productmodel.ScheduleTypeKeyPropertyInfo
uses gw.api.productmodel.ScheduleDatePropertyInfo
uses gw.api.productmodel.ScheduleIntegerPropertyInfo

/**
 * The implementation of schedules for line conditions.
 * 
 * Any newly defined line condition schedules should include a switch case in #PropertyInfos to define what the schedule column values are.
 * 
 * @see entity.WC7LineScheduleCond
 * @see AbstractScheduleImpl
 */
@Export
class WC7LineScheduleCondImpl extends AbstractScheduleImpl<entity.WC7LineScheduleCond> {

  construct(delegateOwner : entity.WC7LineScheduleCond) {
    super(delegateOwner)
  }

  override property get ScheduledItems() : ScheduledItem[] {
    return Owner.WC7LineScheduleCondItems
  }

  override function createAndAddScheduledItem() : ScheduledItem {
    var scheduledItem = new WC7LineScheduleCondItem(Owner.Branch)
    createAutoNumber(scheduledItem)
    Owner.addToWC7LineScheduleCondItems(scheduledItem)
    initializeScheduledItem(scheduledItem)
    return scheduledItem
  }

  override property get PropertyInfos() : SchedulePropertyInfo[] {
    switch (typeof Owner) {
        case WC7AlternateEmployerEndorsementACond:
          return {
            new ScheduleStringPropertyInfo("StringCol1", displaykey.Web.Policy.WC7.Schedule.AlternateEmployer, true),
            new ScheduleStringPropertyInfo("StringCol2", displaykey.Web.Policy.WC7.Schedule.Address, false),
            new WC7ScheduleJurisdictionPropertyInfo(Owner.WCLine, "TypeKeyCol1", displaykey.Web.Policy.WC7.Schedule.Employment, true),
            new ScheduleStringPropertyInfo(WC7ScheduledItem, "StringCol3", displaykey.Web.Policy.WC7.Schedule.ContractProject, false)
          }
         case WC7VoluntaryCompensationAndEmployersLiabilityCovCond:
          return {
            new WC7ScheduleJurisdictionPropertyInfo(Owner.WCLine, "TypeKeyCol1", displaykey.Web.Policy.WC7.Schedule.StateEmployment, true),
            new ScheduleStringPropertyInfo("StringCol1", displaykey.Web.Policy.WC7.Schedule.Name, false),
            new ScheduleTypeKeyPropertyInfo("TypeKeyCol2", displaykey.Web.Policy.WC7.Schedule.TitleRelationship, typekey.Relationship, null, true)
         }
          case WC7LongshoreAndHarborWorkersCompensationActRatCond:
          return {
            new WC7ScheduleJurisdictionPropertyInfo(Owner.WCLine, "TypeKeyCol1", displaykey.Web.Policy.WC7.Schedule.StateEmployment, true),
            new ScheduleDatePropertyInfo("DateCol1", displaykey.Web.Policy.WC7.Schedule.DateOfChange, true),
            new ScheduleIntegerPropertyInfo("IntCol1", displaykey.Web.Policy.WC7.Schedule.PercentChange, false)
          }
          case WC7RateChangeEndorsementCond:
          return {
            new WC7ScheduleJurisdictionPropertyInfo(Owner.WCLine, "TypeKeyCol1", displaykey.Web.Policy.WC7.Schedule.State, true),
            new ScheduleDatePropertyInfo("DateCol1", displaykey.Web.Policy.WC7.Schedule.DateOfChange, true),
            new ScheduleIntegerPropertyInfo("IntCol1", displaykey.Web.Policy.WC7.Schedule.StateCoverageChangePercent, false),
            new ScheduleIntegerPropertyInfo(WC7ScheduledItem, "IntCol2", displaykey.Web.Policy.WC7.Schedule.LongshoreHarborWorkersActCoveragePercent, false)
         }
         
        default:
          return super.PropertyInfos
    }
  }
  
  override function removeScheduledItem(item : ScheduledItem) {
    Owner.removeFromWC7LineScheduleCondItems(item as WC7LineScheduleCondItem)
    renumberAutoNumberSequence()
  }

  override property get CurrentAndFutureScheduledItems() : KeyableBean[] {
    var schedItems = Owner.ScheduledItems.toList()

    Owner.Branch.OOSSlices
      .where(\ p ->  p.WC7Line != null)
      .each(\ p ->  {
        var matchingSlicedScheduleCond = p.WC7Line.ConditionsFromCoverable.firstWhere(\ c -> c.FixedId == Owner.FixedId) as WC7LineScheduleCond
        if (matchingSlicedScheduleCond != null){
          matchingSlicedScheduleCond.ScheduledItems.each(\ s -> {
            if(!schedItems.contains(s)) {
              schedItems.add(s)
            }
          })
        }
      })

    return schedItems.map(\ item -> item as WC7LineScheduleCondItem).toTypedArray()
  }

  override property get ScheduleNumberPropInfo() : IPropertyInfo {
    return WC7LineScheduleCondItem.Type.TypeInfo.getProperty("ScheduleNumber")
  }  
}