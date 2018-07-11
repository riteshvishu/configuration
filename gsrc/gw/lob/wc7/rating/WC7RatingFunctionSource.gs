package gw.lob.wc7.rating

uses gw.financials.Prorater
uses java.math.RoundingMode
uses java.math.BigDecimal
uses gw.rating.flow.RatingFunctionSource
uses java.util.Date

/**
 * Rating functions for rate routines for the WC7 line.
 */
@Export
class WC7RatingFunctionSource  extends RatingFunctionSource {

  /**
   * <p>Calculate the pro-rate for a non-splitable exposure using the approximate formula:
   * round (expiration date - effective date) / (period end - period start)</p>
   *
   *
   *
   * <p>Explanation: Certain exposures {@link WC7CoveredEmployee} have a class code that is for
   * non-splittable units (e.g. per capita, number of employees).  For these exposures, a user will
   * enter the basis as a whole number amount.  If the exposure is split on an anniversary date (ARD)
   * the basis should not be split (e.g.  Before the split if i have 10 fire fighters, and my basis is
   * "per employee", i want to have 10 fire fighters before the split and after the split.)
   * rating time, we need a pro-rate of the basis amount to apply our rates to.  If the basis were
   * payroll based, the basis would be split prior to rating and this would not apply.
   * </p>
   * @see Prorater#prorate(Date, Date, Date, Date, BigDecimal)
   * @see Prorater#forRounding(int, RoundingMode)
   *
   * @return a big decimal value between 0 and 1 representing the ratio of time that this exposure is effective on the period.
   */
  function prorateFactorForNonSplittableBasisExposure(covEmp : WC7CoveredEmployeeBase) : BigDecimal {
     var period = covEmp.Branch
     var p = Prorater.forRounding(4, RoundingMode.HALF_UP, TC_PRORATABYDAYS)
     var proratedAmount = p.prorate(period.PeriodStart, period.PeriodEnd, covEmp.EffectiveDateForRating, covEmp.ExpirationDateForRating, 1.00bd)
     return proratedAmount
  }

  /**
   * <p>Calculate the pro-rate for a non-splitable exposure using the approximate formula:
   * round (expiration date - effective date) / (period end - period start)</p>
   *
   * <p>Explanation: {@link entity.EffDated} are non-splittable units.</p>
   *
   * @see Prorater#prorate(Date, Date, Date, Date, BigDecimal)
   * @see Prorater#forRounding(int, RoundingMode)
   *
   * @param effDated - the {@link entity.EffDated}
   * @param effDateForRating - the effective date that is used in the calculation for proration, typically the effective date of the exposure,
   * unless there's an anniversary date
   * @param expDateForRating - the expiration date that is used in the calculation for proration, typically the expiration date of the exposure,
   * unless there's an anniversary date
   * @return a big decimal value between 0 and 1 representing the ratio of time that this exposure is effective on the period.
   */
  function prorateFactorForNonSplittableBasisExposure(effDated : entity.EffDated, effDateForRating : Date, expDateForRating : Date) : BigDecimal {
     var result : BigDecimal;
     var branch = effDated.BranchUntyped

     if (branch typeis PolicyPeriod) {
       var p = Prorater.forRounding(4, RoundingMode.HALF_UP, TC_PRORATABYDAYS)
       result = p.prorate(branch.PeriodStart, branch.PeriodEnd, effDateForRating, expDateForRating, 1.00bd)
     }

     return result
  }
  
  /**
   * @param ratingPeriodStart - the rating period start date 
   * @ param ratingPeriodEnd - the rating period end date
   * @param exposureEffDateForRating - the effective date that is used in the calculation for proration, typically the effective date of the exposure,
   * unless there's an anniversary date
   * @param exposureExpDateForRating - the expiration date that is used in the calculation for proration, typically the expiration date of the exposure,
   * unless there's an anniversary date
   * @return a big decimal value between 0 and 1 representing the ratio of time that this exposure is effective on the period.
   */
  function prorateFactorBasedOnRatingEffDateOfPeriodAndExposure(ratingPeriodStart : Date, ratingPeriodEnd : Date, exposureEffDateForRating : Date, exposureExpDateForRating : Date) : BigDecimal {
       var result : BigDecimal;
       var p = Prorater.forRounding(4, RoundingMode.HALF_UP, TC_PRORATABYDAYS)
       result = p.prorate(ratingPeriodStart, ratingPeriodEnd, exposureEffDateForRating, exposureExpDateForRating, 1.00bd)
       return result
    }


  /**
   * Take a number formatted using "X,000" and return the integer representation.
   * @return the number representation of the provided string
   */
  function numValue(numberStr : String) : int {
    var num = com.guidewire.pl.system.util.NumberFormatUtil.parseInt(numberStr)
    return num
  }

  /**
   * Returns true if governing law is Longshore and Harbor Workers Compensation Act and the
   * class code type is not USLH
   * @param covEmp - the {@link WC7CoveredEmployeeBase} that's used to retrieve the governing law and class code type
   * @return boolean
   */
  function shouldCalculateUSLHPremium(covEmp : WC7CoveredEmployeeBase) : boolean {
    return covEmp.GoverningLaw == WC7GoverningLaw.TC_LONGSHOREANDHARBOR and
           covEmp.ClassCode.ClassCodeType != WC7ClassCodeType.TC_USLH
  }
  
  override function availableForLine(policyLineCode : String) : boolean {
    return policyLineCode == "WC7Line"
  }

  function maxWithNullCheck(num1 : BigDecimal, num2 : BigDecimal) : BigDecimal {
    if(num1 == null) {
      return num2
    }
    else if(num2 == null) {
      return num1
    }
    
    return num1.max(num2)
  }
}
