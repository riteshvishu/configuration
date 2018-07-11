package gw.search

uses gw.api.address.AddressFillableExtension
uses gw.api.util.StateJurisdictionMappingUtil
uses gw.lob.common.TerritoryLookupCriteria
uses java.lang.UnsupportedOperationException

@Export
class TerritoryCodeSearchDelegate implements AddressFillableExtension {

    private var _searchCriteria : TerritoryLookupCriteria

    construct(searchCriteria: TerritoryLookupCriteria) {
      _searchCriteria = searchCriteria
    }

    override property get AddressLine1() : String {
      return null
    }

    override property set AddressLine1(p0 : String) {
      notSupported()
    }

    override property get AddressLine2() : String {
      return null
    }

    override property set AddressLine2(p0 : String) {
      notSupported()
    }

    override property get AddressLine3() : String {
      return null
    }

    override property set AddressLine3(p0 : String) {
      notSupported()
    }

    override property get City() : String {
      return _searchCriteria.City
    }

    override property set City(c : String) {
      _searchCriteria.City = c
    }

    override property get Country() : Country {
      return null
    }

    override property set Country(c : Country) {
      notSupported()
    }

    override property get County() : String {
      return _searchCriteria.County
    }

    override property set County(cn : String) {
      _searchCriteria.County = cn
    }

    override property get PostalCode() : String {
      return _searchCriteria.PostalCode
    }

    override property set PostalCode(pc : String) {
      _searchCriteria.PostalCode = pc
    }

    override property get State(): State {
      return StateJurisdictionMappingUtil.getStateMappingForJurisdiction(_searchCriteria.State)
    }

    override property set State(st : State) {
      _searchCriteria.State = StateJurisdictionMappingUtil.getJurisdictionMappingForState(st)
    }

    override property get AddressLine1Kanji() : String {
      return null
    }

    override property set AddressLine1Kanji(p0 : String) {
      notSupported()
    }

    override property get AddressLine2Kanji() : String {
      return null
    }

    override property set AddressLine2Kanji(p0 : String) {
      notSupported()
    }

    override property get CityKanji() : String {
      return null
    }

    override property set CityKanji(p0 : String) {
      notSupported()
    }

    override property get CEDEX(): Boolean {
      return null
    }

    override property set CEDEX(p0: java.lang.Boolean) {
      notSupported()
    }

    override property get CEDEXBureau() : String {
      return null
    }

    override property set CEDEXBureau(p0 : String) {
      notSupported()
    }

    private static function notSupported() : UnsupportedOperationException {
      return new UnsupportedOperationException("Field is not supported")
    }

}
