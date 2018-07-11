package gw.lob.wc7

uses gw.coverage.AbstractCoverageMatcher
uses gw.entity.ILinkPropertyInfo

/**
 * Matches {@link WC7WorkersCompCov}s based on the FK to the {@link WCLine} as well as the
 * properties defined in {@link AbstractCoverageMatcher}.
 */
@Export
class WC7WorkersCompCovMatcher extends AbstractCoverageMatcher<WC7WorkersCompCov> {

  construct(owner : WC7WorkersCompCov) {
    super(owner)
  }

  override property get CoverableColumns() : List<ILinkPropertyInfo> {
    return {WC7WorkersCompCov.Type.TypeInfo.getProperty("WCLine") as ILinkPropertyInfo}
  }

}