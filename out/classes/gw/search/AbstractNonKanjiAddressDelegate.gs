package gw.search

uses gw.api.address.AddressFillableExtension
uses java.lang.UnsupportedOperationException

/**
 * Provides unsupported implementation for kanji related fields
 */
@Export
abstract class AbstractNonKanjiAddressDelegate implements AddressFillableExtension {

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

  // ----- Helper functions ----- //

  protected static function notSupported(fieldName : String) : UnsupportedOperationException {
    return new UnsupportedOperationException("The following field is not supported: " + fieldName)
  }

}
