package gw.api.name


@Export
class GroupNameToGroupSearchDelegate implements ContactNameFields {

  private var _criteria: entity.GroupSearchCriteria

  construct(grp : GroupSearchCriteria) {
    _criteria = grp
  }

  override property get Name(): java.lang.String {
    return _criteria.GroupName
  }

  override property set Name(n : String) {
    _criteria.GroupName = n
  }

  override property get NameKanji(): java.lang.String {
    return _criteria.GroupNameKanji
  }

  override property set NameKanji(nk : String) {
    _criteria.GroupNameKanji = nk
  }
}