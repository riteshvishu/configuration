package gw.plugin.productmodel.impl

uses gw.pl.util.ArgCheck
uses java.lang.IllegalStateException


/**
 * Contains methods for evaluating the type of date to use
 * to calculate the reference date on a given object.
 */
@Export
class WC7ReferenceDatePlugin extends ReferenceDatePlugin {

  override function getPeriodReferenceDate(period : PolicyPeriod, dateType : ReferenceDateType, state : Jurisdiction) : DateTime {
    ArgCheck.nonNull(period, "period")
    ArgCheck.nonNull(dateType, "dateType")

    var retVal : DateTime
    if (dateType == "EffectiveDate") {
      retVal = period.EditEffectiveDate
    } else if (dateType == "WrittenDate") {
      retVal = period.WrittenDate
    } else if (dateType == "RatingPeriodDate") {
      retVal = null
      if (period.WorkersCompLine != null and state != null) {
        var line = period.WorkersCompLine
        var jurisdiction = line.getJurisdiction(state)
        if (jurisdiction != null) {
          retVal = jurisdiction.getPriorRatingDate(line.Branch.EditEffectiveDate.trimToMidnight())
        } else {
          retVal = line.Branch.EditEffectiveDate
        }
      } else if (period.WC7Line != null and state != null) {
        var line = period.WC7Line
        var jurisdiction = line.getJurisdiction(state)
        if (jurisdiction != null) {
          retVal = jurisdiction.getPriorRatingDate(line.Branch.EditEffectiveDate.trimToMidnight())
        } else {
          retVal = line.Branch.EditEffectiveDate
        }
      }   
      else {
          throw new IllegalStateException("Rating period reference dates are only supported for Worker's Comp or Worker's Comp V7 lines.")
      }
    } else {
      throw new IllegalStateException("Unhandled ReferenceDateType " + dateType.Code)
    }

    // Customers may not set dates the way we expect them to. It seems reasonable that this calculator
    // provide a non-null reference date in the off chance that the date we prefer to use has not been
    // set. This should be the rare exception, and customers who want stable availability checks
    // should set the correct dates before checking availability (e.g., syncComputedValues).
    //
    // The policy period effective date should never be null during valid operation, and NPE will happen
    // if policy period is missing. Written date can be null, in which case "today" is a reasonable
    // backup. The method to get the rating period date either comes up with a date or throws, so that
    // should be covered.
    //
    // In other words, this method should only rarly return "today", probably during some kind of entity
    // setup that happens before the real values are recalculated (once our preferred dates have been set).

    return retVal != null ? retVal.trimToMidnight() : DateTime.Today
  }
}