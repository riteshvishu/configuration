package gw.account

uses gw.api.name.PersonNameFieldsBase

@Export
class AccountSearchCriteriaDelegate extends PersonNameFieldsBase{
  private var _searchCriteria : AccountSearchCriteria

  construct(searchCriteria : AccountSearchCriteria) {
    _searchCriteria = searchCriteria
  }

  override property get FirstName(): String {
    return _searchCriteria.FirstName
  }

  override property set FirstName(value: String) {
    _searchCriteria.FirstName = value
  }

  override property get LastName(): String {
    return _searchCriteria.LastName
  }

  override property set LastName(value: String) {
    _searchCriteria.LastName = value
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
    return _searchCriteria.CompanyName
  }

  //Company Name
  override property set Name(value: String) {
    _searchCriteria.CompanyName = value
  }

  //Company Name
  override property get NameKanji(): String {
    return _searchCriteria.CompanyNameKanji
  }

  //Company Name
  override property set NameKanji(value : String) {
    _searchCriteria.CompanyNameKanji = value
  }
}