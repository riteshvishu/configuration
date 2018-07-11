package gw.api.name

uses java.util.Set
uses com.guidewire.pl.domain.community.gen.UserSearchCriteriaStubI

@Export
class UserSearchNameOwner extends NameOwnerBase {

  construct (criteria : ContactSearchCriteria) {
    var aDelegate = new PLContactSearchNameDelegate(criteria)
    PersonName = aDelegate
    ContactName = aDelegate
    AlwaysShowSeparateFields = true
  }

  public static final var HIDDEN_FOR_SEARCH_FIELDS : Set<NameOwnerFieldId> =
    { NameOwnerFieldId.PREFIX, NameOwnerFieldId.MIDDLENAME, NameOwnerFieldId.PARTICLE, NameOwnerFieldId.SUFFIX }.freeze()

  override property get RequiredFields() : Set<NameOwnerFieldId> {
    return NameOwnerFieldId.NO_FIELDS
  }

  override property get HiddenFields() : Set<NameOwnerFieldId> {
    return HIDDEN_FOR_SEARCH_FIELDS
  }

  override property get ContactNameLabel() : String {
    return displaykey.Web.ContactCriteria.CompanyName
  }

  override property get ContactNamePhoneticLabel() : String {
    return displaykey.Web.ContactCriteria.CompanyNamePhonetic
  }

  override property get ShowNameSummary() : boolean {
    return false
  }
}