package gw.lob.wc7

uses java.util.Date
uses gw.api.web.util.DateRangeUtil
uses gw.api.util.JurisdictionMappingUtil
uses gw.api.util.Math
uses java.math.BigDecimal

enhancement WC7AtomicEnergyExposureEnhancement : entity.WC7AtomicEnergyExposure {

  property get NewAtomicEnergyExposure() : boolean{
    return this.BasedOn == null
  }
  
  function canEditLocation(splitDates : List<Date>) : boolean {
    if (this.NewAtomicEnergyExposure){
      var periodNumber = DateRangeUtil.getPeriodNumbers(this.EffectiveDateRange, splitDates)
      if (periodNumber.equals("1") and splitDates.Count > 2){
        return false
      }
      return true
    }
    return false
  }

  property get LocationWM(): PolicyLocation {
    if (this.Slice) {
      throw displaykey.Policy.WC7.AtomicEnergy.NotInWindowMode
    }
    if (this.NewAtomicEnergyExposure) {
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
  
  property set IfAnyExposureAndClearBasisAmount(value : Boolean) {
    if (value == true) {
      this.BasisAmount = null
      this.Rate = null
    }
    this.IfAnyExposure = value
  }

  property get IfAnyExposureAndClearBasisAmount() : Boolean {
    return this.isIfAnyExposure()
  }

  property get WC7Jurisdiction() : WC7Jurisdiction {
    var jur = JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(this.Location)
    return this.WCLine.WC7Jurisdictions.firstWhere(\ j -> j.Jurisdiction == jur)
  }
  
  property get ClassCodeRate() : BigDecimal {
    return (this.Rate)
  }
  
  property set ClassCodeRate(rate : BigDecimal) { 
    if (rate <= 0 ) {
      throw new gw.api.util.DisplayableException(displaykey.Policy.WC7.AtomicEnergy.Rate.Error.NonPositiveRate)     
    } else {
        this.Rate = rate
    }
  }
    
  
  property get PeriodNum() : String {
    return DateRangeUtil.getPeriodNumbers(this.EffectiveDateRange, this.WC7Jurisdiction.SplitDates)  
  } 

  property get ProratedEstimatedAmount() : int {
    if (this.NumDaysEffectiveForRating == 0 or this.NumDaysEffective == 0) {
      return 0
    }
    return Math.roundNearest((this.BasisAmount as double) * this.NumDaysEffectiveForRating / this.NumDaysEffective) as int
  }  

  property get LastBilledAtomicEnergyExposure() : WC7AtomicEnergyExposure {
    return this.BasedOn
  }  

  /**
   * @return the jurisdiction that matches this supplemental disease exposure's state
   */
  property get Jurisdiction() : WC7Jurisdiction {
    var line = this.WCLine
    var supplDiseaseJur = JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(this.Location)
    return line.WC7Jurisdictions.firstWhere(\ jur -> jur.Jurisdiction == supplDiseaseJur)
  }
}
