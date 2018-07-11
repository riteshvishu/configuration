package gw.lob.wc7

uses gw.policy.PolicyLineValidation
uses gw.validation.PCValidationContext
uses java.util.HashMap
uses gw.api.domain.StateSet
uses gw.lob.common.AnswerValidation
uses java.lang.Integer
uses gw.api.util.StateJurisdictionMappingUtil
uses gw.api.productmodel.ConditionPattern
uses gw.api.productmodel.ExclusionPattern
uses gw.api.productmodel.Schedule
uses java.util.Date
uses gw.api.domain.Clause
uses gw.api.productmodel.CovTermPattern
uses gw.lob.wc7.schedule.WC7ScheduleJurisdictionPropertyInfo
uses gw.util.Pair

/**
 * Line specific validaiton for the WC7Line line of business
 */
@Export
class WC7LineValidation extends PolicyLineValidation<entity.WC7WorkersCompLine> {
  
  static final var LINE_WIZARD_STEPID : String = "WC7WorkersCompLineCoverages"
  static final var STATE_WIZARD_STEPID : String = "WC7WorkersCompStateCoverages"
  
  property get wcLine() : WC7WorkersCompLine { return Line as WC7WorkersCompLine }

  construct(valContext : PCValidationContext, polLine : WC7WorkersCompLine) {
    super(valContext, polLine)
  }
  
  /**
   * Derives clas code program type value using program type and governing law values on the coverage
   * @param covProgramType - program type on the coverage
   * @param governingLaw - applicable law on the coverage
   * @return WC7ClassCodeProgramType
   */
  static function deriveClassCodeProgramType(covProgramType : WC7CovProgramType, governingLaw : WC7GoverningLaw) : WC7ClassCodeProgramType {
    var programType : WC7ClassCodeProgramType
    if (covProgramType != null) {
      if (WC7CovProgramType.TC_PROGRAMI.equals(covProgramType)) {
        programType = WC7ClassCodeProgramType.TC_PROGRAMI
      } else if (WC7GoverningLaw.TC_STATE.equals(governingLaw)) {
        programType = WC7ClassCodeProgramType.TC_PROGRAMIISTATEACT
      } else if (WC7GoverningLaw.TC_LONGSHOREANDHARBOR.equals(governingLaw)) {
        programType = WC7ClassCodeProgramType.TC_PROGRAMIIUSLH
      }
    }
    return programType
  }

  override function doValidate() {
    // Coverages Tab
    atLeastOneJurisdiction()
    atLeastOneFederalEmployersLiabilityCoverageExposure()
    checkClassCodeProgramForFedEmpLiabCoverage()
    atLeastOneMaritimeCoverageExposure()
    checkClassCodeProgramForMaritimeCoverage()
    exposureInMonopolisticStates()
    noSplitsInLineCovTerms()
    lineExposureCoveragesExistFullTerm()

    // Conditions Tab
    atLeastOneAircraftPremiumEndorsementCondition()
    atLeastOneIncludedPolicyLaborClient()
    atLeastOneIncludedPolicyLaborContractor()
    atLeastOneVoluntaryCompensationGoverningLawIsUsed()
    checkIncludedOwnerOfficers()
    atLeastOneWaiverOfSubrogation()
    waiverOfSubrogationBasisAmount()
    checkEmployeeLeasingClientEndorsementCondDates()
    checkEmployeeLeasingClientEndorsementExclDates()
    specificWaiversOnlySplitOnARDsAndBlanketsAreUnsplit()
    checkMultipleCoordinatedPoliciesOnlyReferenceExistingLaborContractor()
    atLeastOneMultipleCoordinatedPolicyWhenMultipleCoordinatedPolicyIsSelected()
    checkNumberOfAircraftSeatsAreSame()
    
    // Exclusions Tab
    atLeastOneExcludedWorkplace()
    atLeastOneEmployeeLeasingPolicyLaborClientExclusion()
    atLeastOneExcludedPolicyLaborContractor()
    checkExcludedPartnersOfficers()

    // Other Checks
    validateSchedulesAreNotEmpty()
    validateGenericSchedulesReferenceLegalJurisdictions()
    retrospectiveRating()
    anniversaryAndModifiersForInterstateOfficialIDs()
    noSplitJurisdictions() 
    checkAnswers()
    industryCodeHasValue()
    specificWaiverEffectiveDatesForSameJobMatch()
    wcLine.WC7Jurisdictions.each( \ jurisdiction -> new WC7JurisdictionValidation(Context, jurisdiction).validate())
    wcLine.WC7WaiversOfSubroWM.each(\ waiver -> new WC7WaiverOfSubroValidation(Context, waiver).validate())
    payrollForAllPolicyLocations()
  }
  
  function payrollForAllPolicyLocations() {
    Context.addToVisited( this, "payrollForAllPolicyLocations" )    
    for (location in allPolicyLocationVersions(wcLine.Branch)) {
      var coveredEmployees = wcLine.getAllExistingOrFutureCoveredEmployeesRelatedToLocation(location)
      if (coveredEmployees.Empty) {
        if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE)){
          if(location.EffectiveDate == location.Branch.EditEffectiveDate) {
            Result.addError(location.getSlice(location.Branch.EditEffectiveDate)
              , ValidationLevel.TC_QUOTABLE
              , displaykey.Web.Policy.WC7.Validation.LocationWithoutPayrollError(location, location.State.DisplayName))
          } else {
            Result.addError(location.Unsliced
              , ValidationLevel.TC_QUOTABLE
              , displaykey.Web.Policy.WC7.Validation.LocationWithoutPayrollInOtherSliceError(location, location.State.DisplayName, location.EffectiveDate.ShortFormat))
          }
        } else {
          if(location.EffectiveDate == location.Branch.EditEffectiveDate) {
            Result.addWarning(location.getSlice(location.Branch.EditEffectiveDate)
              , ValidationLevel.TC_DEFAULT
              , displaykey.Web.Policy.WC7.Validation.LocationWithoutPayrollWarning(location, location.State.DisplayName))
          } else {
            Result.addWarning(location.Unsliced
              , ValidationLevel.TC_DEFAULT
              , displaykey.Web.Policy.WC7.Validation.LocationWithoutPayrollInOtherSliceError(location, location.State.DisplayName, location.EffectiveDate.ShortFormat))
          }
        }
      }
    }  
  }
  
  private function allPolicyLocationVersions(period : PolicyPeriod) : List<PolicyLocation> {
    var polLocs : List<PolicyLocation> = {}
    for(sliceDate in period.AllEffectiveDates) {
      polLocs.addAll(period.getSlice(sliceDate).PolicyLocations.toList())
    }
    return polLocs
  }

  override function validateLineForAudit() {
    allAuditAmountsShouldBeFilledIn()
    receivedDateFilledInPriorToSubmit()
  }
  
  /**
   * the primary named insureds has an industry code.
   */
  function industryCodeHasValue() {
    Context.addToVisited( this, "industryCodeHasValue" )    
    if (Context.isAtLeast("quotable") and wcLine.Branch.PrimaryNamedInsured.IndustryCode == null) {
      Result.addError( wcLine, "default", displaykey.Web.Policy.WC.Validation.IndustryCode, "PolicyInfo")
    }
  }
  
  /**
   * there is at least one jurisdiction on the policy
   */
  function atLeastOneJurisdiction() {
    Context.addToVisited(this, "atLeastOneJurisdiction")
    if (wcLine.WC7Jurisdictions.IsEmpty and Context.isAtLeast("default")) {
      var msg = displaykey.Web.Policy.WC.Validation.AtLeastOneJurisdiction
      if (Context.isAtLeast("quotable")) {
        Result.addError(wcLine, "quotable", msg, STATE_WIZARD_STEPID)
      } else {
        Result.addWarning(wcLine, "default", msg, STATE_WIZARD_STEPID)
      }
    }
  }
  
  /**
   * Verify that all AuditedAmounts are filled in
   */
  function allAuditAmountsShouldBeFilledIn() {
    if (wcLine.Branch.Job typeis Audit) {
      // Verify that all WCCoveredEmployess Have An Audited Amount
      wcLine.WC7CoveredEmployeeBases.each(\ wcEmp -> {
          if (wcEmp.AuditedAmount == null) {
            Result.addError(wcLine,
                            "quotable",
                            displaykey.Web.AuditWizard.Details.NullAmountsError,
                            displaykey.Web.AuditWizardMenu.Details)
          }}
      )
      
      /*
       * We ignore non Covered-Employees exposures for Premium Reports
       * These are not rated, nor do we have data-capture for the UI.
       */
      var auditType = wcLine.Branch.Audit.AuditInformation.AuditScheduleType
      if (auditType != AuditScheduleType.TC_PREMIUMREPORT){
     
        // Verify that all Specific typed WC7WaiverOfSubros Have An Audited Amount
        wcLine.WC7WaiverOfSubros.each(\ wcWSubo -> {
            if (wcWSubo.Type ==  WC7WaiverOfSubrogation.TC_SPECIFIC && wcWSubo.AuditedAmount == null) {
              Result.addError(wcLine,
                              "quotable",
                              displaykey.Web.AuditWizard.Details.NullAmountsError,
                              displaykey.Web.AuditWizardMenu.Details)
            }}
        )     
      
        // Verify that all WC7SupplDiseaseExposures Have An Audited Amount
        wcLine.WC7SupplDiseaseExposures.each(\ wcSuppl -> {
            if (wcSuppl.AuditedAmount == null) {
              Result.addError(wcLine,
                              "quotable",
                              displaykey.Web.AuditWizard.Details.NullAmountsError,
                              displaykey.Web.AuditWizardMenu.Details)
            }}
        )

        // Verify that all WC7AtomicEnergyExposures Have An Audited Amount
        wcLine.WC7AtomicEnergyExposures.each(\ wcAtomicEnergy -> {
            if (wcAtomicEnergy.AuditedAmount == null) {
              Result.addError(wcLine,
                              "quotable",
                              displaykey.Web.AuditWizard.Details.NullAmountsError,
                              displaykey.Web.AuditWizardMenu.Details)
            }}
        )
      }
    }
  }  
  
  /**
   * Verify that audit Received Date is filled in prior to submit
   */
  function receivedDateFilledInPriorToSubmit() {
    if (wcLine.Branch.Job typeis Audit) {
      if (wcLine.Branch.Audit.AuditInformation.ReceivedDate == null) {
        Result.addError(wcLine,
                            "quotable",
                            displaykey.Web.AuditWizard.Summary.NullReceivedDate,
                            displaykey.Web.AuditWizardMenu.Summary)
      }
    }
  }
  
  /**
   * Validate that at least Labor Contractor has been added if the Policy Labor Contractor Conditionis selected 
   * condition is selected
   */
  function atLeastOneIncludedPolicyLaborContractor() {
    Context.addToVisited(this, "atLeastOneIncludedPolicyLaborContractor")
    conditionsWithLaborContractorSchedules().each(\ pattern -> {
      atLeastOneIncludedPolicyLaborContractorFor(pattern)
    })    
  }

  protected function conditionsWithLaborContractorSchedules() : List<ConditionPattern> {
    return { "WC7LaborContractorEndorsementACond" }
  }
  
  private function atLeastOneIncludedPolicyLaborContractorFor(conditionPattern : ConditionPattern) {
    validateCustomLineScheduleCondition(conditionPattern,
      \ clause -> wcLine.includedLaborContactDetailsFor(clause),
      \ clauseName -> displaykey.Web.Policy.WC7.Validation.RequireIncludedPolicyLaborContractor(clauseName))
  }

  /**
   * Validate that at least one Voluntary Compensation governing law is used for those states which voluntary Compensation and Employers' Liability Coverage Endorsement are selected
   * The voluntary Compensation and Employers' Liability Coverage Endorsement should only be used in a particular state if the Voluntary Compensation governing law is used in that state
   * The voluntary comp governing law can in use in a particular state in 3 ways:
   * It is used as a governing law on a covered employee row in that state
   * Program II is used for Maritime coverage and there is at least one Maritime row in that state
   * Program II is used for FELA coverage and there is at least one FELA row in that state
   * This should be a quote time error, and probably a warning when moving off the Line Coverages page 
   */
  function atLeastOneVoluntaryCompensationGoverningLawIsUsed () {
    Context.addToVisited(this, "atLeastOneIVoluntaryCompensationGoverningLawIsUsed")
    
    var isVoluntaryCompensationCondEligible : boolean = false
    if (wcLine.WC7VoluntaryCompensationAndEmployersLiabilityCovCondExists) {
      var voluntarySchedule = wcLine.WC7VoluntaryCompensationAndEmployersLiabilityCovCond as Schedule
      var jurisProp = voluntarySchedule.PropertyInfos.whereTypeIs(WC7ScheduleJurisdictionPropertyInfo).single()
      var jurisArray = voluntarySchedule.ScheduledItems.map(\s -> jurisProp.getJursidictionFromItem(s)).sort()
      for (jur in jurisArray) {
        var theState = StateJurisdictionMappingUtil.getStateMappingForJurisdiction(jur)
        isVoluntaryCompensationCondEligible  = false
        if (wcLine.getWC7CoveredEmployeeBases(jur).hasMatch(\r->r.isVoluntaryCompensationGoverningLawUsed())) {
          isVoluntaryCompensationCondEligible = true
        } 
        
        if (!isVoluntaryCompensationCondEligible && wcLine.WC7MaritimeACovExists) {
           var maritimeProgramType = wcLine.WC7MaritimeACov.WC7MaritimeProgramTerm.Value
           if (maritimeProgramType == WC7CovProgramType.TC_PROGRAMII and 
             wcLine.getWC7MaritimeCoveredEmployees(theState).Count > 0) {
               isVoluntaryCompensationCondEligible = true
           }
        }
        
        if (!isVoluntaryCompensationCondEligible && wcLine.WC7FederalEmployersLiabilityActACovExists) {
           var felaProgramType = wcLine.WC7FederalEmployersLiabilityActACov.WC7FedEmpLiabProgramTerm.Value                       
           if (felaProgramType == WC7CovProgramType.TC_PROGRAMII and 
             wcLine.getWC7FedCoveredEmployees(theState).Count > 0) {
               isVoluntaryCompensationCondEligible = true
           } 
        }
        
        if (!isVoluntaryCompensationCondEligible) {
          var clauseDisplay = wcLine.WC7VoluntaryCompensationAndEmployersLiabilityCovCond.DisplayName          
          var msg = displaykey.Web.Policy.WC7.Validation.AtLeastOneVoluntaryLawUsed(jur, clauseDisplay)
          if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE)) {
            Result.addError(wcLine, ValidationLevel.TC_QUOTABLE, msg, "WC7WorkersCompCoverageConfig")
          } else {
            Result.addWarning(wcLine, ValidationLevel.TC_DEFAULT, msg, "WC7WorkersCompCoverageConfig")
          }
        }      
      }  
    }
 }
  
  /**
   * Validate that at least one waiver has been added if the Policy Labor Contractor is selected 
   * condition is selected
   */
  function atLeastOneExcludedPolicyLaborContractor() {
    Context.addToVisited(this, "atLeastOneExcludedPolicyLaborContractor")
    exclusionsWithLaborContractorSchedules().each(\ pattern -> {
      atLeastOneExcludedPolicyLaborContractorFor(pattern)
    })    
  }

  protected function exclusionsWithLaborContractorSchedules() : List<ExclusionPattern> {
    return { "WC7LaborContractorExclEndorsementExcl" }
  }
  
  private function atLeastOneExcludedPolicyLaborContractorFor(exclusionPattern : ExclusionPattern) {
    var clause = wcLine.getExclusion(exclusionPattern)
    if (clause != null and wcLine.excludedLaborContactDetailsFor(clause).Empty) {
      var msg = displaykey.Web.Policy.WC7.Validation.RequireExcludedPolicyLaborContractor(clause.DisplayName)
      if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE)) {
        Result.addError(wcLine, ValidationLevel.TC_QUOTABLE, msg, "WC7WorkersCompCoverageConfig")
      } else {
        Result.addWarning(wcLine, ValidationLevel.TC_DEFAULT, msg, "WC7WorkersCompCoverageConfig")
      }
    }
  }
  
  /**
   * Validate that at least one waiver has been added if the waiver of our right to recover from others 
   * condition is selected
   * 
   * Note: Waivers of Subro are entered in window mode and may have an effective and expiration date that puts the 
   * effective window less than that of the parent condition.  This is legal and we should not throw validaiton
   * 
   * e.g. The following scenario is legal.
   * <pre>
   * 0  1  2  3  4  5  6  7  8  9  10  11  12  
   * |-------------------------------------)  Condition Window
   *       |-----------------------)          Specific Waiver window
   * </pre>
   */
  function atLeastOneWaiverOfSubrogation() {
    Context.addToVisited(this, "atLeastOneWaiverOfSubrogation")
    var condPattern : ConditionPattern = "WC7WaiverOfOurRightToRecoverFromOthersEndorsemCond"
    var hasWaiverSubroCondition = wcLine.WC7WaiverOfOurRightToRecoverFromOthersEndorsemCondExists 
    if (wcLine.VersionList.WC7WaiverOfSubros.Empty and hasWaiverSubroCondition){
      // Condition is selected but no included waiver of subro exist
      var msg = displaykey.Web.Policy.WC7.Validation.AtLeastOneWaiverSubro(condPattern.Name)
      if (Context.isAtLeast("quotable")) {
        Result.addError(wcLine, "quotable", msg, LINE_WIZARD_STEPID)
      } else {
        Result.addWarning(wcLine, "default", msg, LINE_WIZARD_STEPID)
      }
    } else if ((not hasWaiverSubroCondition) and wcLine.WC7WaiverOfSubros.HasElements){//just check waiversubros on this version, don't have to go through version list
      // Waiver of subro exists, but the condition is not selected
      var msg = displaykey.Web.Policy.WC7.Validation.InvalidWaiverSubro(condPattern.Name)
      if (Context.isAtLeast("quotable")) {
        Result.addError(wcLine, "quotable", msg, LINE_WIZARD_STEPID)
      } else {
        Result.addWarning(wcLine, "default", msg, LINE_WIZARD_STEPID)
      }
    }
  } 
  
  /**
   * Validate that at least one excluded workplace has been added if the Designated Workplaces Exclusion 
   * Endorsement is selected
   */
  function atLeastOneExcludedWorkplace() {
    Context.addToVisited(this, "atLeastOneExcludedWorkplace")   
    var exclPattern : ExclusionPattern = "WC7DesignatedWorkplacesExclEndorsementExcl"
    var hasDesignatedWorkplaceExcl = wcLine.WC7DesignatedWorkplacesExclEndorsementExclExists 

    if (hasDesignatedWorkplaceExcl and wcLine.WC7ExcludedWorkplaces.IsEmpty){
      // Condition is selected but no included waiver of subro exist
      var msg = displaykey.Web.Policy.WC7.Validation.AtLeastOneExcludedWorkplace(exclPattern.Name)
      if (Context.isAtLeast("quotable")) {
        Result.addError(wcLine, "quotable", msg, LINE_WIZARD_STEPID)
      } else {
        Result.addWarning(wcLine, "default", msg, LINE_WIZARD_STEPID)
      }
    } else if ((not hasDesignatedWorkplaceExcl) and wcLine.WC7ExcludedWorkplaces.HasElements){
      // Waiver of subro exists, but the condition is not selected
      var msg = displaykey.Web.Policy.WC7.Validation.InvalidExcludedWorkplace(exclPattern.Name)
      if (Context.isAtLeast("quotable")) {
        Result.addError(wcLine, "quotable", msg, LINE_WIZARD_STEPID)
      } else {
        Result.addWarning(wcLine, "default", msg, LINE_WIZARD_STEPID)
      }
    }
  }

  /**
   * Validate that at least one multiple coordinated policy has been added if the 
   * Multiple Coordinated Policy Endorsement is selected 
   */
  function atLeastOneMultipleCoordinatedPolicyWhenMultipleCoordinatedPolicyIsSelected() {
    Context.addToVisited(this, "atLeastOneMultipleCoordinatedPolicy")
    if (wcLine.WC7MultipleCoordinatedPolicyEndorsementCondExists and 
        wcLine.MultipleCoordinatedPolicies.IsEmpty) {
     var clauseDisplay = wcLine.WC7MultipleCoordinatedPolicyEndorsementCond.DisplayName
     var msg = displaykey.Web.Policy.WC7.Validation.AtLeastOneMultipleCoordinatedPolicyEndorsement(clauseDisplay)
     if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE)) {
        Result.addError(wcLine, ValidationLevel.TC_QUOTABLE, msg, "WC7WorkersCompCoverageConfig")
      } else {
        Result.addWarning(wcLine, ValidationLevel.TC_DEFAULT, msg, "WC7WorkersCompCoverageConfig")
      }
    }      
  }
  
  /**
   * Validate that the total basis amount for each class code in the specific waivers should be less than the
   * total basis amount for each class code in the jurisdiction
   */  
  function waiverOfSubrogationBasisAmount() {
    Context.addToVisited(this, "waiverOfSubrogationBasisAmount")
    if (not Context.isAtLeast("default")) {
      return
    }

    // no need to validate if there are no specific waivers of subro
    if (wcLine.WC7WaiverOfSubros.where(\waiver -> waiver.Type == WC7WaiverOfSubrogation.TC_SPECIFIC).Count == 0) {
      return
    }
    
    var waiverAmountByClassCode = new HashMap<WC7ClassCode, Integer>()
    var exposureAmountByClassCode = new HashMap<WC7ClassCode, Integer>()
    var totalBasisAmount : Integer

    // Compute waiver amount by classcode for specific waivers only 
    var specificWaiverMap = wcLine.WC7WaiverOfSubros.where(\waiver -> waiver.Type == WC7WaiverOfSubrogation.TC_SPECIFIC)
                                                    .partition(\waiver -> waiver.ClassCode)
    for (classCode in specificWaiverMap.Keys) {
      totalBasisAmount = specificWaiverMap.get(classCode).sum(\ waiver -> waiver.BasisAmount)
      waiverAmountByClassCode.put(classCode, totalBasisAmount)
    }

    // compute exposure amount by classcode
    var exposureMap = wcLine.AllWC7CoveredEmployeesWM.partition(\ exposure -> exposure.ClassCode)
    for (classCode in exposureMap.Keys) {
      totalBasisAmount = exposureMap.get(classCode).where(\ w -> !w.IfAnyExposure).sum(\ waiver -> waiver.BasisAmount)
      exposureAmountByClassCode.put(classCode, totalBasisAmount)
    }

    // verify that the waived amount is not more that the basis amount for each class code
    for (classCode in waiverAmountByClassCode.Keys) {
      var waiverAmount = waiverAmountByClassCode.get(classCode)
      var basisAmount = exposureAmountByClassCode.get(classCode)
      if (waiverAmount > basisAmount) {
        Result.addError(wcLine, "default",
                        displaykey.Web.Policy.WC.Validation.WaivedAmountExceedsOverallBasis(classCode.Code, waiverAmount , basisAmount))
      }
    }
  }
  
  /**
   * Specific Waivers of Subro should only have splits on ARDs (Anniversary Rating Date)
   * 
   * Blanket Waivers should not be split at all.
   */
  function specificWaiversOnlySplitOnARDsAndBlanketsAreUnsplit(){
    Context.addToVisited(this, "specificWaiversOnlySplitOnARDsAndBlanketsAreUnsplit")
    if (not Context.isAtLeast("default")) {
      return
    }

    var jurisdictionSplitCache = new HashMap<Jurisdiction, List<Date>>()
    for (waiverVL in wcLine.VersionList.WC7WaiverOfSubros){
      var versions = waiverVL.AllVersions
      var firstVersion = versions.first()
      var waiverType = firstVersion.Type
      var juris = firstVersion.Jurisdiction
      if (waiverType == WC7WaiverOfSubrogation.TC_BLANKET){
        //Blanket Waivers should be unsplit
        if (versions.Count > 1){
          Result.addError(wcLine, "default", displaykey.Web.Policy.WC7.Validation.BlanketWaiverUnsplit(firstVersion))
        }
      } else if (waiverType == WC7WaiverOfSubrogation.TC_SPECIFIC){
        var lastVersion = versions.last()
        //Specific Waivers should only be split on ARDs
        var splitDates : List<Date> = jurisdictionSplitCache.get(juris)
        if (splitDates == null){
          var matchingJurisdiction = wcLine.getJurisdiction(juris)
          if (matchingJurisdiction != null){
            splitDates = matchingJurisdiction.SplitDates
            jurisdictionSplitCache.put(juris, splitDates)
          } else {
            //No matching jurisdiction.  There can be no splits, only the period start and end
            splitDates = { wcLine.Branch.PeriodStart, wcLine.Branch.PeriodEnd }
          }
        }
        for (aVersion in versions){
          if (not splitDates.contains(aVersion.EffectiveDate) and aVersion != firstVersion){
            Result.addError(wcLine, "default", displaykey.Web.Policy.WC7.Validation.SpecificWaiverChangesOnlyOnARD(firstVersion))
          }
          if (not splitDates.contains(aVersion.ExpirationDate) and aVersion != lastVersion){
            Result.addError(wcLine, "default", displaykey.Web.Policy.WC7.Validation.SpecificWaiverChangesOnlyOnARD(firstVersion))
          }
        }
      }
    }
  }

  /**
   * employee leasing contract effective dates are before contract expiration dates
   */
  function checkEmployeeLeasingClientEndorsementCondDates() {
    Context.addToVisited(this, "checkEmployeeLeasingClientEndorsementCondDates")

    if (wcLine.WC7EmployeeLeasingClientEndorsementCondExists) {
        var includedClients = wcLine.getIncludedLaborClientDetails()
        var errorSet = includedClients.where(\ lc->lc.ContractEffectiveDate.compareIgnoreTime(lc.ContractExpirationDate) > 0)
        if (errorSet.Count > 0) {
          Result.addError(wcLine, ValidationLevel.TC_DEFAULT, displaykey.Web.Policy.WC7.Validation.DateRangeError, "WC7WorkersCompConditionsConfig")
        }
    }     
  }
  

  /**
   * employee leasing contract effective dates are before contract expiration dates
   */
  function checkEmployeeLeasingClientEndorsementExclDates() {
    Context.addToVisited(this, "checkEmployeeLeasingClientEndorsementExclDates")

    if (wcLine.WC7EmployeeLeasingClientExclEndorsementExclExists) {
        var excludedClients = wcLine.getExcludedLaborClientDetails("WC7EmployeeLeasingClientExclEndorsementExcl")
        var errorSet = excludedClients.where(\ lc->lc.ContractEffectiveDate.compareIgnoreTime(lc.ContractExpirationDate) > 0)
        if (errorSet.Count > 0) {
          Result.addError(wcLine, ValidationLevel.TC_DEFAULT, displaykey.Web.Policy.WC7.Validation.DateRangeError, "WC7WorkersCompConditionsConfig")
        }
    }     
  }
  
  /**
   * retrospective rating
   * <ul>
   *   <li>First and last computation dates must be at the beginning of hte month (day 1)</li>
   *   <li>Computation interval must be positive</li>
   *   <li>Retrospective Rating Plans' time span must be an integer number of computation intervals</li>
   *   <li>Retrospective Rating Plans' first computation date cannot be prior the policy expiration date</li>
   *   <li>Retrospective Rating Plans' last computation date must be after the first computation date</li>
   *   <li>The expiration date for letters of credit must be after the effective date/li>
   *   <li>letter of credit should cover the whole period of the retrospective rating time</li>
   * </ul>
   */
  function retrospectiveRating() {
    Context.addToVisited(this, "retrospectiveRating")
    
    var policyPeriod = wcLine.Branch
    var plan = wcLine.RetrospectiveRatingPlan

    if (plan == null) {
      return
    }

    if (plan.FirstComputationDate.DayOfMonth != 1 
          or plan.LastComputationDate.DayOfMonth != 1) {
      Result.addError(wcLine, "default",
                      displaykey.Web.Policy.WC.Validation.RetroRatingPlanComputationDateBeginningOfMonth)
    }

    var nMonth = (plan.LastComputationDate.MonthOfYear + 12 * plan.LastComputationDate.YearOfDate) -
          (plan.FirstComputationDate.MonthOfYear + 12 * plan.FirstComputationDate.YearOfDate)

    if (plan.ComputationInterval < 1) {
       Result.addError(wcLine,"default", displaykey.Web.Policy.WC.Validation.RetroRatingPlanComputationIntervalPositive)
    } else if (nMonth % plan.ComputationInterval != 0) {
       Result.addError(wcLine, "default", displaykey.Web.Policy.WC.Validation.RetroRatingPlanTimeSpan)
    }
 
    if (plan.FirstComputationDate < policyPeriod.PeriodEnd) {
      Result.addError(wcLine, "default",
                      displaykey.Web.Policy.WC.Validation.RetroRatingPlanComputationDateNotPriorExpiration(policyPeriod.PeriodEnd))
    }

    if (plan.LastComputationDate <=  plan.FirstComputationDate) {
      Result.addError(wcLine, "default", displaykey.Web.Policy.WC.Validation.RetroRatingPlanComputationDateLastAfterFirst)
    }

    for (letter in plan.LettersOfCredit) {
      if (letter.ValidTo <= letter.ValidFrom) {
        Result.addError(wcLine, "default", displaykey.Web.Policy.WC.Validation.LetterOfCreditExpirationDate(letter.IssuerName))
      }

      if (letter.ValidFrom > plan.FirstComputationDate or
          letter.ValidTo < plan.LastComputationDate) {
        Result.addError(wcLine, "default", displaykey.Web.Policy.WC.Validation.LetterOfCreditDoesNotCoverWholePeriod(letter.IssuerName))
      }
    }
  }

  /**
   * State Act, Voluntary Comp, and/or Limited Maritime exposures cannot be created for WC monopolistic states
   * Stop Gab is selected for a non-monopolistic state.
   */
  function exposureInMonopolisticStates() {
    Context.addToVisited(this, "exposureInMonopolisticStates")
    var monopolisticStates = StateSet.get(StateSet.WC_MONOPOLISTIC)

    for (exposure in wcLine.WC7CoveredEmployees) {
      if (monopolisticStates.contains(exposure.Location.State) 
            and (exposure.GoverningLaw == WC7GoverningLaw.TC_STATE
                    or exposure.GoverningLaw == WC7GoverningLaw.TC_VOLUNTARYCOMP
                    or exposure.GoverningLaw == WC7GoverningLaw.TC_VOLUNTARYCOMPFORRESIDENCEEMP)) {
        Result.addError(wcLine, "default", displaykey.Web.Policy.WC.Validation.ExposuresNotForMonopolisticStates)
      }
      
      if(!monopolisticStates.contains(exposure.Location.State) and (exposure.GoverningLaw == WC7GoverningLaw.TC_STOPGAP)){
        Result.addError(wcLine, "default", displaykey.Web.Policy.WC.Validation.StopGapOnlyForMonopolisticStates)
      }
    }
  }

  /**
   * <ul>
   *  <li>Worker's Comp Liability</li>
   *  <li>FELA Coverage</li>
   *  <li>Maritime Coverage</li>
   * </ul>
   * coverages exist the full term of the policy.
   *
   * <ul>
   *  <li>FELA Coverage</li>
   *  <li>Maritime Coverage</li>
   * </ul>
   * Either exist full term or not at all.
   */
  function lineExposureCoveragesExistFullTerm(){
    Context.addToVisited(this, "lineExposureCoveragesExistFullTerm")
    
     // Check base Workers Comp Employer's Liability coverage
    if (wcLine.WC7WorkersCompEmpLiabInsurancePolicyACovExists) {
      checkClauseSpansEntireTermAndIsUnsplit(wcLine.WC7WorkersCompEmpLiabInsurancePolicyACov, STATE_WIZARD_STEPID)
    }
    
     // Check base Workers Comp Employer's Liability coverage
    if (wcLine.WC7MaritimeACovExists){
      checkClauseSpansEntireTermAndIsUnsplit(wcLine.WC7WorkersCompEmpLiabInsurancePolicyACov, LINE_WIZARD_STEPID)
    }
    
     // Check base Workers Comp Employer's Liability coverage
    if (wcLine.WC7FederalEmployersLiabilityActACovExists) {
      checkClauseSpansEntireTermAndIsUnsplit(wcLine.WC7FederalEmployersLiabilityActACov, LINE_WIZARD_STEPID)
    }
  }
  
  private function checkClauseSpansEntireTermAndIsUnsplit(clause : Clause, stepID : String) {
    if (clause != null){
      //The clause must be unsliced
      var sliceCount = clause.VersionList.AllVersionsUntyped.Count
      if (sliceCount != 1){
        var errorMessage = displaykey.Web.Policy.WC7.Validation.LineCovUnsplit(clause)
        Result.addError(wcLine, ValidationLevel.TC_DEFAULT, errorMessage, stepID)
      }
    
      //The clause spans the full term of the policy
      var effectiveAtPeriodStart = clause.EffectiveDate.equals(Line.Branch.PeriodStart)
      var effectiveAtPeriodEnd = clause.ExpirationDate.equals(Line.Branch.PeriodEnd)
      if (sliceCount == 1 and not (effectiveAtPeriodStart and effectiveAtPeriodEnd)){
        var errorMessage = displaykey.Web.Policy.WC7.Validation.LineCovSpansFullTerm(clause)
        Result.addError(wcLine, ValidationLevel.TC_DEFAULT, errorMessage, stepID)
      }
    }
  }
  
  /**
   * <ul>
   *  <li>Worker's Comp Liability</li>
   *  <li>FELA Coverage</li>
   *  <li>Maritime Coverage</li>
   * </ul>
   * cannot have splits in their CovTerm values - they are
   * not allowed to change mid-way through the period and can only be changed as of the PeriodStart date.  Verify that
   * there are no changes in values in all these Coverages' CovTerms
   */
  function noSplitsInLineCovTerms() {
    Context.addToVisited(this, "noSplitsInLineCovTerms")
    
    // Check base Workers Comp Employer's Liability coverage
    if (wcLine.WC7WorkersCompEmpLiabInsurancePolicyACovExists) {
      checkCovTermHasNoEdits(wcLine.WC7WorkersCompEmpLiabInsurancePolicyACov, "WC7EmpLiabLimit")
      checkCovTermHasNoEdits(wcLine.WC7WorkersCompEmpLiabInsurancePolicyACov, "WC7EmpLiabPolicyLimit")
      checkCovTermHasNoEdits(wcLine.WC7WorkersCompEmpLiabInsurancePolicyACov, "WC7StopGap")
    }
    
    // Check FELA coverage for edits
    if (wcLine.WC7FederalEmployersLiabilityActACovExists) {
      checkCovTermHasNoEdits(wcLine.WC7FederalEmployersLiabilityActACov, "WC7FedEmpLiabAggLimit")
      checkCovTermHasNoEdits(wcLine.WC7FederalEmployersLiabilityActACov, "WC7FedEmpLiabLimit")
      checkCovTermHasNoEdits(wcLine.WC7FederalEmployersLiabilityActACov, "WC7FedEmpLiabProgram")
    }
    
    // Check Maritme/Admiralty coverage for edits
    if (wcLine.WC7MaritimeACovExists) {
      checkCovTermHasNoEdits(wcLine.WC7MaritimeACov, "WC7MaritimeLimit")
      checkCovTermHasNoEdits(wcLine.WC7MaritimeACov, "WC7MaritimeAggLimit")
      checkCovTermHasNoEdits(wcLine.WC7MaritimeACov, "WC7MaritimeProgram")
    }
  }
  
  private function checkCovTermHasNoEdits(clause : Clause, pattern : CovTermPattern) {
    if(clause != null) {
      var allClauseVersions = clause.VersionList.AllVersionsUntyped as List<Clause>
      var firstValue = allClauseVersions.first().getCovTerm(pattern)
      for(version in allClauseVersions) {
        var currentValue = version.getCovTerm(pattern)
        if (currentValue.ValueAsString != firstValue.ValueAsString) {
          Result.addError(wcLine, "default", displaykey.Web.Policy.WC7.Validation.LineCovTermEdited(clause, pattern, firstValue.ValueAsString, currentValue.ValueAsString, version.EffectiveDate))
        }
      }
    }
  }
  
  /**
   * validate for retrospective rating
   */
  static function validateWorkersCompOptionsStep(aWC7Line : WC7WorkersCompLine) {
    PCValidationContext.doPageLevelValidation( \ context -> {
      var val = new WC7LineValidation(context, aWC7Line)
      val.retrospectiveRating()
    })
  }

  static function validateWCLineCoveragesStep(aWC7Line : WC7WorkersCompLine) {
    PCValidationContext.doPageLevelValidation( \ context -> {
      var val = new WC7LineValidation(context, aWC7Line)
      val.waiverOfSubrogationBasisAmount()
      val.atLeastOneWaiverOfSubrogation()
      val.atLeastOneVoluntaryCompensationGoverningLawIsUsed()
      val.atLeastOneIncludedPolicyLaborContractor()
      val.atLeastOneExcludedPolicyLaborContractor()
      val.atLeastOneIncludedPolicyLaborClient()
      val.atLeastOneEmployeeLeasingPolicyLaborClientExclusion()
      val.checkIncludedOwnerOfficers()
      val.checkExcludedPartnersOfficers()
      val.atLeastOneExcludedWorkplace()
      val.atLeastOneAircraftPremiumEndorsementCondition()
      val.atLeastOneFederalEmployersLiabilityCoverageExposure()
      val.atLeastOneMaritimeCoverageExposure()
      val.checkEmployeeLeasingClientEndorsementCondDates()
      val.checkEmployeeLeasingClientEndorsementExclDates()
      val.validateSchedulesAreNotEmpty()
      val.checkMultipleCoordinatedPoliciesOnlyReferenceExistingLaborContractor()
      val.atLeastOneMultipleCoordinatedPolicyWhenMultipleCoordinatedPolicyIsSelected()
      val.checkNumberOfAircraftSeatsAreSame()
      aWC7Line.WC7Jurisdictions.each(\ jurisdiction -> {
         var jurisdictionVal =  new WC7JurisdictionValidation(context, jurisdiction)
         jurisdictionVal.aRatedClassCodeRateIsRequiredAndMustBeSameForEachClassCodeAcrossAllRatingPeriods()
         jurisdictionVal.supplementalLoadingRateIsRequiredAndMustBeSameForEachClassCodeAcrossAllRatingPeriods()
       })
    })
  }  
  
  static function validateWCStateCoveragesStep(aWC7Line : WC7WorkersCompLine) {
    PCValidationContext.doPageLevelValidation( \ context -> {
      var val = new WC7LineValidation(context, aWC7Line)
      val.atLeastOneJurisdiction()
      val.payrollForAllPolicyLocations()
      aWC7Line.WC7Jurisdictions.each( \ jurisdiction -> new WC7JurisdictionValidation(context, jurisdiction).validate()  )
    })
  }
  
  static function validateWCSupplementalStep(wcLine : WC7WorkersCompLine) {
    PCValidationContext.doPageLevelValidation( \ context -> {
      var val = new WC7LineValidation(context, wcLine)
      val.checkAnswers()
    })
  }
  
  
  /**
   * validate anniversary dates and modifiers
   */
  function anniversaryAndModifiersForInterstateOfficialIDs() {
    var interStateIDs = wcLine.InterstateNamedInsuredOfficialIDs
    for (interStateID in interStateIDs) {
      // when the official ID value is null, it is alright to have ARD and ExpMod values that do not match - so skip this one
      if (interStateID.OfficialIDValue == null) {
        continue
      }
      
      var applicableStates = (interStateID as PCOfficialID).Pattern.ApplicableStatesAsArray 
      var jurisdictions = wcLine.WC7Jurisdictions.where(\s -> applicableStates.contains(StateJurisdictionMappingUtil.getStateMappingForJurisdiction(s.Jurisdiction))).sortBy(\ j -> j.Jurisdiction.Code)
      
      // ARD validation
      var jurisdictionsToCheckARD = jurisdictions.where(\j -> applicableStates.contains(StateJurisdictionMappingUtil.getStateMappingForJurisdiction(j.Jurisdiction))
          and wcLine.Branch.getNamedInsuredOfficialIDsForState(StateJurisdictionMappingUtil.getStateMappingForJurisdiction(j.Jurisdiction)).allMatch(\ officialID -> officialID.OfficialIDValue == null))
      var ards = jurisdictionsToCheckARD.map(\j -> j.AnniversaryDate).toSet()
      if (ards.Count > 1) {
        Result.addError(wcLine, "default",
          displaykey.Web.Policy.WC.Validation.DifferentAnniversaryDates(jurisdictionsToCheckARD*.Jurisdiction.orderBy(\j -> j.Code).join(","), interStateID.OfficialIDType.Description, interStateID.OfficialIDValue))
      }
      
      var anniversaries = jurisdictionsToCheckARD.map( \j -> j.AnniversaryDate ).toSet()
      var datesToCheck = {wcLine.Branch.PeriodStart}
      if (anniversaries.HasElements) {
        // anniversary dates must match, so we can take the first one
        var firstJurisAnniversaryDate = jurisdictionsToCheckARD*.WC7RatingPeriodStartDates.firstWhere(\ rpsd -> rpsd.Type == typekey.RPSDType.TC_ANNIVERSARY).StartDate
        if (firstJurisAnniversaryDate != null) {
          datesToCheck.add(firstJurisAnniversaryDate)
        }
      }
      
      // modifier validation
      for(dateToCheck in datesToCheck) {
        var jurisAtDate = wcLine.getSlice(dateToCheck).WC7Jurisdictions
        var jurisdictionsToCheck = jurisAtDate.where(\j -> (dateToCheck == wcLine.Branch.PeriodStart or j.SplittableARD) 
          and applicableStates.contains(StateJurisdictionMappingUtil.getStateMappingForJurisdiction(j.Jurisdiction))
          and wcLine.Branch.getNamedInsuredOfficialIDsForState(StateJurisdictionMappingUtil.getStateMappingForJurisdiction(j.Jurisdiction)).allMatch(\ officialID -> officialID.OfficialIDValue == null))
        jurisdictionsToCheck = jurisdictionsToCheck.sortBy(\ j -> j.Jurisdiction.Code)
        
        var modifiers = jurisdictionsToCheck.map(\j -> j.getModifier("WC7ExpMod").RateModifier).toSet()
        if (modifiers.Count > 1) {
          Result.addError(wcLine, "default",
            displaykey.Web.Policy.WC.Validation.DifferentExpModValues(jurisdictionsToCheck*.Jurisdiction.orderBy(\j -> j.Code).join(","), interStateID.OfficialIDType.Description, interStateID.OfficialIDValue))
        }
      }
    }
  }
  
  /**
   * Validates that jurisdictions have not been split and that their effective and expiration dates are set to the period boundaries.
   */
  function noSplitJurisdictions() {
    for (jVL in wcLine.VersionList.WC7Jurisdictions) {
      if (jVL.AllVersions.size() > 1) {
        Result.addInvariantError(wcLine, displaykey.Web.Policy.WC.Validation.SplitJurisdiction( jVL.AllVersions.first().Jurisdiction ))
      } else {
        var jurisdiction = jVL.AllVersions.first()
        if (jurisdiction.EffectiveDate != jurisdiction.Branch.PeriodStart) {
          Result.addInvariantError(wcLine, displaykey.Web.Policy.WC.Validation.JurisdictionEffectiveDate( jurisdiction, jurisdiction.EffectiveDate, jurisdiction.Branch.PeriodStart ))
        } else if (jurisdiction.ExpirationDate != jurisdiction.Branch.PeriodEnd) {
          Result.addInvariantError(wcLine, displaykey.Web.Policy.WC.Validation.JurisdictionExpirationDate( jurisdiction, jurisdiction.ExpirationDate, jurisdiction.Branch.PeriodEnd ))
        }
      }
    }
  }
  
  function checkAnswers() {
    Context.addToVisited( this, "checkAnswers" )
    new AnswerValidation( Context, Line, Line.Answers, "WorkersCompSupplemental" ).validate()
  }
  
  /**
   * When the condition 'WC7SoleProprietorsPartnersOfficersAndOthersCovCond' is selected, there must be at least 1 'included' owner officer.
   * When the condition 'WC7SoleProprietorsPartnersOfficersAndOthersCovCond' is not selected, there must be no 'inclued' owner officers.
   */
  function checkIncludedOwnerOfficers(){
    Context.addToVisited( this, "includedOwnerOfficers" )  
    var condPattern : ConditionPattern = "WC7SoleProprietorsPartnersOfficersAndOthersCovCond"
    var hasOwnerOfficerCondition = wcLine.hasCondition(condPattern)
    var hasIncludedOwnerOfficers = wcLine.WC7PolicyOwnerOfficers.hasMatch(\ oo -> oo.isIncluded())
    
    var conditionPatternName = condPattern.Name
    if (hasOwnerOfficerCondition and (not hasIncludedOwnerOfficers)){
      //Condition is selected but no included owner officers exist
      var msg = displaykey.Web.Policy.WC7.Validation.RequireIncludedOwnerOfficers(conditionPatternName)
      if (Context.isAtLeast("quotable")) {
        Result.addError(wcLine, "quotable", msg, LINE_WIZARD_STEPID)
      } else {
        Result.addWarning(wcLine, "default", msg, LINE_WIZARD_STEPID)
      }
    } else if ((not hasOwnerOfficerCondition) and hasIncludedOwnerOfficers){
      //included owner officers exist, but the condition is not selected
      var msg = displaykey.Web.Policy.WC7.Validation.InvalidIncludedOwnerOfficers(conditionPatternName)
      if (Context.isAtLeast("quotable")) {
        Result.addError(wcLine, "quotable", msg, LINE_WIZARD_STEPID)
      } else {
        Result.addWarning(wcLine, "default", msg, LINE_WIZARD_STEPID)
      }
    }
  }

  /**
   * Validate that the excluded owner officers only exist when the exclusion is selected and vice versa
   */
  function checkExcludedPartnersOfficers(){
    Context.addToVisited( this, "excludePartnersOfficers" )  
    var exclusionPattern : ExclusionPattern = "WC7PartnersOfficersAndOthersExclEndorsementExcl"
    var hasPartnersOfficersExclusion = wcLine.hasExclusion(exclusionPattern)
    var hasExcludedPartnersOfficers = wcLine.WC7PolicyOwnerOfficers.hasMatch(\ excludedPartnerOfficer -> not excludedPartnerOfficer.isIncluded())
    
    var exclusionPatternName = exclusionPattern.Name
    if (hasPartnersOfficersExclusion and (not hasExcludedPartnersOfficers)) {
      var msg = displaykey.Web.Policy.WC7.Validation.RequiredPartnersOfficersAndExclusion(exclusionPatternName)
      if (Context.isAtLeast("quotable")) {
        Result.addError(wcLine, "quotable", msg, "WC7WorkersCompExclusionConfig")
      } else {
        Result.addWarning(wcLine, "default", msg, "WC7WorkersCompExclusionConfig")
      } 
    } else if ((not hasPartnersOfficersExclusion) and hasExcludedPartnersOfficers){
      var msg = displaykey.Web.Policy.WC7.Validation.InvalidExcludedPartnersOfficers(exclusionPatternName)
      if (Context.isAtLeast("quotable")) {
        Result.addError(wcLine, "quotable", msg, "WC7WorkersCompExclusionConfig")
      } else {
        Result.addWarning(wcLine, "default", msg, "WC7WorkersCompExclusionConfig")
      }
    }
  }


  /**
   * Validate that at least one policy labor client has been added if employee leasing client exclusion endorsement is selected
   */
  function atLeastOneEmployeeLeasingPolicyLaborClientExclusion() {
    Context.addToVisited(this, "atLeastOneEmployeeLeasingClientExclusion")
    exclusionsWithLaborClientSchedules().each(\ pattern -> {
      atLeastOneExcludedPolicyLaborClientFor(pattern)
    })
  }
  
  protected function exclusionsWithLaborClientSchedules() : List<ExclusionPattern> {
    return { "WC7EmployeeLeasingClientExclEndorsementExcl" }
  }
  
  private function atLeastOneExcludedPolicyLaborClientFor(exclusionPattern : ExclusionPattern) {
    var clause = wcLine.getExclusion(exclusionPattern)
    if (clause != null and wcLine.excludedLaborContactClientDetailsFor(clause).Empty) {
      var msg = displaykey.Web.Policy.WC7.Validation.RequireExcludedPolicyLaborClient(clause.DisplayName)
      if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE)) {
        Result.addError(wcLine, ValidationLevel.TC_QUOTABLE, msg, "WC7WorkersCompCoverageConfig")
      } else {
        Result.addWarning(wcLine, ValidationLevel.TC_DEFAULT, msg, "WC7WorkersCompCoverageConfig")
      }
    }
  }

  /**
   * Validate that at least one policy labor client has been added if employee leasing client endorsement is selected
   */
  function atLeastOneIncludedPolicyLaborClient() {
    Context.addToVisited(this, "atLeastOneIncludedPolicyLaborClient")
    conditionsWithLaborClientSchedules().each(\ pattern -> {
      atLeastOneIncludedPolicyLaborClientFor(pattern)
    })    
  }

  protected function conditionsWithLaborClientSchedules() : List<ConditionPattern> {
    return { "WC7EmployeeLeasingClientEndorsementCond" }
  }

  private function atLeastOneIncludedPolicyLaborClientFor(conditionPattern : ConditionPattern) {
    validateCustomLineScheduleCondition(conditionPattern,
      \ clause -> wcLine.includedLaborClientDetailsFor(clause),
      \ clauseName -> displaykey.Web.Policy.WC7.Validation.RequireIncludedPolicyLaborClient(clauseName))
  }

  protected function validateCustomLineScheduleCondition(
      conditionPattern : ConditionPattern,
      getItems(condition : PolicyCondition) : List,
      getErrorMessage(clauseName : String) : String) {
    var clause = wcLine.getCondition(conditionPattern)
    if (clause != null and getItems(clause).Empty) {
      var errorMessage = getErrorMessage(clause.DisplayName)
      if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE))
        Result.addError(wcLine, ValidationLevel.TC_QUOTABLE, errorMessage, LINE_WIZARD_STEPID)
      else
        Result.addWarning(wcLine, ValidationLevel.TC_DEFAULT, errorMessage, LINE_WIZARD_STEPID)
    }    
  }
  
  /**
   * Validate that there is at least one aircraft entry if the aircraft premium endorsement condition is selected
   */
  function atLeastOneAircraftPremiumEndorsementCondition() {
    Context.addToVisited(this, "atLeastOneAircraftPremiumEndorsementCondition")
    var condPattern : ConditionPattern = "WC7AircraftPremiumEndorsementCond"
    var hasAircraftPremiumEndorsementCond = wcLine.WC7AircraftPremiumEndorsementCondExists 
    if (hasAircraftPremiumEndorsementCond and wcLine.WC7AircraftSeats.IsEmpty){
      // Condition is selected but no airline seats exist
      var msg = displaykey.Web.Policy.WC7.Validation.AtLeastOneAircraftPremiumEndorsementCond(condPattern.Name)
      if (Context.isAtLeast("quotable")) {
        Result.addError(wcLine, "quotable", msg, LINE_WIZARD_STEPID)
      } else {
        Result.addWarning(wcLine, "default", msg, LINE_WIZARD_STEPID)
      }
    }
  }

  /**
   * Validate the number of passenger seats can't be changed throughout the lifetime of airplane. The editability of the field 
   * in UI is only on the effective date of the airplane.
   */
  function checkNumberOfAircraftSeatsAreSame() {
    Context.addToVisited(this, "checkNumberOfAircraftSeatsAreSame")
    var hasAircraftPremiumEndorsementCond = wcLine.WC7AircraftPremiumEndorsementCondExists 
    if (hasAircraftPremiumEndorsementCond ) {
      var aircraftSeatsVL = wcLine.WC7AircraftSeatsVLs.flatMap(\ w -> w.AllVersions)
      var aircraftSeats = wcLine.WC7AircraftSeats.where(\ w -> !w.New)
      for (aircraftSeat in aircraftSeats) {
        // if aircraft is not new... check if number of seats is same  
        if (aircraftSeatsVL.countWhere(\ w -> w.FixedId == aircraftSeat.FixedId and w.PassengerSeats != aircraftSeat.PassengerSeats) > 0) {
          var msg = displaykey.Web.Policy.WC7.Validation.TotalNumberOfPassengerSeatsAreSame(aircraftSeat.AircraftNumber)
          if (Context.isAtLeast("quotable")) {
            Result.addError(wcLine, "quotable", msg, "WC7WorkersCompLineCoverages")
          } else {
            Result.addWarning(wcLine, "default", msg, "WC7WorkersCompLineCoverages")
          }
        }

      }
    }
  }
  
  
  /**
   * Validate that at least one covered employee has been added if Federal Employer's Liability Coverage endorsement is selected
   */
  function atLeastOneFederalEmployersLiabilityCoverageExposure() {
    Context.addToVisited(this, "atLeastOneFederalEmployersLiabilityCoverageExposure")
    if (wcLine.WC7FederalEmployersLiabilityActACovExists and 
        wcLine.WC7FedCoveredEmployeesWM.IsEmpty){
        var clauseDisplay = wcLine.WC7FederalEmployersLiabilityActACov.DisplayName
        var msg = displaykey.Web.Policy.WC7.Validation.AtLeastOneFedEmpLiabilityExposureRequired(clauseDisplay)
        if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE)) {  
          Result.addError(wcLine, ValidationLevel.TC_QUOTABLE, msg, "WC7WorkersCompLineCoverages")
        } else{
          Result.addWarning(wcLine, ValidationLevel.TC_DEFAULT, msg)
        }
    }
  }

  /**
   * Validate that the class code program type for the exposures on the Federal Employers Liability Coverage match the cov term settings
   */
   function checkClassCodeProgramForFedEmpLiabCoverage() {
     Context.addToVisited(this, "checkClassCodeProgramForFedEmpLiabCoverage")
     if (wcLine.WC7FederalEmployersLiabilityActACovExists and (Context.isAtLeast(ValidationLevel.TC_QUOTABLE))) {
       var covProgramType = deriveClassCodeProgramType(wcLine.WC7FederalEmployersLiabilityActACov.WC7FedEmpLiabProgramTerm.Value, 
                                wcLine.WC7FederalEmployersLiabilityActACov.WC7FedEmpLiabLawTerm.Value)
       //  There should always be at least one row, except in other tests, so...
       if (wcLine.WC7FedCoveredEmployeeVLs.Count > 0) {
         wcLine.WC7FedCoveredEmployeeVLs[0].AllVersions.where(\ w -> w.ClassCode.ProgramType != covProgramType)
                    .each(\ w -> 
                      Result.addError(wcLine, ValidationLevel.TC_QUOTABLE, displaykey.Web.Policy.WC7.Validation.IncorrectProgramTypeForClassCode(w.ClassCode.Code))
                    )
       }
     }
   }
   
  /**
   * Validate that at least one covered employee has been added if Maritime Coverage endorsement is selected
   */
  function atLeastOneMaritimeCoverageExposure() {
    Context.addToVisited(this, "atLeastOneMaritimeCoverageExposure")
    if (wcLine.WC7MaritimeACovExists and 
        wcLine.WC7MaritimeCoveredEmployeesWM.IsEmpty){
        var clauseDisplay = wcLine.WC7MaritimeACov.DisplayName
        var msg = displaykey.Web.Policy.WC7.Validation.AtLeastOneMaritimeExposureRequired(clauseDisplay)
        if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE)) {  
          Result.addError(wcLine, ValidationLevel.TC_QUOTABLE, msg, "WC7WorkersCompLineCoverages")
        }else{
          Result.addWarning(wcLine, ValidationLevel.TC_DEFAULT, msg)
        }
    }
  }
  
  /**
   * Validate that the class code program type for the exposures on the Federal Employers Liability Coverage match the cov term settings
   */
  function checkClassCodeProgramForMaritimeCoverage() {
    Context.addToVisited(this, "checkClassCodeProgramForMaritimeCoverage")
    if (wcLine.WC7MaritimeACovExists and (Context.isAtLeast(ValidationLevel.TC_QUOTABLE))) {
      var covProgramType = deriveClassCodeProgramType(wcLine.WC7MaritimeACov.WC7MaritimeProgramTerm.Value, 
                                wcLine.WC7MaritimeACov.WC7MaritimeLiabLawTerm.Value)
      //  There should always be at least one row, except in other tests, so...
      if (wcLine.WC7MaritimeCoveredEmployeeVLs.Count > 0) {
        wcLine.WC7MaritimeCoveredEmployeeVLs[0].AllVersions.where(\ w -> w.ClassCode.ProgramType != covProgramType)
                    .each(\ w -> 
                      Result.addError(wcLine, ValidationLevel.TC_QUOTABLE, displaykey.Web.Policy.WC7.Validation.IncorrectProgramTypeForClassCode(w.ClassCode.Code))
                    )
      }
    }  
  }
  
  /**
   * Validate that all selected schedule clauses have at least one scheduled item.
   */
  function validateSchedulesAreNotEmpty() {
    Context.addToVisited(this, "validateSchedulesAreNotEmpty")
    wcLine.AllSchedules.each(\ s -> checkForEmptySchedules(s))
  }
  
  /**
   * Validate any generic schedule with a {@link WC7ScheduleJurisdictionPropertyInfo} has a value that matches an existing WC7Jurisdiction.
   */
  function validateGenericSchedulesReferenceLegalJurisdictions(){
    
    Context.addToVisited(this, "validateGenericSchedulesReferenceLegalJurisdictions")
    var scheduleJurisdictionMappings = wcLine.jurisdictionsForSchedules()
    var legalSet = wcLine.WC7Jurisdictions*.Jurisdiction.toSet()
    
    for (entry in scheduleJurisdictionMappings.entrySet()){
      var schedule = entry.Key
      var jurisdictions = entry.Value
      var illegalScheduleItemJurisdictions = jurisdictions.subtract(legalSet)
      if (illegalScheduleItemJurisdictions.HasElements){
        var stateList = illegalScheduleItemJurisdictions*.Code.sort().join(", ")
        var invalidScheduleJurisdictionMessage = displaykey.Web.Policy.WC7.Schedule.UnmatchedJurisdictions(schedule.Pattern, stateList)
        if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE)) {  
          Result.addError(wcLine, ValidationLevel.TC_QUOTABLE, invalidScheduleJurisdictionMessage)
        } else {
          Result.addWarning(wcLine, ValidationLevel.TC_DEFAULT, invalidScheduleJurisdictionMessage)
        }
      }
    }
  }
  
  /**
   * The following clauses have 
   */
  function validateGenericScheduleJurisdictionsMatchPolicyLocationJurisdictions() {
    /*
     * The following generic schedules have  
     */
    
  }

  /**
   * Check to make sure labor contractor listed in Multiple Coordinated Policy Endorsement also exists
   * in Labor Contractor Condition Endorsement
   */
  function checkMultipleCoordinatedPoliciesOnlyReferenceExistingLaborContractor(){
    Context.addToVisited(this, "checkMultipleCoordinatedPoliciesOnlyReferenceExistingLaborContractor")
    var multipleCoordinatePolicyExists = wcLine.WC7MultipleCoordinatedPolicyEndorsementCondExists
    var hasMultipleCoordinatePolicies = wcLine.MultipleCoordinatedPolicies.IsEmpty ? false : true
    
    if (multipleCoordinatePolicyExists and hasMultipleCoordinatePolicies){
      // get labor contractors from labor contractor endorsement
      var uniqueInclLaborContractors = wcLine.WC7PolicyLaborContractorsCondition
      var unmatchedContact = wcLine.MultipleCoordinatedPolicies.where(\ entry -> 
            !uniqueInclLaborContractors.hasMatch(\ w -> w.AccountContactRole.AccountContact.equals(entry.LaborContractor.AccountContact)))
      if (unmatchedContact.Count > 0) {
        var contactNames = unmatchedContact*.LaborContractor*.AccountContact*.DisplayName.join(", ")
        var msg = displaykey.Web.Policy.WC7.Validation.LaborContactDoesNotExist(contactNames)          
        if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE)) {  
          Result.addError(wcLine, ValidationLevel.TC_QUOTABLE, msg)
        } else {
          Result.addWarning(wcLine, ValidationLevel.TC_DEFAULT, msg)
        }
      }
    } 
  }
  
  private function checkForEmptySchedules(schedule : Schedule){
    if (schedule.ScheduledItems.IsEmpty){
      var msg = displaykey.Web.Policy.WC7.Validation.AtLeastOneItemInSchedule(schedule.ScheduleName)
      if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE)) {  
        Result.addError(wcLine, ValidationLevel.TC_QUOTABLE, msg)
      } else {
        Result.addWarning(wcLine, ValidationLevel.TC_DEFAULT, msg)
      }
    }
  }
  
  internal function specificWaiverEffectiveDatesForSameJobMatch() {
    Context.addToVisited(this, "specificWaiverEffectiveDatesForSameJobMatch")
    
    if (wcLine.WC7SpecificWaiversWM.HasElements) {
      var waiversByJobAndJurisdiction = wcLine.WC7SpecificWaiversWM.partition(\ waiver -> new Pair<Jurisdiction, String>(waiver.Jurisdiction, waiver.JobID))
      for(jurisJobPair in waiversByJobAndJurisdiction.keySet()) {
        var juris = jurisJobPair.First
        var jobID = jurisJobPair.Second
      
        var waivers = waiversByJobAndJurisdiction.get(jurisJobPair)
        // only check if there is more than one waiver with matching Job and Jurisdiction
        if (waivers.Count > 1) {
          var allWaiverEffectiveRanges = waivers.flatMap(\ waiver -> waiver.VersionList.AllVersions.map(\ w -> new Pair<Date, Date>(w.EffectiveDate, w.ExpirationDate)))
          for(effDateRange in allWaiverEffectiveRanges) {
            var checkEffDate = effDateRange.First
            var checkExpDate = effDateRange.Second
            var waiversWithoutMatchingSlice : List<WC7WaiverOfSubro> = {}
            for(waiver in waivers) {
              var waiverAtDate = waiver.VersionList.getVersionAsOf(checkEffDate)
              if (waiverAtDate.EffectiveDate != checkEffDate or waiverAtDate.ExpirationDate != checkExpDate) {
                waiversWithoutMatchingSlice.add(waiver)
              }
            }
            if (waiversWithoutMatchingSlice.HasElements) {
              Result.addError(wcLine, ValidationLevel.TC_DEFAULT, displaykey.Web.Policy.WC7.Validation.WaiverOfSubro.WaiverEffectiveDatesMismatch(jobID, juris, checkEffDate.ShortFormat, checkExpDate.ShortFormat))
            }
          }
        }
      }
    }
  }
}
