package gw.lob.wc7.rating
uses gw.api.domain.financials.PCFinancialsLogger
uses gw.api.util.Math
uses gw.financials.Prorater

/**
 * Search criteria that can find short rate factors in the <code>Short_Rate_Factors</code> system table.
 * See <code>match</code> method for the full details on the matching.
 *
 * The table assumes an annual period (365 or 366 days) and has a look-up based on the actual number of non-canceled days in the
 * period.  Each row shows a "short rate percent" (% of full term charge if prorating and including short rate charge) 
 * and a "short rate factor" (for adding an additional charge on top of pro-rated amounts, such as when charging extra
 * premium after calculating earned premium based on lower payrolls for shortened period).  In theory, 
 * [pro-rata %] * [1 + Short Rate Factor] = [Short Rate Percent] and the table just pre-computes these values for 
 * convenience.  
 */
@Export
class WC7ShortRateFactorSearchCriteria
{
  var _findDate : DateTime
  var _normalizedNumDays : int
  
  construct( findDate : DateTime, period : PolicyPeriod )
  {
    if ( findDate == null or period == null )
    {
      // Throw because, while the match code will work (typically returning 1.0) passing in nulls is probably indicative of a bug.
      throw "WC7ShortRateFactorSearchCriteria requires both findDate and period " + this
    }
    _findDate     = findDate
    
    // The short rate factor system table is scaled to an annual period.  There is no guarantee that the policy is
    // written for an annual term, so the number of uncanceled days in the period need to be normalized before doing any lookups.
    var numDaysInAnnualPeriod = Prorater.forFinancialDays(TC_PRORATABYDAYS).financialDaysBetween(period.PeriodStart.addYears(1), period.PeriodStart)
    _normalizedNumDays = Math.roundNearest(( period.NumDaysInUncanceledPeriod * numDaysInAnnualPeriod as double ) / period.NumDaysInPeriod ) as int
  }
  
  /**
   * Find a factor from the Short_Rate_Factors system table best matching the criteria such that
   * <ul>
   * <li><code>findState</code> matches
   * <li><code>daysInPeriod</code> matches
   * <li><code>findDate</code> falls within the [<code>effDate</code>, <code>expDate</code>) range.
   *     If either dates is null, then that side of the range is considered unbound.
   * </ul>
   * If it is unable to find a factor matching all criteria, it then looks for a factor for all
   * states.  It returns <code>null</code> if it is unable to match anything.
   */
  function match( findState : Jurisdiction ) : ShortRateFactorExt
  {
    var shortRate = findShortRateFactor( findState )
    if ( shortRate == null )
    {
      shortRate = findShortRateFactor( null )  // find "all states" default
    }
    return shortRate
  }
  
  /**
   * Find a factor from the Short_Rate_Factors system table matching the criteria such that
   * <ul>
   * <li><code>findState</code> matches
   * <li><code>daysInPeriod</code> matches
   * <li><code>findDate</code> falls within the [<code>effDate</code>, <code>expDate</code>) range.
   *     If either dates is null, then that side of the range is considered unbound.
   * </ul>
   * It returns <code>null</code> if there are no matches.  If there are multiple matches,
   * then it returns the one with the latest effective date.
   */
  private function findShortRateFactor( findState : Jurisdiction ) : ShortRateFactorExt
  {
    var shortRates = find( factor in ShortRateFactorExt
      where factor.rateState    == findState.Code
        and factor.daysInPeriod == _normalizedNumDays
        and (factor.effDate == null or factor.effDate <= _findDate)
        and (factor.expDate == null or factor.expDate  > _findDate)
    )
    shortRates.orderByDescending(\ s -> s.effDate)
    var shortRate = shortRates.getFirstResult()

    var logMsg = "Found short rate factor " + shortRate.shortRateFactor + " (" + shortRate.shortRatePercent + "%) for " + _normalizedNumDays + " days in " + findState + " state, finding on " + _findDate
    if ( shortRate == null )
    {
      PCFinancialsLogger.logWarning( logMsg )
    }
    else
    {
      PCFinancialsLogger.logDebug( logMsg )
    }
    return shortRate
  }
  
  override function toString() : String
  {
    return "{findDate=" + _findDate + ", normalizedNumDays=" + _normalizedNumDays + "}"
  }
  

}
