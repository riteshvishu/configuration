package gw.lob.wc7

uses gw.api.logicalmatch.AbstractEffDatedPropertiesMatcher
uses gw.entity.IEntityPropertyInfo
uses gw.entity.ILinkPropertyInfo

uses java.lang.Iterable

/**
 * Matches {@link WC7ParticipatingPlan}s based on the FK to the {@link WCLine}.
 */
@Export
class WC7ParticipatingPlanMatcher extends AbstractEffDatedPropertiesMatcher<WC7ParticipatingPlan> {

  construct(owner : WC7ParticipatingPlan) {
    super(owner)
  }

  override property get IdentityColumns() : Iterable<IEntityPropertyInfo> {
    return {}
  }

  override property get ParentColumns() : Iterable<ILinkPropertyInfo> {
    return {WC7ParticipatingPlan.Type.TypeInfo.getProperty("WC7WorkersCompLine") as ILinkPropertyInfo}
  }
}
