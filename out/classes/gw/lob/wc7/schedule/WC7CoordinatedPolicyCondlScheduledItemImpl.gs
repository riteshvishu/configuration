package gw.lob.wc7.schedule

uses gw.api.domain.Clause

/**
 * The implementation of {@link WC7SpecificScheduledItem} for {@link entity.WC7CoordinatedPolicy}
 */
@Export
class WC7CoordinatedPolicyCondlScheduledItemImpl implements WC7SpecificScheduledItem {
  
  var _coordinatedPolicy : WC7CoordinatedPolicy as readonly Owner
  
  construct(coordinatedPolicy : WC7CoordinatedPolicy) {
    _coordinatedPolicy = coordinatedPolicy
  }

  override property get ParentClause() : Clause {
    return _coordinatedPolicy.MultipleCoordindatedPolicyCond
  }
}
