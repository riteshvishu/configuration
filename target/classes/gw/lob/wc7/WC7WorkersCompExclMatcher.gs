package gw.lob.wc7

uses gw.entity.ILinkPropertyInfo
uses gw.lob.common.AbstractExclusionMatcher

/**
 * Matches {@link WC7WorkersCompExcl}s based on the FK to the {@link WCLine} as well as the
 * properties defined in {@link AbstractExclusionMatcher}.
 */
@Export
class WC7WorkersCompExclMatcher extends AbstractExclusionMatcher<WC7WorkersCompExcl>{

  construct(owner : WC7WorkersCompExcl) {
    super(owner)
  }
  
  override property get Parent() : ILinkPropertyInfo {
    return WC7WorkersCompExcl.Type.TypeInfo.getProperty("WCLine") as ILinkPropertyInfo
  }

}
