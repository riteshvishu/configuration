package gw.web.account

uses gw.plugin.billing.BillingAccountSearchResult
uses gw.api.util.LocationUtil

@Export
class AccountBillingUIHelper {

  static function retrieveAccountNumbers(account : Account) : java.util.HashMap<String, String>{
    var thisAccount = new gw.plugin.billing.impl.MockBillingAccountSearchResult(){
        :AccountNumber = account.AccountNumber,
        :AccountName = account.AccountHolderContact.DisplayName
    }
    var result = new java.util.HashMap<String, String>()
    result.put(account.AccountNumber, thisAccount.DisplayName)
    try {
      var plugin = gw.plugin.Plugins.get(gw.plugin.billing.IBillingSystemPlugin)
      plugin.getSubAccounts(account.AccountNumber)
          .each(\ g -> result.put(g.AccountNumber, (g as BillingAccountSearchResult).DisplayName))
    } catch (e : gw.api.util.DisplayableException) {
      LocationUtil.addRequestScopedErrorMessage(e.LocalizedMessage)
    }
    return result
  }

  static function retrieveBillingSummary(accountNumber : String) : gw.plugin.billing.BillingAccountInfo{
    try {
      var plugin = gw.plugin.Plugins.get(gw.plugin.billing.IBillingSummaryPlugin)
      var result = plugin.retrieveAccountBillingSummary(accountNumber)
      return result as gw.plugin.billing.BillingAccountInfo
    } catch (e : gw.api.util.DisplayableException) {
      LocationUtil.addRequestScopedErrorMessage(e.LocalizedMessage)
      return new gw.plugin.billing.impl.MockAccountBilling()
    }
  }
}