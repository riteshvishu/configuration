package gw.lob.wc7.rating

uses java.math.BigDecimal

/**
 * <p>A wrapper class for {@link BigDecimal} to be used as a
 * Writable parameter for rate-routine parameter sets.</p>
 *
 * <p>Example Use: Increased Limits Charge needs to lookup a rate
 * table factor and return the factor value as a big decimal without
 * producing a cost.  The value is assigned to a parameter of this type
 * that is writable once the value is looked up.</p>
 */
@Export
class WC7WritableMinimumPremiumParam  {
  /**
   * The Rate Factor value.
   */
  var _factor : BigDecimal as MinimumPremium
}
