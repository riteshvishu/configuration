package gw.pcf.policysummary

uses gw.api.address.AddressOwnerBase
uses java.lang.UnsupportedOperationException
uses gw.api.address.AddressOwnerFieldId

uses java.util.Set
uses gw.api.address.AddressFillableExtension

@Export
class PolicyInfoAddressOwner extends AddressOwnerBase {

  static var FIELDS_VISIBLE_IF_READONLY: Set<AddressOwnerFieldId> = {AddressOwnerFieldId.COUNTY}
  var _showLabel : boolean

  construct(addrDelegate : AddressFillableExtension, showLabel : boolean) {
    this.setDelegateInternal(addrDelegate)
    _showLabel = showLabel
  }

  override property get Address(): entity.Address {
    return null
  }

  override property set Address(value : entity.Address) {
    throw new UnsupportedOperationException("Setting Address is not supported.")
  }

  override  property get AddressNameLabel() : String {
    return _showLabel ? super.AddressNameLabel : ""
  }

  override property get ShowAddressSummary() : boolean {
    return true
  }

  override function isHideIfReadOnly(fieldId : AddressOwnerFieldId) : boolean {
    return !FIELDS_VISIBLE_IF_READONLY.contains(fieldId)
  }

  override property get RequiredFields() : java.util.Set <gw.api.address.AddressOwnerFieldId> {
    return {}.freeze()
  }

  override property get HiddenFields() : Set <gw.api.address.AddressOwnerFieldId> {
    var hFields : Set <AddressOwnerFieldId> = {}
    hFields.addAll(AddressOwnerFieldId.ALL_PCF_FIELDS)
    hFields.remove(AddressOwnerFieldId.COUNTY)
    return hFields
  }

  override property get AutofillEnabled() : boolean {
    return false
  }
}
