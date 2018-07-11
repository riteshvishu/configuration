package gw.lob.wc7

uses com.guidewire.pl.system.util.DateTimeUtil
uses java.util.Date
uses java.util.ArrayList
uses java.lang.IllegalStateException
uses org.apache.commons.lang.StringUtils
uses java.util.Calendar
uses com.guidewire.commons.entity.effdate.EffDatedVersionList
uses gw.api.util.DateUtil
uses gw.lob.wc7.rating.WC7RatingPeriod
uses gw.api.domain.StateSet
uses gw.api.util.StateJurisdictionMappingUtil
uses gw.api.util.DisplayableException
uses java.util.HashMap
uses java.lang.Integer
uses gw.api.database.Query
uses gw.api.productmodel.ModifierPattern

enhancement WC7JurisdictionEnhancement : WC7Jurisdiction {

  property get AnniversaryDate(): Date {
    return this.getFieldValue("AnniversaryDateInternal") as Date
  }

  property get SplittableARD() : boolean {
    var queryJuris = Query.make(WC7JurisdictionSplittableARD)
    var queryRes = queryJuris.compare("Jurisdiction", Equals, this.Jurisdiction)            
                  .compare("EffectiveDate",LessThanOrEquals , getPeriodStart())
                  .or(\ cond -> {
                    cond.compare("ExpirationDate",GreaterThan, getPeriodStart())
                    cond.compare("ExpirationDate",Equals, null)                      
                   })           
                  .select()
                   
    if (queryRes.Empty) {
      return true
    } else {
      return(queryRes.first().SplittableARD)
    }
  }

  /**
   * Sets the anniversary date on this policy line and adds or modifies an
   * anniversary-type {@link com.guidewire.pc.domain.policy.lines.wc.WC7RatingPeriodStartDate}
   * (RPSD) to the PolicyPeriod if required. <p/> <p><b>Side Effects:</p> May
   * add a new RPSD to the policy period, or change an existng anniversary-type
   * RPSD. Use {@link com.guidewire.pc.domain.policy.lines.wc.WC7WorkersCompLine#setFieldValue} if the side effects are not
   * desired.
   */
  property set AnniversaryDate(value : Date) {
    if (value == null) {
      throw new DisplayableException(displaykey.Java.Job.WC.AnniversaryNotNull)
    }
    
    var periodStart = getPeriodStart()
    var newAnniversary = DateTimeUtil.setHourMinuteSecondFromDate(value, periodStart)
    
    if (newAnniversary > periodStart) {
      newAnniversary = periodStart
    }
    // find the anniversary date for this period
    if(newAnniversary < periodStart.addYears(-1)) {
      newAnniversary = newAnniversary.addYears(1)
    }

    this.getSlice(this.EffectiveDate).setFieldValue("AnniversaryDateInternal", newAnniversary)
    //  we need to consider to update the RPSD only when Jurisdiction is splittable,
    if (this.SplittableARD) {
      // Either anniversary date change or policy period effective window change (eg. renewal, cancel),
      // we'll have to update the RPSDs
      var existingSplits = new HashMap<Date, WC7RatingPeriodStartDate>()
      var existingAnniversarySplit : entity.WC7RatingPeriodStartDate
      for(rpsd in this.WC7RatingPeriodStartDates){
        if(rpsd.Type == TC_ANNIVERSARY){
          existingAnniversarySplit = rpsd
        }else{
          existingSplits.put(rpsd.StartDate, rpsd)
        }
      }
      // Add new RPSDs
      var splitDate = newAnniversary.addYears(1)
      if(splitDate <> existingAnniversarySplit.StartDate){
        var otherSplit = existingSplits.get(splitDate)
        if(otherSplit <> null){
          // AnniversaryDate should take priority
          otherSplit.getSlice(otherSplit.EffectiveDate).Type = TC_ANNIVERSARY
        }else if(newAnniversary <> periodStart and canAddRPSD(splitDate) == null){
          addWC7RatingPeriodStartDate(splitDate, TC_ANNIVERSARY)
        }
        // Removing irrelavent RPSDs
        if(existingAnniversarySplit <> null){
          existingAnniversarySplit.getSlice(existingAnniversarySplit.EffectiveDate).remove()
        }
      }
    }
  }

  property get ReferenceDate(): Date {
    return this.getFieldValue("ReferenceDateInternal") as Date
  }
  
  /**
   * @see get AnniversaryDate
   */
  property set ReferenceDate(refDate : Date) {
    this.getSlice(this.EffectiveDate).setFieldValue("ReferenceDateInternal", refDate)
  }
  
  property get AllModifierVersions(): List<WC7Modifier> {
    return this.VersionList.WC7Modifiers.flatMap( \w -> w.AllVersions )
  }

  property get AllCoverageVersions(): List<WC7JurisdictionCov> {
    return this.VersionList.Coverages.flatMap( \w -> w.AllVersions )
  }
  
  /**
   * Indicates whether or not this jurisdiction can be removed.  A jurisidiction can only be removed if it has no covered employees(state, FELA or Maritime) 
   * and supplementary disease exposure at any point during the policy and if it is not used by the primary location
   */
  property get CanRemove() : boolean {
    var usedByPrimaryLoc = this.WCLine.Branch.PrimaryLocation.State.Code == this.Jurisdiction.Code
    return !usedByPrimaryLoc 
      and not this.WCLine.isJurisdictionUsedOnExposure(this.Jurisdiction)
      and not this.WCLine.isJurisdictionUsedOnSchedule(this.Jurisdiction)
  }

  function adjustAnniversaryDate() {
    var policyStart = this.WCLine.Branch.PeriodStart.trimToMidnight()
    if (this.AnniversaryDate.addYears(1) < policyStart) {
      this.AnniversaryDate = policyStart
    }
  }

  function removeWC7RatingPeriodStartDate(date : Date, type : RPSDType) {
      var rpsd = getRPSD(date, type)
      if (rpsd == null) {
          return
      } else {
        rpsd.getSlice(rpsd.EffectiveDate).remove()
      }
  }

  function getSortedRPSDs() : WC7RatingPeriodStartDate[] {
      var ratingPeriodsList = innerGetUnsortedRPSDs(null, null)
      ratingPeriodsList = ratingPeriodsList.sortBy( \rpsd -> rpsd.StartDate )
      return ratingPeriodsList.toTypedArray()
  }

  function getSortedRPSDs(type : RPSDType) : WC7RatingPeriodStartDate[] {
      var ratingPeriodsList = innerGetUnsortedRPSDs(null, type)
      ratingPeriodsList = ratingPeriodsList.sortBy( \rpsd -> rpsd.StartDate )
      return ratingPeriodsList.toTypedArray()
  }
  
  function hasRPSDOnDate(startDate : Date) : boolean {
      var ratingPeriodsList = innerGetUnsortedRPSDs(startDate, null)
      return not ratingPeriodsList.isEmpty()
  }
  
  function getRPSD(startDate : Date, type : RPSDType) : WC7RatingPeriodStartDate {
      var ratingPeriodsList = innerGetUnsortedRPSDs(startDate, type)
      if (ratingPeriodsList.isEmpty()) {
          return null
      } else if (ratingPeriodsList.size() > 1) {
          throw new IllegalStateException(displaykey.WorkersComp.Jurisdiction.MultipleRPSDs(startDate, type))
      } else {
          return ratingPeriodsList.get(0)
      }
  }

  
  function getPriorRatingDate(date : Date) : Date {
      checkIncludesDateIgnoreTime(date)
      var _sortedRPSDs = getSortedRPSDs()
      var ratingDateList = new ArrayList<Date>()
      var anniversary: Date = null
      
      for (rpsd in _sortedRPSDs) {
          var type = rpsd.getType()
          if (type == RPSDType.TC_FORCEDRERATING) {
              ratingDateList.add(rpsd.getStartDate())
          }
          if (type == RPSDType.TC_ANNIVERSARY) {
              ratingDateList.add(rpsd.getStartDate())
              anniversary = rpsd.getStartDate()
          }
      }
      if (anniversary == null and this.WCLine != null) {
          var effDate = getPeriodStart()
          var wcAnni = this.getAnniversaryDate()
          if (wcAnni != null) {
              if (effDate.before(wcAnni)) {
                  wcAnni = calculateUpcomingAnniversaryDate()
              }
              if (not effDate.equals(wcAnni)) {
                  anniversary = wcAnni.addYears(1)
              }
          }
      }
      if (anniversary != null) {
          ratingDateList.add(0, anniversary.addYears(-1))
      } else {
          ratingDateList.add(0, getPeriodStart())
      }
      ratingDateList.add(getPeriodEnd())
      if (ratingDateList.size() > 0) {
          for (i in 0..|(ratingDateList.size() - 1)) {
              var date1 = ratingDateList.get(i)
              var date2 = ratingDateList.get(i + 1)
              if (DateUtil.compareIgnoreTime(date, date1) >= 0 and DateUtil.compareIgnoreTime(date, date2) < 0) {
                  return date1
              }
          }
      }
      throw new IllegalStateException(displaykey.WorkersComp.Jurisdiction.NoDateFound(date, StringUtils.join(ratingDateList.iterator(), ", ")))
  }
  
  function calculateUpcomingAnniversaryDate() : Date {
      var anniversaryCal = getTrimmedCalendar(this.getAnniversaryDate())
      var effectiveCal = getTrimmedCalendar(getPeriodStart())
      setAnniversaryYear(anniversaryCal, effectiveCal)
      return anniversaryCal.getTime()
  }
  
  /**
   * Return the rating periods in this jurisdiction that are in-force (not completely canceled
   * or hidden by an audit window).  The rating periods are sorted by start date.
   */
  property get InForceRatingPeriods() : List<WC7RatingPeriod>
  {
    return RatingPeriods.where( \ rp -> rp.NumRatingDays > 0 ).toList()
  }

  /**
   * Return the rating periods in this jurisdiction sorted by start date.  For example,
   * if a jurisdiction has a forced rerating date, followed by an anniversary date,
   * this will return three rating periods:<ul><li>[PolicyPeriodStart-RerateDate),
   * <li>[RerateDate-AnniversaryDate),
   * <li>[AnniversaryDate-PolicyPeriodEnd)
   * </ul>
   * A jurisdiction without any rating period start dates will only return one rating period
   * [PolicyPeriodStart-PolicyPeriodEnd).
   */
  property get RatingPeriods() : List<WC7RatingPeriod> {
    return createRatingPeriods(SplitDates)
  }
  
  /**
   * Sorted list of the dates this period is splitted on
   */
  property get SplitDates() : List<Date>{
    var rpsds = this.VersionList.WC7RatingPeriodStartDates
      .map(\ rpsd -> rpsd.AllVersions.single().StartDate)
    rpsds.add(this.Branch.PeriodStart)
    rpsds.add(this.Branch.PeriodEnd)
    return rpsds.sort()
  }
  
  property get AuditRatingPeriods() : List<WC7RatingPeriod> {
    var start = this.Branch.Audit.AuditInformation.AuditPeriodStartDate
    var end = this.Branch.Audit.AuditInformation.AuditPeriodEndDate
    var rpsds = this.getWC7RatingPeriodStartDates().map(\ rpsd -> rpsd.StartDate).where(\ d -> d > start and d < end).toList()
    rpsds.add(start)
    rpsds.add(end)
    var sortedRPSDs = rpsds.sort()
    return createRatingPeriods(sortedRPSDs)
  }
  
  /**
   * If cannot add RPSD, return error message. This is used in UI as well.
   */
  function canAddRPSD(date : Date) : String{
    // this compare is based on assumption that all RPSD has the same time as the period start
    if(SplitDates.hasMatch(\ r -> r == date)){
      return displaykey.Web.Policy.WC.DuplicatedDate(this.Jurisdiction, date.ShortFormat)
    }
    if (not this.Branch.includes(date)) {
      return displaykey.Java.Job.WC.RPSDOutsidePeriod(date, getPeriodStart(), getPeriodEnd())
    }
    return null
  }
  
  function addWC7RatingPeriodStartDate(splitDate : Date, type : RPSDType) : WC7RatingPeriodStartDate {
    var date = DateTimeUtil.setHourMinuteSecondFromDate(splitDate, getPeriodStart())
    
    var error = canAddRPSD(date)
    if(error <> null){
      throw new DisplayableException(error)
    }
    
    var rpsd = new WC7RatingPeriodStartDate(this.Branch)
    rpsd.StartDate = date
    rpsd.Type = type
    this.addToWC7RatingPeriodStartDates(rpsd)
    rpsd = rpsd.getUnsliced()
    rpsd.EffectiveDate = getPeriodStart()
    return rpsd
  }
  
  function getWC7RatingPeriodStartDates() : WC7RatingPeriodStartDate[] {
      return this.VersionList.WC7RatingPeriodStartDates
        .map( \ r -> r.AllVersions.single() ).toTypedArray()
      
  }
  
  function splitModifiers() {
    updateSplitsOnEffDatedBeans(this.VersionList.WC7Modifiers, \ e -> {
      var pattern = (e as WC7Modifier).Pattern
      return (pattern as ModifierPattern).SplitOnAnniversary
    })
    // split rate factors
    for (modifier in this.VersionList.WC7Modifiers) {
      var pattern = modifier.AllVersions.first().Pattern
      updateSplitsOnEffDatedBeans(modifier.WC7RateFactors, \ r -> {
        return (pattern as ModifierPattern).SplitOnAnniversary
      })
    }
  }

  function joinExposures(allVersions: List<EffDated>) {
    var arrow = 0
    var dot = 1
    while (dot < allVersions.size()) {
      var bean1 = allVersions.get( arrow ) as WC7CoveredEmployeeBase
      var bean2 = allVersions.get( dot ) as WC7CoveredEmployeeBase
      if (bean1.ExpirationDate == bean2.EffectiveDate and not hasRPSDOnDate(bean1.ExpirationDate)) {
          // Override automatic basis calculation. If we just relied on them
          // being scaled automatically then we'd get rounding errors.
          // instead we'll add them up and use that new value. Alternatively 
          // we could store a denormalized basis amount as a double and scale
          // that to get the correct value.

          var newBasis = (bean1.BasisAmount == null ? 0 : bean1.BasisAmount) + (bean2.BasisAmount == null ? 0 : bean2.BasisAmount)
          if (!bean1.BasisTypeProratable) {
            newBasis = bean1.BasisAmount  
          }
          bean1.ExpirationDate = bean2.ExpirationDate
          bean2.ExpirationDate = bean2.EffectiveDate
          bean1.BasisAmount = newBasis          
          dot = dot + 1
      } else {
          arrow = dot
          dot = arrow + 1
      }            
    }
  }

  function joinWaivers(allVersions: List<WC7WaiverOfSubro>) {
    var arrow = 0
    var dot = 1
    while (dot < allVersions.size()) {
      var bean1 = allVersions.get( arrow )
      var bean2 = allVersions.get( dot )
      if (bean1.ExpirationDate == bean2.EffectiveDate and not hasRPSDOnDate(bean1.ExpirationDate)) {
        // Override automatic basis calculation. If we just relied on them
        // being scaled automatically then we'd get rounding errors.
        // instead we'll add them up and use that new value. Alternatively
        // we could store a denormalized basis amount as a double and scale
        // that to get the correct value.
        var newBasis = (bean1.BasisAmount == null ? 0 : bean1.BasisAmount) + (bean2.BasisAmount == null ? 0 : bean2.BasisAmount)
        if (!bean1.BasisTypeProratable) {
            newBasis = bean1.BasisAmount  
        }
        bean1.ExpirationDate = bean2.ExpirationDate
        bean2.ExpirationDate = bean2.EffectiveDate
        bean1.BasisAmount = newBasis
        dot = dot + 1
      } else {               
        arrow = dot
        dot = arrow + 1
      }
    }
  }

  function joinSupplDiseaseExposures(allVersions: List<WC7SupplDiseaseExposure>) {
    var arrow = 0
    var dot = 1
    while (dot < allVersions.size()) {
      var bean1 = allVersions.get( arrow )
      var bean2 = allVersions.get( dot )
      if (bean1.ExpirationDate == bean2.EffectiveDate and not hasRPSDOnDate(bean1.ExpirationDate)) {
          // Override automatic basis calculation. If we just relied on them
          // being scaled automatically then we'd get rounding errors.
          // instead we'll add them up and use that new value. Alternatively 
          // we could store a denormalized basis amount as a double and scale
          // that to get the correct value.
          var newBasis = (bean1.BasisAmount == null ? 0 : bean1.BasisAmount) + (bean2.BasisAmount == null ? 0 : bean2.BasisAmount)
          bean1.ExpirationDate = bean2.ExpirationDate
          bean2.ExpirationDate = bean2.EffectiveDate
          bean1.BasisAmount = newBasis
          dot = dot + 1
      } else {
          arrow = dot
          dot = arrow + 1
      }            
    }
  }
  
  function joinAtomicEnergyExposures(allVersions: List<WC7AtomicEnergyExposure>) {
    var arrow = 0
    var dot = 1
    while (dot < allVersions.size()) {
      var bean1 = allVersions.get( arrow )
      var bean2 = allVersions.get( dot )
      if (bean1.ExpirationDate == bean2.EffectiveDate and not hasRPSDOnDate(bean1.ExpirationDate)) {
          // Override automatic basis calculation. If we just relied on them
          // being scaled automatically then we'd get rounding errors.
          // instead we'll add them up and use that new value. Alternatively 
          // we could store a denormalized basis amount as a double and scale
          // that to get the correct value.
          var newBasis = (bean1.BasisAmount == null ? 0 : bean1.BasisAmount) + (bean2.BasisAmount == null ? 0 : bean2.BasisAmount)
          bean1.ExpirationDate = bean2.ExpirationDate
          bean2.ExpirationDate = bean2.EffectiveDate
          bean1.BasisAmount = newBasis
          dot = dot + 1
      } else {
          arrow = dot
          dot = arrow + 1
      }            
    }
  }
  
  function splitCoverages() {
    updateSplitsOnEffDatedBeans(this.VersionList.Coverages, \ e -> true)
  }

  function splitWorksheets() {
    var costsForJuris = this.WCLine.VersionList.WC7Costs.allVersionsFlat().whereTypeIs(WC7Cost).where(\ cost -> cost.JurisdictionState == this.Jurisdiction)
    for(cost in costsForJuris) {
      updateSplitsOnEffDatedBeans(cost.VersionList.WC7RatingWorksheetArray, \ e -> true)
    }
  }
  
  function updateRPSDsAfterPeriodChange(oldPeriodStart : Date) {
      var periodStart = getPeriodStart()
      var periodEnd = getPeriodEnd()
      var ratingPeriodStartDates = this.VersionList.WC7RatingPeriodStartDates
      for (rpsdVL in ratingPeriodStartDates) {
          var versions = rpsdVL.AllVersions
          if (versions.size() != 1) {
              throw new IllegalStateException(displaykey.WorkersComp.Jurisdiction.CannotSplitRPSD)
          }
          var rpsd = versions.get(0).getUnslicedUntyped() as WC7RatingPeriodStartDate
          if (DateUtil.compareIgnoreTime(rpsd.getStartDate(), periodStart) <= 0 or DateUtil.compareIgnoreTime(rpsd.getStartDate(), periodEnd) >= 0) {
              rpsd.getSlice(rpsd.EffectiveDate).remove()
          }
      }
      var anniDate = this.getAnniversaryDate()
      if (anniDate != null and DateUtil.compareIgnoreTime(anniDate, oldPeriodStart) == 0) {
          this.AnniversaryDate = periodStart
      } else {
          this.AnniversaryDate = anniDate
      }
  }
  
  function updateRPSDsInNewPeriod() {
      for(oldRPSD in this.BasedOn.WC7RatingPeriodStartDates){
        var splitDate = oldRPSD.StartDate
        if(oldRPSD.Type <> TC_ANNIVERSARY and this.Branch.includes(splitDate)){
          this.addWC7RatingPeriodStartDate(splitDate, oldRPSD.Type)
        }
      }
      var oldARD1 = this.getBasedOn().getAnniversaryDate()
      var oldARD2 = DateTimeUtil.addYears(this.getBasedOn().getAnniversaryDate(), 1)
      var periodStart = getPeriodStart()
      if (DateUtil.compareIgnoreTime(periodStart, oldARD2) >= 0) {
          this.AnniversaryDate = periodStart
      } else {
          this.AnniversaryDate = oldARD1
      }
      updateExposures()
  }
  
  /**
   * Updates the covered employees, either unsplitting or splitting all of the covered 
   * employees (state, FELA, Maritime) using the ARD (Anniversary Rating Date)
   * Updates supplementary disease exposure to either split or unsplit them using ARD.
   * Also updates specific waivers of subrogation to split or unsplit them accordingly.
   */
  function updateExposures() {    
    var stateReference = StateJurisdictionMappingUtil.getStateMappingForJurisdiction(this.getJurisdiction())      
    for (beanVL in this.WCLine.VersionList.WC7CoveredEmployeeBases) {
      var beanVersions = beanVL.AllVersions
      var location = beanVersions.first().getLocation()
      if (location != null and location.getState() == stateReference) {
        joinExposures(beanVersions)
      }
    }
    
    for (waiverVL in this.WCLine.VersionList.WC7WaiverOfSubros){
      var waiverVersions = waiverVL.AllVersions
      var firstVersionWaiver = waiverVersions.first()
      var juris = firstVersionWaiver.Jurisdiction
      var isSpecific = firstVersionWaiver.Type == WC7WaiverOfSubrogation.TC_SPECIFIC
      if (isSpecific and juris != null and juris == this.Jurisdiction) {
        joinWaivers(waiverVersions)
      }
    }

    for (supplDiseaseExposureVL in this.WCLine.VersionList.WC7SupplDiseaseExposures){
      var supplDiseaseExpVersions = supplDiseaseExposureVL.AllVersions
      var location = supplDiseaseExpVersions.first().getLocation()
      if (location != null and location.getState() == stateReference) {
        joinSupplDiseaseExposures(supplDiseaseExpVersions)
      }
    }
    
    for (atomicEnergyExposureVL in this.WCLine.VersionList.WC7AtomicEnergyExposures){
      var atomicEnergyExpVersions = atomicEnergyExposureVL.AllVersions
      var location = atomicEnergyExpVersions.first().getLocation()
      if (location != null and location.getState() == stateReference) {
        joinAtomicEnergyExposures(atomicEnergyExpVersions)
      }
    }
        
    splitAllWC7CoveredEmployees()
    splitAllSpecificWaivers()
    splitAllWC7SupplDiseaseExposures()
    splitAllWC7AtomicEnergyExposures()
  }
  
  function getPossibleGoverningLaws(): WC7GoverningLaw[] {
    var typeKeys = WC7GoverningLaw.getTypeKeys( false )
      .where( \typeKey -> typeKey.hasCategory("WorkersComp" as WC7LiabilityAct) )
    var monopolisticStates = StateSet.get(StateSet.WC_MONOPOLISTIC)
    if (monopolisticStates.contains(StateJurisdictionMappingUtil.getStateMappingForJurisdiction(this.Jurisdiction))) {
      typeKeys.remove(WC7GoverningLaw.TC_STATE)
      typeKeys.remove(WC7GoverningLaw.TC_VOLUNTARYCOMP)
      typeKeys.remove(WC7GoverningLaw.TC_VOLUNTARYCOMPFORRESIDENCEEMP)
      typeKeys.remove(WC7GoverningLaw.TC_LIMITEDMARITIME)
    } else {
        typeKeys.remove(WC7GoverningLaw.TC_STOPGAP) 
    }
    return typeKeys as WC7GoverningLaw[]
  }
  
  // ---------------------------- Private Helper Methods
  
  private function updateBasisAmount() { 
    var coveredEmployeeBaseVLs = this.WCLine.VersionList.WC7CoveredEmployeeBases 
    for (covEmpVL in coveredEmployeeBaseVLs) {
      var allCovEmpVersions = covEmpVL.AllVersions
      var nonProratableCovEmps = allCovEmpVersions.where(\ w -> w.BasisTypeProratable == false)
     
      for (nonProratableCovEmp in nonProratableCovEmps) {
       var originalBasisAmount = nonProratableCovEmp.getOriginalValue("BasisAmount") as Integer
       nonProratableCovEmp.BasisAmount = originalBasisAmount
      }
    }
    
    var waiverVls = this.WCLine.VersionList.WC7WaiverOfSubros
    for (aWavierVL in waiverVls){
      var allWaiverVersions = aWavierVL.AllVersions 
      var nonProratableSpecificWaivers = allWaiverVersions.where(\ w -> 
                    w.BasisTypeProratable == false and w.Type == WC7WaiverOfSubrogation.TC_SPECIFIC)
      for (aSpecificWaiver in nonProratableSpecificWaivers) {
        aSpecificWaiver.BasisAmount = aSpecificWaiver.getOriginalValue("BasisAmount") as Integer
      } 
    }
  }
    
  private function getPeriodStart() : Date {
      return this.PolicyLine.Branch.PeriodStart
  }
  
  private function getPeriodEnd() : Date {
      return this.PolicyLine.Branch .PeriodEnd
  }
  
  private function checkIncludesDateIgnoreTime(date : Date) {
      if (getPeriodStart().compareIgnoreTime(date) > 0 or getPeriodEnd().compareIgnoreTime(date) <= 0) {
        throw displaykey.WorkersComp.Jurisdiction.DateOutsidePeriod(date, getPeriodStart(), getPeriodEnd())
      }
  }
  
  private function setAnniversaryYear(anniversaryCal : Calendar, effectiveCal : Calendar) {
      anniversaryCal.set(Calendar.YEAR, effectiveCal.get(Calendar.YEAR))
      var anniDate = anniversaryCal.getTime()
      var effectiveDate = effectiveCal.getTime()
      if (not anniDate.equals(effectiveDate)
            and anniDate == DateTimeUtil.getEarlierOfTwoDates(anniDate, effectiveDate)) {
          anniversaryCal.add(Calendar.YEAR, 1)
      }
  }
  
  private function getTrimmedCalendar(date : Date) : Calendar {
      if (null == date) {
          return null
      }
      var cal = Calendar.getInstance()
      cal.setTime(DateTimeUtil.trimToDay(date))
      return cal
  }
  
  private function splitAllWC7CoveredEmployees() {
    var ratingPeriodStartDates = getWC7RatingPeriodStartDates()
    for (rpsd in ratingPeriodStartDates) {
      var wcCoveredEmployeeBaseVLs = this.getWCLine().VersionList.WC7CoveredEmployeeBases
      for (wcCoveredEmployeeBaseVL in wcCoveredEmployeeBaseVLs) {
        var allVersions = wcCoveredEmployeeBaseVL.AllVersions
        var location = allVersions.get(0).getLocation()
        if (location != null and location.getState() != StateJurisdictionMappingUtil.getStateMappingForJurisdiction(this.getJurisdiction())) {
            continue
        }
        for (wcCoveredEmployeeBase in allVersions) {
          if (wcCoveredEmployeeBase.isEffective(rpsd.getStartDate())) {
            wcCoveredEmployeeBase.split(rpsd.getStartDate())
         }
         //call updateBasisAmount when there is split period for non-Proratables
         if (!wcCoveredEmployeeBase.BasisTypeProratable ) {
           updateBasisAmount() 
         }
        }
      }      
    }
  }   
  
  private function splitAllSpecificWaivers() {
    var ratingPeriodStartDates = getWC7RatingPeriodStartDates()
    for (rpsd in ratingPeriodStartDates) {
      var listOfWaiversVL = this.getWCLine().VersionList.WC7WaiverOfSubros
      for (waiverVL in listOfWaiversVL) {
        var allVersions = waiverVL.AllVersions
        var waiverFirstVersion = allVersions.first()
        if (waiverFirstVersion.Type == WC7WaiverOfSubrogation.TC_SPECIFIC and waiverFirstVersion.Jurisdiction == this.getJurisdiction()){
          for (specificWaiver in allVersions) {
            if (specificWaiver.isEffective(rpsd.getStartDate())) {
              specificWaiver.split(rpsd.getStartDate())
            }
             //call updateBasisAmount when there is split period for non-Proratables
            if (!specificWaiver.BasisTypeProratable ) {
              updateBasisAmount() 
            }
          }  
        }
      }      
    }
  }   

  private function splitAllWC7SupplDiseaseExposures() {
    var ratingPeriodStartDates = getWC7RatingPeriodStartDates()
    for (rpsd in ratingPeriodStartDates) {
      var wc7SupplDiseaseExpVLs = this.getWCLine().VersionList.WC7SupplDiseaseExposures
      for (wc7SupplDiseaseExpVL in wc7SupplDiseaseExpVLs) {
        var allVersions = wc7SupplDiseaseExpVL.AllVersions
        var location = allVersions.get(0).getLocation()
        if (location != null and location.getState() != StateJurisdictionMappingUtil.getStateMappingForJurisdiction(this.getJurisdiction())) {
            continue
        }
        for (wc7SupplDiseaseExp in allVersions) {
          if (wc7SupplDiseaseExp.isEffective(rpsd.getStartDate())) {
            wc7SupplDiseaseExp.split(rpsd.getStartDate())
         }
        }
      }      
    }
  }   

  private function splitAllWC7AtomicEnergyExposures() {
    var ratingPeriodStartDates = getWC7RatingPeriodStartDates()
    for (rpsd in ratingPeriodStartDates) {
      var wc7AtomicEnergyExpVLs = this.getWCLine().VersionList.WC7AtomicEnergyExposures
      for (wc7AtomicEnergyExpVL in wc7AtomicEnergyExpVLs) {
        var allVersions = wc7AtomicEnergyExpVL.AllVersions
        var location = allVersions.get(0).getLocation()
        if (location != null and location.getState() != StateJurisdictionMappingUtil.getStateMappingForJurisdiction(this.getJurisdiction())) {
            continue
        }
        for (wc7AtomicEnergyExp in allVersions) {
          if (wc7AtomicEnergyExp.isEffective(rpsd.getStartDate())) {
            wc7AtomicEnergyExp.split(rpsd.getStartDate())
         }
        }
      }      
    }
  }   
  
  /**
   * Helper: returns the list of RPSDs for this PolicyPeriod, optionally
   * filtered by RPSDType
   *
   * @param startDate if non-null, filters RPSDs by date
   * @param type      if non-null, filters RPSDs by type
   * @return unsorted List of RPSDs
   */
  private function innerGetUnsortedRPSDs(startDate : Date, type : RPSDType) : List<WC7RatingPeriodStartDate> {
      var ratingPeriodsList = new ArrayList<WC7RatingPeriodStartDate>()
      var rpsd = this.WC7RatingPeriodStartDates
      for (ratingPeriod in rpsd) {
          if ((startDate == null or startDate.equals(ratingPeriod.getStartDate())) and
              (type == null or type == ratingPeriod.getType())) {
              ratingPeriodsList.add(ratingPeriod)
          }
      }
      return ratingPeriodsList
  }
  
  /**
   * Takes the list of version lists, joins the beans where necessary, and then re-splits them as appropriate based on the
   * current set of RPSDs.
   */
  private function updateSplitsOnEffDatedBeans(versionLists : List<EffDatedVersionList>,
                                               shouldSplit(bean : EffDated) : boolean) {
    for (beanVL in versionLists) {
      splitBeans(beanVL.AllVersionsUntyped, shouldSplit)
      var beanVersions = beanVL.AllVersionsUntyped  // splitBeans may introduce new beans, but hereafter we want to operate on the same list of beans
      growToPreviousSplitDate(beanVersions)
      growToNextSplitDate(beanVersions)
      removeSupersededBeans(beanVersions)
    }
  }
  
  /**
   * Splits any bean versions in the EffDatedVersionList that overlaps an RPSD
   */
  protected function splitBeans(beanVersions : List<EffDated>, shouldSplit(bean : EffDated) : boolean) {
    for (rpsd in getWC7RatingPeriodStartDates()) {
      for (beanVersion in beanVersions) {
        if (shouldSplit(beanVersion) and beanVersion.isEffective(rpsd.StartDate)) {
          beanVersion.splitUntyped(rpsd.StartDate)
        }
      }
    }
  }
  
  /**
   * For all the versions of a bean over time, expand the bean version back
   * in time to the last split date before or on the bean's EffectiveDate.
   */
  private function growToPreviousSplitDate(beanVersions : List<EffDated>) {
    var splitDts = SplitDates
    var splitDt : DateTime = null
    for (beanVersion in beanVersions) {
      while(splitDts.get(0) <= beanVersion.EffectiveDate) {
        splitDt = splitDts.remove(0)
      }
      beanVersion.EffectiveDate = splitDt
    }
  }

  /**
   * For all versions of a bean over time, expand the bean version forward
   * in time to the first split date on or after the beans' ExpirationDate.
   */
  private function growToNextSplitDate(beanVersions : List<EffDated>) {
    var splitDts = SplitDates
    var splitDate = splitDts.remove(0)
    for (beanVersion in beanVersions) {
      while (splitDate < beanVersion.ExpirationDate) {
        splitDate = splitDts.remove(0)
      }
      beanVersion.ExpirationDate = splitDate
    }
  }
  
  /**
   * Remove any beans that have duplicate Effective/ExpirationDates and keep
   * only the first one.
   */
  private function removeSupersededBeans(beanVersions : List<EffDated>) {
    var lastBeanVersion : EffDated
    for (beanVersion in beanVersions) {
      // after the grow methods, any beans with matching EffectiveDates
      // also have matching ExpirationDates so we only test one
      if (lastBeanVersion.EffectiveDate == beanVersion.EffectiveDate) {
        beanVersion.ExpirationDate = beanVersion.EffectiveDate
      } else {
        lastBeanVersion = beanVersion
      }
    }
  }
  
  private function createRatingPeriods(rpsds : List<Date>) : List<WC7RatingPeriod> {
    var periods = new ArrayList<WC7RatingPeriod>()
    if (rpsds.size()> 0) {
        for (i in 0..|(rpsds.size() - 1)) {
          var startDate = rpsds[i]
          var endDate = rpsds[i + 1]
          if (startDate < endDate) {
            periods.add(new WC7RatingPeriod(this, startDate, endDate, i + 1))
          }
        }
    }
    return periods
  }

}
