package gw.lob.wc7.rating

uses entity.WC7RetrospectiveRatingPlan

uses gw.api.logicalmatch.AbstractEffDatedPropertiesMatcher
uses gw.entity.IEntityPropertyInfo
uses gw.entity.ILinkPropertyInfo

uses java.lang.Iterable

/**
 * Matches {@link WC7RetrospectiveRatingPlan}s based on the FK to the {@link WC7WorkersCompLine}.
 */
@Export
class WC7RetrospectiveRatingPlanMatcher extends AbstractEffDatedPropertiesMatcher<WC7RetrospectiveRatingPlan> {

  construct(owner : WC7RetrospectiveRatingPlan) {
    super(owner)
  }

  override property get IdentityColumns() : Iterable<IEntityPropertyInfo> {
    return {}
  }

  override property get ParentColumns() : Iterable<ILinkPropertyInfo> {
    return {WC7RetrospectiveRatingPlan.Type.TypeInfo.getProperty("WC7WorkersCompLine") as ILinkPropertyInfo}
  }

}
