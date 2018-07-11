package gw.search

uses gw.address.AddressArea

@Export
class AddressAreaDelegate extends AbstractGeneralLocationAddressDelegate {

  private var _addressArea : AddressArea

  // ----- Supported Fields ----- //

  construct(addrArea : AddressArea) {
    _addressArea = addrArea
  }

  override property get City() : String {
    return _addressArea.City
  }
  override property set City(c : String) {
    _addressArea.City = c
  }

  override property get CityKanji(): String {
    return _addressArea.CityKanji
  }
  override property set CityKanji(c : String) {
    _addressArea.CityKanji = c
  }

  override property get Country() : Country {
    return _addressArea.Country
  }
  override property set Country(c : Country) {
    _addressArea.Country = c
  }

  override property get County() : String {
    return _addressArea.County
  }
  override property set County(cnty : String) {
    _addressArea.County = cnty
  }

  override property get PostalCode() : String {
    return _addressArea.PostalCode
  }
  override property set PostalCode(pc : String) {
    _addressArea.PostalCode = pc
  }

  override property get State(): State {
    return _addressArea.State
  }
  override property set State(st : State) {
    _addressArea.State = st
  }
}
