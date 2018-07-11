package gw.api.databuilder.wc7

uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.BuilderContext
uses gw.api.productmodel.ConditionPattern

class WC7CoordinatedPolicyBuilder extends DataBuilder<WC7CoordinatedPolicy, WC7CoordinatedPolicyBuilder> {

  construct() {
    super(WC7CoordinatedPolicy)
  }
  
  protected override function createBean(context : BuilderContext) : WC7CoordinatedPolicy {
    var line = context.getParentBean() as entity.WC7WorkersCompLine
    var multipleCoordinatedPolicyCond : ConditionPattern = "WC7MultipleCoordinatedPolicyEndorsementCond"
    line.setConditionExists(multipleCoordinatedPolicyCond, true)
    var coordinatedPolicy = new WC7CoordinatedPolicy(line.Branch)
    line.addToMultipleCoordinatedPolicies(coordinatedPolicy)
    coordinatedPolicy.setFieldValue("MultipleCoordindatedPolicyCond", line.WC7MultipleCoordinatedPolicyEndorsementCond)
    
    coordinatedPolicy.LaborContractor = line.WC7PolicyLaborContractors.first()?.AccountContactRole as LaborContractor
    return coordinatedPolicy
  }
  
  final function withDescription(desc : String) : WC7CoordinatedPolicyBuilder {
    set(WC7CoordinatedPolicy.Type.TypeInfo.getProperty("Description"), desc)
    return this
  }

  final function withJurisdiction(aJurisdiction : Jurisdiction) : WC7CoordinatedPolicyBuilder {
    return withStatePerformed(aJurisdiction)
  }

  final function withState(aJurisdiction : Jurisdiction) : WC7CoordinatedPolicyBuilder {
    return withStatePerformed(aJurisdiction)
  }

  final function withStatePerformed(aJurisdiction : Jurisdiction) : WC7CoordinatedPolicyBuilder {
    set(WC7CoordinatedPolicy.Type.TypeInfo.getProperty("StatePerformed"), aJurisdiction)
    return this
  }

  final function withContractProject(str : String) : WC7CoordinatedPolicyBuilder {
    set(WC7CoordinatedPolicy.Type.TypeInfo.getProperty("ContractProject"), str)
    return this
  }

  final function withNumber(str : String) : WC7CoordinatedPolicyBuilder {
    return withLaborContractorPolicyNumber(str)
  }

  final function withLaborContractorPolicyNumber(str : String) : WC7CoordinatedPolicyBuilder {
    set(WC7CoordinatedPolicy.Type.TypeInfo.getProperty("LaborContractorPolicyNumber"), str)
    return this
  }

  final function withAccountLaborContractor(aLaborContractor : entity.LaborContractor) : WC7CoordinatedPolicyBuilder {
     set(WC7CoordinatedPolicy.Type.TypeInfo.getProperty("LaborContractor"), aLaborContractor)
     return this
  }
}
