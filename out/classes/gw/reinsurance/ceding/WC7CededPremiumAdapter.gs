package gw.reinsurance.ceding

class WC7CededPremiumAdapter extends AbstractCededPremiumAdapter<WC7CededPremium,WC7CededPremiumHistory> {
  construct(owner : WC7CededPremium) {
    super(owner)
  }

  override property get Cedings() : RICededPremiumTransaction[] {
    return _owner.CedingTransactions
  }

  override property get History(): RICededPremiumHistory[] {
    return _owner.CedingHistory
  }

  override property get Cost() : Cost {
    return _owner.WC7Cost
  }

  override function createRawCedingTransaction(owner : WC7CededPremium, calcHistory : WC7CededPremiumHistory) : RICededPremiumTransaction {
    var txn = new WC7CededPremiumTransaction(owner.Bundle)
    txn.WC7CededPremium = owner
    txn.WC7CededPremiumHistory = calcHistory
    
    return txn
  }

  override function createRawHistoryRecord(owner : WC7CededPremium) : RICededPremiumHistory {
    var calcHistory = new WC7CededPremiumHistory(owner.Bundle)
    calcHistory.WC7CededPremium = owner
    
    return calcHistory
  }
}
