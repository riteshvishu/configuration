package gw.lob.wc7
uses gw.api.web.util.DateRangeUtil
uses java.util.Date

enhancement WC7CoveredEmployeeEnhancement : entity.WC7CoveredEmployee {
  
  /**
   * Get the one cost that overlaps this covered employee's SliceDate
   * and return it in slice mode.  If no such cost exists, return null.
   */
  property get WC7CovEmpCost() : WC7CovEmpCost {
    if (this.WC7Costs.Count > 1) {
      throw "Expected at most one cost on " + this + "; found " + this.WC7Costs.Count
    }
    return this.WC7Costs.first()
  }
  
  property get ClassCodeShortDescription() : String {
    return (this.ClassCode != null) ? this.ClassCode.ShortDesc : null
  }
  
  property get ClassCodeBasisDescription() : String {
    return (this.ClassCode != null) ? this.ClassCode.Basis.Description : null
  }
  
  property set ClassCodeShortDescription(shortDesc : String) {
    var criteria = new WC7ClassCodeSearchCriteria()
    criteria.Code = this.ClassCode.Code
    criteria.ShortDesc = shortDesc
    criteria.Jurisdiction = this.Jurisdiction.Jurisdiction
    criteria.EffectiveAsOfDate = this.Branch.WC7Line.getReferenceDateForCurrentJob(this.Jurisdiction.Jurisdiction)
    var result = criteria.performSearch()
    this.ClassCode = result.FirstResult
  }
    
  function getIfAnyOrExposureAmount() : String {
      if (this.isIfAnyExposure() != null and this.isIfAnyExposure()) {
          return displaykey.Java.WorkersComp.IfAnyExposure
      }
      final var amount = this.getBasisAmount()
      return amount == null ? null : amount.toString()
  }

  protected function deletable() : boolean {
      return true
  }
  
  /**
   * Location is editable when adding new covered employee unless period number is "1" 
   * and the period has already been split for this jurisdiction.
   * @return boolean whether location is editable  
   */
  function canEditLocation(splitDates : List<Date>) : boolean {
    if (this.NewEmployee){
      var periodNum = DateRangeUtil.getPeriodNumbers(this.EffectiveDateRange, splitDates)
      if (periodNum.equals("1") and splitDates.Count > 2){
        return false
      }
      return true
    }
    return false
  }
}


