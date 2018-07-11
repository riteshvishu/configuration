package gw.solr

uses gw.search.AbstractNonKanjiAddressDelegate

@Export
class SolrPolicySearchAddressDelegate extends AbstractNonKanjiAddressDelegate {

  private var _searchCriteria : SolrPolicySearchCriteria

  construct(searchCriteria: SolrPolicySearchCriteria) {
    _searchCriteria = searchCriteria
  }

  // ----- Supported Fields ----- //

  override property get AddressLine1() : String {
    return _searchCriteria.StreetCriteria
  }
  override property set AddressLine1(addr : String) {
    _searchCriteria.StreetCriteria = addr
  }

  override property get AddressLine2() : String {
    return null
  }
  override property set AddressLine2(addr : String) {
    notSupported("AddressLine2")
  }

  override property get AddressLine3() : String {
    return null
  }
  override property set AddressLine3(addr : String) {
    notSupported("AddressLine3")
  }

  override property get City() : String {
    return _searchCriteria.CityCriteria
  }
  override property set City(c : String) {
    _searchCriteria.CityCriteria = c
  }

  override property get PostalCode() : String {
    return _searchCriteria.PostalCodeCriteria
  }

  override property set PostalCode(pc : String) {
    _searchCriteria.PostalCodeCriteria = pc
  }

  override property get State(): State {
    return _searchCriteria.StateCriteria
  }

  override property set State(st : State) {
    _searchCriteria.StateCriteria = st
  }

  override property get Country() : Country {
    return _searchCriteria.CountryCriteria
  }

  override property set Country(c : Country) {
    _searchCriteria.CountryCriteria = c
  }

  override property get County() : String {
    return null
  }

  override property set County(c: String) {
    notSupported("County")
  }

  override property get CEDEX(): Boolean {
    return null
  }

  override property set CEDEX(value: java.lang.Boolean) {
    notSupported("CEDEX")
  }

  override property get CEDEXBureau(): java.lang.String {
    return null
  }

  override property set CEDEXBureau(value: java.lang.String) {
    notSupported("CEDEXBureau")
  }

}
