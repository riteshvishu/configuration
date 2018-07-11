package gw.api.databuilder.wc7

uses gw.api.builder.PolicyLineBuilder
uses gw.api.builder.CoverageBuilder
uses gw.api.databuilder.wc7.contact.WC7PolicyOwnerOfficerBuilder
uses gw.entity.IArrayPropertyInfo
uses gw.api.builder.BuilderArrayPopulator
uses gw.api.databuilder.wc7.contact.WC7PolicyLaborClientBuilder
uses gw.api.databuilder.wc7.contact.WC7PolicyLaborContractorBuilder
uses gw.api.builder.ExclusionBuilder
uses gw.api.builder.PolicyConditionBuilder
uses java.util.ArrayList
uses java.lang.Integer
uses gw.api.databuilder.populator.BeanPopulator
uses gw.api.util.JurisdictionMappingUtil

@Export
class WC7WorkersCompLineBuilder extends PolicyLineBuilder<entity.WC7WorkersCompLine, WC7WorkersCompLineBuilder> {

  construct() {
    super(entity.WC7WorkersCompLine)
    this.withJurisdiction(new WC7JurisdictionBuilder( new WC7SubmissionBuilderHelper().Jurisdiction))
    this.withWC7EmpLiabLimitWithStopGap("100,000/100,000", "500,000", StopGap.TC_ALLMONOPOLISTICSTATES)
    this.withWC7TerrorismRiskInsProgReauthEndt()
    addPopulator(Integer.MAX_VALUE, new BeanPopulator<WC7WorkersCompLine>() {
       override function execute(line : WC7WorkersCompLine) {
         var jurisdictions = line.PolicyLocations.map(\ p -> JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(p))
         line.WC7Jurisdictions.each(\ j -> { 
           // Unused WC7Jurisdictions are removed. 
           if (not jurisdictions.contains(j.Jurisdiction)) {
             line.removeFromWC7Jurisdictions(j)  
           }
         })
       }
    })
  }
  
  function withCoverage(coverageBuilder : CoverageBuilder) : WC7WorkersCompLineBuilder {
    addArrayElement(WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7LineCoverages"), coverageBuilder)
    return this
  }

  function withExclusion(exclusionBuilder : ExclusionBuilder) : WC7WorkersCompLineBuilder {
    addArrayElement(WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7LineExclusions"), exclusionBuilder)
    return this
  }

  function withCondition(conditionBuilder : PolicyConditionBuilder) : WC7WorkersCompLineBuilder {
    addArrayElement(WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7LineConditions"), conditionBuilder)
    return this
  }

  final function withWC7CoveredEmployee(eu : WC7CoveredEmployeeBuilder) : WC7WorkersCompLineBuilder {
    addAdditiveArrayElement(WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7CoveredEmployees"), eu)
    return this
  }

  final function withWC7FedCoveredEmployee(eu : WC7FedCoveredEmployeeBuilder) : WC7WorkersCompLineBuilder {
    addAdditiveArrayElement(WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7FedCoveredEmployees"), eu)
    return this
  }

  final function withWC7MaritimeCoveredEmployee(eu : WC7MaritimeCoveredEmployeeBuilder) : WC7WorkersCompLineBuilder {
    addAdditiveArrayElement(WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7MaritimeCoveredEmployees"), eu)
    return this
  }
  
  final function withJurisdiction(jurisdiction : WC7JurisdictionBuilder) : WC7WorkersCompLineBuilder {
    addAdditiveArrayElement(WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7Jurisdictions"), jurisdiction)
    return this
  }

  function withRRP(rrpBuilder : WC7RetrospectiveRatingPlanBuilder) : WC7WorkersCompLineBuilder {
    set( WC7WorkersCompLine.Type.TypeInfo.getProperty("RetrospectiveRatingPlan"), rrpBuilder )
    return this
  }    
  
  function withParticipatingPlan(planBuilder : WC7ParticipatingPlanBuilder) : WC7WorkersCompLineBuilder {
    set( WC7WorkersCompLine.Type.TypeInfo.getProperty("ParticipatingPlan"), planBuilder )
    return this
  }

  function withEmployeeLeasingPlan(plan : WC7EmployeeLeasingPlanBuilder) : WC7WorkersCompLineBuilder {
    set(WC7WorkersCompLine.Type.TypeInfo.getProperty("EmployeeLeasingPlan"), plan)
    return this
  }

  function withWC7PolicyOwnerOfficer(ownerOfficer : WC7PolicyOwnerOfficerBuilder) : WC7WorkersCompLineBuilder {
    addPopulator(new BuilderArrayPopulator(WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7PolicyOwnerOfficers") as IArrayPropertyInfo, ownerOfficer))
    return this
  }

  function withWC7PolicyLaborClient(policyLaborClient : WC7PolicyLaborClientBuilder) : WC7WorkersCompLineBuilder {
    addPopulator(new BuilderArrayPopulator(WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7PolicyLaborClients") as IArrayPropertyInfo, policyLaborClient))
    return this
  }

  function withWC7CoordinatedPolicy(coordinatedPolicyBuilder : WC7CoordinatedPolicyBuilder) : WC7WorkersCompLineBuilder {
    addArrayElement(WC7WorkersCompLine.Type.TypeInfo.getProperty("MultipleCoordinatedPolicies"), coordinatedPolicyBuilder, 400)
    return this
  }


  function withWC7PolicyLaborContractor(policyLaborContractor : WC7PolicyLaborContractorBuilder) : WC7WorkersCompLineBuilder {
    addPopulator(new BuilderArrayPopulator(WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7PolicyLaborContractors") as IArrayPropertyInfo, policyLaborContractor))
    return this
  }
  
  function withExcludedWorkplace(excludedWorkplace : WC7ExcludedWorkplaceBuilder) : WC7WorkersCompLineBuilder {
    addArrayElement(WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7ExcludedWorkplaces"), excludedWorkplace)
    return this
  }  
  
  function withWaiverOfSubro(waiver : WC7WaiverOfSubroBuilder) : WC7WorkersCompLineBuilder {
    addArrayElement(WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7WaiverOfSubros"), waiver)
    return this
  }  
  
  function withAircraftSeat(seat : WC7AircraftSeatBuilder) : WC7WorkersCompLineBuilder {
    addArrayElement(WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7AircraftSeats"), seat)
    return this
  }
  
  function withAircraftSeats(seats : ArrayList<WC7AircraftSeatBuilder>) : WC7WorkersCompLineBuilder {
    if (seats != null) {
      for (seat in seats) {
        addArrayElement(WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7AircraftSeats"), seat)
      }
    }
    
    return this
  }

  function withWC7ManuscriptOption(option : WC7ManuscriptOptionBuilder) : WC7WorkersCompLineBuilder {
    addArrayElement(WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7ManuscriptOptions"), option)
    return this
  }

  public static function createAllJurisdictions(policyPeriod: PolicyPeriod) {
    var line = policyPeriod.WC7Line
    policyPeriod.LocationStates.each( \state -> line.addJurisdiction(state ))
  }

  final function withWC7SupplDiseaseExposure(supplDiseaseExposureBuilder : WC7SupplDiseaseExposureBuilder) : WC7WorkersCompLineBuilder {
    addAdditiveArrayElement(WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7SupplDiseaseExposures"), supplDiseaseExposureBuilder)
    return this
  }

  final function withWC7AtomicEnergyExposure(atomicEnergyExposureBuilder : WC7AtomicEnergyExposureBuilder) : WC7WorkersCompLineBuilder {
    addAdditiveArrayElement(WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7AtomicEnergyExposures"), atomicEnergyExposureBuilder)
    return this
  }
  
  final function withWC7EmpLiabLimitWithStopGap(packageDescription : String, optionValue : String, stopGapValue : StopGap) : WC7WorkersCompLineBuilder {
    withCoverage(new CoverageBuilder(WC7WorkersCompCov)
                       .withPatternCode("WC7WorkersCompEmpLiabInsurancePolicyACov")
                       .withPackageCovTerm("WC7EmpLiabLimit", packageDescription)
                       .withOptionCovTerm("WC7EmpLiabPolicyLimit", optionValue)
                       .withTypekeyCovTerm("WC7StopGap", stopGapValue))
    return this
  }
  
  final function withWC7TerrorismRiskInsProgReauthEndt() : WC7WorkersCompLineBuilder {
    withCoverage(new CoverageBuilder(WC7WorkersCompCov)
                       .withPatternCode("WC7TerrsmRiskInsProgReauthActDisclsrCov1"))
    return this
  }
}