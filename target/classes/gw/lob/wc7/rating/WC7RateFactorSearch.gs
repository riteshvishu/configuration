package gw.lob.wc7.rating

uses java.math.BigDecimal
uses gw.rating.rtm.query.RateQueryParam
uses java.lang.Comparable
uses java.util.Date
uses gw.rating.rtm.query.RateBookQueryFilter
uses gw.api.util.JurisdictionMappingUtil
uses gw.job.RenewalProcess
uses gw.rating.rtm.query.RatingQueryFacade

/**
 * Search critera that can find rating factors in the RTM if available
 */
@Export
class WC7RateFactorSearch {

  private var WC7_CLASS_CODE_TABLE = "WC7_ClassCode_Rate"
  private var WC7_MIN_PREMIUM_TABLE = "WC7_MinimumPremium_Rate"
  private var WC7_EMP_LIAB_INCR_LIMITS = "WC7_Employers_Liability_Increase_Limits_Percent"    
  private var WC7_PREMIUM_DISCOUNT = "WC7_PremiumDiscount_Rate"    
  
  private var _period : PolicyPeriod as readonly Period
  private var _minRatingLevel : RateBookStatus as MinimumRatingLevel

  construct(policyPeriod : PolicyPeriod, minRatingLevel : RateBookStatus) {
    _period = policyPeriod
    _minRatingLevel = minRatingLevel
  }
  
  /**
   * Get the rate for a particular coverede employee's class code from the RTM
   * @param covEmp - the class code of the {@link WC7CoveredEmployee} is used as a parameter in the rate query 
   * @param ratingDate - the date that is used to get the rates
   * @return BigDecimal - the rate factor 
   */
  function getClassCodeRate(covEmp : WC7CoveredEmployee, ratingDate : Date) : BigDecimal {
    var jurisdiction = JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(covEmp.LocationWM)
    var params = {
      new RateQueryParam<String>("CLASSCODE", covEmp.ClassCode.Code)
    }
    return getFactor(jurisdiction, params, WC7_CLASS_CODE_TABLE, ratingDate)
  }    

  /**
   * Get the rate for the minimum premium using the covered employee's classcode from the RTM
   * @param covEmp - the class code of the {@link WC7CoveredEmployee} is used as a parameter in the rate query 
   * @param ratingDate - the date that is used to get the rates
   * @return BigDecimal - the rate factor 
   */  
  function getMinimumPremiumRate(covEmp : WC7CoveredEmployee, ratingDate : Date) : BigDecimal {
    var jurisdiction = JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(covEmp.LocationWM)
    var params = {
      new RateQueryParam<String>("CLASSCODE", covEmp.ClassCode.Code)
    }
    return getFactor(jurisdiction, params, WC7_MIN_PREMIUM_TABLE, ratingDate)
  }  

  /**
   * Get the rate for the employee liability coverage from the RTM
   * @param empLiabCov - the each accident limit and disease policy limit in the  
   *                     {@link WC7WorkersCompEmpLiabInsurancePolicyACov} is used as a parameter in the rate query 
   * @param ratingDate - the date that is used to get the rates
   * @return BigDecimal - the rate factor 
   */  
  function getEmpLiabLimitFactor(empLiabCov : WC7WorkersCompEmpLiabInsurancePolicyACov, ratingDate : Date) : BigDecimal {
    var jurisdiction = empLiabCov.WCLine.BaseState
    var packageTerms = empLiabCov.WC7EmpLiabLimitTerm.PackageValue.PackageTerms
    var eachAccidentLimit = packageTerms.firstWhere(\ p -> p.AggregationModel == CovTermModelAgg.TC_EA and 
                                                  p.RestrictionModel == CovTermModelRest.TC_BIA).Value

    var diseasePolicyLimit = empLiabCov.WC7EmpLiabPolicyLimitTerm.OptionValue.Value
    var params = {
      new RateQueryParam<BigDecimal>("EACHACCIDENTLIMIT", eachAccidentLimit),
      new RateQueryParam<BigDecimal>("DISEASEPOLICYLIMIT",diseasePolicyLimit)
    }
    return getFactor(jurisdiction, params, WC7_EMP_LIAB_INCR_LIMITS, ratingDate)
  }  

  /**
   * Get the rate for the premium discount from the RTM
   * @param policyStandardPrem - the standard premium amount is used as a parameter in the rate query 
   * @param ratingDate - the date that is used to get the rates
   * @return BigDecimal - the rate factor 
   */    
  function getPremiumDiscountFactor(policyStandardPrem : BigDecimal, ratingDate : Date) : BigDecimal {
    var jurisdiction = _period.WC7Line.BaseState
    var params = {
      new RateQueryParam<BigDecimal>("PREMIUM", policyStandardPrem)
    }
    return getFactor(jurisdiction, params, WC7_PREMIUM_DISCOUNT, ratingDate)
  }

  /**
   * Returns a hard coded rate for the USLH factor
   * @param covEmp - the governing law of the {@link WC7CoveredEmployee} is used to return a rate
   * @return BigDecimal - the rate factor
   */    
  function getUSLHFactor(covEmp : WC7CoveredEmployee) : BigDecimal {
    // hard code the rate for now
    return (covEmp.GoverningLaw == WC7GoverningLaw.TC_LONGSHOREANDHARBOR)
            ? 1.45
            : BigDecimal.ONE
  }  

  /**
   * Returns a hard coded rate for the Terrorism factor
   * @return BigDecimal - the rate factor
   */    
  function getTerrorismFactor() : BigDecimal {
    // hard code the rate for now
    return 0.0500
  }  

  /**
   * Returns a hard coded rate for the Expense Constant factor
   * @return BigDecimal - the rate factor
   */      
  function getExpenseConstantFactor() : BigDecimal {
    // hard code the rate for now
    return 90.0000
  }
       
  private function getFactor<Q extends Comparable>(jurisdiction : Jurisdiction, 
                                                   inputParams : List<RateQueryParam<Q>>,
                                                   tableCode : String,
                                                   ratingDate : Date) : BigDecimal {
    var filter = new RateBookQueryFilter(ratingDate, Period.RateAsOfDate, Period.WC7Line.PatternCode)
                  {:Jurisdiction = jurisdiction, :UWCompany = Period.UWCompany,
                   :Offering = Period.Offering.Code, :MinimumRatingLevel = MinimumRatingLevel,
                   :RenewalJob = Period.JobProcess typeis RenewalProcess}
    var result = new RatingQueryFacade().getFactor<Q, BigDecimal>(filter, tableCode, inputParams)
    return !result.Empty ? result.Factor : BigDecimal.ONE
  }
}
