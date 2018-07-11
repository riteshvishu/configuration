package gw.lob.wc7.rating

uses gw.rating.CostData

@Export
class WC7PolicyLevelMinimumPremiumRater {
  private construct() {
  }
  
  static function rate(ratingPeriod : WC7RatingPeriod, step : WC7RatingStepExt, context : WC7BasicTemplateRatingEngine) : WC7JurisdictionCostData {
    var costData : WC7JurisdictionCostData = null
    if (shouldRate(ratingPeriod, context)) {
      costData = ratingPeriod.createCostData(step)
      costData.CalcOrder = 390
      var existingCost = costData.getExistingCost(context.WC7Line)
      costData.Basis      = context.MinimumPremiumBasis
      costData.SubjectToReporting = true
      
      costData.StandardBaseRate    = context.MinimumPremiumAdjustment
      costData.StandardAdjRate = costData.StandardBaseRate
      costData.StandardTermAmount = context.MinimumPremiumAdd
      costData.StandardAmount     = costData.StandardTermAmount
      
      costData.copyOverridesFromCost(existingCost)
      computeValuesFromCostOverrides(existingCost, costData, context)
    }
    return costData
  }
  
  //
  // PRIVATE SUPPORT FUNCTIONS
  //
  private static function computeValuesFromCostOverrides(cost : WC7JurisdictionCost,
                                                         costData : CostData, context : WC7BasicTemplateRatingEngine) {
      if (cost.OverrideBaseRate != null) {
        costData.ActualBaseRate = cost.OverrideBaseRate  
        costData.ActualAdjRate = cost.OverrideBaseRate  
        if (cost.OverrideBaseRate > context.MinimumPremiumBasis) {
          costData.ActualTermAmount = cost.OverrideBaseRate - context.MinimumPremiumBasis
          costData.ActualAmount = costData.ActualTermAmount
        }
        else {
          costData.ActualTermAmount = 0 
          costData.ActualAmount = 0
        }
      }
      else if (cost.OverrideAdjRate != null) {
        costData.ActualBaseRate = 0
        costData.ActualAdjRate = cost.OverrideAdjRate
        if (cost.OverrideAdjRate > context.MinimumPremiumBasis) {
          costData.ActualTermAmount = cost.OverrideAdjRate - context.MinimumPremiumBasis
          costData.ActualAmount = costData.ActualTermAmount
        }
        else {
          costData.ActualTermAmount = 0
          costData.ActualAmount = 0
        }
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
  
  /**
   * Return true if this is the first rating period and it has a positive minimum premium matching the state
   */
  private static function shouldRate(period : WC7RatingPeriod, context : WC7BasicTemplateRatingEngine) : boolean {
    return (context.MinimumPremiumAdd > 0
         and period.Jurisdiction.Jurisdiction == context.MinimumPremiumState
         and period.RatingStart.compareIgnoreTime(context.Period.PeriodStart) == 0)
  }
}
