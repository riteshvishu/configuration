package gw.plugin.billing
uses java.math.BigDecimal

/**
 * Billing information of account in Billing System.
 */
@Export
interface BillingAccountInfo extends BillingAccountInfoJava{

  /**
   * The account name
   */
  property get AccountName() : String
  /**
   * The account Kanji name
   */
  property get AccountNameKanji() : String
  /**
   * The total billed amount outstanding
   */
  property get BilledOutstandingTotal() : BigDecimal
  /**
   * The total billed amount current
   */
  property get BilledOutstandingCurrent() : BigDecimal
  /**
   * The total billed amount pastdue
   */
  property get BilledOutstandingPastDue() : BigDecimal
  /**
   * The total unbilled amount
   */
  property get UnbilledTotal() : BigDecimal
  /**
   * The total amount of fund unapplied
   */
  property get UnappliedFundsTotal() : BigDecimal
  /**
   * The total collateral requirement
   */
  property get CollateralRequirement() : BigDecimal
  /**
   * The amount of collateral held
   */
  property get CollateralHeld() : BigDecimal
  /**
   * The amount of collateral charge billed
   */
  property get CollateralChargesBilled() : BigDecimal
  /**
   * The amount of collateral charge past due
   */
  property get CollateralChargesPastDue() : BigDecimal
  /**
   * The amount of collateral charge unbilled
   */
  property get CollateralChargesUnbilled() : BigDecimal
  /**
   * True if the account is delinquent
   */
  property get Delinquent() : boolean
  /**
   * The billing settings for this account
   */
  property get BillingSettings() : BillingPaymentInfo
  /**
   * The primary payer contact
   */
  property get PrimaryPayer() : BillingContactInfo
}
