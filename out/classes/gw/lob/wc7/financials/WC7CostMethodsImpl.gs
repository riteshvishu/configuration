package gw.lob.wc7.financials


/**
 * A default implementation of {@link WC7CostMethods} that returns null for every value.
 */
@Export
class WC7CostMethodsImpl extends WC7GenericWC7CostMethodsImpl<WC7Cost>{
  construct( owner : WC7Cost)  {
    super( owner )
  }
}
