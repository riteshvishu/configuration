package gw.search

uses gw.address.AddressArea
uses gw.api.address.AddressFillableExtension
uses java.lang.UnsupportedOperationException
uses gw.account.AccountSearchCriteria

@Export
class AccountAddressSearchDelegate implements AddressFillableExtension {

  private var _searchCriteria : AccountSearchCriteria

  construct(searchCriteria : AccountSearchCriteria) {
     _searchCriteria = searchCriteria
  }

  // ----- Supported Fields ----- //

  property get AddressLine1() : String {
    return _searchCriteria.AddressLine1
  }
  property set AddressLine1(addr1 : String) {
    _searchCriteria.AddressLine1 = addr1
  }

  property get AddressLine1Kanji() : String {
    return _searchCriteria.AddressLine1Kanji
  }
  property set AddressLine1Kanji(addr1Kanji : String) {
    _searchCriteria.AddressLine1Kanji = addr1Kanji
  }

  property get AddressLine2() : String {
    return _searchCriteria.AddressLine2
  }
  property set AddressLine2(addr2 : String) {
    _searchCriteria.AddressLine2 = addr2
  }

  property get AddressLine2Kanji() : String {
    return _searchCriteria.AddressLine2Kanji
  }
  property set AddressLine2Kanji(addr2Kanji : String) {
    _searchCriteria.AddressLine2Kanji = addr2Kanji
  }

  property get City() : String {
    return _searchCriteria.City
  }
  property set City(c : String) {
    _searchCriteria.City = c
  }

  property get CityKanji() : String {
    return _searchCriteria.CityKanji
  }
  property set CityKanji(c : String) {
    _searchCriteria.CityKanji = c
  }

  property get Country() : Country {
    return _searchCriteria.Country
  }
  property set Country(c : Country) {
    _searchCriteria.Country = c
  }

  property get County() : String {
    return _searchCriteria.County
  }
  property set County(cnty : String) {
    _searchCriteria.County = cnty
  }

  property get PostalCode() : String {
    return _searchCriteria.PostalCode
  }
  property set PostalCode(pc : String) {
    _searchCriteria.PostalCode = pc
  }

  property get State(): State {
    return _searchCriteria.State
  }
  property set State(st : State) {
    _searchCriteria.State = st
  }

  // ----- Unsupported Fields ----- //

  property get AddressLine3() : String {
    return null
  }
  property set AddressLine3(p0 : String) {
    notSupported()
  }

  property get CEDEX(): Boolean {
    return null
  }
  property set CEDEX(p0: java.lang.Boolean) {
    notSupported()
  }

  property get CEDEXBureau() : String {
    return null
  }
  property set CEDEXBureau(p0 : String) {
    notSupported()
  }

  // ----- Helper functions ----- //

  private static function notSupported() : UnsupportedOperationException {
    return new UnsupportedOperationException("Field is not supported")
  }
}
