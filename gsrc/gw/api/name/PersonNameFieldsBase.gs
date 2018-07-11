package gw.api.name

uses java.lang.UnsupportedOperationException

/**
 * Base implementation of {@link PersonNameFields} that throws an exception for all setters, and returns null for most getters.
 * An exception is thrown for all getters and setters on Kanji fields, to prevent use of them in a PCF without implementing the values.
 */
@Export
class PersonNameFieldsBase implements PersonNameFields {

  override property get FirstName(): String {
    return null
  }

  override property set FirstName(value: String) {
    throw notSupported()
  }

  override property get MiddleName(): String {
    return null
  }

  override property set MiddleName(value: String) {
    throw notSupported()
  }

  override property get Particle(): String {
    return null
  }

  override property set Particle(value: String) {
    throw notSupported()
  }

  override property get LastName(): String {
    return null
  }

  override property set LastName(value: String) {
    throw notSupported()
  }

  override property get Prefix(): typekey.NamePrefix {
    return null
  }

  override property set Prefix(value: typekey.NamePrefix) {
    throw notSupported()
  }

  override property get Suffix(): typekey.NameSuffix {
    return null
  }

  override property set Suffix(value: typekey.NameSuffix) {
    throw notSupported()
  }

  override property get FirstNameKanji(): String {
    return null
  }

  override property set FirstNameKanji(value: String) {
    throw notSupported()
  }

  override property get LastNameKanji(): String {
    return null
  }

  override property set LastNameKanji(value: String) {
    throw notSupported()
  }

  override property get Name(): String {
    return null
  }

  override property set Name(value: String) {
    throw notSupported()
  }

  override property get NameKanji(): String {
    return null
  }

  override property set NameKanji(value: String) {
    throw notSupported()
  }

  private function notSupported() : UnsupportedOperationException {
    return new UnsupportedOperationException("Field is not supported")
  }
}