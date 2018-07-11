package gw.search

uses gw.api.address.AddressFillableExtension
uses java.lang.UnsupportedOperationException

@Export
abstract class AbstractReadOnlyAddressDelegate implements AddressFillableExtension {

    override property set AddressLine1(addr1 : String) {
      readOnlyField("AddressLine1")
    }

    override property set AddressLine2(addr2 : String) {
      readOnlyField("AddressLine2")
    }

    override property set City(c : String) {
      readOnlyField("City")
    }

    override property set Country(c : Country) {
      readOnlyField("Country")
    }

    override property set County(cnty : String) {
      readOnlyField("County")
    }

    override property set PostalCode(pc : String) {
      readOnlyField("PostalCode")
    }

    override property set State(st : State) {
      readOnlyField("State")
    }

    override property set AddressLine3(p0 : String) {
      readOnlyField("AddressLine3")
    }

    override property set AddressLine1Kanji(p0 : String) {
      readOnlyField("AddressLine1Kanji")
    }

    override property set AddressLine2Kanji(p0 : String) {
      readOnlyField("AddressLine2Kanji")
    }

    override property set CityKanji(p0 : String) {
      readOnlyField("CityKanji")
    }

    override property set CEDEX(p0: java.lang.Boolean) {
      readOnlyField("CEDEX")
    }

    override property set CEDEXBureau(p0 : String) {
      readOnlyField("CEDEXBureau")
    }

    // ----- Helper functions ----- //

    private static function readOnlyField(fieldName : String) : UnsupportedOperationException {
      return new UnsupportedOperationException("Field is read only; set is not supported for field: " + fieldName)
    }
  }
