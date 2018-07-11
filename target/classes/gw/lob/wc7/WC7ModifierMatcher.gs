package gw.lob.wc7
uses gw.lob.common.AbstractModifierMatcher
uses gw.entity.IEntityPropertyInfo
uses java.lang.Iterable
uses gw.entity.ILinkPropertyInfo
uses gw.api.productmodel.ModifierPattern

/**
 * Matches {@link WC7Modifier}s based on the FK to the {@link WC7Jurisdiction}, the State and
 * PatternCode properties as well as the properties defined in {@link AbstractModifierMatcher}.
 */
@Export
class WC7ModifierMatcher extends AbstractModifierMatcher<WC7Modifier> {
  construct(owner : WC7Modifier) {
    super(owner)
  }
  
  override property get IdentityColumns() : Iterable<IEntityPropertyInfo> {
    if ((this._entity.Pattern as ModifierPattern).SplitOnAnniversary) {
      return { WC7Modifier.Type.TypeInfo.getProperty("State") as IEntityPropertyInfo,
               WC7Modifier.Type.TypeInfo.getProperty("PatternCode") as IEntityPropertyInfo }
    } else {
      return super.IdentityColumns
    }
  }
  
  override property get ParentColumns() : Iterable<ILinkPropertyInfo> {
    return { WC7Modifier.Type.TypeInfo.getProperty("WC7Jurisdiction") as ILinkPropertyInfo }
  }
}
