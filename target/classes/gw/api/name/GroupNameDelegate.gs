package gw.api.name

@Export
class GroupNameDelegate implements ContactNameFields {

  private var _group : entity.Group

  construct(grp : Group) {
    _group = grp
  }

  override property get Name() : String {
    return _group.Name
  }

  override property set Name(n : String) {
    _group.Name = n
  }

  override property get NameKanji(): String {
    return _group.NameKanji
  }

  override property set NameKanji(nk : String) {
    _group.NameKanji = nk
  }
}