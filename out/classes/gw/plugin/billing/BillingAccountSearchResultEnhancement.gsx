package gw.plugin.billing

/**
 * Account search result enhancement
 */
@Export
enhancement BillingAccountSearchResultEnhancement : gw.plugin.billing.BillingAccountSearchResult {
  property get DisplayName() : String{
    return this.AccountNumber + " (" + this.AccountName + ")"
  }
}
