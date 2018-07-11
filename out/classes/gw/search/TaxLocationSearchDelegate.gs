package gw.search

uses gw.api.util.StateJurisdictionMappingUtil
uses gw.lob.common.TaxLocationSearchCriteria

@Export
class TaxLocationSearchDelegate extends AbstractGeneralLocationAddressDelegate {

  private var _searchCriteria: TaxLocationSearchCriteria

  construct(searchCriteria: TaxLocationSearchCriteria) {
    _searchCriteria = searchCriteria
  }

  // ----- Supported Fields ----- //

  override property get City(): String {
    return _searchCriteria.City
  }
  override property set City(c: String) {
    _searchCriteria.City = c
  }

  override property get CityKanji(): java.lang.String {
    return null
  }
  override property set CityKanji(value: java.lang.String) {
    notSupported("CityKanji")
  }

  override property get County(): String {
    return _searchCriteria.County
  }
  override property set County(cn: String) {
    _searchCriteria.County = cn
  }

  override property get Country(): Country {
    return null
  }
  override property set Country(c: Country) {
    notSupported("Country")
  }

  override property get PostalCode(): String {
    return null
  }
  override property set PostalCode(pc: String) {
    notSupported("PostalCode")
  }

  override property get State(): State {
    return StateJurisdictionMappingUtil.getStateMappingForJurisdiction(_searchCriteria.State)
  }
  override property set State(st: State) {
    _searchCriteria.State = StateJurisdictionMappingUtil.getJurisdictionMappingForState(st)
  }
}
