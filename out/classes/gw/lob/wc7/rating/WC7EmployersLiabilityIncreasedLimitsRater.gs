package gw.lob.wc7.rating
uses java.math.RoundingMode
uses java.math.BigDecimal
uses gw.rating.CostData
uses gw.api.util.DisplayableException

@Export
class WC7EmployersLiabilityIncreasedLimitsRater {

  static function rate(ratingPeriod : WC7RatingPeriod, 
                       step : WC7RatingStepExt,
                       atRatingPeriodLevel : boolean, 
                       context : WC7BasicTemplateRatingEngine) : WC7JurisdictionCostData {
    var costData : WC7JurisdictionCostData = null
    var covs = ratingPeriod.Jurisdiction.WCLine.VersionList.WC7LineCoveragesAsOf(ratingPeriod.RatingStart).whereTypeIs(WC7WorkersCompEmpLiabInsurancePolicyACov)
    if (covs.Count > 1) {
      throw new DisplayableException(displaykey.atMostOneEmpLiabCov(WC7WorkersCompEmpLiabInsurancePolicyACov, ratingPeriod.RatingStart , covs.Count))
    }
    
    // Get the factor from the rate book
    var limitFactor = context.RateFactorSearch.getEmpLiabLimitFactor(covs.first(), ratingPeriod.RatingDate)
    if (not limitFactor.IsZero) {
      var basis = context.getRatingSubtotal(step.subtotal, atRatingPeriodLevel ? WC7RatingSubtotalGranularity.ratingPeriod : WC7RatingSubtotalGranularity.jurisdiction, ratingPeriod.Jurisdiction.Jurisdiction, ratingPeriod.RatingStart as String)
      var convertedRate = context.convertRateByUsage(limitFactor, step.rateConversionType)
      var roundingLevel = context.RoundingLevel
      var roundingMode = context.RoundingMode
      if (not convertedRate.IsZero) {
        costData = ratingPeriod.createCostData(step)
        costData.CalcOrder = 120
        var existingCost = costData.getExistingCost(context.WC7Line)
        costData.Basis = basis
        costData.SubjectToReporting = true
        costData.StandardBaseRate = (limitFactor/100) + 1
        costData.StandardAdjRate = costData.StandardBaseRate
        costData.StandardTermAmount = computeTermAmount(costData.Basis, costData.StandardBaseRate, roundingLevel, roundingMode)
        costData.StandardAmount = costData.StandardTermAmount       
        costData.copyStandardColumnsToActualColumns()       
        costData.copyOverridesFromCost(existingCost)
        computeValuesFromCostOverrides(existingCost, costData, context, step)
      }
    }    
    return costData
  }
  
  private static function computeValuesFromCostOverrides(cost : Cost, 
                                                         costData : CostData,
                                                         context : WC7BasicTemplateRatingEngine,
                                                         step : WC7RatingStepExt) {
    var roundingLevel = context.RoundingLevel                                                           
    var roundingMode = context.RoundingMode
    var convertedRate : BigDecimal
    if (cost.OverrideBaseRate != null) {
      costData.ActualBaseRate = cost.OverrideBaseRate
      costData.ActualAdjRate = cost.OverrideBaseRate  
      convertedRate = context.convertRateByUsage(costData.ActualAdjRate, step.rateConversionType)
      costData.ActualTermAmount = computeTermAmount(costData.Basis, convertedRate, roundingLevel, roundingMode)
      costData.ActualAmount = costData.ActualTermAmount   
    }
    else if (cost.OverrideAdjRate != null) {
      costData.ActualBaseRate = 0
      costData.ActualAdjRate = cost.OverrideAdjRate  
      convertedRate = context.convertRateByUsage(costData.ActualAdjRate, step.rateConversionType)
      costData.ActualTermAmount = computeTermAmount(costData.Basis, convertedRate, roundingLevel, roundingMode)
      costData.ActualAmount = costData.ActualTermAmount               
    }
    else if (cost.OverrideAmount != null) {
      costData.Basis = 0
      costData.ActualBaseRate = 0
      costData.ActualAdjRate = 0
      convertedRate = context.convertRateByUsage(costData.ActualAdjRate, step.rateConversionType)
      costData.ActualTermAmount = cost.OverrideAmount
      costData.ActualAmount = cost.OverrideAmount
    }
    else {
      costData.copyStandardColumnsToActualColumns()
    }
  }
  
  private static function computeTermAmount(basis : BigDecimal, 
                                            convertedRate : BigDecimal, 
                                            roundingLevel : int, 
                                            roundingMode : RoundingMode) : BigDecimal {    
    return (basis * convertedRate).setScale(roundingLevel, roundingMode)
  }
}
