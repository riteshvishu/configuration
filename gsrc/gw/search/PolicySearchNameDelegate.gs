package gw.search

uses gw.api.name.PersonNameFieldsBase
uses org.omg.PortableServer._ServantActivatorStub
uses java.lang.UnsupportedOperationException
uses gw.api.name.ContactNameFields

/**
 * Translates between a PolicySearchName Delegate and person name fields.
 */
@Export
class PolicySearchNameDelegate extends PersonNameFieldsBase {

  private var _searchCriteria : PolicySearchCriteria

  construct(searchCriteria : PolicySearchCriteria) {
    _searchCriteria = searchCriteria
  }

  override property get FirstName(): String {
    return _searchCriteria.NameCriteria.FirstName
  }

  override property set FirstName(value: String) {
    _searchCriteria.NameCriteria.FirstName = value
  }

  override property get Particle(): String {
    return _searchCriteria.Particle
  }

  override property set Particle(value: String) {
    _searchCriteria.Particle = value
  }

  override property get LastName(): String {
    return _searchCriteria.NameCriteria.LastName
  }

  override property set LastName(value: String) {
    _searchCriteria.NameCriteria.LastName = value
  }

  override property get FirstNameKanji(): String {
    return _searchCriteria.FirstNameKanji
  }

  override property set FirstNameKanji(value: String) {
    _searchCriteria.FirstNameKanji = value
  }

  override property get LastNameKanji(): String {
    return _searchCriteria.LastNameKanji
  }

  override property set LastNameKanji(value: String) {
    _searchCriteria.LastNameKanji = value
  }

  //Company Name
  override property get Name(): String {
    return _searchCriteria.NameCriteria.CompanyName
  }

  //Company Name
  override property set Name(value: String) {
    _searchCriteria.NameCriteria.CompanyName = value
  }

  // Kanji Company Name
  override property get NameKanji(): String {
    return _searchCriteria.CompanyNameKanji
  }

  // Kanji Company Name
  override property set NameKanji(value: String) {
    _searchCriteria.CompanyNameKanji = value
  }
}