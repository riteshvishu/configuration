package gw.plugin.messaging
uses java.lang.RuntimeException

/**
 * Exception thrown when trying to send a contact to Billing System before the contact
 * is synced with Contact Manager.
 */
@Export
class BillingContactUnsyncedException extends RuntimeException{
  var _contactPublicID : String as readonly ContactPublicID

  construct(contact : Contact) {
    super("Could not send contact '${contact}' without AddressBookUID to Billing System.")
    _contactPublicID = contact.PublicID
  }
}
