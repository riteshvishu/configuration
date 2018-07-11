package gw.web.contact

uses gw.api.util.DisplayableException
uses gw.plugin.billing.BillingAccountInfo
uses gw.plugin.billing.IBillingSummaryPlugin
uses gw.plugin.Plugins

uses java.util.Set

/**
 * Implements the 7.0 accelerator version of a helper that provides access to
 * Billing Account Information for accounts used to calculate metrics associated
 * with a specified contact who is the account holder.
 */
@Export
class AccountHolderBillingMetrics {

  static final var _instance : AccountHolderBillingMetrics as readonly Instance
      = new AccountHolderBillingMetrics()

  private construct() {
  }

  function findBillingInfosForAccounts(accountNumbers : Set<String>) : BillingAccountInfo[] {
    var bcPlugin = Plugins.get(IBillingSummaryPlugin)
    var infos = {} as List<BillingAccountInfo>
    for ( accountNumber in accountNumbers ) {
      try {
        var info = bcPlugin.retrieveAccountBillingSummary(accountNumber) as BillingAccountInfo
        infos.add(info)
      } catch (ex : DisplayableException) {
        // do nothing...
      }
    }

    return infos.toTypedArray()
  }
}