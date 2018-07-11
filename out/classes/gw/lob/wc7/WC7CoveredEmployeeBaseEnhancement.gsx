package gw.lob.wc7

uses gw.api.util.JurisdictionMappingUtil
uses gw.api.web.util.DateRangeUtil
uses gw.api.util.Math
uses java.math.BigDecimal

enhancement WC7CoveredEmployeeBaseEnhancement : entity.WC7CoveredEmployeeBase {
  property get Self() : WC7CoveredEmployeeBase {
    return this
  }
    
  property get LocationWM(): PolicyLocation {
    if (this.Slice) {
      throw displaykey.WorkersComp.CoveredEmployee.NotInWindowMode
    }
    if (NewEmployee) {
      // we have to do this or change location out-of-sequence will show 2 versions of the same
      // location. This should return the latest version of the location because it is unsliced
      return this.Location
    } else {
      if (this.EffectiveDate.afterOrEqual(this.ExpirationDate)) {
        return this.Location
      }
      return this.getSlice(this.EffectiveDate).Location
    }
  }

  property set LocationWM(loc: PolicyLocation)  {
    this.asssertWindowMode(loc)
    this.Location = loc
    if(loc != null){
      var exposureDateRange = loc.EffectiveDateRangeWM
        .intersect(loc.Branch.EditEffectiveDateRange)
      this.EffectiveDateRange = exposureDateRange
    }
  }
  
  property get SupplementalLoadingRate() : BigDecimal {
    return (this.SupplementalDiseaseLoadingRate)
  }
  
  property set SupplementalLoadingRate(loadingRate : BigDecimal) { 
    if (loadingRate <= 0 ) {
      throw new gw.api.util.DisplayableException(displaykey.Policy.WC7.CoveredEmployee.SupplementalLoadingRate.Error.NonPositiveRate)     
    } else {
        this.SupplementalDiseaseLoadingRate = loadingRate
    }
  }

  property get Rate() : BigDecimal {
    return (this.ClassCodeRate)
  }
  
  property set Rate(classCodeRate : BigDecimal) { 
    if (classCodeRate <= 0 ) {
      throw new gw.api.util.DisplayableException(displaykey.Policy.WC7.CoveredEmployee.Rate.Error.NonPositiveRate)     
    } else {
        this.ClassCodeRate = classCodeRate
    }
  }
    
  property get NewEmployee() : boolean{
    return this.BasedOn == null
  }
  
  property set IfAnyExposureAndClearBasisAmount(value : Boolean) {
    if (value == true) {
      this.BasisAmount = null
    }
    this.IfAnyExposure = value
  }

  property get IfAnyExposureAndClearBasisAmount() : Boolean {
    return this.isIfAnyExposure()
  }

  property get BasisTypeProratable() : Boolean {
    if ( this.ClassCode.Basis.Proratable == null){
      return true
    } else {
      return this.ClassCode.Basis.Proratable
    }
  }
  
  property get BasisType() : String {
    return this.ClassCode.Basis.DisplayName
  }
  
  property get BasisTypeIsPayroll() : boolean {
    var result : boolean = false;
    
    // If there is any kind of error just return false
    try {
      var theType = this.ClassCode.Basis.DisplayName.toUpperCase()
      result = theType.contains("PAYROLL")
    } catch (ignore) {
      gw.rating.RateFlowLogger.get().info(ignore.Message)
    }    
    return result
  }
  
  property get WC7CovEmpBaseJurisdiction() : WC7Jurisdiction {
    var jur = JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(this.Location)
    return this.WC7WorkersCompLine.WC7Jurisdictions.firstWhere(\ j -> j.Jurisdiction == jur)
  }

  property get PeriodNum() : String {
    return DateRangeUtil.getPeriodNumbers(this.EffectiveDateRange, this.WC7CovEmpBaseJurisdiction.SplitDates)  
  } 
      
  /**
   * Location is editable when adding new employee unless period number is "1" 
   * and the period has already been split for this jurisdiction.
   * @return boolean whether location is editable  
   */
  property get CanEditLocation() : boolean {
    if (this.BasedOn == null){
      if (this.LocationWM == null) {
        return true
      }
      if (this.PeriodNum.equals("1") and this.WC7CovEmpBaseJurisdiction.SplitDates.Count > 2){
        return false
      }
      return true
    }
    return false
  }

  /**
   * @return the jurisdiction that matches this employee's state
   */
  property get Jurisdiction() : WC7Jurisdiction {
    var line = this.WC7WorkersCompLine
    var jurisdictions = line.WC7Jurisdictions
    var covEmpJurisdiction = JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(this.Location )
    return jurisdictions.firstWhere(\ jur -> jur.Jurisdiction == covEmpJurisdiction)
  }

  property get ProratedEstimatedAmount() : int {
    if (this.NumDaysEffectiveForRating == 0 or this.NumDaysEffective == 0) {
      return 0
    }
    return Math.roundNearest((this.BasisAmount as double) * this.NumDaysEffectiveForRating / this.NumDaysEffective) as int
  }
  
  property get LastBilledCoveredEmployee() : WC7CoveredEmployeeBase {
    return this.BasedOn
  }
  
  /**
   * Validate Voluntary Compensation Governing Law is used in the Covered Employee
   */
  function isVoluntaryCompensationGoverningLawUsed() : Boolean {
    
    if (this.GoverningLaw == WC7GoverningLaw.TC_VOLUNTARYCOMP or this.GoverningLaw == WC7GoverningLaw.TC_VOLUNTARYCOMPFORRESIDENCEEMP) {
      return true    
    }
    return false
  }
}