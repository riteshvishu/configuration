package gw.lob.wc7.rating
uses gw.rating.CostData

@Export
class WC7ExpenseConstantRater {
  
  construct() {
  }
  
  static function rate(ratingPeriod : WC7RatingPeriod, step : WC7RatingStepExt, context : WC7BasicTemplateRatingEngine) : WC7JurisdictionCostData {
    var costData : WC7JurisdictionCostData = null
    if (shouldRate(ratingPeriod, context)) {
      costData = ratingPeriod.createCostData(step)
      costData.CalcOrder = 430
      var existingCost = costData.getExistingCost(context.WC7Line)
      
      costData.SubjectToReporting = true
      costData.Basis = 0
      costData.StandardBaseRate = 0
      costData.StandardAdjRate = costData.StandardBaseRate
      costData.StandardTermAmount = context.ExpenseConstant
      costData.StandardAmount = costData.StandardTermAmount
      
      costData.copyOverridesFromCost(existingCost)
      computeValuesFromCostOverrides(existingCost, costData)
            
    }  
    return costData 
  }
  
  //
  // PRIVATE SUPPORT FUNCTIONS
  //
  private static function computeValuesFromCostOverrides(cost : WC7JurisdictionCost, costData : CostData) {
    if (cost.OverrideAmount != null) {
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
   * Return true if this is the first rating period and it has a positive expense constant in the matching state
   */
  private static function shouldRate(period : WC7RatingPeriod, context : WC7BasicTemplateRatingEngine) : boolean {
    return (context.ExpenseConstant > 0
         and period.Jurisdiction.Jurisdiction == context.ExpenseConstantState
         and period.RatingStart.compareIgnoreTime(context.Period.PeriodStart) == 0)
  }
}
