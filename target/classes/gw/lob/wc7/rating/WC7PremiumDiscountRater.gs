package gw.lob.wc7.rating

uses java.math.BigDecimal
uses gw.rating.CostData

@Export
class WC7PremiumDiscountRater {
  
  private construct() {
  }
  
  static function rate(blendedRate : BigDecimal, ratingPeriod : WC7RatingPeriod,
                       step : WC7RatingStepExt, context : WC7BasicTemplateRatingEngine) : WC7JurisdictionCostData {
    var costData : WC7JurisdictionCostData = null
    if (blendedRate <> 0) {
      var jurisStandardPremium = context.getRatingSubtotal("wc_standard", jurisdiction, ratingPeriod.Jurisdiction.Jurisdiction, null)
      if (jurisStandardPremium > 0) {
        costData = ratingPeriod.createCostData(step)
        costData.CalcOrder = 410
        var existingCost = costData.getExistingCost(context.WC7Line)
        
        costData.SubjectToReporting = true
        costData.Basis = jurisStandardPremium
        costData.StandardBaseRate = blendedRate
        costData.StandardAdjRate = costData.StandardBaseRate
        costData.StandardTermAmount = (costData.Basis * costData.StandardAdjRate).setScale(context.RoundingLevel, context.RoundingMode)
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
