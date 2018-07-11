package gw.lob.wc7.financials
uses gw.api.domain.financials.TransactionAdapter

/**
 * An implementation for the entity delegate {@link TransactionAdapter} for {@link WC7Transaction}
 */
@Export
class WC7TransactionAdapter implements TransactionAdapter {
  var _owner : WC7Transaction
  
  construct( owner : WC7Transaction ) {
    _owner = owner
  }
  
  override property get Cost() : Cost {
    return _owner.WC7Cost
  }

}
