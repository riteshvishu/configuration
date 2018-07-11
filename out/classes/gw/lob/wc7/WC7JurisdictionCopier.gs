package gw.lob.wc7
uses gw.api.copier.AbstractEffDatedCopyable

@Export
class WC7JurisdictionCopier extends AbstractEffDatedCopyable<WC7Jurisdiction> {

  construct(jurisdiction : WC7Jurisdiction) {
    super(jurisdiction)
  }

  override function copyBasicFieldsFromBean(p0 : WC7Jurisdiction) {
    // nothing to do
  }

}
