package gw.lob.wc7

uses gw.entity.ILinkPropertyInfo
uses gw.lob.common.AbstractConditionMatcher

/**
 * Matches {@link WC7WorkersCompCond}s based on the FK to the {@link WCLine} as well as the
 * properties defined in {@link AbstractConditionMatcher}.
 */
@Export
class WC7WorkersCompCondMatcher extends AbstractConditionMatcher<WC7WorkersCompCond>{

  construct(owner : WC7WorkersCompCond) {
    super(owner)
  }
  override property get Parent() : ILinkPropertyInfo {
    return WC7WorkersCompCond.Type.TypeInfo.getProperty("WCLine") as ILinkPropertyInfo
  }

}
