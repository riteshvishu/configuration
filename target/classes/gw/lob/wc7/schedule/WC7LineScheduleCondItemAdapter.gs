package gw.lob.wc7.schedule

uses gw.lob.common.AbstractScheduledItemAdapter
uses gw.api.productmodel.Schedule
uses gw.api.domain.Clause
uses gw.policy.PolicyLineConfiguration

/**
 * An implementation of {@link gw.api.productmodel.ScheduledItemAdapter} for {@link entity.WC7LineScheduleCondItem}
 */
@Export
class WC7LineScheduleCondItemAdapter extends AbstractScheduledItemAdapter {

  var _owner : WC7LineScheduleCondItem  as readonly Owner

  construct(item : WC7LineScheduleCondItem) {
    _owner = item
  }
  
  override property get ScheduleParent() : Schedule {
    return _owner.Schedule
  }

  override property get PolicyLine() : PolicyLine {
    return _owner.Schedule.WCLine
  }

  override property get Clause() : Clause {
    return null
  }

  override function hasClause() : boolean {
    return false
  }
  
  override property get DefaultCurrency() : Currency {
    return _owner.Schedule.WCLine.PreferredCoverageCurrency
  }

  override property get AllowedCurrencies() : List<Currency> {
    return PolicyLineConfiguration.get(InstalledPolicyLine.TC_WC7).AllowedCurrencies
  }

}
