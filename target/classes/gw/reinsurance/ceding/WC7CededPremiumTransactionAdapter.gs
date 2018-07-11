package gw.reinsurance.ceding
uses gw.api.reinsurance.RICededPremiumTxnAdapter

class WC7CededPremiumTransactionAdapter implements RICededPremiumTxnAdapter {

  protected var _owner : WC7CededPremiumTransaction
  construct(owner : WC7CededPremiumTransaction) {
    _owner = owner
  }

  override property get RICededPremium() : RICededPremium {
    return _owner.WC7CededPremium
  }

  override property get RICededPremiumHistory() : RICededPremiumHistory {
    return _owner.WC7CededPremiumHistory
  }
}
