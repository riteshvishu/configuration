package gw.search

uses gw.api.address.AddressFillableExtension
uses java.lang.UnsupportedOperationException

/**
 * Intended for use with address delegates that use address fields primarily interested in
 * city, state, county, postal code and country (removes the need to implement unsupported fields)
 */
@Export
abstract class AbstractGeneralLocationAddressDelegate implements AddressFillableExtension {

  // ----- Unsupported Fields ----- //
  override property get AddressLine1() : String {
    return null
  }
  override property set AddressLine1(p0 : String) {
    notSupported("AddressLine1")
  }

  override property get AddressLine2() : String {
    return null
  }
  override property set AddressLine2(p0 : String) {
    notSupported("AddressLine2")
  }

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

  override property get AddressLine3() : String {
    return null
  }
  override property set AddressLine3(p0 : String) {
    notSupported("AddressLine3")
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

  protected static function notSupported(fieldName : String) : UnsupportedOperationException {
    return new UnsupportedOperationException("The following field is not supported: " + fieldName)
  }

}
