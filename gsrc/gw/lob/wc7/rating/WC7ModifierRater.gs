package gw.lob.wc7.rating
uses java.math.RoundingMode
uses java.math.BigDecimal
uses gw.api.domain.financials.PCFinancialsLogger
uses gw.api.productmodel.ModifierPattern

@Export
class WC7ModifierRater {
  
  private construct() {
  }
  
  static function rate(ratingPeriod : WC7RatingPeriod, step : WC7RatingStepExt,
                       atRatingPeriodLevel : boolean, context : WC7BasicTemplateRatingEngine) : WC7JurisdictionCostData {
    var costData : WC7JurisdictionCostData = null
    var mods = ratingPeriod.Jurisdiction.VersionList.WC7ModifiersAsOf(ratingPeriod.RatingStart)
                .where(\ mod -> mod.ModifierType == step.modifierID)
    if (mods.Count > 1) {
      throw "Expected to find at most one modifier of type " + step.modifierID
            + " on " + ratingPeriod.RatingDate + " in " + ratingPeriod.Jurisdiction
    }
    var mod = mods.first()
    if (mod != null) {
      var stdRate = getStdRate(mod)
      if (stdRate != null) {  // if there is no rate, then we assume that no modification is necessary
        var convertedRate = context.convertRateByUsage(stdRate, step.rateConversionType)
        var basis = context.getOrCalcSubtotal(ratingPeriod, step, atRatingPeriodLevel)
        if (not convertedRate.IsZero // create cost no matter what
            or mod.PatternCode == ModifierPattern.ExpMod.Code // always show experience modifier
          ) {          
          costData = ratingPeriod.createCostData(step)
          costData.CalcOrder = 201
          costData.Overridable = false
          costData.SubjectToReporting = true
          
          costData.Basis = basis
          costData.StandardBaseRate  = stdRate
          costData.StandardAdjRate = costData.StandardBaseRate
          costData.StandardTermAmount = calculateTermAmount(basis, convertedRate, context.RoundingLevel, context.RoundingMode)
          costData.StandardAmount = costData.StandardTermAmount                  
  
          costData.copyStandardColumnsToActualColumns()             
        }
      }
    }
    
    return costData  
  }
  
  private static function calculateTermAmount(basis : BigDecimal, convertedRate : BigDecimal, 
      roundingLevel : int, roundingMode : RoundingMode) : BigDecimal {
    return (basis * convertedRate).setScale(roundingLevel, roundingMode)
  }

  /**
   * Gets the standard modifier rate, which varies by the type of the modifier.
   * For rate modifier types, return the rate modifier itself.
   * If there is no rate, then return null.
   */
  private static function getStdRate(modifier : WC7Modifier) : BigDecimal
  {
    var rate : BigDecimal
    switch ( modifier.Pattern.ModifierDataType )
    {
      case "rate":
        rate = modifier.RateModifier
        break
      default: PCFinancialsLogger.logError( "Unhandled modifier type encountered: " + modifier.Pattern.ModifierDataType +
        " for modifier " + modifier.Pattern.PublicID )
    }
    return rate
  }
}
