package gw.api.databuilder.wc7.contact

uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.BuilderContext
uses gw.api.productmodel.ConditionPattern
uses gw.api.productmodel.ExclusionPattern
uses java.lang.IllegalStateException
uses java.lang.IllegalArgumentException

@Export
class WC7LaborContactDetailBuilder extends DataBuilder<WC7LaborContactDetail, WC7LaborContactDetailBuilder>{

  var _isIncluded : boolean = true
  var _parentCondition : ConditionPattern
  var _parentExclusion : ExclusionPattern

  construct() {
    super(WC7LaborContactDetail)
  }
  
  function withInclusion(inclusionVal : Inclusion) : WC7LaborContactDetailBuilder {
    _isIncluded = inclusionVal == typekey.Inclusion.TC_INCL ? true : false
    return this
  }
  
  function asIncluded() : WC7LaborContactDetailBuilder {
    _isIncluded = true
    return this
  }

  function asExcluded() : WC7LaborContactDetailBuilder {
    _isIncluded = false
    return this
  }
  
  function withWorkLocation(workLocation : String) : WC7LaborContactDetailBuilder {
    set(WC7LaborContactDetail.Type.TypeInfo.getProperty("WorkLocation"), workLocation)
    return this
  }
  
  function withDescriptionOfDuties(descriptionOfDuties : String) : WC7LaborContactDetailBuilder {
    set(WC7LaborContactDetail.Type.TypeInfo.getProperty("DescriptionOfDuties"), descriptionOfDuties)
    return this
  }

  function withContractOrProject(contractOrProject: String) : WC7LaborContactDetailBuilder {
    set(WC7LaborContactDetail.Type.TypeInfo.getProperty("ContractProject"), contractOrProject)
    return this
  }
  
  function withNumberOfEmployees(numberOfEmployees : int) : WC7LaborContactDetailBuilder {
    set(WC7LaborContactDetail.Type.TypeInfo.getProperty("NumberOfEmployees"), numberOfEmployees)
    return this
  }
  
  function withContractEffectiveDate(contractEffectiveDate : DateTime) : WC7LaborContactDetailBuilder {
    set(WC7LaborContactDetail.Type.TypeInfo.getProperty("ContractEffectiveDate"), contractEffectiveDate)
    return this
  }
  
  function withContractExpirationDate(contractExpirationDate : DateTime) : WC7LaborContactDetailBuilder {
    set(WC7LaborContactDetail.Type.TypeInfo.getProperty("ContractExpirationDate"), contractExpirationDate)
    return this
  }

  function withJurisdiction(aJurisdiction : Jurisdiction) : WC7LaborContactDetailBuilder {
    set(WC7LaborContactDetail.Type.TypeInfo.getProperty("Jurisdiction"), aJurisdiction)
    return this
  }
  
  function forCondition(condition : ConditionPattern) : WC7LaborContactDetailBuilder {
    _parentCondition = condition
    return asIncluded()
  }

  function forExclusion(exclusion : ExclusionPattern) : WC7LaborContactDetailBuilder {
    _parentExclusion = exclusion
    return asExcluded()
  }
    
  protected override function createBean(context : BuilderContext) : WC7LaborContactDetail {
    var parentContact = context.ParentBean as WC7LaborContact
    var newLaborContactDetail : WC7LaborContactDetail = null
    var line = parentContact.Branch.WC7Line
    if (line == null){
      throw new IllegalArgumentException("asdf") 
    }
    
    if (parentContact typeis WC7PolicyLaborClient){
      newLaborContactDetail = setupLaborClient(line, parentContact) 
    } else if (parentContact typeis WC7PolicyLaborContractor){
      newLaborContactDetail = setupLaborContractor(line, parentContact) 
    } else {
      throw new IllegalStateException("Expected a parent contact")
    }
    return newLaborContactDetail
  }
  
  private function setupLaborClient(line : WC7Line, parentContactRole : WC7PolicyLaborClient) : WC7LaborContactDetail {
    var newDetail : WC7LaborContactDetail
    var conditionPattern : ConditionPattern = _parentCondition ?: "WC7EmployeeLeasingClientEndorsementCond"
    var exclusionPattern : ExclusionPattern = _parentExclusion ?: "WC7EmployeeLeasingClientExclEndorsementExcl"
    if (_isIncluded){
      line.setConditionExists(conditionPattern, true)
      newDetail = parentContactRole.addNewIncludedLaborClientDetail(line.getCondition(conditionPattern))
    } else {
      line.setExclusionExists(exclusionPattern, true)
      newDetail = parentContactRole.addNewExcludedLaborClientDetail(line.getExclusion(exclusionPattern))
    }
    return newDetail
  }
  
  private function setupLaborContractor(line : WC7Line, parentContactRole : WC7PolicyLaborContractor) : WC7LaborContactDetail {
    var newDetail : WC7LaborContactDetail
    var conditionPattern : ConditionPattern = _parentCondition ?: "WC7LaborContractorEndorsementACond"
    var exclusionPattern : ExclusionPattern = _parentExclusion ?: "WC7LaborContractorExclEndorsementExcl"
    if (_isIncluded){
      line.setConditionExists(conditionPattern, true)
      newDetail = parentContactRole.addNewIncludedLaborContractorDetail(line.getCondition(conditionPattern))
    } else {
      line.setExclusionExists(exclusionPattern, true)
      newDetail = parentContactRole.addNewExcludedLaborContractorDetail(line.getExclusion(exclusionPattern))
    }
    return newDetail
  }
}
