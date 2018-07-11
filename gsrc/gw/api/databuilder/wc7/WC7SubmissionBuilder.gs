package gw.api.databuilder.wc7

uses gw.api.builder.PolicyLocationBuilder
uses java.util.Date
uses gw.api.builder.AccountBuilder
uses gw.api.builder.AccountLocationBuilder
uses gw.api.builder.CoverageBuilder
uses gw.api.builder.SubmissionBuilderBase
uses gw.api.databuilder.wc7.contact.WC7PolicyOwnerOfficerBuilder
uses gw.api.databuilder.wc7.contact.WC7PolicyLaborClientBuilder
uses gw.api.databuilder.wc7.contact.WC7PolicyLaborContractorBuilder
uses gw.api.productmodel.ConditionPattern
uses gw.api.builder.PolicyConditionBuilder
uses gw.api.builder.OwnerOfficerBuilder
uses gw.api.productmodel.ExclusionPattern
uses gw.api.builder.ExclusionBuilder
uses gw.api.databuilder.wc7.contact.WC7LaborContactDetailBuilder
uses gw.api.builder.LaborClientBuilder
uses gw.api.builder.LaborContractorBuilder
uses gw.api.productmodel.CoveragePattern
uses gw.api.util.StateJurisdictionMappingUtil
uses gw.api.builder.AccountContactBuilder
uses gw.api.builder.PersonBuilder
uses gw.api.builder.AddressBuilder
uses java.math.BigDecimal
uses java.lang.IllegalStateException

/**
 * A test builder that creates a submission with a workers comp line, a base jurisdiction,
 * and base class code, that is guaranteed to pass validation.
 */
@Export
class WC7SubmissionBuilder extends SubmissionBuilderBase<WC7SubmissionBuilder> {
  var lineBuilder = new WC7WorkersCompLineBuilder()
  var actLocationBuilder : AccountLocationBuilder
  var accountBuilder : AccountBuilder
  var defaultPayroll = 100000
  private var _withBenefitsDeductible = true 
  private var _includeDefaultClassCode = true 

  construct() {
    this(true, true, null)
  }
  
  construct(validating : boolean) {
    this(validating, true, null)
  }
  
  construct(validating : boolean, includeDefaultClassCode : boolean) {
    this(validating, includeDefaultClassCode, null)
  }
  
  construct(jurisdiction : Jurisdiction, withBenefitsDeductible : boolean) {
    _withBenefitsDeductible = withBenefitsDeductible
    withValidation()
    createSubmission(jurisdiction) 
  }

  construct(validating: boolean, includeDefaultClassCode : boolean, jurisdiction : Jurisdiction) {
    if (validating) {
      withValidation()
    }
    
    _includeDefaultClassCode = includeDefaultClassCode
    createSubmission(jurisdiction)
  }
  
  private function createSubmission(jurisdiction : Jurisdiction){
    var state = State.get(jurisdiction.Code) ?: new WC7SubmissionBuilderHelper().State    
    var jur   = jurisdiction ?: new WC7SubmissionBuilderHelper().Jurisdiction

    actLocationBuilder = new AccountLocationBuilder().withState(state)
    accountBuilder = new AccountBuilder().withPrimaryLocation(actLocationBuilder)
    withAccount(accountBuilder)
    withProduct( "WC7WorkersComp" )
    withPolicyLine(lineBuilder)
    withBaseState(state)
    withJurisdiction(new WC7JurisdictionBuilder(jur, _withBenefitsDeductible))
    withWC7EmpLiabLimitWithStopGap("100,000/100,000", "500,000", StopGap.TC_ALLMONOPOLISTICSTATES)
    withWC7TerrorismRiskInsProgReauthEndt()
    if (_includeDefaultClassCode) {
      lineBuilder.withWC7CoveredEmployee(new WC7CoveredEmployeeBuilder()
        .withClassCode(new WC7SubmissionBuilderHelper().ClassCode)
        .withPayroll(defaultPayroll))
    }
  }

  function withEmployeeLeasingPlan(plan : WC7EmployeeLeasingPlanBuilder) : WC7SubmissionBuilder {
    lineBuilder.withEmployeeLeasingPlan(plan)
    return this
  }
  
  function withEmployeeLeasingPlanWith(
      professionalEmployeeType : WC7ProfessionalEmployeeType,
      policyType : WC7EmployeeLeasingPolicyType = null) : WC7SubmissionBuilder {
    return withEmployeeLeasingPlan(new WC7EmployeeLeasingPlanBuilder()
        .withProfessionalEmployeeType(professionalEmployeeType)
        .withPolicyType(policyType))
  }

  function withLineCov(lineCovPattern : CoveragePattern) : WC7SubmissionBuilder {
    lineBuilder.withCoverage(new CoverageBuilder(entity.WC7WorkersCompCov).withPattern(lineCovPattern))
    return this 
  }
  
  /**
   * Set's the 'WC7WorkersCompEmpLiabInsurancePolicyACov' on the line with the given cov-term values.
   * @param limitPerAccidentPerEmpDisease e.g. "100,000/100,000"
   * @param diseaseLimit e.g. 5,000,000
   * @param stopGapVal the stop gap value
   */
  function withWorkersCompCov(limitPerAccidentPerEmpDisease : String, diseaseLimit : String, stopGapVal : typekey.StopGap) : WC7SubmissionBuilder {
    var covPattern : CoveragePattern = "WC7WorkersCompEmpLiabInsurancePolicyACov"
    lineBuilder.withCoverage(
      new CoverageBuilder(entity.WC7WorkersCompCov)
      .withPattern(covPattern)
                           
      .withPackageCovTerm("WC7EmpLiabLimit", limitPerAccidentPerEmpDisease)
      .withOptionCovTerm("WC7EmpLiabPolicyLimit", diseaseLimit)
      .withTypekeyCovTerm("WC7StopGap", stopGapVal))
    return this 
  }
  
  function withFELACoverage(limitPerAccident : String, diseaseLimit : String, programType : WC7CovProgramType) : WC7SubmissionBuilder {
    var covPattern : CoveragePattern = "WC7FederalEmployersLiabilityActACov"
    lineBuilder.withCoverage(
      new CoverageBuilder(entity.WC7WorkersCompCov)
      .withPattern(covPattern)
      .withOptionCovTerm("WC7FedEmpLiabLimit", limitPerAccident)
      .withOptionCovTerm("WC7FedEmpLiabAggLimit", diseaseLimit)
      .withTypekeyCovTerm("WC7FedEmpLiabProgram", programType))
    return this 
  }
  
  function withMaritimeCoverageAndManualPremium(limitPerAccident : String, diseaseLimit : String, programType : WC7CovProgramType, maritimeManualPremium : BigDecimal) : WC7SubmissionBuilder {
    var covPattern : CoveragePattern = "WC7MaritimeACov"
    lineBuilder.withCoverage(
      new CoverageBuilder(entity.WC7WorkersCompCov)
      .withPattern(covPattern)
      .withOptionCovTerm("WC7MaritimeLimit", limitPerAccident)
      .withOptionCovTerm("WC7MaritimeAggLimit", diseaseLimit)
      .withTypekeyCovTerm("WC7MaritimeProgram", programType)
      .withDirectTerm("WC7MaritimeManualPremium", maritimeManualPremium))
    return this 
  }
  
  function withMaritimeCoverage(limitPerAccident : String, diseaseLimit : String, programType : WC7CovProgramType) : WC7SubmissionBuilder {
    var covPattern : CoveragePattern = "WC7MaritimeACov"
    lineBuilder.withCoverage(
      new CoverageBuilder(entity.WC7WorkersCompCov)
      .withPattern(covPattern)
      .withOptionCovTerm("WC7MaritimeLimit", limitPerAccident)
      .withOptionCovTerm("WC7MaritimeAggLimit", diseaseLimit)
      .withTypekeyCovTerm("WC7MaritimeProgram", programType))
    return this 
  }
  
  function withLineCond(lineCondPattern : ConditionPattern) : WC7SubmissionBuilder {
    lineBuilder.withCondition(new PolicyConditionBuilder(entity.WC7WorkersCompCond).withPattern(lineCondPattern))
    return this 
  }

  function withLineCond(lineCond : PolicyConditionBuilder) : WC7SubmissionBuilder {
    lineBuilder.withCondition(lineCond)
    return this
  }
  
  function withLineExcl(lineExclPattern : ExclusionPattern) : WC7SubmissionBuilder {
    lineBuilder.withExclusion(new ExclusionBuilder(entity.WC7WorkersCompExcl).withPattern(lineExclPattern))
    return this 
  }

  function withLineExcl(lineExcl : ExclusionBuilder) : WC7SubmissionBuilder {
    lineBuilder.withExclusion(lineExcl)
    return this
  }

  function withWC7CoveredEmployee(coveredEmployeeBuilder : WC7CoveredEmployeeBuilder) : WC7SubmissionBuilder{
    lineBuilder.withWC7CoveredEmployee(coveredEmployeeBuilder)
    return this
  }

  function withWC7FedCoveredEmployee(fedCoveredEmployeeBuilder : WC7FedCoveredEmployeeBuilder) : WC7SubmissionBuilder{
    lineBuilder.withWC7FedCoveredEmployee(fedCoveredEmployeeBuilder)
    return this
  }
  
  function withWC7MaritimeCoveredEmployee(marCoveredEmployeeBuilder : WC7MaritimeCoveredEmployeeBuilder) : WC7SubmissionBuilder{
    lineBuilder.withWC7MaritimeCoveredEmployee(marCoveredEmployeeBuilder)
    return this
  }
  
  function withWC7RetrospectiveRatingPlan(retrospectiveRatingPlanBuilder : WC7RetrospectiveRatingPlanBuilder) : WC7SubmissionBuilder {
    lineBuilder.withRRP(retrospectiveRatingPlanBuilder)
    return this
  }
  
  function withWC7RetrospectiveRatingPlan() : WC7SubmissionBuilder {
    if (effectiveDate == null) 
      throw new IllegalStateException("Must set policy effective date before adding default retrospective rating plan")
    var firstDate = firstDayOfNextMonthAfter(effectiveDate.addYears(1))
    var lastDate = firstDate.addMonths(1)
    var letterBuilder = new WC7RetroRatingLetterOfCreditBuilder()
      .withValidFrom(firstDate.addDays(-1))
      .withValidTo(lastDate.addDays(1))      
    return withWC7RetrospectiveRatingPlan(new WC7RetrospectiveRatingPlanBuilder()
      .withFirstComputationDate(firstDate)
      .withLastComputationDate(lastDate)
      .withComputationInterval(1)
      .withLetterOfCredit(letterBuilder)
      .withDefaultLetterOfCreditAndStateMultiplier())
  }

  private function firstDayOfNextMonthAfter(date : Date) : Date {
    var result = date.addMonths(1)
    result.setDate(1)
    return result
  }

  function withWC7ManuscriptOption(manuscriptOptionBuider : WC7ManuscriptOptionBuilder) : WC7SubmissionBuilder {
    lineBuilder.withWC7ManuscriptOption(manuscriptOptionBuider)
    return this
  }
  
  function withAircraftSeat(seatBuilder : WC7AircraftSeatBuilder) : WC7SubmissionBuilder {
    lineBuilder.withAircraftSeat(seatBuilder)
    return this
  }

  function withWC7WaiverOfSubro(waiverBuilder : WC7WaiverOfSubroBuilder) : WC7SubmissionBuilder {
    lineBuilder.withWaiverOfSubro(waiverBuilder)
    return this
  }

  function withAdditionalWCCoveredEmployee(additionalEmployeeBuilder : WC7CoveredEmployeeBuilder) : WC7SubmissionBuilder{
    lineBuilder.withWC7CoveredEmployee(additionalEmployeeBuilder)
    return this
  }

  function withLocation(accountLocation: AccountLocation): WC7SubmissionBuilder {
    var policyLocBuilder = new PolicyLocationBuilder().withAccountLocation(accountLocation)
    withPolicyLocation(policyLocBuilder)
    return this
  }

  function withLocation(state: State): WC7SubmissionBuilder {
    var alb = new AccountLocationBuilder().withState( state )
    accountBuilder.withAccountLocation( alb )
    var policyLocBuilder = new PolicyLocationBuilder().withAccountLocation(alb)
    withPolicyLocation(policyLocBuilder)
    return this
  }

  final function withWCFedEmpLiabCov() : WC7SubmissionBuilder {
    lineBuilder.withCoverage( new CoverageBuilder(WCFedEmpLiabCov).withPatternCode("WCFedEmpLiabCov") )
    return this
  }

  final function withWC7EmpLiabLimit(packageDescription : String, optionValue : String) : WC7SubmissionBuilder {
    lineBuilder.withCoverage(new CoverageBuilder(WC7WorkersCompCov)
                                         .withPatternCode("WC7WorkersCompEmpLiabInsurancePolicyACov")
                                         .withPackageCovTerm("WC7EmpLiabLimit", packageDescription)
                                         .withOptionCovTerm("WC7EmpLiabPolicyLimit", optionValue))
    return this
  } 

  final function withWC7EmpLiabLimitWithStopGap(packageDescription : String, optionValue : String, stopGapValue : StopGap) : WC7SubmissionBuilder {
    lineBuilder.withWC7EmpLiabLimitWithStopGap(packageDescription, optionValue, stopGapValue)
    return this
  }

  final function withWC7TerrorismRiskInsProgReauthEndt() : WC7SubmissionBuilder {
    lineBuilder.withWC7TerrorismRiskInsProgReauthEndt()
    return this
  }

  function withPayroll( payroll : int) : WC7SubmissionBuilder{
    defaultPayroll = payroll
    return this
  }
  
  /**
   * Set the account to have a primary location at Jurisdiction {@link Jurisdiction}
   */
  function withPrimaryLocationJurisdiction(juris : Jurisdiction) : WC7SubmissionBuilder {
    var aState = StateJurisdictionMappingUtil.getStateMappingForJurisdiction(juris)
    return withAccount(new AccountBuilder().withPrimaryLocation(new AccountLocationBuilder().withState(aState))).withBaseState(aState)
  } 
  
  final function withJurisdiction(jurisdictionBuilder : WC7JurisdictionBuilder) : WC7SubmissionBuilder {
    lineBuilder.withJurisdiction( jurisdictionBuilder )
    return this
  }

  function withAnniversaryDate(state: Jurisdiction, anniversaryDate: Date): WC7SubmissionBuilder {
    lineBuilder.withJurisdiction(new WC7JurisdictionBuilder(state).withAnniversaryDate(anniversaryDate))
    return this
  }

  function withParticipatingPlan(participatingPlanBuilder : WC7ParticipatingPlanBuilder) : WC7SubmissionBuilder {
    lineBuilder.withParticipatingPlan(participatingPlanBuilder)
    return this
  }
  
  //------------------------------------------------------------------ Aircraft Premium Endorsement
  
  function withAircraftPremiumEndorcementCondition()  : WC7SubmissionBuilder {
    var aircraftConditionPattern : ConditionPattern = "WC7AircraftPremiumEndorsementCond"
    withLineCond(aircraftConditionPattern)
    return this
  }
  
  //----------------------------------------------------------------- Owner Officer

  function withOwnerOfficer(ownerOfficerBuilder : WC7PolicyOwnerOfficerBuilder) : WC7SubmissionBuilder {
    return withOwnerOfficerHelper(ownerOfficerBuilder)
  }


  function withOwnerOfficerAlsoOnAccount(wc7OwnerOfficerBuilder : WC7PolicyOwnerOfficerBuilder, accountContactRole : AccountContactRole) : WC7SubmissionBuilder {
    lineBuilder.withWC7PolicyOwnerOfficer(wc7OwnerOfficerBuilder)
    this.withPolicyContactRole(wc7OwnerOfficerBuilder.withAccountContactRole(accountContactRole))
    return this
  }

  /**
   * Add an owner officer and also include the owner officer condition (WC7SoleProprietorsPartnersOfficersAndOthersCovCond)
   * {@link withOwnerOfficer(WC7PolicyOwnerOfficerBuilder)}
   */
  function withIncludedOwnerOfficer( ownerOfficerBuilder : WC7PolicyOwnerOfficerBuilder) : WC7SubmissionBuilder {
    var ownerOfficerConditionPattern : ConditionPattern = "WC7SoleProprietorsPartnersOfficersAndOthersCovCond"
    withLineCond(ownerOfficerConditionPattern)
     
    withOwnerOfficerHelper(ownerOfficerBuilder
      .isIncluded()
      .withJurisdiction("FL")
    )
    return this
  }

  /**
   * Add an owner officer and also excludes the owner officer exc;isopm (WC7PartnersOfficersAndOthersExclEndorsementExcl)
   */
  function withExcludedOwnerOfficer( ownerOfficerBuilder : WC7PolicyOwnerOfficerBuilder) : WC7SubmissionBuilder {
    var ownerOfficerExclusionPattern : ExclusionPattern = "WC7PartnersOfficersAndOthersExclEndorsementExcl"
    var exclBuilder = new ExclusionBuilder(WC7WorkersCompExcl).withPattern(ownerOfficerExclusionPattern)
    lineBuilder.withExclusion(exclBuilder)
    withLineExcl(ownerOfficerExclusionPattern)

    withOwnerOfficerHelper(ownerOfficerBuilder
      .isExcluded()
      .withJurisdiction("FL")
    )
    return this
  }
  
  //----------------------------------------------------------------- Labor Client

  function withLaborClient(laborClientBuilder : WC7PolicyLaborClientBuilder) : WC7SubmissionBuilder {
    lineBuilder.withWC7PolicyLaborClient(laborClientBuilder)
    this.withPolicyContactRole(laborClientBuilder)
    return this
  }

  /**
   * Add a new labor client with a single 'included' detail and add the condition (WC7EmployeeLeasingClientEndorsementCond)
   */
  function withIncludedLaborClientDetail(laborClientBuilder : WC7PolicyLaborClientBuilder) : WC7SubmissionBuilder {
    withEmployeeLeasingPlanWith(:professionalEmployeeType = TC_PEO)
    return withIncludedLaborClientDetail(laborClientBuilder, "WC7EmployeeLeasingClientEndorsementCond")
  }

  function withIncludedLaborClientDetail(
      laborClientBuilder : WC7PolicyLaborClientBuilder,
      lineCondition : ConditionPattern) : WC7SubmissionBuilder {
    withLineCond(lineCondition)
    var acctLaborClientBuilder = new LaborClientBuilder()
    accountBuilder.withAccountContactForRole(acctLaborClientBuilder)
    withLaborClient(laborClientBuilder
      .withAccountContactRole(acctLaborClientBuilder)
      .withDetail(new WC7LaborContactDetailBuilder().forCondition(lineCondition)))
    return this
  }

  function withIncludedLaborClientDetailFor(jurisdiction : Jurisdiction) : WC7SubmissionBuilder {
    return this.withIncludedLaborClientDetail(new WC7PolicyLaborClientBuilder()
      .withDetail(new WC7LaborContactDetailBuilder().withJurisdiction(jurisdiction)))
  }
  
  function withIncludedLaborClientDetailForCondition(lineCondition : ConditionPattern) : WC7SubmissionBuilder {
    return this.withIncludedLaborClientDetail(new WC7PolicyLaborClientBuilder(), lineCondition)
  }  

  /**
   * Add a new labor client with a single 'excluded' detail and add the exclusion (WC7EmployeeLeasingClientExclEndorsementExcl)
   */
  function withExcludedLaborClientDetail(laborClientBuilder : WC7PolicyLaborClientBuilder, leasedClientExclusionPattern : ExclusionPattern) : WC7SubmissionBuilder {    
    lineBuilder.withExclusion(new ExclusionBuilder(WC7WorkersCompExcl).withPattern(leasedClientExclusionPattern))
    
    var acctLaborClientBuilder = new LaborClientBuilder()
    accountBuilder.withAccountContactForRole(acctLaborClientBuilder)
    withLaborClient(laborClientBuilder
      .withAccountContactRole(acctLaborClientBuilder)
      .withDetail(new WC7LaborContactDetailBuilder().withInclusion(Inclusion.TC_EXCL).forExclusion(leasedClientExclusionPattern)))
    return this    
  }

  /**
   * Add a new labor client with a single 'excluded' detail and add the exclusion (WC7EmployeeLeasingClientExclEndorsementExcl)
   */
  function withExcludedLaborClientDetailForState(laborClientBuilder : WC7PolicyLaborClientBuilder, juris : typekey.Jurisdiction) : WC7SubmissionBuilder {
    var leasedClientExclusionPattern : ExclusionPattern = "WC7EmployeeLeasingClientExclEndorsementExcl"
    lineBuilder.withExclusion(new ExclusionBuilder(WC7WorkersCompExcl).withPattern(leasedClientExclusionPattern))
      .withEmployeeLeasingPlan(new WC7EmployeeLeasingPlanBuilder()
        .withProfessionalEmployeeType(WC7ProfessionalEmployeeType.TC_CLIENT))
    var acctLaborClientBuilder = new LaborClientBuilder()
    accountBuilder.withAccountContactForRole(acctLaborClientBuilder)
    withLaborClient(laborClientBuilder
      .withAccountContactRole(acctLaborClientBuilder)
      .withDetail(new WC7LaborContactDetailBuilder().withInclusion(Inclusion.TC_EXCL).withJurisdiction(juris)))
    return this    
  }
  
  function withExcludedLaborClientDetailForState(jurisdiction : Jurisdiction) : WC7SubmissionBuilder {
    return withExcludedLaborClientDetailForState(new WC7PolicyLaborClientBuilder(), jurisdiction)
  }

  function withExcludedLaborClientDetailForExclusion(lineExclusion : ExclusionPattern) : WC7SubmissionBuilder {
    return this.withExcludedLaborClientDetail(new WC7PolicyLaborClientBuilder(), lineExclusion)
  }
  
  //----------------------------------------------------------------- Labor Contractor
  
  function withMultipleCoordinatedPolicy(coordinatedPolicyBuilder : WC7CoordinatedPolicyBuilder) : WC7SubmissionBuilder {
    var coordinatedPolicyCond : ConditionPattern = "WC7MultipleCoordinatedPolicyEndorsementCond"
    withIncludedLaborContractorDetail(new WC7PolicyLaborContractorBuilder())
    lineBuilder.withWC7CoordinatedPolicy(coordinatedPolicyBuilder)
    lineBuilder.withCondition(new PolicyConditionBuilder(WC7WorkersCompCond).withPattern(coordinatedPolicyCond))
      .withEmployeeLeasingPlan(new WC7EmployeeLeasingPlanBuilder()
        .withProfessionalEmployeeType(WC7ProfessionalEmployeeType.TC_CLIENT)
        .withPolicyType(WC7EmployeeLeasingPolicyType.TC_MCP))
    return this
  }
  
  function withMultipleCoordinatedPolicyForState(jurisdiction : Jurisdiction) : WC7SubmissionBuilder {
    return withMultipleCoordinatedPolicy(new WC7CoordinatedPolicyBuilder().withState(jurisdiction))
  }
  
  function withLaborContractor(laborContractorBuilder : WC7PolicyLaborContractorBuilder) : WC7SubmissionBuilder {
    lineBuilder.withWC7PolicyLaborContractor(laborContractorBuilder)
    this.withPolicyContactRole(laborContractorBuilder)
    return this
  }
  
  /**
   * Add a new labor contractor with a single 'included' detail and add the condition (WC7LaborContractorEndorsementACond)
   */
  function withIncludedLaborContractorDetail(laborContractorBuilder : WC7PolicyLaborContractorBuilder) : WC7SubmissionBuilder {
    withEmployeeLeasingPlanWith(:professionalEmployeeType = TC_CLIENT)
    return withIncludedLaborContractorDetail(laborContractorBuilder, "WC7LaborContractorEndorsementACond")
  }

  function withIncludedLaborContractorDetail(
      laborContractorBuilder : WC7PolicyLaborContractorBuilder,
      lineCondition : ConditionPattern) : WC7SubmissionBuilder {
        
    withLineCond(lineCondition)
    var acctLaborContractorBuilder = new LaborContractorBuilder()
    accountBuilder.withAccountContactForRole(acctLaborContractorBuilder)
    withLaborContractor(laborContractorBuilder
      .withAccountContactRole(acctLaborContractorBuilder)
      .withDetail(new WC7LaborContactDetailBuilder().forCondition(lineCondition)))
    return this
  }

  function withIncludedLaborContractorDetailFor(jurisdiction : Jurisdiction) : WC7SubmissionBuilder {
    return this.withIncludedLaborContractorDetail(new WC7PolicyLaborContractorBuilder()
      .withDetail(new WC7LaborContactDetailBuilder().withJurisdiction(jurisdiction)))
  }

  function withIncludedLaborContractorDetailForCondition(lineCondition : ConditionPattern) : WC7SubmissionBuilder {
    return this.withIncludedLaborContractorDetail(new WC7PolicyLaborContractorBuilder(), lineCondition)
  }
  
  /**
   * Add a new labor contractor with a single 'included' detail and add the condition (WC7LaborContractorEndorsementACond)
   */
  function withIncludedLaborContractorDetail(laborContractorBuilder : WC7PolicyLaborContractorBuilder, laborContractor : LaborContractorBuilder) : WC7SubmissionBuilder {
    var leasedContractorConditionPattern : ConditionPattern = "WC7LaborContractorEndorsementACond"
    lineBuilder.withCondition(new PolicyConditionBuilder(WC7WorkersCompCond).withPattern(leasedContractorConditionPattern))
    
    withLaborContractor(laborContractorBuilder
      .withAccountContactRole(laborContractor)
      .withDetail(new WC7LaborContactDetailBuilder().withInclusion(Inclusion.TC_INCL)))
    return this
  }

  /**
   * Add a new labor contractor with a single 'excluded' detail and add the exclusion (WC7LaborContractorExclEndorsementExcl)
   */
  function withExcludedLaborContractorDetail(laborContractorBuilder : WC7PolicyLaborContractorBuilder, leasedContractorExclusionPattern : ExclusionPattern) : WC7SubmissionBuilder {    
    lineBuilder.withExclusion(new ExclusionBuilder(WC7WorkersCompExcl).withPattern(leasedContractorExclusionPattern))
      .withEmployeeLeasingPlan(new WC7EmployeeLeasingPlanBuilder()
        .withProfessionalEmployeeType(WC7ProfessionalEmployeeType.TC_PEO))
    
    var acctLaborContractorBuilder = new LaborContractorBuilder()
    accountBuilder.withAccountContactForRole(acctLaborContractorBuilder)
    withLaborContractor(laborContractorBuilder
      .withAccountContactRole(acctLaborContractorBuilder)
      .withDetail(new WC7LaborContactDetailBuilder().withInclusion(Inclusion.TC_EXCL).forExclusion(leasedContractorExclusionPattern)))
    return this    
  }

    /**
   * Add a new labor contractor with a single 'excluded' detail and add the exclusion (WC7LaborContractorExclEndorsementExcl)
   */
  function withExcludedLaborContractorDetailForState(laborContractorBuilder : WC7PolicyLaborContractorBuilder, juris : typekey.Jurisdiction) : WC7SubmissionBuilder {
    var leasedContractorExclusionPattern : ExclusionPattern = "WC7LaborContractorExclEndorsementExcl"
    lineBuilder.withExclusion(new ExclusionBuilder(WC7WorkersCompExcl).withPattern(leasedContractorExclusionPattern))
    lineBuilder.withEmployeeLeasingPlan(new WC7EmployeeLeasingPlanBuilder()
      .withProfessionalEmployeeType(WC7ProfessionalEmployeeType.TC_PEO))
    var acctLaborContractorBuilder = new LaborContractorBuilder()
    accountBuilder.withAccountContact(new AccountContactBuilder().withRole(acctLaborContractorBuilder)
      .withContact(new PersonBuilder().withAddress(new AddressBuilder().withState(StateJurisdictionMappingUtil.getStateMappingForJurisdiction(juris)))))
    withLaborContractor(laborContractorBuilder
      .withAccountContactRole(acctLaborContractorBuilder)
      .withDetail(new WC7LaborContactDetailBuilder().withInclusion(Inclusion.TC_EXCL).withJurisdiction(juris)))
    return this
  }

  function withExcludedLaborContractorDetailForState(jurisdiction : Jurisdiction) : WC7SubmissionBuilder {
    return withExcludedLaborContractorDetailForState(new WC7PolicyLaborContractorBuilder(), jurisdiction)
  }
  
  function withExcludedLaborContractorDetailForExclusion(lineExclusion : ExclusionPattern) : WC7SubmissionBuilder {
    return this.withExcludedLaborContractorDetail(new WC7PolicyLaborContractorBuilder(), lineExclusion)
  }  
  
  //----------------------------------------------------------------- WaiverOfSubro

  /**
   * Add a waiver of subrogation to the line.  This will also include the waiver condition (WC7WaiverOfOurRightToRecoverFromOthersEndorsemCond)
   */
  function withWaiver(waiverBuilder : WC7WaiverOfSubroBuilder) : WC7SubmissionBuilder {    
    var waiverConditionPattern : ConditionPattern = "WC7WaiverOfOurRightToRecoverFromOthersEndorsemCond"
    lineBuilder.withCondition(new PolicyConditionBuilder(WC7WorkersCompCond).withPattern(waiverConditionPattern))     
    lineBuilder.withWaiverOfSubro(waiverBuilder)
    return this
  }
  
  //----------------------------------------------------------------- Excluded Workplace

  /**
   * Add a waiver of subrogation to the line.  This will also include the waiver condition (WC7WaiverOfOurRightToRecoverFromOthersEndorsemCond)
   */
  function withExcludedWorkplace(excludedWorkplace : WC7ExcludedWorkplaceBuilder) : WC7SubmissionBuilder {    
    var excludedWorkplaceExclusion : ExclusionPattern = "WC7DesignatedWorkplacesExclEndorsementExcl"
    lineBuilder.withExclusion(new ExclusionBuilder(WC7WorkersCompExcl).withPattern(excludedWorkplaceExclusion))
    lineBuilder.withExcludedWorkplace(excludedWorkplace)
    return this
  }

  //----------------------------------------------------------------- Supplement Disease

  function withSupplementaryDiseaseExposure(suppDiseaseExposureBuilder : WC7SupplDiseaseExposureBuilder) : WC7SubmissionBuilder {    
    lineBuilder.withWC7SupplDiseaseExposure(suppDiseaseExposureBuilder)
    return this
  }

   //----------------------------------------------------------------- Atomic Energy

  function withAtomicEnergyExposure(atomicEnergyExposureBuilder : WC7AtomicEnergyExposureBuilder) : WC7SubmissionBuilder {    
    lineBuilder.withWC7AtomicEnergyExposure(atomicEnergyExposureBuilder)
    return this
  }

  //--------------------------------- Validation
  
  function withoutValidation() : WC7SubmissionBuilder {
    skipValidation = true
    return this
  }

  final function withVoluntaryCompCond() : WC7SubmissionBuilder {
    return withLineCond("WC7VoluntaryCompensationAndEmployersLiabilityCovCond")
  }
    
  //----------------------------------------------------------------- private helper methods
  
  private function withOwnerOfficerHelper(ownerOfficerBuilder : WC7PolicyOwnerOfficerBuilder) : WC7SubmissionBuilder {
    var ooBuilder = new OwnerOfficerBuilder()
    accountBuilder.withAccountContactForRole(ooBuilder)
    lineBuilder.withWC7PolicyOwnerOfficer(ownerOfficerBuilder)
    this.withPolicyContactRole(ownerOfficerBuilder.withAccountContactRole(ooBuilder))
    return this
  }

}
