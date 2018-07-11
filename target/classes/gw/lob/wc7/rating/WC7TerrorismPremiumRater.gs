package gw.lob.wc7.rating

uses gw.rating.CostData
uses java.math.BigDecimal

@Export
class WC7TerrorismPremiumRater {
  
  private construct() {
  }
  
  static function rate(engine : WC7BasicTemplateRatingEngine, ratingPeriod : WC7RatingPeriod, step : WC7RatingStepExt, context : WC7BasicTemplateRatingEngine) : WC7JurisdictionCostData {
    var costData : WC7JurisdictionCostData = null
    if (ratingPeriod.RatingStart.compareIgnoreTime(context.Period.PeriodStart) == 0) {
      var terrorismRate = engine.RateFactorSearch.getTerrorismFactor()
      terrorismRate = context.convertRateByUsage(terrorismRate, step.rateConversionType)
      if (terrorismRate <> 0) {
        var statePayroll = context.Payroll.get(ratingPeriod.Jurisdiction.Jurisdiction)
        if (statePayroll > 0) {
          costData = ratingPeriod.createCostData(step)
          costData.CalcOrder = 440
          var existingCost = costData.getExistingCost(context.WC7Line)
          
          costData.SubjectToReporting = true
          costData.Basis = statePayroll
          costData.StandardBaseRate = terrorismRate
          costData.StandardAdjRate = costData.StandardBaseRate
          costData.StandardTermAmount = computeTermAmount(costData.Basis, costData.StandardAdjRate, context)
          costData.StandardAmount = costData.StandardTermAmount

          costData.copyOverridesFromCost(existingCost)          
          computeValuesFromCostOverrides(existingCost, costData, context)
        }
      }
    }
    return costData  
  }

  //
  // PRIVATE SUPPORT METHODS
  //  
  private static function computeValuesFromCostOverrides(cost : WC7JurisdictionCost, costData : CostData, context : WC7BasicTemplateRatingEngine) {
    if (cost.OverrideBaseRate != null) {
      costData.ActualBaseRate = cost.OverrideBaseRate
      costData.ActualAdjRate = cost.OverrideBaseRate
      costData.ActualTermAmount = computeTermAmount(costData.Basis, costData.ActualAdjRate, context)
      costData.ActualAmount = costData.ActualTermAmount
    }
    else if (cost.OverrideAdjRate != null) {
      costData.ActualBaseRate = 0
      costData.ActualAdjRate = cost.OverrideAdjRate
      costData.ActualTermAmount = computeTermAmount(costData.Basis, costData.ActualAdjRate, context)
      costData.ActualAmount = costData.ActualTermAmount
    }
    else if (cost.OverrideAmount != null) {
      costData.Basis = 0
      costData.ActualBaseRate = 0
      costData.ActualAdjRate = 0
      costData.ActualTermAmount = cost.OverrideAmount
      costData.ActualAmount = cost.OverrideAmount
    }
    else {
      costData.copyStandardColumnsToActualColumns()  
    }
  }
  
  private static function computeTermAmount (basis : BigDecimal, rate : BigDecimal, context : WC7BasicTemplateRatingEngine) : BigDecimal {
    return (basis * rate / 100).setScale(context.RoundingLevel, context.RoundingMode)    
  }
}
