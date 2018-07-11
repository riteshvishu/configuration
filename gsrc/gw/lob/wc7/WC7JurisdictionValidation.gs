package gw.lob.wc7

uses gw.validation.PCValidationBase
uses gw.validation.PCValidationContext
uses gw.api.util.DateUtil
uses java.lang.Integer
uses java.text.NumberFormat
uses gw.api.util.StateJurisdictionMappingUtil
uses java.util.HashMap
uses java.math.BigDecimal

/**
 * Validation for {@link WC7Jurisdiction}
 */
@Export
class WC7JurisdictionValidation extends PCValidationBase {

  static var _currencyFormatter : NumberFormat = null
  
  var _jurisdiction: WC7Jurisdiction

  construct(valContext : PCValidationContext, jurisdiction: WC7Jurisdiction) {
    super(valContext)
    _jurisdiction = jurisdiction
    if (null == _currencyFormatter) {
      _currencyFormatter = NumberFormat.getCurrencyInstance()
      _currencyFormatter.setMaximumFractionDigits(0)
    }
  }

  override protected function validateImpl() : void {
    Context.addToVisited( this, "validateImpl" )
    anniversaryDateWithinBounds()
    atLeastOneClass()
    classCodesAreValid()
    ratingPeriodStartDatesAreValid()
    constructionClassCodeRequiredforCPAPModifier()
    supplementaryDiseasePayrollTotalIsValid()
    aRatedClassCodeRateIsRequiredAndMustBeSameForEachClassCodeAcrossAllRatingPeriods()
    supplementalLoadingRateIsRequiredAndMustBeSameForEachClassCodeAcrossAllRatingPeriods()
  }
  
  /**
   * Validate that the anniversary date is between 1 year before period start and period start.
   */
  function anniversaryDateWithinBounds() {
    Context.addToVisited( this, "anniversaryDateWithinBounds" )
    var effDateLess1Year = _jurisdiction.WCLine.Branch.PeriodStart.addYears(-1)

    if (_jurisdiction.AnniversaryDate != null) {
      if (DateUtil.compareIgnoreTime(_jurisdiction.AnniversaryDate, effDateLess1Year) <= 0 or
          DateUtil.compareIgnoreTime(_jurisdiction.AnniversaryDate, _jurisdiction.WCLine.Branch.PeriodStart) > 0) {
        Result.addError(_jurisdiction
          , ValidationLevel.TC_DEFAULT
          , displaykey.Web.Policy.WC.Validation.AnniversaryDateBeforeEffectiveDate)
      }
    }
  }  

  /**
   * All class codes are available on the given jurisdiction
   */
  function classCodesAreValid() {
    Context.addToVisited(this, "classCodesAreValid")
    
    if (Context.isAtLeast(ValidationLevel.TC_DEFAULT)) {
      var line = _jurisdiction.WCLine
      var jurisdiction = _jurisdiction.Jurisdiction
      var employees = line.getWC7CoveredEmployeesWM(jurisdiction)
      for (employee in employees) {
        var previousCode = line.Branch.Job.NewTerm ? null : employee.BasedOn.ClassCode
        var classCode = employee.ClassCode.Code        
        var excludedClassCodeTypes = WC7ClassCodeType.TF_MARITIMEFELA.TypeKeys
        if (not line.doesClassCodeExist(classCode, jurisdiction, null, previousCode, excludedClassCodeTypes)) {
          Result.addError(_jurisdiction.WCLine
            , ValidationLevel.TC_DEFAULT
            , displaykey.Web.Policy.WC7.Validation.InvalidClassCode(classCode, jurisdiction)
            , "WC7WorkersCompCoverageConfig")
        }        
      }
    }
  }

  /**
   * At least one class code exists for each jurisdiction.
   */
  function atLeastOneClass() {
    Context.addToVisited(this, "atLeastOneClass")
    if( _jurisdiction.WCLine.getWC7CoveredEmployeeBasesWM(_jurisdiction.Jurisdiction).Count == 0){
      if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE)) {
        Result.addError(_jurisdiction.WCLine
          , ValidationLevel.TC_QUOTABLE
          , displaykey.Web.Policy.WC.Validation.CoveredStateMissingClass(_jurisdiction.Jurisdiction.DisplayName)
          , "WC7WorkersCompCoverageConfig")
      } else {
        Result.addWarning(_jurisdiction.WCLine
          , ValidationLevel.TC_DEFAULT 
          , displaykey.Web.Policy.WC.Validation.CoveredStateMissingClass(_jurisdiction.Jurisdiction.DisplayName)
          , "WC7WorkersCompCoverageConfig")
      }
    }
  }
  
  /**
   * No duplicate rating periods exist
   */
  function ratingPeriodStartDatesAreValid(){
   
    Context.addToVisited(this, "ratingPeriodStartDatesAreValid")
    if(Context.isAtLeast(ValidationLevel.TC_DEFAULT)){
      // Ensure there are no WC7RatingPeriodStartDates with a duplicate type and start-date
     _jurisdiction.WC7RatingPeriodStartDates
       .partition(\ rpsd -> "${rpsd.StartDate.YearOfDate}${rpsd.StartDate.DayOfYear}${rpsd.Type}")  
       .filterByValues(\ l -> l.Count > 1 )
       .eachValue(\ l -> { 
          Result.addError(_jurisdiction.WCLine
            , ValidationLevel.TC_DEFAULT
            , displaykey.Web.Policy.WC.Validation.DuplicateRatingPeriodStartDate(_jurisdiction.Jurisdiction.DisplayName
              , l.first().StartDate )
            , "WC7WorkersCompCoverageConfig")                           
        })
    }
  }
  
  /**
   * A construction class code exists if CPAP Modifier is eligible
   */
  function constructionClassCodeRequiredforCPAPModifier() {
    Context.addToVisited(this, "constructionClassCodeRequiredforCPAPModifier")
    
    var cCode : entity.WC7CoveredEmployee
    if (_jurisdiction.getModifier("WC7CPAPModifier").Eligible) {
       cCode = _jurisdiction.WCLine.getWC7CoveredEmployeesWM(_jurisdiction.Jurisdiction).firstWhere(\ w -> w.ClassCode.ConstructionType == true)
       if (cCode == null) {
         Result.addError(_jurisdiction.WCLine
           , ValidationLevel.TC_DEFAULT
           , displaykey.Web.Policy.WC7.Validation.CPAPModifierRequiresAtLeastOneConstructionTypeClassCode(_jurisdiction.Jurisdiction.DisplayName))
       }
    }
  }

  /**
   * the total payroll for supplimentary disease is less than total payrol for a location
   */
  function supplementaryDiseasePayrollTotalIsValid() {
    Context.addToVisited(this, "supplementaryDiseasePayrollTotalIsValid")
    var line = _jurisdiction.WCLine
    var jurisdiction = _jurisdiction.Jurisdiction
    var state = StateJurisdictionMappingUtil.getStateMappingForJurisdiction(_jurisdiction.Jurisdiction)
    var locations = line.Branch.getPolicyLocationWM(state)

    for (location in locations) {
      var totalPayrollForLocation : Integer = 0
      line.getWC7CoveredEmployeesAllVersions(state)
        .where(\ employee -> employee.Location.equals(location) 
                  && employee.BasisTypeIsPayroll)
        .each(\ employee -> {
          totalPayrollForLocation += employee.BasisAmount?.intValue()
        })
    
      var totalSupplementaryExposure : Integer = 0
      line.getWC7SupplementaryDiseaseExposures(jurisdiction)
        .where(\ w -> w.Location.equals(location) )
        .each(\ exposure -> {
          totalSupplementaryExposure += exposure.BasisAmount?.intValue()
        })

      if (totalSupplementaryExposure > totalPayrollForLocation) {
        if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE)) {
          Result.addError(_jurisdiction.WCLine
            , ValidationLevel.TC_QUOTABLE
            , displaykey.Web.Policy.WC7.Validation.SupplementaryDiseaseExposureGreaterThanTotalPayroll(
                location
              , _currencyFormatter.format(totalSupplementaryExposure)
              , _currencyFormatter.format(totalPayrollForLocation )) )
        } else {
          Result.addWarning(_jurisdiction.WCLine
            , ValidationLevel.TC_DEFAULT
            , displaykey.Web.Policy.WC7.Validation.SupplementaryDiseaseExposureGreaterThanTotalPayroll(
                location
              , _currencyFormatter.format(totalSupplementaryExposure)
              , _currencyFormatter.format(totalPayrollForLocation )) )
        }
      }
    }
  }


  /**
   * Verifies user-defined ARated class code rate is entered and must to be same for each class code across all rating periods in a jurisdiction 
   */
  function aRatedClassCodeRateIsRequiredAndMustBeSameForEachClassCodeAcrossAllRatingPeriods() {
    Context.addToVisited(this, "aRatedClassCodeRateIsRequiredAndMustBeSameForEachClassCodeAcrossAllRatingPeriods")
    var visitedARatedClassCodes = new HashMap<WC7ClassCode, BigDecimal>()
   
    var line = _jurisdiction.WCLine
    var employees = line.getWC7CoveredEmployeeBasesWM(_jurisdiction.Jurisdiction).sort() 
    for (employee in employees) {
      // ARated type class code rate
      if (employee.ClassCode.ARatedType) {
        if (employee.ClassCodeRate == null) {
          if (not employee.IfAnyExposure) {
            Result.addError(_jurisdiction, ValidationLevel.TC_DEFAULT, displaykey.Web.Policy.WC7.Validation.ARatedTypeClassCodeRateIsRequired(employee.ClassCode))
          }
          continue
        }
        if (visitedARatedClassCodes.containsKey(employee.ClassCode)){
          if (visitedARatedClassCodes.get(employee.ClassCode) != employee.ClassCodeRate) {
            if (Context.isAtLeast("Quotable" ) ) {
              Result.addError(_jurisdiction, ValidationLevel.TC_QUOTABLE,displaykey.Web.Policy.WC7.Validation.ARatedTypeClassCodeRatesSameAcrossAllPeriods(employee.ClassCode, _jurisdiction)) 
            } else {
              Result.addWarning(_jurisdiction, ValidationLevel.TC_DEFAULT,displaykey.Web.Policy.WC7.Validation.ARatedTypeClassCodeRatesSameAcrossAllPeriods(employee.ClassCode, _jurisdiction))
            }
          }
        }
        visitedARatedClassCodes.put(employee.ClassCode, employee.ClassCodeRate)
      } 
    }

  }
 
 /**
  * Verifies all user-defined supplemental disease loading rate is entered and must to be same for each class code across all rating periods in a jurisdiction 
  */ 
 function supplementalLoadingRateIsRequiredAndMustBeSameForEachClassCodeAcrossAllRatingPeriods() {
    Context.addToVisited(this, "supplementalLoadingRateIsRequiredAndMustBeSameForEachClassCodeAcrossAllRatingPeriods")
  
    var visitedDiseaseTypeClassCodes = new HashMap<WC7ClassCode, BigDecimal>()
    var line = _jurisdiction.WCLine
    var employees = line.getWC7CoveredEmployeeBasesWM(_jurisdiction.Jurisdiction).sort() 
    for (employee in employees) {
      // Supplemental Disease loading rate
      if (employee.SupplementalDiseaseLoaded) {
        if (employee.SupplementalDiseaseLoadingRate == null) {
          if (not employee.IfAnyExposure) {
            Result.addError(_jurisdiction, ValidationLevel.TC_DEFAULT, displaykey.Web.Policy.WC7.Validation.SupplRateForDiseaseLoadedIsRequired(employee.ClassCode))
          }
          continue
        }
        if (visitedDiseaseTypeClassCodes.containsKey(employee.ClassCode)) {
          if(visitedDiseaseTypeClassCodes.get(employee.ClassCode) != employee.SupplementalDiseaseLoadingRate) {
            if (Context.isAtLeast("Quotable" ) ) {
              Result.addError(_jurisdiction, ValidationLevel.TC_QUOTABLE, displaykey.Web.Policy.WC7.Validation.SupplRateForDiseaseLoadedSameAcrossAllPeriods(employee.ClassCode,_jurisdiction ))
            } else {
              Result.addWarning(_jurisdiction, ValidationLevel.TC_DEFAULT, displaykey.Web.Policy.WC7.Validation.SupplRateForDiseaseLoadedSameAcrossAllPeriods(employee.ClassCode,_jurisdiction ))
            }
          }
        }
        visitedDiseaseTypeClassCodes.put(employee.ClassCode, employee.SupplementalDiseaseLoadingRate)
      } 
    }
  }  
 
  static function validateModifiers(modifier : Modifier, period : PolicyPeriod) {
    //Functionality exists in Standards Base method
  }
}
