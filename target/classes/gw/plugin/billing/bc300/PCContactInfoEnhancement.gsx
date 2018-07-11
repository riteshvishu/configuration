package gw.plugin.billing.bc300
uses soap.BCBillingSystemAPI.entity.PCContactInfo
uses soap.BCBillingSystemAPI.entity.AddressInfo
uses java.util.ArrayList

@Export
enhancement PCContactInfoEnhancement : PCContactInfo
{
  function sync(contact : Contact) {
    this.ContactType = contact typeis Person ? ContactType.TC_PERSON.Code 
      : ContactType.TC_COMPANY.Code
    if(contact typeis Company){
      this.Name = contact.Name
    }else{
      this.FirstName = (contact as Person).FirstName
      this.LastName = (contact as Person).LastName
    }
    // this.AddressBookUID = contact.AddressBookUID
    this.PublicID = contact.PublicID
    this.EmailAddress1 = contact.EmailAddress1
    this.WorkPhone = contact.WorkPhone

    var addresses = new ArrayList<AddressInfo>()
    for(address in contact.AllAddresses){
      var addressInfo = new AddressInfo()
      addressInfo.AddressLine1 = address.AddressLine1
      addressInfo.AddressLine2 = address.AddressLine2
      addressInfo.City = address.City
      addressInfo.State = address.State.Code
      addressInfo.PostalCode = address.PostalCode
      addressInfo.Country = address.Country.Code
      addressInfo.Primary = (address == contact.PrimaryAddress)
      addresses.add(addressInfo)
    }
    this.Addresses = addresses.toTypedArray()
    // send the list of accounts to BC so that BC can update their names
    var accountNumbers = new ArrayList<String>()
    for(account in contact.findHeldAccounts()){
      accountNumbers.add(account.AccountNumber)
    }
    this.AccountNumbers = accountNumbers.toTypedArray()
    this.DisplayName = contact.DisplayName
  }
}
