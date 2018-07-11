package gw.lob.wc7

uses java.util.ArrayList
uses gw.api.policy.AbstractPolicyLineMethodsImpl
uses java.util.Set
uses gw.policy.PolicyLineValidation
uses gw.validation.PCValidationContext
uses gw.plugin.diff.impl.WC7DiffHelper
uses java.util.Date
uses gw.api.util.StateJurisdictionMappingUtil
uses java.util.HashSet
uses java.lang.Iterable
uses entity.windowed.WC7CostVersionList
uses gw.api.util.JurisdictionMappingUtil
uses java.math.BigDecimal
uses gw.api.productmodel.Schedule
uses gw.lob.wc7.schedule.WC7ScheduleHelper
uses gw.rating.AbstractRatingEngine
uses java.util.Map
uses gw.lob.wc7.rating.WC7SysTableRatingEngine
uses gw.lob.wc7.rating.WC7RatingEngine

@Export
class WC7PolicyLineMethods extends AbstractPolicyLineMethodsImpl {
  public var _line : entity.WC7WorkersCompLine
  
  construct(line : entity.WC7WorkersCompLine) {
    super(line)
    _line = line
  }

  override function initialize() {
    var state = JurisdictionMappingUtil.getJurisdictionMappingForAccountLocation(_line.Branch.Policy.Account.PrimaryLocation)
    _line.addJurisdiction(state )
  }
  
  override function syncComputedValues() {
    _line.recalculateGoverningClasscode()
    _line.updateWCExposuresAndModifiers() 
    _line.syncWC7CoveredEmployeeBasesVersions()
    _line.syncSpecificWaiversOfSubroVersions()
  }
  
  override property get CoveredStates() : Jurisdiction[] {
    var jurisdictions = _line.WC7CoveredEmployees.where(\ emp -> emp.Location != null and not WC7GoverningLaw.TC_STOPGAP.equals(emp.GoverningLaw))
                                   .map(\ emp -> JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(emp.Location)).sort().toSet().toTypedArray()    
    return jurisdictions
  }

  override property get AllCoverages() : Coverage[] {
    var covs = new ArrayList<Coverage>()
    covs.addAll(_line.WC7LineCoverages.toList())
    covs.addAll(_line.WC7Jurisdictions*.Coverages.toList())
    return covs as Coverage[]
  }

  override property get AllExclusions() : Exclusion[] {
    return _line.WC7LineExclusions
  }

  override property get AllConditions() : PolicyCondition[] {
    return _line.WC7LineConditions
  }

  override property get AllCoverables() : Coverable[] {
    var list : ArrayList<Coverable> = {_line}
    _line.WC7Jurisdictions.each(\ jur -> list.add(jur))
    return list.toTypedArray()
  }
  
  override property get AllModifiables() : Modifiable[] {
    return _line.WC7Jurisdictions
  }

  override property get AllSchedules() : Schedule[] {
    return _line.CoveragesConditionsAndExclusionsFromCoverable.whereTypeIs(Schedule)
  }
  
  override property get SupportsRatingOverrides() : boolean {
    return true
  }

  override property get OfficialIDStates() : State[] {
    var jurisdictions = _line.WC7Jurisdictions.map(\ juris -> juris.Jurisdiction)
    var states = new HashSet<State>()
    for(jurisdiction in jurisdictions){
      states.add(StateJurisdictionMappingUtil.getStateMappingForJurisdiction(jurisdiction))
    }
    return states as State[]
  }

  override function onIssuanceBeginEditing() {
    initializeAnniversaryDates()     
  }
  
  override function onSubmissionBeginEditing() {
    initializeAnniversaryDates()
    var state = JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(_line.Branch.PrimaryLocation)
    if (_line.getJurisdiction( state ) == null) {
      _line.addJurisdiction( state ) 
    }
  }
  
  override property get Auditable() : boolean {
    return true  
  }
  
  private function initializeAnniversaryDates() {
    for (jurisdiction in _line.WC7Jurisdictions) {
      if (jurisdiction.AnniversaryDate == null) {
        jurisdiction.AnniversaryDate = _line.Branch.PeriodStart
      }
    }
  }

  /**
   * Indicates whether ChangeEditEffectiveDate (CEED) can be performed on this policy line.  If this returns
   * null or an empty string, that means the line thinks it's OK.   Otherwise, this method should returnan
   * error message indicating why ChangeEditEffectiveDate cannot be performed.
   * @return an error message if Edit Effective Date can't be changed, null or the empty String if it can
   */
  override function canSafelyCEED() : boolean {
    for (jurisdiction in _line.WC7Jurisdictions) {
      if (jurisdiction.BasedOn != null and not jurisdiction.SplitDates.toSet().equals(jurisdiction.BasedOn.SplitDates.toSet())) {
        return false
      }
    }
    return true
  }

  /**
   * Indicates whether or not this location can be safely deleted.  If this returns
   * a null or empty string, that means that the line thinks it's okay to delete the location.  Otherwise, this method
   * should return an error message indicating why the location can't be deleted.
   */
  override function canSafelyDeleteLocation(location : PolicyLocation) : String {
    // check whether this location is the last one for given jurisdiction
    var juris = StateJurisdictionMappingUtil.getJurisdictionMappingForState(location.State)
    var matchingLocs = _line.PolicyLocations.where(\ p -> p.State.equals(location.State) and p != location)
    var scheduleHelper = new WC7ScheduleHelper()
    //Check for Generic and Specific Schedule References if this is the last Location associated with a Jurisdiction
    if (matchingLocs.IsEmpty){
      var wc7Line = _line as productmodel.WC7Line
      if (scheduleHelper.isJurisdictionUsedByCurrentAndFutureScheduleItems(juris, wc7Line) or 
          scheduleHelper.isJurisdictionUsedByCurrentAndFutureSpecificSchedules(juris, wc7Line)){
        return displaykey.Web.Policy.WC7.Jurisdiction.UsedBySchedule("Location " + location.LocationNum)
      }
    }
    return super.canSafelyDeleteLocation(location)
  }
  
  
  
  override property get AllCurrentAndFutureScheduledItems() : List<ScheduledItem> {
    return new WC7ScheduleHelper().getCurrentAndFutureScheduledItemsForPolicyLine(_line as productmodel.WC7Line)
  }

  /**
   * All WC7Costs across the term, in window mode.
   */
  override property get CostVLs() : Iterable<WC7CostVersionList> {
    return _line.VersionList.WC7Costs
  }
  
  override property get Transactions() : Set<Transaction> {
    return _line.WC7Transactions.toSet()
  }
  
  override function prorateBasesFromCancellation() {
    for (jurisdiction in _line.WC7Jurisdictions) {
      var cancellationDate = _line.Branch.CancellationDate
      if(jurisdiction.canAddRPSD(cancellationDate) == null){
        jurisdiction.addWC7RatingPeriodStartDate(cancellationDate, "audit")
      }
    }
    _line.updateWCExposuresAndModifiers()
  }

  override function createPolicyLineValidation(validationContext : PCValidationContext) : PolicyLineValidation {
    return WC7ValidationFactory.getPolicyLineValidation(validationContext, _line as productmodel.WC7Line)
  }
  
  override function preLocationDelete(location : PolicyLocation) { 
    endDateClausesAndExposuresRelatedToLocation(location)
  }

  override function checkLocationInUse(location : PolicyLocation) : boolean {
    // only time WC location should be removed automatically is when jurisdiction is removed - PC-13922
    return true
  }

  private function endDateClausesAndExposuresRelatedToLocation(location : PolicyLocation) {
    for (exposure in _line.getAllExistingOrFutureCoveredEmployeesRelatedToLocation(location)){
      exposure.endDateWM(location.SliceDate)
    }
    
    for (supplDisExposure in _line.getExistingOrFutureSupplementaryDiseaseExposuresRelatedToLocation(location)){
      supplDisExposure.endDateWM(location.SliceDate)
    }
  }
  
  override function onBeginIssueJob() {
    super.onBeginIssueJob()
    // because we don't allow locations to be removed before quoting, clean them up before bind:
    _line.Branch.removeUnusedLocations()
  }
  
  override function createPolicyLineDiffHelper(reason : DiffReason, policyLine : PolicyLine) : WC7DiffHelper {
    return new WC7DiffHelper(reason, this._line, policyLine as WC7WorkersCompLine)
  }
  
  
  override function postApplyChangesFromBranch(sourcePeriod : PolicyPeriod) {
    for(employee in this._line.WC7CoveredEmployees){
      if(employee.Location == null){ // location has been deleted
        employee.removeWM()
      }
    }
    for(jurisdiction in _line.WC7Jurisdictions){
      jurisdiction.updateRPSDsAfterPeriodChange(sourcePeriod.PeriodStart)
    }
    _line.updateWCExposuresAndModifiers()
  }
  
  override function postSetPeriodWindow( oldEffDate: Date, oldExpDate: Date) {
    for (jurisdiction in _line.WC7Jurisdictions) {
      jurisdiction.adjustAnniversaryDate()
      jurisdiction.updateRPSDsAfterPeriodChange(oldEffDate)
    }
  }

  override function postCreateDraftBranchInNewPeriod() {
    var jurisdictions = this._line.WC7Jurisdictions
    for (jurisdiction in jurisdictions) {
      jurisdiction.updateRPSDsInNewPeriod()
    }
  }

  override function doGetTIVForCoverage(cov : Coverage) : BigDecimal {
    switch (cov.FixedId.Type) {
      //Workers Comp Line
      case entity.WC7WorkersCompCov.Type:  
        return getWC7WorkersCompCovLimit(cov as WC7WorkersCompCov)

      case entity.WC7JurisdictionCov.Type:
        break
    }
    return BigDecimal.ZERO
  }

  private function getWC7WorkersCompCovLimit(cov : WC7WorkersCompCov) : BigDecimal {
    var insuredValue = BigDecimal.ZERO
    return insuredValue
  }

  override function createRatingEngine(method : RateMethod, parameters : Map<RateEngineParameter, Object>) : AbstractRatingEngine<WC7Line> {
    if (RateMethod.TC_SYSTABLE == method) {
      return new WC7SysTableRatingEngine(_line as WC7Line)
    } 
    return new WC7RatingEngine(_line as WC7Line, parameters[RateEngineParameter.TC_RATEBOOKSTATUS] as RateBookStatus)
  }

  override property get SupportsNonSpecificLocations() : boolean {
    return true
  }

  override property get PolicyLocationCanBeRemovedWithoutRemovingAssociatedRisks() : boolean {
    return true
  }

}

