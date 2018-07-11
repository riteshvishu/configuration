package gw.api.name

@Export
class OrganizationNameSearchDelegate implements ContactNameFields {

  private var _criteria: entity.OrganizationSearchCriteria

  construct(org : OrganizationSearchCriteria) {
    _criteria = org
  }

  override property get Name() : String {
    return _criteria.Name
  }

  override property set Name(n : String) {
    _criteria.Name = n
  }

  override property get NameKanji() : String {
    return _criteria.NameKanji
  }

  override property set NameKanji(nk : String) {
    _criteria.NameKanji = nk
  }
}