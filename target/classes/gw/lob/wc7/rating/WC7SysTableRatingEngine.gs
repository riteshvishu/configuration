package gw.lob.wc7.rating

uses gw.rating.CostData
uses gw.api.domain.financials.PCFinancialsLogger
uses gw.api.util.JurisdictionMappingUtil
uses java.math.RoundingMode
uses java.math.BigDecimal
uses java.lang.Double
uses java.util.HashMap
uses gw.util.AutoMap
uses java.util.Map

/**
 * This is a mock (non-RTM) rating engine, which uses some hard coded rates for class codes.
 * Intended use of this class is for testing purposes ONLY
 */
@Export
class WC7SysTableRatingEngine extends WC7AbstractRatingEngine {
  
  var _minPremium      : BigDecimal as MinimumPremium
  var _minPremiumState : Jurisdiction as MinimumPremiumState
  var _minPremiumClass : String     as MinimumPremiumClass
  
  var _payroll = new AutoMap<Jurisdiction, BigDecimal>( \ key -> BigDecimal.ZERO )
                                            
  /**
   * The running count of payroll by state.  Additionally, Payroll is an
   * AutoMap that inserts a 0 value whenever it enounters a new key.
   */
  property get Payroll() : AutoMap<Jurisdiction, BigDecimal> { return _payroll }
  
  private var classCodeRates = new HashMap<String, BigDecimal>() {"0005" -> 4.99,
                                            "0035" -> 2.99,
                                            "6251" -> 0.2,
                                            "6258" -> 5.69,
                                            "U709F" -> 5.69}
  
  private var uslhRate = new HashMap<String, BigDecimal>() {  "U709F" -> 5.69}

  private var classCodeMinPremRates = new HashMap<String, BigDecimal>() {"0005" -> 574,
                                            "6251" -> 627}

                                            
  construct(line : WC7Line) {
    super(line, null)
  }

  override function rateOnly() : Map<PolicyLine, List<CostData>> {
    rateCoveredEmployees()
    rateUSLH()
    return CostDataMap
  }
  
  //----------------------------------------------------------------- private functions
  
  /**
   * Rate Covered Employees for the pre-defined rates
   */
  private function rateCoveredEmployees() {
    var logMsg = "Rating covered employees without RTM..."
    PCFinancialsLogger.logInfo( logMsg )
    var allWC7CoveredEmployees = PolicyLine.VersionList.WC7CoveredEmployees.flatMap( \ empVL -> empVL.AllVersions )
    for (covEmp in allWC7CoveredEmployees) {
      if (covEmp.NumDaysEffectiveForRating > 0) {
        
        var msg = "Rating ${covEmp}:[${covEmp.EffectiveDateForRating.ShortFormat}-${covEmp.ExpirationDateForRating.ShortFormat}]...'Manual Premium'"
        PCFinancialsLogger.logInfo(msg)
        var manualRate = getManualRateAndUpdateMinimumPremiums(covEmp)
        var ratingDate = covEmp.WC7WorkersCompLine.RepresentativeJurisdictions
                            .firstWhere(\ j -> j.Jurisdiction == getRatingState(covEmp)).getPriorRatingDate(covEmp.EffectiveDate)
        var uwCompFactor = covEmp.Branch.getUWCompanyRateFactor(ratingDate, getRatingState(covEmp))
        var uslhFactor = 1
        addCost(getRate(covEmp, manualRate, uwCompFactor, uslhFactor, WC7CovEmpCostType.TC_MANUALPREMIUM))
      }
    }
    PCFinancialsLogger.logInfo( logMsg + "done" )
  }
  
  /**
   * Rate Covered Employees for the pre-defined rates
   */
  private function rateUSLH() {
    var logMsg = "Rating covered employees without RTM... USLH"
    PCFinancialsLogger.logInfo( logMsg )
    var allWC7CoveredEmployees = PolicyLine.VersionList.WC7CoveredEmployees.flatMap( \ empVL -> empVL.AllVersions )
    for (covEmp in allWC7CoveredEmployees) {
      if (covEmp.NumDaysEffectiveForRating > 0) {
        if (covEmp.ClassCode.ClassCodeType == WC7ClassCodeType.TC_USLH){
          var msg = "Rating ${covEmp}:[${covEmp.EffectiveDateForRating.ShortFormat}-${covEmp.ExpirationDateForRating.ShortFormat}]...USLH"
          PCFinancialsLogger.logInfo(msg)
          var theUSLHRate = getUSLH(covEmp)
          var ratingDate = covEmp.WC7WorkersCompLine.RepresentativeJurisdictions
                              .firstWhere(\ j -> j.Jurisdiction == getRatingState(covEmp)).getPriorRatingDate(covEmp.EffectiveDate)
          var uwCompFactor = covEmp.Branch.getUWCompanyRateFactor(ratingDate, getRatingState(covEmp))
          var uslhFactor = 1
          addCost(getRate(covEmp, theUSLHRate, uwCompFactor, uslhFactor, WC7CovEmpCostType.TC_USLH))  
        }
      }
    }
    PCFinancialsLogger.logInfo( logMsg + "done" )
  }

  private function getManualRateAndUpdateMinimumPremiums(covEmp : WC7CoveredEmployee) : BigDecimal {
    var classCodeVal = covEmp.ClassCode.Code
    var classCodeRate = classCodeRates.get(classCodeVal)
    var minPremRate = classCodeMinPremRates.get(classCodeVal)
    
    var theRate = (classCodeRate != null) ? classCodeRate : 1
    var theMinPremium = (minPremRate != null) ? minPremRate : 1
    updateMinimumPremium(theMinPremium, getRatingState(covEmp), normalizeClassCode(classCodeVal))
    return theRate
  }

  private function getUSLH(covEmp : WC7CoveredEmployee) : BigDecimal {
    var classCodeVal = covEmp.ClassCode.Code
    var lookupVal = uslhRate.get(classCodeVal)
    var theRate = lookupVal == null ? 1 : lookupVal
    return theRate
  }
  
  private function normalizeClassCode( classCode : String ) : String {
    return classCode.substring(0, 4)
  }
    
  private function getRoundingLevel(emp : WC7CoveredEmployee) : int {
    return emp.Branch.Policy.Product.QuoteRoundingLevel
  }
  
  private function getRoundingMode(emp : WC7CoveredEmployee) : RoundingMode {
    return emp.Branch.Policy.Product.QuoteRoundingMode
  }
  
  private function getRatingState(emp : WC7CoveredEmployee) : Jurisdiction {
    return JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(emp.Location)
  }

  private function getRate(covEmp : WC7CoveredEmployee,
                           manualRate : BigDecimal,
                           uwCompFactor : Double,
                           uslhFactor : BigDecimal,
                           costType : WC7CovEmpCostType) : WC7CovEmpCostData {
    var covFixedID = covEmp.WC7WorkersCompLine.WC7WorkersCompEmpLiabInsurancePolicyACov.FixedId
    var juris = JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(covEmp.Location )
    var costData = new WC7CovEmpCostData(covEmp.EffectiveDateForRating,
                                        covEmp.ExpirationDateForRating,
                                        covEmp.FixedId,
                                        covFixedID,
                                        juris, 
                                        costType,
                                        this.PolicyLine.PreferredCoverageCurrency)
    var existingCost = costData.getExistingCost(this.PolicyLine)
    costData.NumDaysInRatedTerm = covEmp.NumDaysEffectiveForRating
    costData.Basis = covEmp.BasisForRating
    costData.SubjectToReporting = true
    
    costData.StandardBaseRate = (manualRate * uwCompFactor).setScale(4, java.math.RoundingMode.HALF_UP)
    costData.StandardAdjRate = computeAdjustedRate(costData.StandardBaseRate, uslhFactor)
    costData.StandardTermAmount = computeTermAmount(covEmp, costData.StandardAdjRate, costData.Basis)
    costData.StandardAmount = costData.StandardTermAmount
    
    costData.copyOverridesFromCost(existingCost)
    computeValuesFromCostOverrides(existingCost, costData, covEmp)
    this.Payroll.put(getRatingState(covEmp), this.Payroll.get(getRatingState(covEmp)) + costData.Basis)
    return costData
  }
  
  private function computeValuesFromCostOverrides(cost : Cost, costData : CostData, covEmp : WC7CoveredEmployee) {
    if (cost.OverrideBaseRate != null) {
      costData.ActualBaseRate = cost.OverrideBaseRate
      costData.ActualAdjRate = cost.OverrideBaseRate
      costData.ActualTermAmount = computeTermAmount(covEmp, costData.ActualAdjRate, costData.Basis)
      costData.ActualAmount = costData.ActualTermAmount   
    } else if (cost.OverrideAdjRate != null) {
      costData.ActualBaseRate = 0
      costData.ActualAdjRate = cost.OverrideAdjRate
      costData.ActualTermAmount = computeTermAmount(covEmp, costData.ActualAdjRate, costData.Basis)
      costData.ActualAmount = costData.ActualTermAmount 
    } else if (cost.OverrideAmount != null) {
      costData.Basis = 0
      costData.ActualBaseRate = 0
      costData.ActualAdjRate = 0
      costData.ActualTermAmount = cost.OverrideAmount
      costData.ActualAmount = cost.OverrideAmount
    } else { 
      costData.copyStandardColumnsToActualColumns()
    }
  }
  
  private function computeAdjustedRate(baseRate : BigDecimal, uslhFactor : BigDecimal) : BigDecimal {
    return (baseRate * uslhFactor).setScale(4, java.math.RoundingMode.HALF_UP)  
  }
  
  private function computeTermAmount(covEmp : WC7CoveredEmployee, adjRate : BigDecimal, basis : BigDecimal) : BigDecimal {
    return (adjRate * basis * covEmp.ClassCode.Basis.RateFactor).setScale(getRoundingLevel(covEmp), getRoundingMode(covEmp))  
  }

  /**
   * Update the minimum premium if the supplied minimum premium is the largest seen so far, or,
   * if it is the same as the current minimum premium, but is in a state that comes earlier in the alphabet
   * (so rating results are consistent).
   */
  function updateMinimumPremium( theMinPremium : BigDecimal, rateState : Jurisdiction, normalizedClassCode : String )
  {
    if (theMinPremium > MinimumPremium
        or (theMinPremium == MinimumPremium and MinimumPremiumState > rateState) )
    {
      MinimumPremium      = theMinPremium
      MinimumPremiumState = rateState
      MinimumPremiumClass = normalizedClassCode
    }
  }
}
