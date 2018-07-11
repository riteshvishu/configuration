//package gw.plugin.contact.ab800
//
//enhancement ABContactAPISearchCriteriaEnhancement : wsi.remote.gw.webservice.ab.ab800.abcontactapi.types.complex.ABContactAPISearchCriteria {
//  
//}

package gw.plugin.contact.ab800

uses wsi.remote.gw.webservice.ab.ab800.abcontactapi.types.complex.ABContactAPIAddressSearch
uses wsi.remote.gw.webservice.ab.ab800.abcontactapi.types.complex.ABContactAPISearchCriteria
uses wsi.remote.gw.webservice.ab.ab800.abcontactapi.anonymous.types.complex.ABContactAPISearchCriteria_Tags


enhancement ABContactAPISearchCriteriaEnhancement : ABContactAPISearchCriteria {
  
  function sync(searchCriteria : ContactSearchCriteria){
    var isPerson = Person.Type.isAssignableFrom(searchCriteria.ContactIntrinsicType)
    this.ContactType = isPerson ? "ABPerson" : "ABCompany"
    this.FirstName = searchCriteria.FirstName
    this.Keyword = searchCriteria.Keyword
    this.TaxID = searchCriteria.TaxID
    this.OrganizationName = searchCriteria.OrganizationName
    var address = new ABContactAPIAddressSearch()
    address.City = searchCriteria.Address.City
    address.State = searchCriteria.Address.State.Code
    address.PostalCode = searchCriteria.Address.PostalCode
    address.Country = searchCriteria.Address.Country.Code
    this.Address.$TypeInstance = address
    this.Tags.$TypeInstance = new ABContactAPISearchCriteria_Tags()
    this.Tags.Entry.add(ContactTagType.TC_CLIENT.Code)

  }
}
