package gw.lob.wc7

uses java.util.Set
uses entity.windowed.WC7CoveredEmployeeVersionList
uses entity.windowed.WC7FedCoveredEmployeeVersionList
uses java.lang.Integer
uses java.util.HashMap
uses java.util.List
uses java.lang.NullPointerException
uses gw.api.domain.StateSet
uses java.util.ArrayList
uses gw.api.util.DisplayableException
uses gw.lob.wc7.options.WC7Option
uses java.util.Date
uses gw.api.util.StateJurisdictionMappingUtil
uses entity.windowed.WC7MaritimeCoveredEmployeeVersionList
uses gw.api.database.Query
uses gw.api.database.Relop
uses entity.windowed.WC7WaiverOfSubroVersionList
uses entity.windowed.WC7SupplDiseaseExposureVersionList
uses entity.windowed.WC7AtomicEnergyExposureVersionList
uses entity.windowed.WC7AircraftSeatVersionList
uses gw.api.productmodel.CoveragePattern
uses gw.api.productmodel.ConditionPattern
uses gw.api.domain.covterm.CovTerm
uses gw.api.productmodel.ClausePattern
uses gw.api.productmodel.ExclusionPattern
uses java.lang.IllegalArgumentException
uses gw.lob.wc7.availability.WC7StateFilterFactory
uses gw.entity.ITypeFilter
uses gw.lob.wc7.availability.WC7ClauseAvailability

/**
 * Enhancement methods for {@link WC7WorkersCompLine}
 */
enhancement WC7WorkersCompLineEnhancement : entity.WC7WorkersCompLine {

  /**
   * This property returns a valid first computation date that defaults to 
   * 18 months after the effective date of policy term
   */ 
  property get ValidDefaultFirstComputationDate() : Date {
    var startingDate = this.EffectiveDate.addMonths(18)
    // first computation date has to start from the first day of the month
    var validFirstComputationDate = Date.createDateInstance(startingDate.MonthOfYear, 1, startingDate.YearOfDate)
    return validFirstComputationDate
  }
  
  /**
   * @return a list of all versions of {@link WC7CoveredEmployee}s in window mode.
   */
  property get AllWC7CoveredEmployeesWM() : List<entity.WC7CoveredEmployee> {
    return WC7CoveredEmployeeVLs.flatMap(\e -> e.AllVersions)
  }  
  
  /**
   * @return a list of all versions of {@link WC7FedCoveredEmployee}s in window mode.
   */
  property get AllWC7FedCoveredEmployeesWM() : List<entity.WC7FedCoveredEmployee> {
    return WC7FedCoveredEmployeeVLs.flatMap(\e -> e.AllVersions)
  }  
  
  /**
   * @return a list of all versions of {@link WC7MaritimeCoveredEmployee}s in window mode.
   */
  property get AllWC7MaritimeCoveredEmployeesWM() : List<entity.WC7MaritimeCoveredEmployee> {
    return WC7MaritimeCoveredEmployeeVLs.flatMap(\e -> e.AllVersions)
  }  
  
  /**
   * @return a list of all versions of {@link WC7CoveredEmployeeBase}s in window mode.
   */
  property get AllWC7CoveredEmployeeBaseWM() : List<entity.WC7CoveredEmployeeBase> {
    return this.VersionList.WC7CoveredEmployeeBases.flatMap(\e -> e.AllVersions)
  }  
  
  /**
   * @return a list of all versions of {@link WC7WaiverOfSubro}s in window mode.
   */
  property get AllWC7WaiverOfSubrosWM() : List<entity.WC7WaiverOfSubro> {
    return this.VersionList.WC7WaiverOfSubros.flatMap(\e -> e.AllVersions)
  }  
  
  /**
   * @return a list of all versions of {@link WC7SupplDiseaseExposure}s in window mode.
   */
  property get AllWC7SupplDiseaseExposuresWM() : List<entity.WC7SupplDiseaseExposure> {
    return this.VersionList.WC7SupplDiseaseExposures.flatMap(\e -> e.AllVersions)
  }
 
 
   /**
   * @return a list of all versions of {@link WC7AtomicEnergyExposure}s in window mode.
   */
  property get AllWC7AtomicEnergyExposuresWM() : List<entity.WC7AtomicEnergyExposure> {
    return this.VersionList.WC7AtomicEnergyExposures.flatMap(\e -> e.AllVersions)
  }
  /**
   * @return an array of window mode {@link WC7FedCoveredEmployee fed covered employees} 
   * for each covered employee on the line. Note, only the first slice is returned in 
   * window mode for each unique covered employee.
   */
  property get WC7FedCoveredEmployeesWM() : WC7FedCoveredEmployee[]{
    return WC7FedCoveredEmployeeVLs*.AllVersions*.first()
  }  
  
  /**
   * @return an array of window mode {@link WC7MaritimeCoveredEmployee maritime covered employees} 
   * for each covered employee on the line. Note, only the first slice is returned in 
   * window mode for each unique covered employee.
   */
  property get WC7MaritimeCoveredEmployeesWM() : WC7MaritimeCoveredEmployee[] {
    return WC7MaritimeCoveredEmployeeVLs*.AllVersions*.first()
  }
  
  /**
   * @return an array of window mode Specific {@link WC7WaiverOfSubro} 
   * for each waiver, if it was ever specific, return the first slice.
   */
  property get WC7WaiversOfSubroWM() : WC7WaiverOfSubro[] {
    return WC7WaiverOfSubroVLs*.AllVersions*.first()
  }
   
  /**
   * Return the version lists of all {@link WC7WaiverOfSubros Waiver Of Subros}
   */
  property get WC7WaiverOfSubroVLs(): List<WC7WaiverOfSubroVersionList> {
    return this.VersionList.WC7WaiverOfSubros
  }
  
  /**
   * @return an array of window mode Specific {@link WC7WaiverOfSubro} 
   * for each waiver, if it was ever specific, return the first slice.
   */
  property get WC7SpecificWaiversWM() : WC7WaiverOfSubro[] {
    return WC7SpecificWaiverOfSubroVLs*.AllVersions*.first()
  }
   
  /**
   * Return the version lists of all {@link WC7WaiverOfSubros Waiver Of Subros} that are specific
   */
  property get WC7SpecificWaiverOfSubroVLs(): List<WC7WaiverOfSubroVersionList> {
    return this.VersionList.WC7WaiverOfSubros.where(\ wVL -> wVL.AllVersions.first().Type == WC7WaiverOfSubrogation.TC_SPECIFIC)
  }
    
  /**
   * @return an array of window mode Blanket {@link WC7WaiverOfSubro} 
   * for each waiver, if it was ever blanket, return the first slice.
   */
  property get WC7BlanketWaiversWM() : WC7WaiverOfSubro[] {
    return WC7BlanketWaiverOfSubroVLs*.AllVersions*.first()
  }

  /**
   * Return the version lists of all {@link WC7WaiverOfSubros Waiver Of Subros} that are blanket waivers
   */
  property get WC7BlanketWaiverOfSubroVLs(): List<WC7WaiverOfSubroVersionList> {
    return this.VersionList.WC7WaiverOfSubros.where(\ wVL -> wVL.AllVersions.first().Type == WC7WaiverOfSubrogation.TC_BLANKET)
  }
  
  /**
   * @return an array of window mode {@link WC7AircraftSeat}, for each Version List return the first slice.
   */
  property get WC7AircraftSeatsWM() : WC7AircraftSeat[] {
    return WC7AircraftSeatsVLs*.AllVersions*.first()
  }
   
  /**
   * Return the version lists of all {@link WC7AircraftSeat Aircraft Seats}
   */
  property get WC7AircraftSeatsVLs(): List<WC7AircraftSeatVersionList> {
    return this.VersionList.WC7AircraftSeats
  }
    
  /**
   * Returns the retrospective rating plan in window mode
   * @returns {@link WC7RetrospectiveRatingPlan} 
   */
  property get RetrospectiveRatingPlanWM() : entity.WC7RetrospectiveRatingPlan {
    if (this.VersionList.RetrospectiveRatingPlanArray.Empty) {
      return null
    }
    // Retrospective rating plan is a one-to-one so we should just get the first one
    var versionList = this.VersionList.RetrospectiveRatingPlanArray.single()
    return versionList.AllVersions.first()
  }
  
  /**
   * Return the version lists of all {@link WC7CoveredEmployee Covered Employees}
   */
  property get WC7CoveredEmployeeVLs(): List<WC7CoveredEmployeeVersionList> {
    var a = this.VersionList.WC7CoveredEmployees
    return a
  }

  /**
   * Return the version lists of all {@link WC7FedCoveredEmployee FELA Covered Employees}
   */
  property get WC7FedCoveredEmployeeVLs(): List<WC7FedCoveredEmployeeVersionList> {
    var a = this.VersionList.WC7FedCoveredEmployees
    return a
  }

  /**
   * Return the version lists of all {@link WC7MaritimeCoveredEmployee Maritime Covered Employees}
   */
  property get WC7MaritimeCoveredEmployeeVLs(): List<WC7MaritimeCoveredEmployeeVersionList> {
    var a = this.VersionList.WC7MaritimeCoveredEmployees
    return a
  }

  /**
   * Return the version lists of all {@link WC7SupplDiseaseExposure Covered Employees}
   */
  property get WC7SupplDiseaseExposureVLs(): List<WC7SupplDiseaseExposureVersionList> {
    var a = this.VersionList.WC7SupplDiseaseExposures
    return a
  }
  
  /**
   * Return the version lists of all {@link WC7AtomicEnergyExposure Covered Employees}
   */
  property get WC7AtomicEnergyExposureVLs(): List<WC7AtomicEnergyExposureVersionList> {
    var a = this.VersionList.WC7AtomicEnergyExposures
    return a
  }
  
  /**
   * True if Labor Clients or Labor Contractors exist on this line.
   */
  property get HasEmployeeLeasing(): boolean {
    return this.Branch.WC7Line.WC7PolicyLaborClients.HasElements or
           this.Branch.WC7Line.WC7PolicyLaborContractors.HasElements
  }

  property get InterstateNamedInsuredOfficialIDs(): OfficialID[] {
    var jurisdictionStates = this.WC7Jurisdictions.map(\j -> j.Jurisdiction)
    var namedInsuredOfficialIDs = this.Branch.getNamedInsuredOfficialIDsForState(null)
    return namedInsuredOfficialIDs.whereTypeIs(PCOfficialID).where(\ id -> id.OfficialIDType != "SSN" and id.OfficialIDType != "FEIN" and
                   id.Pattern.ApplicableStatesAsArray.countWhere(\s ->jurisdictionStates.contains(StateJurisdictionMappingUtil.getJurisdictionMappingForState(s))) > 0)
  }

  property get HasParticipatingPlan() : boolean {
    return this.getParticipatingPlan() != null
  }

  property set HasParticipatingPlan(hasPlan : boolean) {
    if (HasParticipatingPlan == hasPlan) {
      return
    }
    if (hasPlan) {
      var plan = new WC7ParticipatingPlan(this.Branch)
      this.ParticipatingPlan = plan
    } else {
      var oldPlan = this.ParticipatingPlan
      if (oldPlan != null) {
        this.Bundle.remove(oldPlan)
      }
      this.ParticipatingPlan = null
    }
  }

  property get HasWC7ManuscriptOptions(): boolean {
    return this.WC7ManuscriptOptions.HasElements
  }

  property set HasWC7ManuscriptOptions(hasManuscriptOption : boolean) {
    // do nothing if same selection
    if (HasWC7ManuscriptOptions == hasManuscriptOption) {
      return
    }

    if (hasManuscriptOption == false) {
      for (manuscriptoption in this.WC7ManuscriptOptions) {
        this.removeFromWC7ManuscriptOptions(manuscriptoption)
      }
    } else {
      this.addToWC7ManuscriptOptions(new WC7ManuscriptOption(this.Branch))
    }
  }
  /**
   * Returns all types of covered employees ({@link WC7CoveredEmployee}, {@link WC7FedCoveredEmployee} and 
   * {@link WC7MaritimeCoveredEmployee}) related to this location
   * @return a list of existing or future covered employee bases {@link WC7CoveredEmployeeBase}
   */
  function getAllExistingOrFutureCoveredEmployeesRelatedToLocation(location : PolicyLocation)  : List<WC7CoveredEmployeeBase> {
    return this.VersionList.WC7CoveredEmployeeBases.flatMap(\ wcCovEmpVL -> wcCovEmpVL.AllVersions)
      .where(\ wcCovEmp -> wcCovEmp.Location.FixedId == location.FixedId and wcCovEmp.ExpirationDate > location.SliceDate)
  }

  function getExistingOrFutureCoveredEmployeesRelatedToJurisdiction(jurisdiction : WC7Jurisdiction)  : List<WC7CoveredEmployee> {
    return this.VersionList.WC7CoveredEmployees.flatMap(\ wcCovEmpVL -> wcCovEmpVL.AllVersions)
      .where(\ wcCovEmp -> wcCovEmp.Jurisdiction.FixedId == jurisdiction.FixedId
         and wcCovEmp.ExpirationDate > jurisdiction.SliceDate)
  }

  function hasEmployeesInState(state : State) : boolean {
    if (state == null) return false
    var locationsInState = this.Branch.WC7Line.getAllLocationsInState(state)
    return locationsInState.hasMatch(\ loc -> this.Branch.WC7Line.getAllExistingOrFutureCoveredEmployeesRelatedToLocation(loc).HasElements)
  }

  /**
   * Returns existing and future WC7SupplDiseaseExposure {@link WC7SupplDiseaseExposure} related to this location
   * @return a list of existing or future WC7SupplDiseaseExposure {@link WC7SupplDiseaseExposure}
   */
  function getExistingOrFutureSupplementaryDiseaseExposuresRelatedToLocation(location : PolicyLocation)  : List<WC7SupplDiseaseExposure> {
    return this.VersionList.WC7SupplDiseaseExposures .flatMap(\ wcSupplDiseaseVL -> wcSupplDiseaseVL.AllVersions)
      .where(\ supplDisease -> supplDisease.Location.FixedId == location.FixedId and supplDisease.ExpirationDate > location.SliceDate)
  }
  
  /**
   * Returns existing and future WC7AtomicEnergyExposure {@link WC7AtomicEnergyExposure} related to this location
   * @return a list of existing or future WC7AtomicEnergyExposure {@link WC7AtomicEnergyExposure}
   */
  function getExistingOrFutureAtomicEnergyExposuresRelatedToLocation(location : PolicyLocation)  : List<WC7AtomicEnergyExposure> {
    return this.VersionList.WC7AtomicEnergyExposures.flatMap(\ wcAtomicEnergyVL -> wcAtomicEnergyVL.AllVersions)
      .where(\ atomicEnergy -> atomicEnergy.Location.FixedId == location.FixedId and atomicEnergy.ExpirationDate > location.SliceDate)
  }
      
  function getWC7CoveredEmployeesWM(jurisdiction : Jurisdiction) : WC7CoveredEmployee[]{
    var versionLists = this.VersionList.WC7CoveredEmployees
    var employees = new ArrayList<WC7CoveredEmployee>()
    for(v in versionLists){
      var first = v.AllVersions.first()
      if(first.Location.State == StateJurisdictionMappingUtil.getStateMappingForJurisdiction(jurisdiction)){
        employees.add(first)
      }
    }
    return employees.toTypedArray()
  }

  /**
   * @return an array of window mode {@link WC7FedCoveredEmployee fed covered employees} 
   * for each covered employee on the line. Note, only the first slice is returned in 
   * window mode for each unique covered employee.
   */
  function getWC7FedCoveredEmployeesWM(jurisdiction : Jurisdiction) : WC7FedCoveredEmployee[] {
    var versionLists = this.VersionList.WC7FedCoveredEmployees
    var fedEmployees = new ArrayList<WC7FedCoveredEmployee>()
    for (v in versionLists) {
      var first = v.AllVersions.first()
      if(first.Location.State== StateJurisdictionMappingUtil.getStateMappingForJurisdiction(jurisdiction)) {
        fedEmployees.add(first)
      }
    }
    return fedEmployees.toTypedArray()
  }  

  /**
   * @return an array of window mode {@link WC7MaritimeCoveredEmployee maritime covered employees} 
   * for each covered employee on the line. Note, only the first slice is returned in 
   * window mode for each unique covered employee.
   */
  function getWC7MaritimeCoveredEmployeesWM(jurisdiction : Jurisdiction) : WC7MaritimeCoveredEmployee[] {
    var versionLists = this.VersionList.WC7MaritimeCoveredEmployees
    var maritimeEmployees = new ArrayList<WC7MaritimeCoveredEmployee>()
    for (v in versionLists) {
      var first = v.AllVersions.first()
      if(first.Location.State== StateJurisdictionMappingUtil.getStateMappingForJurisdiction(jurisdiction)) {
        maritimeEmployees.add(first)
      }
    }
    return maritimeEmployees.toTypedArray()
  }
  

  
  
  function addCoveredEmployeeWM(state : State) : WC7CoveredEmployee {
    var eu = createAndAddWC7CoveredEmployee()
    var monopolisticStates = gw.api.domain.StateSet.get(gw.api.domain.StateSet.WC_MONOPOLISTIC)
    if (monopolisticStates.contains(state)) {
      eu.GoverningLaw = WC7GoverningLaw.TC_DEFENSEBASEACT
    }
    return eu.VersionList.AllVersions.single()
  }

  function addSuppleDiseaseExposureWM() : WC7SupplDiseaseExposure {
    var eu = createAndAddSupplementaryDiseaseExposure() 
    return eu.VersionList.AllVersions.single()
  }

  function getWC7CoveredEmployeeBasesWM(state : Jurisdiction) : WC7CoveredEmployeeBase[]{
    var versionLists = this.VersionList.WC7CoveredEmployeeBases
    var employees = new ArrayList<WC7CoveredEmployeeBase>()
    for(v in versionLists){
      var first = v.AllVersions.first()
      if(first.Location.State == StateJurisdictionMappingUtil.getStateMappingForJurisdiction(state)){
        employees.add(first)
      }
    }
    return employees.toTypedArray()
  }
  
  /**
   * Indicates whether or not this jurisdiction is used on any exposure ({@link WC7CoveredEmployee}, 
   * {@link WC7FedCoveredEmployee} , {@link WC7MaritimeCoveredEmployee}
   * (@link WC7SupplDiseaseExposures} , {@link WC7AtomicEnergyExposures}
   * ). 
   */
  function isJurisdictionUsedOnExposure(state : Jurisdiction) : boolean {
    var stateToCheck = StateJurisdictionMappingUtil.getStateMappingForJurisdiction(state)      
    var covEmpBaseVL = this.VersionList.WC7CoveredEmployeeBases
    for(v in covEmpBaseVL*.AllVersions.flatMap(\ l -> l)){
      if(v.Location == null or v.Location.State == stateToCheck){
        //It is expensive to traverse all versions.  escape early.
        return true
      }
    }
    
    var supplDiseaseExpVL = this.VersionList.WC7SupplDiseaseExposures
    for(v in supplDiseaseExpVL*.AllVersions.flatMap(\ l -> l)){
      if(v.Location == null or v.Location.State == stateToCheck){
        //It is expensive to traverse all versions.  escape early.
        return true
      }
    }
    
    var atomicEnergyExpVL = this.VersionList.WC7AtomicEnergyExposures
    for(v in atomicEnergyExpVL*.AllVersions.flatMap(\ l -> l)){
      if(v.Location == null or v.Location.State == stateToCheck){
        //It is expensive to traverse all versions.  escape early.
        return true
      }
    }
    return false
  }

  /**
   * Indicates whether or not this jurisdiction is used on any schedule at any point in time on the policy.
   */
  function isJurisdictionUsedOnSchedule(state : Jurisdiction) : boolean {
    // checking if the jurisdiction is in use in specific schedules
    var matchingAircraftSeatFound = this.VersionList.WC7AircraftSeats
            .hasMatch(\ w -> w.AllVersions.hasMatch(\ w1 -> state.equals(w1.Jurisdiction)))
    if (matchingAircraftSeatFound){
      //short-circuit since these calls are expensive
      return true
    }
    
    var matchingPolOwnerOfficerFound = this.VersionList.WC7PolicyOwnerOfficers
            .hasMatch(\ w -> w.AllVersions.hasMatch(\ poOfficer -> state.equals(poOfficer.Jurisdiction))) 
    if (matchingPolOwnerOfficerFound){
      //short-circuit since these calls are expensive
      return true
    }        
    
    var matchingWaiverOfSubroFound = this.VersionList.WC7WaiverOfSubros
            .hasMatch(\ w -> w.AllVersions.hasMatch(\ waiver -> state.equals(waiver.Jurisdiction)))
    if (matchingWaiverOfSubroFound){
      //short-circuit since these calls are expensive
      return true
    }
            
    var matchingLaborClientsFound = this.VersionList.WC7PolicyLaborClients*.WC7Details
            .hasMatch(\ l -> l*.AllVersions.hasMatch(\ laborContDetail -> laborContDetail.hasMatch(\ w -> state.equals(w.Jurisdiction) )))
    if (matchingLaborClientsFound){
      //short-circuit since these calls are expensive
      return true
    }
    
    var matchingLaborContractorsFound = this.VersionList.WC7PolicyLaborContractors*.WC7Details
            .hasMatch(\ l -> l*.AllVersions.hasMatch(\ laborContDetail -> laborContDetail.hasMatch(\ w -> state.equals(w.Jurisdiction) )))
    if (matchingLaborContractorsFound) {
      //short-circuit since these calls are expensive
      return true 
    }

    //check generic schedules
    var jurisdictionsForGenericSchedules = this.jurisdictionsForSchedules().Values
    for (aJurisdictionSet in jurisdictionsForGenericSchedules){
      if (aJurisdictionSet.contains(state)){
        return true
      }
    }
    return false
  }
  
  /**
   * @param state - a {@link typekey.Jurisdiction}
   * @return an existing {@link WC7Jurisdiction} if one already exists for the given Jurisdiction. 
   * Otherwise, creates a new {@link WC7Jurisdiction} with the provided state.  
   * This new jurisdiction will have a default anniversary date of 
   * the period start and will initially be setup to span the entire 
   * duration of the period.
   */
  function addJurisdiction(state : Jurisdiction) : WC7Jurisdiction {
    if (state == null) {
      throw new NullPointerException("state")
    }
    var jurisdiction = getJurisdiction(state)
    if (jurisdiction == null and not this.Bundle.ReadOnly) {
      jurisdiction = new WC7Jurisdiction(this.Branch)
      jurisdiction.Jurisdiction = state
      jurisdiction.WCLine = this
      this.addToWC7Jurisdictions(jurisdiction)
      this.Branch.updateOfficialIDs()
      jurisdiction.AnniversaryDate = this.Branch.getPeriodStart()

      var windowModeJurisdiction = jurisdiction.Unsliced
      windowModeJurisdiction.setEffectiveWindow(this.Branch.PeriodStart, this.Branch.PeriodEnd)
      jurisdiction = windowModeJurisdiction.getSlice(jurisdiction.EffectiveDate)
      jurisdiction.syncModifiers()
      jurisdiction.createCoveragesConditionsAndExclusions()
      jurisdiction = jurisdiction.getSlice(this.SliceDate)
    }
    return jurisdiction
  }

  function getAvailableParticipatingPlanIDs() : WC7ParticipatingPlanID[] {
    var allIDs = WC7ParticipatingPlanID.getTypeKeys(false)
    var jurisdictions = this.Branch.getLocationStates()
    var selected = new ArrayList<WC7ParticipatingPlanID>()
    for (allID in allIDs) {
      var id = allID
      for (jurisdiction in jurisdictions) {
        if (id.hasCategory(jurisdiction)) {
          if (!selected.contains(id)) {
            selected.add(id)
          }
        }
      }
    }
    return selected.toTypedArray()
  }

  function createAndAddWC7CoveredEmployee() : WC7CoveredEmployee {
    var eu = new WC7CoveredEmployee(this.Branch)
    eu.GoverningLaw = WC7GoverningLaw.TC_STATE
    this.addToWC7CoveredEmployees(eu)
    return eu
  }
  

  /**
   * Update exposures and modifiers to take into account the 
   * ARD (Anniversary Reoccuring Date) for all jurisdictions.
   * This will split exposures and modifiers that are handled in window mode.
   * Including:
   * <ul>
   *   <li>Covered Employees {@link WC7CoveredEmployee}</li>
   *   <li>FELA Covered Employees {@link WC7FedCoveredEmployee}</li>
   *   <li>Maritime Covered Employees {@link WC7MaritimeCoveredEmployee}</li>
   *   <li>Specific Waivers of Subrogation {@link WC7WaiverOfSubro}</li>
   *   <li>Jurisdiction Modifiers {@link WC7Modifier}</li>
   * <ul>
   * 
   * @see WC7Jurisdiction#updateExposures()
   * @see WC7Jurisdiction#splitModifiers()
   * @see WC7Jurisdiction#splitCoverages()
   */
  function updateWCExposuresAndModifiers() {
   this.WC7Jurisdictions.each(\j -> {  
      j.updateExposures()
      j.splitModifiers()
      j.splitCoverages()
      j.splitWorksheets()
    })
  }

  function removeJurisdiction(jurisdiction : WC7Jurisdiction) {
    if (not jurisdiction.CanRemove) {
      throw new DisplayableException(displaykey.Web.Policy.WC7.Jurisdiction.CannotRemove)
    }
    
    //also remove any locations used by jurisdiction
    var locationsToRemove = this.PolicyLocations.where(\ p -> p.State.Code == jurisdiction.Jurisdiction.Code)
    locationsToRemove.each(\ l -> this.Branch.removeLocation(l))
    
    jurisdiction.getSlice(jurisdiction.EffectiveDate).remove()
  }

  function getWC7CoveredEmployees(state : State) : WC7CoveredEmployee[] {
    var wcCoveredEmployees = this.getWC7CoveredEmployees()
    var emps = new ArrayList<WC7CoveredEmployee>()
    for (wcCoveredEmployee in wcCoveredEmployees) {
      if (wcCoveredEmployee.getLocation().getState() == state) {
        emps.add(wcCoveredEmployee)
      }
    }
    return emps.toArray(new WC7CoveredEmployee[emps.size()])
  }

  function getWC7ContractingTypeCoveredEmployees() : WC7CoveredEmployee[] {
    return this.getWC7CoveredEmployees().partition(\ emp -> emp.ClassCode.ConstructionType).get(true)?.toTypedArray()
  }  

  function getWC7CoveredEmployeeBases(juris : Jurisdiction) : WC7CoveredEmployeeBase[] {
    return this.WC7CoveredEmployeeBases.where(\ w -> w.Jurisdiction.Jurisdiction == juris)
  }

  function getWC7CoveredEmployeesAllVersions(state : State) : WC7CoveredEmployee[]{
    var versionLists = this.VersionList.WC7CoveredEmployees
    var employees = new ArrayList<WC7CoveredEmployee>()
    for(v in versionLists){
      for (a in v.AllVersions) {
      if (a.getLocation().getState().equals(state)) {
          employees.add(a)
        }
      }
    }
    return employees.toTypedArray()
  }


  function getWC7FedCoveredEmployees(state : State) : WC7FedCoveredEmployee[] {
    var wcFedCoveredEmployees = this.getWC7FedCoveredEmployees()
    var emps = new ArrayList<WC7FedCoveredEmployee>()
    for (wcFedCoveredEmployee in wcFedCoveredEmployees) {
      if (wcFedCoveredEmployee.getLocation().getState() == state) {
        emps.add(wcFedCoveredEmployee)
      }
    }
    return emps.toArray(new WC7FedCoveredEmployee[emps.size()])
  }


  function getWC7MaritimeCoveredEmployees(state : State) : WC7MaritimeCoveredEmployee[] {
    var wcMaritimeCoveredEmployees = this.getWC7MaritimeCoveredEmployees()
    var emps = new ArrayList<WC7MaritimeCoveredEmployee>()
    for (wcMaritimeCoveredEmployee in wcMaritimeCoveredEmployees) {
      if (wcMaritimeCoveredEmployee.getLocation().getState() == state) {
        emps.add(wcMaritimeCoveredEmployee)
      }
    }
    return emps.toArray(new WC7MaritimeCoveredEmployee[emps.size()])
  }
  
  function getJurisdiction(state : Jurisdiction) : WC7Jurisdiction {
    return this.WC7Jurisdictions.firstWhere(\j -> j.Jurisdiction == state)
  }

  property get AircraftSeatsJurisdictions() : Jurisdiction[] {
    return LocationJurisdictions.where(\ j ->
        this.ClauseAvailability.includesClause("WC7AircraftPremiumEndorsementCond", j)).toTypedArray()
  }

  function getClassCodesForWC7CoveredEmployees(state: State): WC7ClassCode[] {
    return this.WC7CoveredEmployees.where(\e -> e.Location.State == state).map(\e -> e.ClassCode).toSet().toTypedArray()
  }

  function createAndAddWC7ManuscriptOption() : WC7ManuscriptOption {
    var option = new WC7ManuscriptOption(this.Branch)
    this.addToWC7ManuscriptOptions(option)
    return option
  }
  
  function setDefaultExcludedStates(cov : WC7OtherStatesInsurance) {
    var excludedStates = cov.WC7ExcludedStatesTerm.Value
    if (cov.WC7OtherStatesOptTerm.Value == "AllExcept" and excludedStates == null) {
      var monopolistic = gw.api.domain.StateSet.get(gw.api.domain.StateSet.WC_MONOPOLISTIC)
      cov.WC7ExcludedStatesTerm.Value = monopolistic.toString()
    }
  }
  
  function validateExcludedStatesContainMonopolisticStates(excludedStates : String) : String {
    if (this.WC7OtherStatesInsurance.WC7OtherStatesOptTerm.Value == "AllExcept") {
      var monopolisticStates = StateSet.get(StateSet.WC_MONOPOLISTIC)
      var exclStates =  StateSet.get(excludedStates)
      var notExclStates = new ArrayList()
      for (state in monopolisticStates.toArray()) {
        if (!exclStates.contains(state)) {
          notExclStates.add(state.DisplayName)
        }
      }
      if (notExclStates.Count > 0) {
        return displaykey.Policy.WC7.InsuredStates.MustExcludeMonopolisticState(notExclStates.join(", "))
      }
    }
    return null
  }

  function validateIncludedStates(includedStates : String): String {
    var coveredStates = LocationJurisdictions*.Code
    var monopolisticStates = StateSet.get(StateSet.WC_MONOPOLISTIC)
    var incStates =  StateSet.get(includedStates)

    if (incStates != null) {
      for (state in incStates.toArray()) {
        if (monopolisticStates.contains(state)) {
          return displaykey.Policy.WC7.InsuredStates.CannotInsureMonopolisticState(state.Description)
        }
        if (coveredStates.contains(state.Code)) {
          return displaykey.Policy.WC7.InsuredStates.CannotInsureCoveredState(state.Description)
        }
      }
    } else {
      return displaykey.Policy.WC7.InsuredStates.ListRequired
    }
    return null
  }

  function validateIncludedMonopolisticStates(includedStates : String): String {
    var nonMonopolisticStates = StateSet.get(StateSet.WC_NOTMONOPOLISTIC)
    var inclStates =  StateSet.get(includedStates)

    if (inclStates != null) {
      for (state in inclStates.toArray()) {
        if (nonMonopolisticStates.contains(state)) {
          return displaykey.Policy.WC7.InsuredStates.CannotIncludeNonMonopolisticState(state.Description)
        }
      }
    }
    return null
  }
  
  function updatePrimaryLocation(policyLocation : PolicyLocation){
    this.Branch.PrimaryLocation = policyLocation
    setBaseState(policyLocation)
  }

  /**
   *  Set base state to the policy location passed in.
   *   In WC7, base state should be set to the state associated with the primary location.
   */
  function setBaseState(policyLocation : PolicyLocation){
    this.Branch.BaseState = gw.api.util.JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(policyLocation)
  }
  
  /**
   * Synch some of the fields (governing law, class code) on a covered employee if the fields are different
   * between the first split and the other splits
   */
  function syncWC7CoveredEmployeeBasesVersions() {
    syncWC7CoveredEmployeeVersions()
    syncWC7FedCoveredEmployeeVersions()
    syncWC7MaritimeCoveredEmployeeVersions()
  }    
  
  /**
   * Synch some of the fields (governing law, class code) on a covered employee if the fields are different
   * between the first split and the other splits
   */
  function syncWC7CoveredEmployeeVersions() {
    var employeeOrig : WC7CoveredEmployee = null
    
    // Only get the covered employee version lists where there is a split
    var coveredEmployeesVL = this.WC7CoveredEmployeeVLs
    for (employeeVL in coveredEmployeesVL) {
      var coveredEmployees = employeeVL.AllVersions.sortBy(\ emp -> emp.EffectiveDate)
      employeeOrig = coveredEmployees.first()
      for (employee in coveredEmployees) {
        // Only update the fields if they are not equal to prevent unnecessary updates in the database
        if (employeeOrig.GoverningLaw != null and !employeeOrig.GoverningLaw.equals(employee.GoverningLaw)) {
          employee.GoverningLaw = employeeOrig.GoverningLaw
        }
        if (employeeOrig.ClassCode != null and !employeeOrig.ClassCode.equals(employee.ClassCode)){
          employee.ClassCode = employeeOrig.ClassCode
        }
        if (!employeeOrig?.SupplementalDiseaseLoaded?.equals(employee.SupplementalDiseaseLoaded)){
          employee.SupplementalDiseaseLoaded = employeeOrig.SupplementalDiseaseLoaded
        }
        if (!employeeOrig?.SpecificDiseaseLoaded?.equals(employee.SpecificDiseaseLoaded)){
          employee.SpecificDiseaseLoaded = employeeOrig.SpecificDiseaseLoaded
        }
        if (employeeOrig?.SupplementalDiseaseLoadingRate != null and 
            !employeeOrig?.SupplementalDiseaseLoaded.equals(employee.SupplementalDiseaseLoadingRate)){
          employee.SupplementalDiseaseLoadingRate = employeeOrig.SupplementalDiseaseLoadingRate
        }
        if (employeeOrig?.Rate != null and !employeeOrig?.Rate.equals(employee.Rate)){
          employee.Rate = employeeOrig.Rate
        }
      }
    }
  }  
  
  /**
   * Synch some of the fields (class code, disease loaded) on a FELA covered employee if the fields are different
   * between the first split and the other splits
   */
  function syncWC7FedCoveredEmployeeVersions() {
    var employeeOrig : WC7FedCoveredEmployee = null
    
    // Only get the covered employee version lists where there is a split
    var fedCoveredEmployeesVL = this.WC7FedCoveredEmployeeVLs      
    for (employeeVL in fedCoveredEmployeesVL) {
      var fedCoveredEmployees = employeeVL.AllVersions.sortBy(\ emp -> emp.EffectiveDate)
      employeeOrig = fedCoveredEmployees.first()
      for (employee in fedCoveredEmployees) {
        // Only update the fields if they are not equal to prevent unnecessary updates in the database
        if (employeeOrig.ClassCode != null and !employeeOrig.ClassCode.equals(employee.ClassCode)){
          employee.ClassCode = employeeOrig.ClassCode
        }
        if (!employeeOrig?.SupplementalDiseaseLoaded?.equals(employee.SupplementalDiseaseLoaded)){
          employee.SupplementalDiseaseLoaded = employeeOrig.SupplementalDiseaseLoaded
        }
        if (employeeOrig?.SupplementalDiseaseLoadingRate != null and 
            !employeeOrig?.SupplementalDiseaseLoaded.equals(employee.SupplementalDiseaseLoadingRate)){
          employee.SupplementalDiseaseLoadingRate = employeeOrig.SupplementalDiseaseLoadingRate
        }
        if (employeeOrig?.Rate != null and !employeeOrig?.Rate.equals(employee.Rate)){
          employee.Rate = employeeOrig.Rate
        }
      }
    }
  }  
  
  /**
   * Synch some of the fields (class code, disease loaded) on a Maritime covered employee if the fields are different
   * between the first split and the other splits
   */
  function syncWC7MaritimeCoveredEmployeeVersions() {
    var employeeOrig : WC7MaritimeCoveredEmployee = null
    
    // Only get the covered employee version lists where there is a split
    var maritimeCoveredEmployeesVL = this.WC7MaritimeCoveredEmployeeVLs     
    for (employeeVL in maritimeCoveredEmployeesVL) {
      var maritimeCoveredEmployees = employeeVL.AllVersions.sortBy(\ emp -> emp.EffectiveDate)
      employeeOrig = maritimeCoveredEmployees.first()
      for (employee in maritimeCoveredEmployees) {
        // Only update the fields if they are not equal to prevent unnecessary updates in the database
        if (employeeOrig.ClassCode != null and !employeeOrig.ClassCode.equals(employee.ClassCode)){
          employee.ClassCode = employeeOrig.ClassCode
        }
        if (!employeeOrig?.SupplementalDiseaseLoaded?.equals(employee.SupplementalDiseaseLoaded)){
          employee.SupplementalDiseaseLoaded = employeeOrig.SupplementalDiseaseLoaded
        }
        if (employeeOrig?.SupplementalDiseaseLoadingRate != null and 
            !employeeOrig?.SupplementalDiseaseLoaded.equals(employee.SupplementalDiseaseLoadingRate)){
          employee.SupplementalDiseaseLoadingRate = employeeOrig.SupplementalDiseaseLoadingRate
        }
        if (employeeOrig?.Rate != null and !employeeOrig?.Rate.equals(employee.Rate)){
          employee.Rate = employeeOrig.Rate
        }
      }
    }
  }
  
  /**
   * Update disease code on supplementary disease exposure if the value is different
   * between the first split and the other splits
   */
  function syncWC7SupplementaryDiseaseExposureVersions() {
    var period1SplitSupplExposure : WC7SupplDiseaseExposure = null
    
    // Only get the supplementary disease exposure version lists where there is a split
    var supplDiseaseExposuresL = this.VersionList.WC7SupplDiseaseExposures.where(\ w -> w.AllVersions.Count > 1)   
    for (supplDiseaseExpVL in supplDiseaseExposuresL) {
      var allVersions = supplDiseaseExpVL.AllVersions 
      for (supplDiseaseExp in allVersions) {
        if (supplDiseaseExp.PeriodNum == "1"){
           // use period 1 to sync to other periods
          period1SplitSupplExposure = supplDiseaseExp
        } else {
          // Only update disease code if they are not equal to prevent unnecessary updates in the database
          if (period1SplitSupplExposure.DiseaseCode != null and not period1SplitSupplExposure.DiseaseCode.equals(supplDiseaseExp.DiseaseCode)){
            supplDiseaseExp.DiseaseCode = period1SplitSupplExposure.DiseaseCode
          }
        }
      }
    }
  } 
  
   /**
   * Update disease code on atomic energy exposure if the value is different
   * between the first split and the other splits
   */
  function syncWC7AtomicEnergyExposureVersions() {
    var origAtomicEnergy : WC7AtomicEnergyExposure = null
    
    // Only get the atomic energy exposure version lists where there is a split
    var atomicEnergyExposuresVL = this.VersionList.WC7AtomicEnergyExposures.where(\ w -> w.AllVersions.Count > 1)   
    for (atomicEnergyVL in atomicEnergyExposuresVL) {
      var atomicEnergyExposures = atomicEnergyVL.AllVersions 
      for (atomicEnergyExposure in atomicEnergyExposures) {
        if (atomicEnergyExposure.PeriodNum == "1"){
           // use period 1 to sync to other periods
          origAtomicEnergy = atomicEnergyExposure
        } else {
          // Only update disease code if they are not equal to prevent unnecessary updates in the database
          if (origAtomicEnergy.ClassCode != null and not origAtomicEnergy.ClassCode.equals(atomicEnergyExposure.ClassCode)){
            atomicEnergyExposure.ClassCode = origAtomicEnergy.ClassCode
          }
        }
      }
    }
  } 
  
  /**
   * Update disease code on Specific {@link WC7WaiverOfSubro Waivers of Subrogation} if the value is different
   * between the first split and the other splits
   */
  function syncSpecificWaiversOfSubroVersions() {
    // Only get the specific waivers version lists where there is a split
    var specificWaiverL = this.WC7SpecificWaiverOfSubroVLs.where(\ w -> w.AllVersions.Count > 1)
    for (specificWaiverVL in specificWaiverL) {
      var allVersions = specificWaiverVL.AllVersions 
      var firstWaiver = allVersions.first()
      var remaindingWaivers = allVersions.subList(1, allVersions.Count)
      var classCode = firstWaiver.ClassCode
      var desc = firstWaiver.Description
      var jobID = firstWaiver.JobID
      var govLaw = firstWaiver.GoverningLaw
      var specificDiseaseLoaded = firstWaiver.SpecificDiseaseLoaded
      for (waiver in remaindingWaivers) {
        // Only update disease code if they are not equal to prevent unnecessary updates in the database
        if (waiver.ClassCode != classCode){
          waiver.ClassCode = classCode
        }
        if (waiver.Description != desc){
          waiver.Description = desc
        }
        if (waiver.JobID != jobID){
          waiver.JobID = jobID
        }
        if (waiver.GoverningLaw != govLaw){
          waiver.GoverningLaw = govLaw
        }
        if (!specificDiseaseLoaded?.equals(waiver.SpecificDiseaseLoaded)){
          waiver.SpecificDiseaseLoaded = specificDiseaseLoaded
        }
      }
    }
  } 
  
  function recalculateGoverningClasscode() {
    var classCodes = new HashMap<WC7ClassCode, Integer>()
    var employees = this.VersionList.WC7CoveredEmployees
    for (employee in employees) {
      for (version in employee.AllVersions) {
        var oldBasis = classCodes[version.ClassCode]
        classCodes[version.ClassCode] = (oldBasis == null ? 0 : oldBasis) + (version.BasisAmount == null ? 0 : version.BasisAmount)
      }
    }
    this.WC7GoverningClass = classCodes.Keys.maxBy(\ code -> classCodes[code])
  }
  
  /**
   * Finds matching class codes using a set of criteria
   * @param code - the class code string to search for
   * @param jurisdiction - the {@link Jurisdiction} in which to search for the class code
   * @param previousCode - the previous {@link WC7ClassCode} that was entered
   * @param excludedClassCodeTypes - the list of {@link WC7ClassCodeType} to exclude for the search
   * @return {@link WC7ClassCode[]}
   */
  function findMatchingClassCodes(code : String, 
                                  jurisdiction: Jurisdiction, 
                                  previousCode : WC7ClassCode, 
                                  excludedClassCodeTypes : List<WC7ClassCodeType>) : WC7ClassCode[] {
    
    var criteria = new WC7ClassCodeSearchCriteria()
    criteria.Code = code
    criteria.Jurisdiction = jurisdiction
    criteria.PreviousSelectedClassCode = previousCode
    criteria.EffectiveAsOfDate = this.getReferenceDateForCurrentJob(jurisdiction)
    criteria.ExcludedClassCodeTypes = excludedClassCodeTypes
    var result = criteria.performSearch()

    return result.toList().sortBy(\ w -> w.Classification).toTypedArray()
  }
  
   /**
   * Finds matching atomic energy class codes using a set of criteria
   * @param code - the class code string to search for
   * @param jurisdiction - the {@link Jurisdiction} in which to search for the class code
   * @return {@link WC7ClassCode[]}
   */
  function findMatchingAtomicEnergyClassCodes(code : String, 
                                  jurisdiction: Jurisdiction) : WC7ClassCode[] {
    
  
    var criteria = new WC7ClassCodeSearchCriteria()
    criteria.Code = code
    criteria.Jurisdiction = jurisdiction
    criteria.EffectiveAsOfDate = this.getReferenceDateForCurrentJob(jurisdiction)
    criteria.ClassCodeType = WC7ClassCodeType.TC_ATOMICENERGY
    var result = criteria.performSearch()

    return result.toList().sortBy(\ w -> w.Classification).toTypedArray()
  }

  /**
   * Finds matching class codes using a set of criteria
   * @param code - the class code string to search for
   * @param jurisdiction - the {@link Jurisdiction} in which to search for the class code
   * @param classCodeType - the {@link WC7ClassCodeType} to search for
   * @param programType - the {@link WC7ClassCodeProgramType} to search for
   * @param previousCode - the previous {@link WC7ClassCode} that was entered
   * @return {@link WC7ClassCode[]}
   */
  function findMatchingClassCodes(code : String, 
                                  jurisdiction: Jurisdiction, 
                                  classCodeType : WC7ClassCodeType, 
                                  programType : WC7ClassCodeProgramType,
                                  previousCode : WC7ClassCode) : WC7ClassCode[] {
    
    var criteria = new WC7ClassCodeSearchCriteria()
    criteria.Code = code
    criteria.Jurisdiction = jurisdiction
    criteria.ClassCodeType = classCodeType
    criteria.PreviousSelectedClassCode = previousCode
    criteria.EffectiveAsOfDate = this.getReferenceDateForCurrentJob(jurisdiction)
    criteria.ProgramType = programType
    var result = criteria.performSearch()
    return result.toList().sortBy(\ w -> w.Classification).toTypedArray()
  }

  function doesClassCodeExist(code : String, 
                              refDateState: Jurisdiction, 
                              classCodeType : WC7ClassCodeType, 
                              previousCode : WC7ClassCode, 
                              excludedClassCodeTypes : List<WC7ClassCodeType>) : boolean {
    if (code == null) {
      return null
    }
    var criteria = new WC7ClassCodeSearchCriteria()
    criteria.Code = code
    criteria.ClassCodeType = classCodeType
    criteria.PreviousSelectedClassCode = previousCode
    criteria.EffectiveAsOfDate = this.getReferenceDateForCurrentJob(refDateState)
    criteria.ExcludedClassCodeTypes = excludedClassCodeTypes
    var query = criteria.performExactSearch()
    return query.HasElements
  }

  property get WC7Options() : List<WC7Option> {
    return WC7Option.createOptionList(this.Branch)
  }

  property get WC7Transactions() : WC7Transaction[] {
   var branch = this.Branch
    return branch.getSlice(branch.PeriodStart).WC7Transactions

  }

  function addRPSD(splitDate : Date, splitType : RPSDType, jurisdictions : WC7Jurisdiction[]){
    for(j in jurisdictions){
        j.addWC7RatingPeriodStartDate(splitDate, splitType)
    }
    updateWCExposuresAndModifiers()
  }
  
  /**
   * Creates and adds a {@link WC7RetrospectiveRatingPlan} in window mode
   * The computation interval should default to 12
   * @returns {@link WC7RetrospectiveRatingPlan} - a retrospective rating plan in window mode
   */
  function createAndAddWC7RetrospectiveRatingPlanWM() : WC7RetrospectiveRatingPlan {
    var plan = this.RetrospectiveRatingPlan
    if (plan == null and not this.Bundle.ReadOnly) {
      plan = new WC7RetrospectiveRatingPlan(this.Branch).Unsliced
      plan.FirstComputationDate = ValidDefaultFirstComputationDate
      plan.ComputationInterval = 12
      plan.WC7WorkersCompLine = this.Unsliced
      plan.setEffectiveWindow(this.Branch.PeriodStart, this.Branch.PeriodEnd)
    }
    return plan
  }  

  /**
   * Removes the {@link WC7RetrospectiveRatingPlan} in window mode. Removes all of the
   * letters of credits and state multipliers attached to the retrospective rating plan
   */
  function removeWC7RetrospectiveRatingPlanWM() {
    var oldPlan = this.RetrospectiveRatingPlan
    if (oldPlan != null) {
      oldPlan.LettersOfCredit.each(\loc -> loc.removeWM())
      oldPlan.JurisdictionMultipliers.each(\mult -> mult.removeWM())
      oldPlan.removeWM()
    } 
  }  

  /**
   * Returns a set of the first version of any WC7Jurisdiction that ever existed on this
   * line, in window mode.
   */
  property get RepresentativeJurisdictions() : WC7Jurisdiction[] {
    return this.VersionList.WC7Jurisdictions*.AllVersions.map(\ l -> l.first())
  }
  
  // ------------------------------- Supplementary Disease Exposure
 
  /**
   * @return an array of window mode {@link WC7SupplDiseaseExposure supplementary disease exposure} 
   * for each disease exposure on the line. Note, only the first slice is returned in 
   * window mode for each unique disease exposure.
   */
  property get WC7SupplDiseaseExposuresWM() : WC7SupplDiseaseExposure[]{
    return this.VersionList.WC7SupplDiseaseExposures*.AllVersions*.first()
  }  
   
  function createAndAddSupplementaryDiseaseExposure() : WC7SupplDiseaseExposure {
    var exposure = new WC7SupplDiseaseExposure(this.Branch)
    this.addToWC7SupplDiseaseExposures(exposure)
    return exposure
  }

  function addSupplementaryDiseaseExposureWM() : WC7SupplDiseaseExposure{
    var exposure = new WC7SupplDiseaseExposure(this.Branch)
    this.addToWC7SupplDiseaseExposures(exposure)

    return exposure.VersionList.AllVersions.single()
  }
  
  function getWC7SupplementaryDiseaseExposuresWM(jurisdiction : Jurisdiction) : WC7SupplDiseaseExposure[]{
    var versionLists = this.VersionList.WC7SupplDiseaseExposures
    var exposures = new ArrayList<WC7SupplDiseaseExposure>()
    for(v in versionLists){
      var first = v.AllVersions.first()
      if(first.Location.State == StateJurisdictionMappingUtil.getStateMappingForJurisdiction(jurisdiction)){
        exposures.add(first)
      }
    }
    return exposures.toTypedArray()
  }
  
  function getWC7SupplementaryDiseaseExposures(jurisdiction : Jurisdiction) : WC7SupplDiseaseExposure[]{
    var versionLists = this.VersionList.WC7SupplDiseaseExposures
    var exposures = new ArrayList<WC7SupplDiseaseExposure>()
    for(v in versionLists){
      for (a in v.AllVersions) {
        if(a.Location.State.equals(StateJurisdictionMappingUtil.getStateMappingForJurisdiction(jurisdiction))) {
          exposures.add(a)
        }
      }
    }
    return exposures.toTypedArray()
  }

    
  
 
 
  
  // ------------------------------- Atomic Energy Exposure
 
  /**
   * @return an array of window mode {@link WC7AtomicEnergyExposure supplementary disease exposure} 
   * for each disease exposure on the line. Note, only the first slice is returned in 
   * window mode for each unique disease exposure.
   */
   
   property get WC7AtomicEnergyExposuresWM() : WC7AtomicEnergyExposure[]{
    return this.VersionList.WC7AtomicEnergyExposures*.AllVersions*.first()
  }  
   
  function createAndAddAtomicEnergyExposure() : WC7AtomicEnergyExposure {
    var exposure = new WC7AtomicEnergyExposure(this.Branch)
    this.addToWC7AtomicEnergyExposures(exposure)
    return exposure
  }

  function addAtomicEnergyExposureWM() : WC7AtomicEnergyExposure{
    var exposure = new WC7AtomicEnergyExposure(this.Branch)
    this.addToWC7AtomicEnergyExposures(exposure)

    return exposure.VersionList.AllVersions.single()
  }
  
  function getWC7AtomicEnergyExposuresWM(jurisdiction : Jurisdiction) : WC7AtomicEnergyExposure[]{
    var versionLists = this.VersionList.WC7AtomicEnergyExposures
    var exposures = new ArrayList<WC7AtomicEnergyExposure>()
    for(v in versionLists){
      var first = v.AllVersions.first()
      if(first.Location.State == StateJurisdictionMappingUtil.getStateMappingForJurisdiction(jurisdiction)){
        exposures.add(first)
      }
    }
    return exposures.toTypedArray()
  }
  
  function getWC7AtomicEnergyExposures(jurisdiction : Jurisdiction) : WC7AtomicEnergyExposure[]{
    var versionLists = this.VersionList.WC7AtomicEnergyExposures
    var exposures = new ArrayList<WC7AtomicEnergyExposure>()
    for(v in versionLists){
      for (a in v.AllVersions) {
        if(a.Location.State.equals(StateJurisdictionMappingUtil.getStateMappingForJurisdiction(jurisdiction))) {
          exposures.add(a)
        }
      }
    }
    return exposures.toTypedArray()
  }
 
  
  function getDiseaseCodesForJurisdiction(jurisdiction : Jurisdiction, asOfDate : Date): List <WC7DiseaseCode> {
    var aQuery = Query.make(WC7DiseaseCode)
    aQuery.compare("Jurisdiction",Relop.Equals, jurisdiction)
    aQuery.compare("EffectiveDate", Relop.LessThanOrEquals, asOfDate)
    aQuery.or(\ cond -> {
      cond.compare("ExpirationDate", Relop.GreaterThan, asOfDate)
      cond.compare("ExpirationDate", Relop.Equals, null)
    })
    
    var allDiseaseCodes = new ArrayList<WC7DiseaseCode>()
    var queryResults = aQuery.select()
    queryResults.each(\ w -> allDiseaseCodes.add(w))
    return allDiseaseCodes
  }
 

  /**
   * An array of legal jurisdictions sorted by code.
   * @return a list of {@link typekey.Jurisdiction} that coorespond to the {@link WC7Jurisdiction}s of this line.
   */
  function getCurrentJurisdictions() : typekey.Jurisdiction[] {
    return LocationJurisdictions.toTypedArray().sortBy(\ j -> j.Code)
  }
  
  /**
   * Return an array of available labor contractors associated with {@link WC7PolicyLaborContractor} on the line.
   */  
  function getAvailableLaborContractors() : LaborContractor[] {
    var results : LaborContractor[] = {}
    results = this.WC7PolicyLaborContractors.map(\ pl -> pl.AccountContactRole as LaborContractor)
    return results
  }

  /**
   * @return a list of {@link entity.WC7PolicyLaborContractor} that filters on the condition type and pattern
   */
  property get WC7PolicyLaborContractorsCondition() : WC7PolicyLaborContractor[]{
    var includedLaborContactDetails = this.WC7PolicyLaborContractors*.WC7Details.whereTypeIs(WC7IncludedLaborContactDetail)
    var wc7LaborContractorEndorsementACondDetails = includedLaborContactDetails.where(\ w -> w.LaborContactCondition.Pattern == "WC7LaborContractorEndorsementACond")
    var policyLaborContractors = this.WC7PolicyLaborContractors.where(\ w -> w.WC7Details == wc7LaborContractorEndorsementACondDetails)
    return policyLaborContractors
  }

  function isLineCoverageTermEditable(covTerm : CovTerm) : boolean {
    return covTerm.Clause.New or this.Branch.EditEffectiveDate.equals(this.Branch.PeriodStart)
  }
  
  /**
   * Removes the WC7Jurisdiction for the given state if there are no PolicyLocations in that state and {@link #CanRemove} is true, 
   * otherwise has no side effects.
   * 
   * Note, you may have no locations referencing the WC7Jurisdiction in the current slice, 
   * but you may have other references from schedules or covered employees.
   * @see #CanRemove
   */
  function safelyRemoveJurisdiction(state : State) {
    if (this.Branch.PolicyLocations.where(\ p -> p.State == state).IsEmpty) {
      var jurisdiction = this.WC7Jurisdictions.firstWhere(\ w -> w.Jurisdiction == gw.api.util.StateJurisdictionMappingUtil.getJurisdictionMappingForState(state))
      if (jurisdiction != null) {
        if (jurisdiction.CanRemove) {
          jurisdiction.getSlice(jurisdiction.EffectiveDate).remove()
        }
      }
    }
  }


  //----------------------------------- FELA / Maritime Coverages
  
  /**
   * Either add or remove the {@link productmodel.WC7MaritimeCov} for the whole term of the policy.
   * If the parameter is true, ensure the coverage exists as of the period start date.
   * If the parameter is false, remove the coverage and all associated {@link WC7FedCoverdEmployees} 
   * as of the period start date.
   * @param exist - true if the coverage should be added, false if it should be removed.
   */
  function setMaritimeCovExists(exist : boolean) {
    var maritimeCov : CoveragePattern = "WC7MaritimeACov"
    LineAsOfPeriodStart.setCoverageConditionOrExclusionExists(maritimeCov, exist)
    if (not exist){
      LineAsOfPeriodStart.WC7MaritimeCoveredEmployeesWM.each(\ felaCovEmp -> felaCovEmp.removeWM())
    }
  }
  
  /**
   * Either add or remove the {@link productmodel.WC7FederalEmployersLiabilityActACov} for the whole 
   * term of the policy.
   * If the parameter is true, ensure the coverage exists as of the period start date.
   * If the parameter is false, remove the coverage and all associated {@link WC7FedCoverdEmployees} 
   * as of the period start date.
   * @param exist - true if the coverage should be added, false if it should be removed.
   */
  function setFELACovExists(exist : boolean) {
    var felaCov : CoveragePattern = "WC7FederalEmployersLiabilityActACov"
    LineAsOfPeriodStart.setCoverageConditionOrExclusionExists(felaCov, exist)
    if (not exist){
      LineAsOfPeriodStart.WC7FedCoveredEmployeesWM.each(\ felaCovEmp -> felaCovEmp.removeWM())
    }
  }
  
  /**
   * Either add or remove the {@link productmodel.WC7WaiverOfOurRightToRecoverFromOthersEndorsemCond} 
   * for the whole term of the policy.
   * If the parameter is true, ensure the coverage exists as of the period start date.
   * If the parameter is false, remove the coverage as of the period start date and
   * remove all associated {@link WC7WaiverOfSubro} for the full term.
   * @param exist - true if the coverage should be added, false if it should be removed.
   */
  function setWaiverCondExists(exist : boolean) {
    var waiverCon : ConditionPattern = "WC7WaiverOfOurRightToRecoverFromOthersEndorsemCond"
    LineAsOfPeriodStart.setCoverageConditionOrExclusionExists(waiverCon, exist)
    if (not exist){
      LineAsOfPeriodStart.WC7WaiversOfSubroWM.each(\ waiver -> waiver.removeAllSlicesWM())
    }
  }  
  
  private property get LineAsOfPeriodStart() : WC7WorkersCompLine {
    var periodStartDate = this.Branch.PeriodStart
    return this.VersionList.getVersionAsOf(periodStartDate).getSliceUntyped(periodStartDate) as WC7WorkersCompLine
  }

  /**
   * If Other States' Covered States is something other than "All States Except", excluded states should be cleared.
   * If Other States' Covered States is something other than "Listed States Only", included states should be cleared.
   */
  function clearIncludedStatesOrExcludedStatesForOtherStates() {
    if (this.WC7OtherStatesInsurance.WC7IncludedStatesTerm <> null and this.WC7OtherStatesInsurance.WC7OtherStatesOptTerm.Value <> OtherStates.TC_LISTEDONLY) {
      this.WC7OtherStatesInsurance.WC7IncludedStatesTerm.Value = ""
    }
    if (this.WC7OtherStatesInsurance.WC7ExcludedStatesTerm <> null and this.WC7OtherStatesInsurance.WC7OtherStatesOptTerm.Value <> OtherStates.TC_ALLEXCEPT) {
      this.WC7OtherStatesInsurance.WC7ExcludedStatesTerm.Value = ""
    }
  }
  
  property get LocationJurisdictions() : Set<Jurisdiction> {
    return this.WC7Jurisdictions*.Jurisdiction.toSet()
  }

  function hasLocationInAnyOfJurisdictions(jurisdictions : List<Jurisdiction>) : boolean {
    return jurisdictions.hasMatch(\ jurisdiction -> LocationJurisdictions.contains(jurisdiction))
  }

  function hasLocationsOnlyInJurisdictions(jurisdictions : List<Jurisdiction>) : boolean {
    return jurisdictions.containsAll(LocationJurisdictions)
  }
  
  function includedLaborContactDetailsFor(condition : PolicyCondition) : List<WC7IncludedLaborContactDetail> {
    return includedLaborContactDetails(this.WC7PolicyLaborContractors, condition)
  }

  function includedLaborClientDetailsFor(condition : PolicyCondition) : List<WC7IncludedLaborContactDetail> {
    return includedLaborContactDetails(this.WC7PolicyLaborClients, condition)    
  }
  
  private function includedLaborContactDetails(laborContacts : WC7LaborContact[], condition : PolicyCondition)
      : List<WC7IncludedLaborContactDetail> {
    var allIncludedDetails = laborContacts*.WC7Details.where(\ d -> d.Inclusion == TC_INCL)
      .toList().cast(WC7IncludedLaborContactDetail)
    return allIncludedDetails.where(\ d -> d.LaborContactCondition == condition)
  }

  function excludedLaborContactDetailsFor(exclusion : Exclusion) : List<WC7ExcludedLaborContactDetail> {
    var allExcludedDetails = this.WC7PolicyLaborContractors*.WC7Details.where(\ d -> d.Inclusion == TC_EXCL)
        .toList().cast(WC7ExcludedLaborContactDetail)
    return allExcludedDetails.where(\ d -> d.LaborContactExclusion == exclusion)
  }
  
  function excludedLaborContactClientDetailsFor(exclusion : Exclusion) : List<WC7ExcludedLaborContactDetail> {
    var allExcludedDetails = this.WC7PolicyLaborClients*.WC7Details.where(\ d -> d.Inclusion == TC_EXCL)
        .toList().cast(WC7ExcludedLaborContactDetail)
    return allExcludedDetails.where(\ d -> d.LaborContactExclusion == exclusion)
  }  
  
  function inclusionTypeForClause(pattern : ClausePattern) : Inclusion {
    if (pattern typeis ConditionPattern)
      return TC_INCL
    else if (pattern typeis ExclusionPattern)
      return TC_EXCL
    else
      throw new IllegalArgumentException("Unhandled clause type: " + typeof pattern)
  }

  function isAvailable(clausePattern : ClausePattern) : boolean {
    return this.LocationJurisdictions.hasMatch(\ state -> this.ClauseAvailability.includesClause(clausePattern, state))
  }

  function stateFilterFor(clausePattern : ClausePattern) : ITypeFilter<Jurisdiction> {
    var stateFilterFactory = new WC7StateFilterFactory(this.ClauseAvailability, this.LocationJurisdictions)
    return stateFilterFactory.createFilterForClause(clausePattern)
  }
  
  protected property get ClauseAvailability() : WC7ClauseAvailability {
    return WC7ClauseAvailability.Instance
  }  
}
