package gw.lob.wc7

uses gw.coverage.AbstractCoverageMatcher
uses gw.entity.ILinkPropertyInfo

/**
 * Matches {@link WC7JurisdictionCov}s based on the FK to the {@link WC7Jurisdiction} as well as the
 * properties defined in {@link AbstractCoverageMatcher}.
 */
@Export
class WC7JurisdictionCovMatcher extends AbstractCoverageMatcher<WC7JurisdictionCov> {

  construct(owner : WC7JurisdictionCov) {
    super(owner)
  }

  override property get CoverableColumns() : List<ILinkPropertyInfo> {
    return {WC7JurisdictionCov.Type.TypeInfo.getProperty("WC7Jurisdiction") as ILinkPropertyInfo}
  }

}