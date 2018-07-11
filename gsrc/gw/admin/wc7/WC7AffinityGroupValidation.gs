package gw.admin.wc7
uses gw.validation.PCValidationBase
uses gw.validation.PCValidationContext
uses gw.validation.ValidationUtil

@Export
class WC7AffinityGroupValidation extends PCValidationBase {

  var _affinityGroup : WC7AffinityGroup as AffinityGroup

  construct(valContext : PCValidationContext, anAffinityGroup : WC7AffinityGroup) {
    super(valContext)
    _affinityGroup = anAffinityGroup
  }
  
  override protected function validateImpl() {
    Context.addToVisited(this, "validateImpl")
    validateAffinityGroupProducerCodes()
    checkDuplicateJurisdictions()
  }

  /**
   * Validates the producer affinity group producer codes to check that the codes are valid for a closed affinity group type
   *
   * @param group - the affinity group to use.
   */  
  function validateAffinityGroupProducerCodes() {
    Context.addToVisited(this, "validateAffinityGroupProducerCodes")
    if (AffinityGroup.AffinityGroupType == WC7AffinityGroupType.TC_CLOSED) {
      if (AffinityGroup.AffinityGroupProducerCodes.IsEmpty) {
        Result.addError(AffinityGroup, ValidationLevel.TC_DEFAULT, displaykey.Web.Admin.ProducerCodeRequired)
      } else {
        var producerCodesNotMatchingOrganization = AffinityGroup.AffinityGroupProducerCodes.where(\ code -> code.ProducerCode.Organization != AffinityGroup.Organization)
        if (producerCodesNotMatchingOrganization.HasElements) {                                                                       
          var displayableString = producerCodesNotMatchingOrganization.map(\ code -> code.ProducerCode.Code).join(",")
          Result.addError(AffinityGroup, ValidationLevel.TC_DEFAULT, displaykey.Web.Admin.ProducerCodesNotMatchingOrganization(displayableString, AffinityGroup.Organization.DisplayName))
        }
      }
    }
  }

  function checkDuplicateJurisdictions() {
    Context.addToVisited(this, "checkDuplicateJurisdictions")
    // Ensure there are no duplicate jurisdictions
    AffinityGroup.Jurisdictions
      .partition(\ jur -> "${jur.Jurisdiction}")  
      .filterByValues(\ l -> l.Count > 1)
      .eachValue(\ dup -> { 
         Result.addError(AffinityGroup, ValidationLevel.TC_DEFAULT,
           displaykey.Web.Admin.JurisdictionExists(dup.first().Jurisdiction.Description))                           
         })
  }
    
  static function validate(anAffinityGroup : WC7AffinityGroup) {
    var context = ValidationUtil.createContext(ValidationLevel.TC_DEFAULT)
    new WC7AffinityGroupValidation(context, anAffinityGroup).validate()
    context.raiseExceptionIfProblemsFound()
  }
}
