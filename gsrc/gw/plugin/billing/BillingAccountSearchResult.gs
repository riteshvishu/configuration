package gw.plugin.billing

/**
 * The billing account search result
 */
@Export
interface BillingAccountSearchResult extends BillingAccountSearchResultJava{
  /**
   * The account name
   */
  property get AccountName() : String
  property get AccountNameKanji() : String
  /**
   * True if is primary payer
   */
  property get PrimaryPayer() : String
}
