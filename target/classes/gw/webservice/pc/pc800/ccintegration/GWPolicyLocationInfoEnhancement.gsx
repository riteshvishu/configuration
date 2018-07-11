package gw.webservice.pc.pc800.ccintegration

uses gw.webservice.pc.pc800.ccintegration.entities.types.complex.CCAddress
uses gw.webservice.pc.pc800.ccintegration.entities.types.complex.MapEntry
uses gw.webservice.pc.pc800.ccintegration.entities.anonymous.elements.PolicyLocationInfo_TotalInsuredValues
uses gw.webservice.pc.pc800.ccintegration.entities.types.complex.PolicyLocationInfo
uses gw.webservice.pc.pc800.ccintegration.entities.types.complex.CCPolicyLocation

enhancement GWPolicyLocationInfoEnhancement : PolicyLocationInfo {

  function copy(pl : PolicyLocation) : PolicyLocationInfo {

    this.PolicyNumber = pl.BranchValue.PolicyNumber
    this.ProductCode = pl.BranchValue.Policy.ProductCode
    this.PolicyLocationLatitude = pl.AccountLocation.Latitude
    this.PolicyLocationLongitude = pl.AccountLocation.Longitude
    this.PolicyLocationGeocodeStatus = pl.AccountLocation.GeocodeStatus.Code
    this.PolicyLocationPolicySystemID = pl.TypeIDString
    this.PNIName = pl.BranchValue.PrimaryInsuredName
    this.PNIPhoneNumber = pl.BranchValue.EffectiveDatedFields.PrimaryNamedInsured.AccountContactRole.AccountContact.Contact.WorkPhone
    this.PNIEmail = pl.BranchValue.EffectiveDatedFields.PrimaryNamedInsured.AccountContactRole.AccountContact.Contact.EmailAddress1

    this.PNIAddressFields = new (new CCAddress())
    this.PNIAddressFields.AddressLine1 = pl.BranchValue.PolicyAddress.AddressLine1
    this.PNIAddressFields.AddressLine2 = pl.BranchValue.PolicyAddress.AddressLine2
    this.PNIAddressFields.AddressLine3 = pl.BranchValue.PolicyAddress.AddressLine3
    this.PNIAddressFields.AddressType = pl.BranchValue.PolicyAddress.AddressType.Code
    this.PNIAddressFields.City = pl.BranchValue.PolicyAddress.City
    this.PNIAddressFields.Country = pl.BranchValue.PolicyAddress.Country.Code
    this.PNIAddressFields.County = pl.BranchValue.PolicyAddress.County
    this.PNIAddressFields.Description = pl.BranchValue.PolicyAddress.Description
    this.PNIAddressFields.PostalCode = pl.BranchValue.PolicyAddress.PostalCode
    this.PNIAddressFields.State = pl.BranchValue.PolicyAddress.State.Code

    this.PolicyLocationAddress = new (new CCAddress())
    this.PolicyLocationAddress.AddressLine1 = pl.AddressLine1
    this.PolicyLocationAddress.AddressLine2 = pl.AddressLine2
    this.PolicyLocationAddress.AddressLine3 = pl.AddressLine3
    this.PolicyLocationAddress.AddressType = pl.AccountLocation.AddressType.Code
    this.PolicyLocationAddress.City = pl.City
    this.PolicyLocationAddress.Country = pl.Country.Code
    this.PolicyLocationAddress.County = pl.County
    this.PolicyLocationAddress.Description = pl.Description
    this.PolicyLocationAddress.PostalCode = pl.AccountLocation.PostalCode
    this.PolicyLocationAddress.State = pl.AccountLocation.State.Code

    for(reinsurable in pl.LocationRisks index i){
      this.TotalInsuredValues.add( new PolicyLocationInfo_TotalInsuredValues(new MapEntry(){
      :Name = reinsurable.CoverageGroup.Code,
      :Value = reinsurable.TotalInsuredValue.Amount,
      :Currency = reinsurable.TotalInsuredValue.Currency
    }))
  }
  return this
 }

}
