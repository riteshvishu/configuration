package gw.api.name

@Export
abstract class NameOwnerBase implements NameOwner {
  var _contactDelegate : ContactNameFields as ContactName
  var _personDelegate : PersonNameFields as PersonName

  override function isAvailable(fieldId : NameOwnerFieldId) : boolean {
    return true
  }

  override function isEditable(fieldId : NameOwnerFieldId) : boolean {
    return true
  }

  override function isRequired(fieldId : NameOwnerFieldId) : boolean {
    return RequiredFields.contains(fieldId)
  }

  override function isVisible(fieldId : NameOwnerFieldId) : boolean {
    if (not NameLocaleSettings.VisibleFields.contains(fieldId) or HiddenFields.contains(fieldId)) {
      return false
    } else if (AlwaysShowSeparateFields) {
      return true
    } else if (isHideIfReadOnly(fieldId) and not InEditMode)  {
      return false
    }
    return true
  }

  var _inEditMode : boolean as InEditMode

  var _AlwaysShowSeparateFields : boolean as AlwaysShowSeparateFields = false

  override function isHideIfReadOnly(fieldId : NameOwnerFieldId) : boolean {
    return true
  }

  override property get ShowNameSummary() : boolean {
    return not InEditMode
  }

  override property get ContactNameLabel() : String {
    return displaykey.Web.ContactDetail.Name.OrganizationName
  }

  override property get ContactNamePhoneticLabel() : String {
    return displaykey.Web.ContactDetail.Name.OrganizationNamePhonetic
  }

  override property get FirstNameLabel() : String {
    return displaykey.Web.ContactDetail.Name.FirstName
  }

  override property get FirstNamePhoneticLabel() : String {
    return displaykey.Web.ContactDetail.Name.FirstNamePhonetic
  }

  override property get LastNameLabel() : String {
    return displaykey.Web.ContactDetail.Name.LastName
  }

  override property get LastNamePhoneticLabel() : String {
    return displaykey.Web.ContactDetail.Name.LastNamePhonetic
  }
}
