package gw.lob.wc7.rating

uses java.math.BigDecimal

/**
 * <p>A wrapper class for {@link BigDecimal} to be used as a
 * Writable parameter for rate-routine parameter sets.</p>
 *
 * <p>Example Use: Expense Constant needs to look up the
 * Expense Contant per Jurisdiction - this parameter can
 * be used to return that value in a lookup rate routine.</p>
 */
@Export
class WC7WritableBigDecimalParam  {
  /**
   * The Rate Factor value.
   */
  var _value : BigDecimal as Value
}
