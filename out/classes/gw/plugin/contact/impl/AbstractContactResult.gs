package gw.plugin.contact.impl
uses gw.plugin.contact.ContactResult
uses gw.plugin.contact.ContactCreator
uses gw.api.address.AddressFormatter

/**
 * Parent class of all OOTB implementations of the ContactResult interface.  Provides
 * default implementations of the overwriteContactFields method and PrimaryPhoneValue
 * property.  Sub-classes (including customer implementations) can choose to replace
 * or extend these methods if necessary.
 */
@Export
abstract class AbstractContactResult implements ContactResult {

  override property get DisplayName() : String {
    return (this.ContactType == typekey.Contact.TC_COMPANY) ? this.CompanyName : this.PersonDisplayName
  }

  property get PersonDisplayName() : String {
    return (this.ContactType == typekey.Contact.TC_PERSON) ? "${this.FirstName} ${this.LastName}" : null
  }

  override property get DisplayAddress() : String {
    return populateAddressFormatter().addressString(",", true, false)
  }

  override property get PrimaryPhoneValue() : String {
    if (PrimaryPhoneType == typekey.PrimaryPhoneType.TC_HOME) {
      return this.HomePhoneValue
    } else if (PrimaryPhoneType == typekey.PrimaryPhoneType.TC_WORK) {
      return this.WorkPhoneValue
    } else if (PrimaryPhoneType == typekey.PrimaryPhoneType.TC_MOBILE) {
      return this.CellPhoneValue
    }
    return null
  }

  override function hasAllRequiredFields() : boolean {
    return  this.hasName() and this.hasPrimaryAddress()
  }

  function hasName() : boolean {
    return (this.ContactType == typekey.Contact.TC_COMPANY) ?
            this.CompanyName.NotBlank :
           (this.FirstName.NotBlank and this.LastName.NotBlank)
  }

  function hasPrimaryAddress() : boolean {
    return this.PrimaryAddressLine1.NotBlank and
           this.PrimaryAddressCity.NotBlank and
           this.PrimaryAddressState != null and
           this.PrimaryAddressPostalCode.NotBlank and
           this.PrimaryAddressType != null
  }

  public override function convertToContactInNewBundleAndCommit() : Contact {
    var resultContact : Contact
    gw.transaction.Transaction.runWithNewBundle(\ bundle -> { resultContact = this.convertToContact(new ContactCreator(bundle))})
    return resultContact
  }


  private function populateAddressFormatter() : AddressFormatter {
    var addrFormatter = new AddressFormatter()
    addrFormatter.AddressLine1 = this.PrimaryAddressLine1
    addrFormatter.AddressLine2 = this.PrimaryAddressLine2
    addrFormatter.City = this.PrimaryAddressCity
    addrFormatter.County = this.PrimaryAddressCounty
    addrFormatter.PostalCode = this.PrimaryAddressPostalCode
    addrFormatter.State = this.PrimaryAddressState
    addrFormatter.Country = this.PrimaryAddressCountry
    addrFormatter.AddressLine1Kanji = this.AddressLine1Kanji
    addrFormatter.AddressLine2Kanji = this.AddressLine2Kanji
    addrFormatter.CityKanji = this.CityKanji
    return addrFormatter
  }

}
