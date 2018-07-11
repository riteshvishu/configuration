package gw.lob.wc7

uses gw.api.util.Math
uses java.util.Date
uses gw.api.util.DisplayableException

/**
 * Enhancement methods for {@link WC7WaiverOfSubro}
 */
@Export
enhancement WC7WaiverOfSubroEnhancement : entity.WC7WaiverOfSubro {
  
  /**
   * @return True if {@link ClassCodeBasis#Proratable} is true or null.
   */
  property get BasisTypeProratable() : Boolean {
    if ( this.ClassCode.Basis.Proratable == null){
      return true
    } else {
      return this.ClassCode.Basis.Proratable
    }
  }

  property get LastBilledCoveredEmployee() : WC7WaiverOfSubro {
    return this.BasedOn
  }
  
  property get ProratedEstimatedAmount() : int {
    if (this.NumDaysEffectiveForRating == 0 or this.NumDaysEffective == 0) {
      return 0
    }
    return Math.roundNearest((this.BasisAmount as double) * this.NumDaysEffectiveForRating / this.NumDaysEffective) as int
  }

  /**
   * Change the effective window of this {@link WC7WaiverOfSubro}
   * Note, this can only be called when:
   * 
   * <ul>
   * <li>A new waiver is created</li>
   * <li>Or specific waiver is being split on an Rating Period Start Date or Anniversary Rating Date</li>
   * </ul>
   * 
   * Note, the window start cannot be before the period start, and the window end cannot be before the period end.
   * 
   * Also note, this will maintain the BasisAmount (even though it is a scalable value).
   */
  function setWaiverEffectiveWindow(windowStart : Date , windowEnd : Date){
    if (this.Slice){
      throw new DisplayableException(displaykey.Policy.WC7.Waiver.NotInWindowMode)
    }
    if (not this.New){
      throw new DisplayableException(displaykey.Policy.WC7.Waiver.CannotChangeWindowOfExistingWaiver)
    }
    if (this.VersionList.AllVersions.Count > 1){
      throw new DisplayableException(displaykey.Policy.WC7.Waiver.CannotChangeWindowOfSplitWaiver)
    }
    var existingBasis = this.BasisAmount
    this.setEffectiveWindow(windowStart, windowEnd)
    
    /*
     * Basis Amount is a 'Scalable' value which means 'setEffectiveWindow' will 
     * modify the basis amount scaling it relative to the slice duration.  In this 
     * case, we anticipate that users are actually entering in the desired 
     * effective window and would not expect the basis to scale.
     */
    this.BasisAmount = existingBasis
  }
  
  
  property get WaiverEffectiveDate() : Date {
    return this.EffectiveDate 
  }
  
  property set WaiverEffectiveDate(newEffectiveDate : Date){
    setWaiverEffectiveWindow(newEffectiveDate, WaiverExpirationDate)
  }
  
  property get WaiverExpirationDate() : Date {
    return this.ExpirationDate 
  }
  
  property set WaiverExpirationDate(newExpirationDate : Date){
    setWaiverEffectiveWindow(WaiverEffectiveDate, newExpirationDate)
  }
  
  /**
   * Waivers can have their effective window changed if:
   * <ul>
   *  <li>the Waiver is a newly created bean</li>
   *  <li>the Waiver is currently unsliced</li>
   *  <li>the Waiver has not been split (that is there is only 1 version)</li>
   * </ul>
   * See {@link #setWaiverEffectiveWindow(Date, Date)} for more details.
   * @return True if it is legal to modify the effective window for this waiver, false otherwise.
   */
  function canSetEffectiveWindow() : boolean {
    var isNotSplit = (this.VersionList.AllVersions.Count == 1)
    var isWindow = (not this.Slice)
    return this.New and isNotSplit and isWindow
  }
  
  property get WC7WaiverJurisdiction() : WC7Jurisdiction {
    return this.WCLine.WC7Jurisdictions.firstWhere(\ j -> j.Jurisdiction == this.Jurisdiction)
  }
      
  /**
   * Waiver of Subro Jurisdiction is editable when adding new employee when there is one slice.
   * @return boolean whether jurisdiction is editable  
   */
  function canEditJurisdiction() : boolean {
    var result : boolean = false
    if (this.BasedOn == null){
      if (this.Jurisdiction == null) {
        result = true
      }
      if (this.VersionList.AllVersions.Count == 1){
        result = true 
      }
    }
    return result
  }
}
