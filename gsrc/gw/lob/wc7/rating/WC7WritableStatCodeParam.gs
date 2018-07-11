package gw.lob.wc7.rating


/**
 * <p>A wrapper class for {@link String} to be used as a
 * Writable parameter for rate-routine parameter sets.</p>
 *
 * <p>Example Use: Aircraft Seats looks up a stat code
 * from another table.  This writable parameter can be
 * used to pass the information to the rating engine
 * to assign the stat code.</p>
 */
@Export
class WC7WritableStatCodeParam  {
  /**
   * The Rate Factor value.
   */
  var _statCode : String as StatCode
}
