package gw.lob.wc7.schedule

uses gw.api.domain.Clause

/**
 * The implementation of {@link WC7SpecificScheduledItem} for {@link entity.WC7ExcludedWorkplace}
 */
@Export
class WC7DesignatedWorkplacesExclScheduledItemImpl implements WC7SpecificScheduledItem {
  
  var _excludedWorkplace : WC7ExcludedWorkplace as readonly Owner
  
  construct(excludedWorkplace : WC7ExcludedWorkplace) {
    _excludedWorkplace = excludedWorkplace
  }

  override property get ParentClause() : Clause {
    return _excludedWorkplace.DesignatedWorkplacesExcl
  }
}
