package gw.lob.wc7
uses gw.lob.common.AbstractRateFactorMatcher
uses gw.entity.ILinkPropertyInfo
uses java.lang.Iterable

/**
 * Matches {@link WC7RateFactor}s based on the FK to the {@link WC7Modifier} as well as the
 * properties defined in {@link AbstractRateFactorMatcher}.
 */
@Export
class WC7RateFactorMatcher extends AbstractRateFactorMatcher<WC7RateFactor> {
  construct(owner : WC7RateFactor) {
    super(owner)
  }

  override property get ParentColumns() : Iterable<ILinkPropertyInfo> {
    return {WC7RateFactor.Type.TypeInfo.getProperty("WC7Modifier") as ILinkPropertyInfo};
  }
}
