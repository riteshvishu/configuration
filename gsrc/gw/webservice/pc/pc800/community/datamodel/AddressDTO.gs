package gw.webservice.pc.pc800.community.datamodel

uses gw.xml.ws.annotation.WsiExportable

@Export
@WsiExportable("http://guidewire.com/pc/ws/gw/webservice/pc/pc800/community/datamodel/AddressDTO")
final class AddressDTO {

  var _addressLine1 : String as AddressLine1
  var _addressLine2 : String as AddressLine2
  var _addressLine3 : String as AddressLine3
  var _city : String as City
  var _county : String as County
  var _description : String as Description
  var _postalCode : String as PostalCode
  var _publicID : String as PublicID

  var _addressType : AddressType as AddressType
  var _state : State as State
  var _country : Country as Country
}