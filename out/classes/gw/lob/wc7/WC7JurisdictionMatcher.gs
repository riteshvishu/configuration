package gw.lob.wc7

uses gw.api.logicalmatch.AbstractEffDatedPropertiesMatcher
uses gw.entity.IEntityPropertyInfo

uses java.lang.Iterable

/**
 * Matches {@link WC7Jurisdiction}s based on the FK to the {@link Jurisdiction}.
 */
@Export
class WC7JurisdictionMatcher extends AbstractEffDatedPropertiesMatcher<WC7Jurisdiction> {

  construct(jurisdiction : WC7Jurisdiction) {
    super(jurisdiction)
  }

  override property get IdentityColumns() : Iterable<IEntityPropertyInfo> {
    return {WC7Jurisdiction.Type.TypeInfo.getProperty("Jurisdiction") as IEntityPropertyInfo}
  }

}
