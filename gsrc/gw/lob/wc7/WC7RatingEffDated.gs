package gw.lob.wc7

uses com.guidewire.pl.system.util.DateRange
uses java.util.Date
uses gw.lob.wc7.rating.WC7RatingPeriod

/**
 * <p>An delegate interface that defines whether an {@link EffDated} 
 * supports rating eff dated exposures and beans on dates other 
 * than Rating Period Start Dates (or RPSD).</p>
 * 
 * 
 * <p>For example, {@link entity.WC7AircraftSeat} may be added on a 
 * date that does not line up with a RPSD.  Aircraft seats implement 
 * this delegate interface in order to communicate with WC7 rating 
 * to handle arbitrary split dates.</p>
 * 
 * 
 * <p>Properties such as {@link #EffectiveDateForRating} take audit 
 * and cancellation into consideration and should be used instead of 
 * {@link entity.EffDated#EffectiveDate}</p>
 */
@ReadOnly
interface WC7RatingEffDated {
  
  /**
   * Returns the effective date range of this {@link EffDated} using the rating period to calculate
   * the range. The range may be effective longer than the rating period, so it may be necessary to get the
   * effective date range for the particular rating period
   * <ul>
   * <li> The effective range date is calculated by using the rating period. </li>
   * </ul>
   * @param ratingPeriod - The {@link WC7RatingPeriod} used to calculate the effective date range
   * @return DateRange - the date range for rating
   */
  function getEffDateRangeForRatingPeriod(ratingPeriod : WC7RatingPeriod) : DateRange

  /**
   * Returns the num days effective for a particular date range of this {@link EffDated} 
   * @param dateRange - The {@link DateRange} used to calculate the effective date range of the effDated
   * @return int - the num days effective for rating
   */  
  function getNumDaysEffectiveForDateRange(dateRange: DateRange) : int

  /**
   * Returns the effective date of this {@link EffDated} for rating purposes.
   * <ul>
   * <li>This will be the later of the effective date and the audit window start date, if any.
   * </ul>
   * Note that the EffectiveDateForRating might end up being after the {@link #ExpirationDateForRating}.
   */
  property get EffectiveDateForRating() : Date

  /**
   * Returns the expiration date of this {@link EffDated} for rating purposes.
   * <ul>
   * <li> This will return the earlier of the employee's expiration date, the audit window end date, and
   * the cancellation date, if any. </li>
   * </ul>
   * Note that the ExpirationDateForRating might end up being before the {@link #EffectiveDateForRating}.
   * @return DateTime - the effective date for rating
   */
  property get ExpirationDateForRating() : Date

  /**
   * Returns the number of days this {@link EffDated} is effective, taking any cancellation into account.
   * If the effDated falls after the cancellation, the [{@link EffectiveDateForRating}-{@link ExpirationDateForRating})
   * period is meaningless (with the exp being before the eff), so return 0 days.
   * @int - the number of days effective for rating
   */
  property get NumDaysEffectiveForRating() : int
  
  /**
   * Returns the number of days this {@link EffDated} is effective.
   */
  property get NumDaysEffective() : int
}
