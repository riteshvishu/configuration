package gw.api.databuilder.wc7.contact

uses gw.api.builder.PolicyContactRoleBuilder
uses gw.api.databuilder.BuilderContext

/**
 * A builder that creates owner/officers for WC7Line.
 * 
 * For {@link WC7IncludedOwnerOfficer}, call #isInclude()
 * For {@link WC7ExcludedOwnerOfficer}, call #isExcluded()
 * The default will create an {@link WC7IncludedOwnerOfficer}.  
 * Also, by default default values will set the appropriate owner/officer condition or exclusion.
 */
@Export
class WC7PolicyOwnerOfficerBuilder extends PolicyContactRoleBuilder<WC7PolicyOwnerOfficer, WC7PolicyOwnerOfficerBuilder> {
  var _isIncluded : boolean = true
  var _classCode : WC7ClassCode = null

  construct() {
    super(WC7PolicyOwnerOfficer)
  }
  
  function withInclusion(inclusionType : typekey.Inclusion) : WC7PolicyOwnerOfficerBuilder {
    _isIncluded = (inclusionType == typekey.Inclusion.TC_EXCL) ?  false : true
    return this
  }
  
  function isIncluded() : WC7PolicyOwnerOfficerBuilder {
    return withInclusion(Inclusion.TC_INCL)
  }
  
  function isExcluded() : WC7PolicyOwnerOfficerBuilder {
    return withInclusion(Inclusion.TC_EXCL)
  }

  function withJurisdiction(jurisdiction : Jurisdiction) : WC7PolicyOwnerOfficerBuilder {
    var propertyInfo = WC7PolicyOwnerOfficer.Type.TypeInfo.getProperty("Jurisdiction")
    set(propertyInfo, jurisdiction)
    return this
  }
  
  function withClassCode(classCode : WC7ClassCode) : WC7PolicyOwnerOfficerBuilder {
    isIncluded()
    _classCode = classCode
    return this
  }
  
  function withOwnershipPercentage(percent : int) : WC7PolicyOwnerOfficerBuilder {
    set(WC7PolicyOwnerOfficer#WC7OwnershipPct.PropertyInfo, percent)
    return this
  }
    
  protected override function createBean(context : BuilderContext) : WC7PolicyOwnerOfficer {
    var period = context.ParentBean as PolicyPeriod
    var line = period.WC7Line
    var newOwnerOfficer : WC7PolicyOwnerOfficer = null
    if (_isIncluded){
      line.setConditionExists("WC7SoleProprietorsPartnersOfficersAndOthersCovCond", true)
      var includedOwnerOfficer = new WC7IncludedOwnerOfficer(period)
      includedOwnerOfficer.setFieldValue("OwnerOfficerCondition", line.WC7SoleProprietorsPartnersOfficersAndOthersCovCond)
      newOwnerOfficer = includedOwnerOfficer
      if (_classCode != null){
        includedOwnerOfficer.WC7ClassCode = _classCode
      }
    } else {
      line.setExclusionExists("WC7PartnersOfficersAndOthersExclEndorsementExcl", true)
      var excludedOwnerOfficer = new WC7ExcludedOwnerOfficer(period)
      excludedOwnerOfficer.setFieldValue("OwnerOfficerExclusion", line.WC7PartnersOfficersAndOthersExclEndorsementExcl)
      newOwnerOfficer = excludedOwnerOfficer
    } 
    line.addToWC7PolicyOwnerOfficers(newOwnerOfficer)         
    return newOwnerOfficer
  }

}