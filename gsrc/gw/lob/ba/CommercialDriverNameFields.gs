package gw.lob.ba

uses gw.api.name.PersonNameFieldsBase

@Export
class CommercialDriverNameFields extends PersonNameFieldsBase {

  var _driver : CommercialDriver

  construct(driver : CommercialDriver) {
    this._driver = driver
  }

  override property get FirstName(): String {
    return _driver.FirstName
  }

  override property set FirstName(value: String) {
    _driver.FirstName = value
  }

  override property get LastName(): String {
    return _driver.LastName
  }

  override property set LastName(value: String) {
    _driver.LastName = value
  }

  override property get FirstNameKanji(): String {
    return _driver.FirstNameKanji
  }

  override property set FirstNameKanji(value: String) {
    _driver.FirstNameKanji = value
  }

  override property get LastNameKanji(): String {
    return _driver.LastNameKanji
  }

  override property set LastNameKanji(value: String) {
    _driver.LastNameKanji = value
  }
}