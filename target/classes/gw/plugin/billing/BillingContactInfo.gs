package gw.plugin.billing

/**
 * Billing contact info
 */
@Export
interface BillingContactInfo {
  /**
   * The display name of the contact
   */
  property get Name() : String
  /**
   * The address associated with the contact
   */
  property get Address() : String
  /**
   * The primary phone of the contact
   */
  property get Phone() : String
}
