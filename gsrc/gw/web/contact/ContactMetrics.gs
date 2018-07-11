package gw.web.contact

uses gw.pl.currency.MonetaryAmount

uses java.math.BigDecimal
uses java.util.Date
uses java.util.Set

/**
 * Collects the metrics for the Accounts associated with a Contact
 *      through a specific AccountContact Role.
 */
@Export
interface ContactMetrics {

  /**
   * The Contact.
   */
  property get Contact() : Contact

  /**
   * The AccountContactRole type.
   */
  property get Roles() : Set<Type<AccountContactRole>>

  /**
   * The 1st effective date for account policies associated with the Contact.
   */
  property get FirstEffectivePolicyDate() : Date

  /*() : Date

  /**
   * The number of active policies for the accounts associated with the Contact associated with the Contact.
   */
  property get ActivePoliciesCount() : int

  /**
   * The total in-force policy premiums for the accounts associated with
   *    the Contact.
   */
  property get TotalInForcePremium() : MonetaryAmount

  /**
   * The number of accounts associated with the Contact.
   */
  property get AccountsCount() : int

  /**
   * The number of cancellations made by the customer for the account policies
   *    associated with the Contact.
   */
  property get CancellationsByCustomerCount() : int

  /**
   * The number of cancellations made by the carrier for non-payment
   *    for the account policies associated with the Contact.
   */
  property get CancellationsForNonPaymentCount() : int

  /**
   * The number of cancellations made by the carrier for other reasons
   *    for the account policies associated with the Contact.
   */
  property get OtherCancellationsCount() : int

  /**
   * The total lifetime premium for all policies of the accounts
   *    associated with the Contact.
   */
  property get TotalLifetimePremium() : MonetaryAmount

  property get Jobs() : Job[]

  /**
   * The ClaimSet for the policies for the accounts associated with the Contact.
   */
  property get ClaimSet() : ClaimSet

  property get OpenClaimsCount() : int

  /**
   * The summation of TotalIncurred taken across all claims contained in ClaimSet
   */
  property get NetTotalIncurred() : BigDecimal

  /**
   * The total unbilled amount for the accounts associated with the Contact.
   */
  property get TotalUnbilled() : BigDecimal

  /**
   * The total currently billed amount for the accounts
   *    associated with the Contact.
   */
  property get TotalCurrentlyBilled() : BigDecimal

  /**
   * The total past due amount for the accounts associated with the Contact.
   */
  property get TotalPastDueBilled() : BigDecimal

  /**
   * The total outstanding billed amount for the accounts
   *    associated with the Contact.
   */
  property get TotalOutstandingBilled() : BigDecimal

  /**
   * Is Direct Bill Only?
   */
  property get DirectBillOnly() : boolean

  /**
   * The Alert messages based on the metrics.
   */
  property get Alerts() : List<String>
}
