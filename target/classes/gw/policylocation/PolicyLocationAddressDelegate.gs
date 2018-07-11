package gw.policylocation

uses gw.api.address.AddressFillableExtension
uses java.lang.UnsupportedOperationException
uses gw.api.address.AddressFillable

/**
 * This delegate is used as an AddressFillableExtension adapter to a policyLocation entity.
 */
@Export
class PolicyLocationAddressDelegate implements AddressFillableExtension {

  private var _policyLocation: policyLocation

  construct(policyLocation: policyLocation) {
    _policyLocation = policyLocation
  }

  override property get AddressLine1(): String {
    return _policyLocation.AddressLine1
  }

  override property set AddressLine1(value: String) {
    _policyLocation.AddressLine1 = value
  }

  override property get AddressLine2(): String {
    return _policyLocation.AddressLine2
  }

  override property set AddressLine2(value: String) {
    _policyLocation.AddressLine2 = value
  }

  override property get AddressLine3(): String {
    return _policyLocation.AddressLine3
  }

  override property set AddressLine3(value: String) {
    _policyLocation.AddressLine3 = value
  }

  override property get City(): String {
    return _policyLocation.City
  }

  override property set City(value: String) {
    _policyLocation.City = value
  }

  override property get Country(): Country {
    return _policyLocation.Country
  }

  override property set Country(value: Country) {
    _policyLocation.Country = value
  }

  override property get County(): String {
    return _policyLocation.County
  }

  override property set County(value: String) {
    _policyLocation.County = value
  }

  override property get PostalCode(): String {
    return _policyLocation.PostalCode
  }

  override property set PostalCode(value: String) {
    _policyLocation.PostalCode = value
  }

  override property get State(): State {
    return _policyLocation.State
  }

  override property set State(value: State) {
    _policyLocation.State = value
  }

  override property get AddressLine1Kanji(): String {
    return _policyLocation.AddressLine1Kanji
  }

  override property set AddressLine1Kanji(value: String) {
    _policyLocation.AddressLine1Kanji = value
  }

  override property get AddressLine2Kanji(): String {
    return _policyLocation.AddressLine2Kanji
  }

  override property set AddressLine2Kanji(value: String) {
    _policyLocation.AddressLine2Kanji = value
  }

  override property get CityKanji(): String {
    return _policyLocation.CityKanji
  }

  override property set CityKanji(value: String) {
    _policyLocation.CityKanji = value
  }

  override property get CEDEX(): Boolean {
    return _policyLocation.CEDEX
  }

  override property set CEDEX(value: Boolean) {
    _policyLocation.CEDEX = value
  }

  override property get CEDEXBureau(): String {
    return _policyLocation.CEDEXBureau
  }

  override property set CEDEXBureau(value: String) {
    _policyLocation.CEDEXBureau = value
  }

  // ----- Helper functions ----- //

  protected static function notSupported(fieldName : String) : UnsupportedOperationException {
    return new UnsupportedOperationException("The following field is not supported: " + fieldName)
  }
}

