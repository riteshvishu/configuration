package gw.search

uses gw.plugin.contact.ContactResult
uses java.lang.UnsupportedOperationException

@Export
class ContactResultAddressDelegate extends AbstractReadOnlyAddressDelegate {

  private var _contactResult : ContactResult

  construct(searchCriteria : ContactResult) {
     _contactResult = searchCriteria
  }

  // ----- Supported Fields ----- //

  override property get AddressLine1() : String {
    return _contactResult.PrimaryAddressLine1
  }

  override property get AddressLine2() : String {
    return _contactResult.PrimaryAddressLine2
  }

  override property get City() : String {
    return _contactResult.PrimaryAddressCity
  }

  override property get Country() : Country {
    return _contactResult.PrimaryAddressCountry
  }

  override property get County() : String {
    return _contactResult.PrimaryAddressCounty
  }

  override property get PostalCode() : String {
    return _contactResult.PrimaryAddressPostalCode
  }

  override property get State(): State {
    return _contactResult.PrimaryAddressState
  }

  override property get AddressLine3() : String {
    return _contactResult.PrimaryAddressLine3
  }

  // ----- Unsupported Fields ----- //
  override property get AddressLine1Kanji() : String {
    return null
  }
  override property set AddressLine1Kanji(p0 : String) {
    notSupported("AddressLine1Kanji")
  }

  override property get AddressLine2Kanji() : String {
    return null
  }
  override property set AddressLine2Kanji(p0 : String) {
    notSupported("AddressLine2Kanji")
  }

  override property get CityKanji() : String {
    return null
  }
  override property set CityKanji(p0 : String) {
    notSupported("CityKanji")
  }

  override property get CEDEX(): Boolean {
    return null
  }
  override property set CEDEX(p0: java.lang.Boolean) {
    notSupported("CEDEX")
  }

  override property get CEDEXBureau() : String {
    return null
  }
  override property set CEDEXBureau(p0 : String) {
    notSupported("CEDEXBureau")
  }

  // ----- Helper functions ----- //

  private static function notSupported(fieldName : String) : UnsupportedOperationException {
    return new UnsupportedOperationException("The following field is not supported: " + fieldName)
  }
}
