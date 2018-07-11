package gw.lob.wc7.rating
uses java.math.BigDecimal
uses entity.windowed.WC7JurisdictionCostVersionList
uses java.util.Set
uses gw.financials.Prorater
uses com.guidewire.pl.system.util.DateRange

/**
 * A rating period for a {@link WC7Jurisdiction}
 * 
 * Given a {@link WC7Jurisdiction} as well as a start and end date, 
 * values associated with the actual rating period are calculated.
 * 
 * For example, the {@link #RatingStart} may differ from the {@link #Start} due to audit behavior.
 * {@link #RatingEnd} may differ from the {@link #End} due to audit behavior and cancellation dates.
 * {@link NumRatingDays} is calculated based on the {@link #RatingStart} and {@link #RatingEnd}
 */
@Export
class WC7RatingPeriod { 
  /**
   * The owning Jurisdiction
   */
  var _juris : WC7Jurisdiction as readonly Jurisdiction
  
  /**
   * Period Start
   */
  var _start : DateTime as readonly Start  // period start
    
  /**
   * Period End
   */
  var _end   : DateTime as readonly End    // period end

  /**
   * date at which to look up rates
   */
  var _ratingDate : DateTime as readonly RatingDate
  
  /**
   * period start accounting for audit
   */
  var _ratingStart : DateTime as readonly RatingStart
  
  /**
   * period end accounting for audit and cancellation
   */ 
  var _ratingEnd   : DateTime as readonly RatingEnd
  
  /**
   * number of days in [{@link #RatingStart}-{@link #RatingEnd})
   */
  var _numRatingDays : int as readonly NumRatingDays  // 
  
  /**
   * The rating period number
   */
  var _ratingPeriodNumber : int as readonly Number
  
  construct(jurisArg : WC7Jurisdiction, startArg : DateTime, endArg : DateTime, ratingPeriodNumber : int) {
    _juris = jurisArg
    _start = startArg
    _end   = endArg
    _ratingPeriodNumber = ratingPeriodNumber
    Prorater.forFinancialDays(TC_PRORATABYDAYS).financialDaysBetween(Start, End)
    
    _ratingDate = Jurisdiction.getPriorRatingDate( Start )

    _ratingStart = calculateRatingStart()
    _ratingEnd   = calculateRatingEnd()
    _numRatingDays = RatingStart > RatingEnd ? 0 : Prorater.forFinancialDays(TC_PRORATABYDAYS).financialDaysBetween(RatingStart, RatingEnd)
  }
  
  /**
   * Returns the start date of this period for rating purposes.
   * This will be the later of the period's start date and the audit window start date, if any.
   * Note that the StartDateForRating might end up being after the EndDateForRating.
   */
  private function calculateRatingStart() : DateTime {
    var effDate = Start
    if ( Jurisdiction.Branch.Audit.AuditInformation.AuditPeriodStartDate > effDate ){
      effDate = Jurisdiction.Branch.Audit.AuditInformation.AuditPeriodStartDate
    }
    return effDate
  }
  
  /**
   * Returns the end date of this period for rating purposes.
   * This will return the earlier of the period's end date, the audit window end date, and
   * the cancellation date, if any.
   * Note that the EndDateForRating might end up being before the StartDateForRating.
   */
  private function calculateRatingEnd() : DateTime{
    var expDate = End
    if ( Jurisdiction.Branch.CancellationDate < expDate ){
      expDate = Jurisdiction.Branch.CancellationDate
    }
    if ( Jurisdiction.Branch.Audit.AuditInformation.AuditPeriodEndDate < expDate ){
      expDate = Jurisdiction.Branch.Audit.AuditInformation.AuditPeriodEndDate
    }
    return expDate
  }
  
  /**
   * Return the sum of all the costs in this rating period's jurisdiction, within the rating period's
   * [RatingStart-RatingEnd) period, across the term.
   */
  function getCostAmountSum(calcOrder : int, currency : Currency) : BigDecimal {
    return Jurisdiction.WCLine.Costs.cast( WC7Cost )
      .where( \ c -> c.JurisdictionState == Jurisdiction.Jurisdiction && c.CalcOrder < calcOrder)
      .toSet()
      .byRatingPeriod( this )
      .AmountSum(currency)
  }
  
  property get JurisdictionCosts() : Set<WC7JurisdictionCost> {
    return Jurisdiction.VersionList.Costs.flatMap( \ costVL -> costVL.AllVersions ).toSet().byRatingPeriod(this)
  }

  /**
   * <p>A {@link com.guidewire.pl.system.util.DateRange} from [{@link #RatingStart} - {@link #RatingEnd})</p>
   * 
   * <p>i.e. The date range includes {@link #RatingStart} and excludes {@link #RatingEnd}</p>
   */
  property get EffectiveDateRange() : DateRange {
    return DateRange.allDatesBetween(this.RatingStart, this.RatingEnd)
  }

  function createCostData( step : WC7RatingStepExt) : WC7JurisdictionCostData {
    var stepData = new WC7RatingStepData(step)
    return createCostData(stepData)
  }

  function createCostData(stepData : WC7RatingStepData) : WC7JurisdictionCostData {
    var cost = new WC7JurisdictionCostData(RatingStart, RatingEnd, Jurisdiction.FixedId, Jurisdiction.Jurisdiction, stepData, Jurisdiction.PreferredCoverageCurrency)
    cost.NumDaysInRatedTerm = NumRatingDays
    return cost
  }
    
  function getExistingWC7JurisdictionCost( step : WC7RatingStepExt ) : WC7JurisdictionCost {
    var allCosts = Jurisdiction.VersionList.Costs
    var matchingVLs = allCosts.where(\costVL -> matchesStep(costVL.AllVersions.first(), step))
    if (matchingVLs.size() > 1) {
      throw "Expected at most one cost version list on " + Jurisdiction + " matching step " + step + "; found " + matchingVLs.Count  
    }
    var costVL = matchingVLs.first()
    if (costVL != null) {
      return costVL.AsOf( RatingStart )
    } else {
      return null  
    }
  }
  
  function matchesStep( cost : WC7JurisdictionCost, step : entity.WC7RatingStepExt) : boolean {
    return cost.JurisdictionCostType == step.aggCostType &&
           cost.CalcOrder == step.calcOrder &&
           cost.RateAmountType == step.amountType &&
           cost.StatCode == step.classcode  
  }
  
  override function toString() : String {
    return "{Jurisdiction=" + Jurisdiction + ", Start=" + Start + ", End=" + End +  ", Number=" + Number + "}"
  }
  
  /**
   * True if the provide {@link WC7RatingPeriod} has the same {@link #Jurisdiction}, {@link #Start}, {@link #End} and {@link #Number}
   */
  function isEquivalent(aRatingPeriod : WC7RatingPeriod) : boolean {
    if (aRatingPeriod == null){
      return false
    }
    return aRatingPeriod.Jurisdiction == Jurisdiction
       and aRatingPeriod.Start == Start
       and aRatingPeriod.End == End
       and aRatingPeriod.Number == Number
  }

  override function equals(aRatingPeriod : Object) : boolean {
    if (aRatingPeriod != null and aRatingPeriod typeis WC7RatingPeriod) {
      return aRatingPeriod.Jurisdiction.Jurisdiction == Jurisdiction.Jurisdiction
       and aRatingPeriod.Start == Start
       and aRatingPeriod.End == End
       and aRatingPeriod.Number == Number
    }
    return false
  }
  
  override function hashCode() : int {
    return new org.apache.commons.lang.builder.HashCodeBuilder(7, 5)
      .append(typeof this)
      .append(Start)
      .append(End)
      .append(Jurisdiction.Jurisdiction)
      .append(Number)
      .toHashCode()
  }
}
