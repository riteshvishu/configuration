package gw.lob.wc7.rating

/**
 * Search criteria that can find rating steps in the <code>WC_Rating_Steps</code> system table.
 * See <code>matchAllInRange</code> methods for full details.
 */
@Export
class WC7RatingStepsSearchCriteria
{
  var _findDate  : DateTime
  var _findState : Jurisdiction
  
  construct( findDate : DateTime, findState : Jurisdiction )
  {
    if ( findDate == null )
    {
      // Throw because, while the match code will work (typically returning empty result set) passing
      // in a null findDate is probably indicative of a bug.  A null findState merely means we're searching
      // for the default (non-state) rating steps.
      throw "WC7RatingStepsSearchCriteria requires a findDate " + this
    }
    _findDate  = findDate
    _findState = findState
  }

  /**
   * Return a query that finds all steps from the WC_Rating_Steps system table matching the criteria such that
   * if there are *any* state-specific steps for the findState,
   * <ul>
   * <li><code>findState</code> matches
   * <li><code>findDate</code> falls within the [<code>effDate</code>, <code>expDate</code>) range
   * <li><code>calcOrder</code> falls within the [<code>fromStep</code>, <code>toStep</code>] range 
   *     (n.b. inclusive range)
   * </ul>
   * If there are no rating steps at all specified for the findState, then return the factors for all
   * states where the findDate and calcOrder matches (as described above).
   * The steps are ordered ascending by their calcOrder.
   */
  function matchAllInRange( fromStep : int, toStep : int ) : WC7RatingStepExtQuery
  {
    return findInRange( HasAnyStateSpecificSteps ? _findState : null, fromStep, toStep )
  }
  
  /**
   * Find all steps from the WC_Rating_Steps system table matching the criteria such that
   * <ul>
   * <li><code>findState</code> matches
   * <li><code>findDate</code> falls within the [<code>effDate</code>, <code>expDate</code>) range.
   *     If either dates is null, then that side of the range is considered unbound.
   * <li><code>calcOrder</code> falls within the [<code>fromStep</code>, <code>toStep</code>] range 
   *     (n.b. inclusive range)
   * </ul>
   * The steps are ordered ascending by their calcOrder.
   */
  private function findInRange( findState : Jurisdiction, fromStep : int, toStep : int ) : WC7RatingStepExtQuery
  {
    var stepQuery = find( step in WC7RatingStepExt
      where step.rateState == findState.Code
        and (step.effDate == null or step.effDate <= _findDate)
        and (step.expDate == null or step.expDate  > _findDate)
        and step.calcOrder >= fromStep
        and step.calcOrder <= toStep
     )
    stepQuery.orderBy(\ w ->w.calcOrder)
    return stepQuery
  }
  
  /**
   * Return true if there are any steps from the WC_Rating_Steps system table for the findState
   * that are effective during the findDate.
   */
  private property get HasAnyStateSpecificSteps() : boolean
  {
    var stepQuery = find( step in WC7RatingStepExt
      where step.rateState == _findState.Code
        and (step.effDate == null or step.effDate <= _findDate)
        and (step.expDate == null or step.expDate  > _findDate)
    )
    return stepQuery.getCount() > 0
  }

  override function toString() : String
  {
    return "{findDate=" + _findDate  + "}"
  }
  
}
