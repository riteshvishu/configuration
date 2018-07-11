package gw.lob.wc7.rating


/**
 * <p>A wrapper class for {@link WC7ClassCode} to be used as a
 * Writable parameter for rate-routine parameter sets.</p>
 *
 * <p>Example Use: Catastrope Charge needs to lookup a rate
 * table factor and return the factor value as a String.
 *   The value is assigned to a parameter of this type
 * that is writable once the value is looked up.</p>
 */
@Export
class WC7WritableClassFactorParam  {
  /**
   * The Rate Factor value.
   */
  var _classfactor : String as ClassFactor
}
