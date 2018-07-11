package gw.lob.wc7
uses gw.validation.PCValidationBase
uses gw.validation.PCValidationContext

class WC7WaiverOfSubroValidation extends PCValidationBase {

  var _waiver : WC7WaiverOfSubro

  construct(valContext : PCValidationContext, waiver: WC7WaiverOfSubro) {
    super(valContext)
    _waiver = waiver
  }

  override function validateImpl() {
    Context.addToVisited(this, "validateImpl")
    specificWaiverMustHaveJobID()
  }
  
  function specificWaiverMustHaveJobID() {
    Context.addToVisited(this, "specificWaiverMustHaveJobID")
    
    if (_waiver.Type == WC7WaiverOfSubrogation.TC_SPECIFIC and not _waiver.JobID.HasContent) {
      Result.addError(_waiver,
          ValidationLevel.TC_DEFAULT,
          displaykey.Web.Policy.WC7.Validation.WaiverOfSubro.JobIDRequiredForSpecificWaiver)
    }
  }

}
