package gw.lob.wc7.rating
uses gw.util.AutoMap
uses java.math.BigDecimal
uses java.math.RoundingMode

interface WC7BasicTemplateRatingEngine<PL extends PolicyLine> {
  
  property get RateFactorSearch() : WC7RateFactorSearch
  
  property get WC7Line() : WC7Line
  
  property get Payroll() : AutoMap<Jurisdiction, BigDecimal>
  
  function updateMinimumPremium( theMinPremium : BigDecimal, rateState : Jurisdiction, normalizedClassCode : String )
  
  property get RoundingLevel() : int
  
  property get RoundingMode() : RoundingMode
  
  function getRatingSubtotal(subtotal : RateSubtotalType, granularity : WC7RatingSubtotalGranularity, st : Jurisdiction, rpsd : String) : BigDecimal
  
  function convertRateByUsage( rate : BigDecimal, usage : RateConversionType ) : BigDecimal
  
  property get ExpenseConstant() : BigDecimal
  
  property get ExpenseConstantState() : Jurisdiction
  
  property get Period() : PolicyPeriod
  
  function getOrCalcSubtotal( ratingPeriod : WC7RatingPeriod, step : WC7RatingStepExt, atRatingPeriodLevel : boolean ) : BigDecimal
  
  property get MinimumPremiumAdd() : BigDecimal
  
  property get MinimumPremiumBasis() : BigDecimal
  
  property get MinimumPremiumAdjustment() : BigDecimal
  
  property get MinimumPremiumState() : Jurisdiction
  
  function getCostAmountSum(ratingPeriod : WC7RatingPeriod) : BigDecimal

}
