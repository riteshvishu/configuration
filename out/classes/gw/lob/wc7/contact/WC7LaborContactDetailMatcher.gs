package gw.lob.wc7.contact

uses gw.api.logicalmatch.AbstractEffDatedPropertiesMatcher
uses gw.entity.IEntityPropertyInfo
uses gw.entity.ILinkPropertyInfo
uses java.lang.Iterable

/**
 * {@link WC7LaborContactDetail}s do not have enough sufficiently unique columns to define matches in
 * the out of the box config, thus this matcher will return false when asked for matches.
 */
@Export
class WC7LaborContactDetailMatcher extends AbstractEffDatedPropertiesMatcher<WC7LaborContactDetail> {

  construct(contactDetail : WC7LaborContactDetail) {
    super(contactDetail)
  }

  override property get IdentityColumns() : Iterable<IEntityPropertyInfo> {
    return {WC7LaborContactDetail.Type.TypeInfo.getProperty("ID") as IEntityPropertyInfo}
  }

  override property get ParentColumns() : Iterable<ILinkPropertyInfo> {
    return { WC7LaborContactDetail.Type.TypeInfo.getProperty("WC7LaborContact") as ILinkPropertyInfo }
  }

  // OOTB, WC7LaborContactDetail entities are not matchable.  Customers should delete the overridden
  // isLogicalMatch() method and implement the IdentityColumns property if they would like to match
  // these entities (e.g. if a unique WC labor contact detail identifier was created and used).

  override function isLogicalMatch(other : WC7LaborContactDetail) : boolean {
    return false
  }

  override function isLogicalMatchUntyped(bean : KeyableBean) : boolean {
    if (bean typeis WC7LaborContactDetail) {
      return isLogicalMatch(bean)
    } else {
      return false
    }
  }  
}
