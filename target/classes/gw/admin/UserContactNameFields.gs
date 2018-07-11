package gw.admin

uses gw.api.name.PersonNameFieldsBase

@Export
class UserContactNameFields extends PersonNameFieldsBase {

  var _userContact : UserContact

  construct(userContact : UserContact) {
    this._userContact = userContact
  }

  override property get FirstName(): java.lang.String {
    return _userContact.FirstName
  }

  override property set FirstName(value: java.lang.String) {
    _userContact.FirstName = value
  }

  override property get LastName(): java.lang.String {
    return _userContact.LastName
  }

  override property set LastName(value: java.lang.String) {
    _userContact.LastName = value
  }

  override property get FirstNameKanji(): java.lang.String {
    return _userContact.FirstNameKanji
  }

  override property set FirstNameKanji(value: java.lang.String) {
    _userContact.FirstNameKanji = value
  }

  override property get LastNameKanji(): java.lang.String {
    return _userContact.LastNameKanji
  }

  override property set LastNameKanji(value: java.lang.String) {
    _userContact.LastNameKanji = value
  }

  override property get Particle() : java.lang.String {
    return _userContact.Particle
  }

  override property set Particle(value : java.lang.String) {
    _userContact.Particle = value
  }
}