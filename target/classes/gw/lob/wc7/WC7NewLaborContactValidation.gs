package gw.lob.wc7

uses gw.validation.PCValidationContext
uses gw.validation.PCValidationBase
uses gw.validation.ValidationUtil

/**
 * Validation for {@link WC7LaborContactDetail}
 */
@Export
class WC7NewLaborContactValidation extends PCValidationBase {
  
  var _contact : WC7LaborContactDetail

  construct(valContext : PCValidationContext, contact : WC7LaborContactDetail) {
    super(valContext)
    _contact = contact
  }
  
  override protected function validateImpl() {
    if (not Context.addToVisited(this, "validateImpl")) {
      return
    }
    laborClientDatesValid()
  }
  
  /**
   * contract effective date is before contract expiration date.
   */
  function laborClientDatesValid() {
    Context.addToVisited(this, "laborContact")
    if (_contact.ContractEffectiveDate.compareIgnoreTime(_contact.ContractExpirationDate) > 0) {
      Context.Result.addError(_contact,
          "default",
          displaykey.Web.Policy.WC.Validation.datesValid,
          displaykey.Web.Policy.WC.Validation.laborClient)
    }
  }

  static function validate(contact : WC7LaborContactDetail) {
    var context = ValidationUtil.createContext(ValidationLevel.TC_DEFAULT)
    new WC7NewLaborContactValidation(context, contact).validate()
    context.raiseExceptionIfProblemsFound()
  }
}