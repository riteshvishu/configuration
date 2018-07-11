package gw.lob.wc7

uses gw.api.logicalmatch.AbstractEffDatedPropertiesMatcher
uses gw.entity.IEntityPropertyInfo
uses gw.entity.ILinkPropertyInfo

uses java.lang.Iterable

/**
 * {@link WC7AtomicEnergyExposure}s do not have enough sufficiently unique columns to define matches in
 * the out of the box config, thus this matcher will return false when asked for matches.
 */
@Export
class WC7AtomicEnergyExposureMatcher extends AbstractEffDatedPropertiesMatcher<WC7AtomicEnergyExposure> {

  construct(delegateInstance : WC7AtomicEnergyExposure) {
    super(delegateInstance)
  }

  override property get IdentityColumns() : Iterable<IEntityPropertyInfo> {
    return {WC7AtomicEnergyExposure.Type.TypeInfo.getProperty("ID") as IEntityPropertyInfo }
  }

  override property get ParentColumns() : Iterable<ILinkPropertyInfo> {
    return {WC7AtomicEnergyExposure.Type.TypeInfo.getProperty("Location") as ILinkPropertyInfo}
  }

  // OOTB, WC7AtomicEnergyExposure entities are not matchable.  Customers should delete the overridden
  // isLogicalMatch() method and implement the IdentityColumns property if they would like to match
  // these entities (e.g. if a unique WC7 atomic energy exposure identifier was created and used).

  override function isLogicalMatch(other : WC7AtomicEnergyExposure) : boolean {
    return false
  }

  override function isLogicalMatchUntyped(bean : KeyableBean) : boolean {
    if (bean typeis WC7AtomicEnergyExposure) {
      return isLogicalMatch(bean)
    } else {
      return false
    }
  }
}
