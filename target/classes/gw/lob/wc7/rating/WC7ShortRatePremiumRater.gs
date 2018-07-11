package gw.lob.wc7.rating

uses gw.rating.CostData
uses java.math.BigDecimal

@Export
class WC7ShortRatePremiumRater {
  private construct() {
  }
  
  static function rate(shortRateFactor : BigDecimal, ratingPeriod : WC7RatingPeriod,
                       step : WC7RatingStepExt, context : WC7BasicTemplateRatingEngine) : WC7JurisdictionCostData {
    var costData : WC7JurisdictionCostData = null
    if (shortRateFactor != null) {
      var subtotal = context.getCostAmountSum(ratingPeriod)
      if (subtotal > 0) {
        costData = ratingPeriod.createCostData(step)
        var existingCost = costData.getExistingCost(context.WC7Line)
        costData.Basis = subtotal
        costData.SubjectToReporting = true        

        costData.StandardBaseRate = shortRateFactor
        costData.StandardAdjRate = costData.StandardBaseRate
        costData.StandardTermAmount = (costData.Basis * costData.StandardBaseRate).setScale(context.RoundingLevel, context.RoundingMode)
        costData.StandardAmount = costData.StandardTermAmount
        
        costData.copyOverridesFromCost(existingCost)
        computeValuesFromCostOverrides(existingCost, costData, context)
      }
    }
    return costData
  }
  
  //
  // PRIVATE SUPPORT FUNCTIONS
  //
  private static function computeValuesFromCostOverrides(cost : WC7JurisdictionCost, costData : CostData, context : WC7BasicTemplateRatingEngine) {
    if (cost.OverrideBaseRate != null) {
      costData.ActualBaseRate = cost.OverrideBaseRate
      costData.ActualAdjRate = cost.OverrideBaseRate
      costData.ActualTermAmount = computeTermAmount(costData, context)
      costData.ActualAmount = costData.ActualTermAmount
    }
    else if (cost.OverrideAdjRate != null) {
      costData.ActualBaseRate = 0
      costData.ActualAdjRate = cost.OverrideAdjRate
      costData.ActualTermAmount = computeTermAmount(costData, context)
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
  
  private static function computeTermAmount(costData : CostData, context : WC7BasicTemplateRatingEngine) : BigDecimal {
    return (costData.Basis * costData.ActualAdjRate).setScale(context.RoundingLevel, context.RoundingMode)
  }
}
