package gw.lob.wc7.rating

uses gw.api.domain.financials.PCFinancialsLogger
uses gw.rating.CostData
uses java.lang.Double
uses java.math.BigDecimal
uses java.math.RoundingMode
uses gw.api.util.JurisdictionMappingUtil
uses java.util.Date

@Export
class WC7CoveredEmployeeRater {
  
  static function rate(engine : WC7BasicTemplateRatingEngine, covEmp : WC7CoveredEmployee) : WC7CovEmpCostData {
    var costData : WC7CovEmpCostData
    var logMsg = " Rating " + covEmp + "..."
    PCFinancialsLogger.logDebug(logMsg)
    if (covEmp.NumDaysEffectiveForRating > 0) {
      // We can't just say this.WC7WorkersCompLine.getJurisdiction(XYZ) because we're in window mode.  The traversal
      // of this->WC7WorkersCompLine will use the last second of this's effective period to look up the line.
      // That's fine, but then when we traverse WC7WorkersCompLine->getJurisdiction(XYZY) it'll use the last second
      // of the line's effective period to look for the jurisdiction.  This will fail if the jurisdiction was
      // removed in this job.
      var ratingDate = covEmp.WC7WorkersCompLine.RepresentativeJurisdictions
                          .firstWhere(\ j -> j.Jurisdiction == getRatingState(covEmp)).getPriorRatingDate(covEmp.EffectiveDate)
      var manualRate = getManualRateAndUpdateMinimumPremiums(engine, covEmp, ratingDate)
      var uwCompFactor = covEmp.Branch.getUWCompanyRateFactor(ratingDate, getRatingState(covEmp))
      var uslhFactor = engine.RateFactorSearch.getUSLHFactor(covEmp)
      costData = rate_impl(engine, covEmp, manualRate, uwCompFactor, uslhFactor)  
      costData.CalcOrder = 0
    }
    PCFinancialsLogger.logDebug(logMsg + "done")
    return costData
  }

  // Only exposed for testing purposes
  protected static function rate_impl(engine : WC7BasicTemplateRatingEngine,
                                      covEmp : WC7CoveredEmployee,
                                      manualRate : BigDecimal,
                                      uwCompFactor : Double,
                                      uslhFactor : BigDecimal) : WC7CovEmpCostData {
    var covId = covEmp.WC7WorkersCompLine.WC7WorkersCompEmpLiabInsurancePolicyACov.FixedId
    var juris = JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(covEmp.Location )
    var costData = new WC7CovEmpCostData(covEmp.EffectiveDateForRating,
                                        covEmp.ExpirationDateForRating,
                                        covEmp.FixedId,
                                        covId,
                                        juris,
                                        WC7CovEmpCostType.TC_MANUALPREMIUM,
                                        engine.WC7Line.PreferredCoverageCurrency)
    var existingCost = costData.getExistingCost(engine.WC7Line)
    costData.NumDaysInRatedTerm = covEmp.NumDaysEffectiveForRating
    costData.Basis = covEmp.BasisForRating
    costData.SubjectToReporting = true
    
    costData.StandardBaseRate = (manualRate * uwCompFactor).setScale(4, RoundingMode.HALF_UP)
    costData.StandardAdjRate = computeAdjustedRate(costData.StandardBaseRate, uslhFactor)
    costData.StandardTermAmount = computeTermAmount(covEmp, costData.StandardAdjRate, costData.Basis)
    costData.StandardAmount = costData.StandardTermAmount
    
    costData.copyOverridesFromCost(existingCost)
    computeValuesFromCostOverrides(existingCost, costData, covEmp)
    engine.Payroll.put(getRatingState(covEmp), engine.Payroll.get(getRatingState(covEmp)) + costData.Basis)
    return costData
  }
  
  //
  // PRIVATE SUPPORT FUNCTIONS
  //
  private static function computeValuesFromCostOverrides(cost : Cost, costData : CostData, covEmp : WC7CoveredEmployee) {
    if (cost.OverrideBaseRate != null) {
      costData.ActualBaseRate = cost.OverrideBaseRate
      costData.ActualAdjRate = cost.OverrideBaseRate
      costData.ActualTermAmount = computeTermAmount(covEmp, costData.ActualAdjRate, costData.Basis)
      costData.ActualAmount = costData.ActualTermAmount   
    }
    else if (cost.OverrideAdjRate != null) {
      costData.ActualBaseRate = 0
      costData.ActualAdjRate = cost.OverrideAdjRate
      costData.ActualTermAmount = computeTermAmount(covEmp, costData.ActualAdjRate, costData.Basis)
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
  
  private static function computeAdjustedRate(baseRate : BigDecimal, uslhFactor : BigDecimal) : BigDecimal {
    return (baseRate * uslhFactor).setScale(4, RoundingMode.HALF_UP)  
  }
  
  private static function computeTermAmount(covEmp : WC7CoveredEmployee, adjRate : BigDecimal, basis : BigDecimal) : BigDecimal {
    return (adjRate * basis * covEmp.ClassCode.Basis.RateFactor).setScale(getRoundingLevel(covEmp), getRoundingMode(covEmp))  
  }
  
  /**
   * Gets the manual rate for this covered employee on the ratingDate and updates the minimum premium as necessary.
   * See the <code>WC7RateWCClassCodeSearchCriteria</code> for the full details on how the find is done.  If no
   * rate is returned from the <code>rates_workers_comp</code> then a sample one is calculated based off of
   * the class code.  The sample rate is guaranteed to consistently return the same rate for the same class code.
   */
  private static function getManualRateAndUpdateMinimumPremiums(engine : WC7BasicTemplateRatingEngine, covEmp : WC7CoveredEmployee, ratingDate : DateTime) : BigDecimal {
    // Find class code rate from RTM table
    var theRate = engine.RateFactorSearch.getClassCodeRate(covEmp, ratingDate)
    var theMinPremium = engine.RateFactorSearch.getMinimumPremiumRate(covEmp, ratingDate)
    engine.updateMinimumPremium(theMinPremium, getRatingState(covEmp), normalizeClassCode(covEmp.ClassCode.Code))
    return theRate
  }
  
  private static function normalizeClassCode( classCode : String ) : String {
    return classCode.substring( 0, 4 )  // i.e., "8017(1)" converts to "8017" for rate lookup
  }
  
  private static function getRoundingLevel(emp : WC7CoveredEmployee) : int {
    return emp.Branch.Policy.Product.QuoteRoundingLevel
  }
  
  private static function getRoundingMode(emp : WC7CoveredEmployee) : RoundingMode {
    return emp.Branch.Policy.Product.QuoteRoundingMode
  }
  
  private static function getRatingState(emp : WC7CoveredEmployee) : Jurisdiction {
    return JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(emp.Location)
  }
}
