package gw.lob.wc7

uses gw.validation.PCValidationContext
uses gw.validation.ValidationUtil
uses gw.validation.PCValidationBase

@Export
class WC7PolicyInfoValidation extends PCValidationBase {

  var _line : WC7WorkersCompLine as Line
  
  property get wcLine() : WC7WorkersCompLine {
    return Line
  }

  construct(valContext : PCValidationContext, polLine : WC7WorkersCompLine) {
    super(valContext)
    _line = polLine
  }

  override protected function validateImpl() {
    Context.addToVisited(this, "validateImpl")
    checkYearBusinessStartedMakesSense()
  }
  
  function checkYearBusinessStartedMakesSense() {
    Context.addToVisited(this, "checkYearBusinessStartedMakesSense")
    var ybs = wcLine.Branch.Policy.Account.YearBusinessStarted
    if (ybs != null) {
      if (Context.isAtLeast("default")) {
        var min = ValidationUtil.getMinPolicyCreationYear()
        var max = ValidationUtil.getMaxPolicyCreationYear()
        if (ybs < min or ybs > max) {
          Result.addError(wcLine, "default",
            displaykey.Web.Policy.WC7.Validation.YearBusinessStarted(min, max))
        }
      }
    }
  }
  
  static function validateFields(line : WC7WorkersCompLine) {
    var context = ValidationUtil.createContext("default")
    new WC7PolicyInfoValidation(context, line).validate()
    context.raiseExceptionIfProblemsFound()
  }
}
