package gw.forms.generic
uses gw.forms.FormData
uses gw.forms.GenericFormInference
uses gw.admin.FormPatternValidation
uses gw.forms.FormInferenceContext
uses java.util.Set
uses gw.xml.XMLNode
uses gw.api.productmodel.PolicyLinePattern

/**
 * Generic class that can be used for any form that should be added to a policy whenever the
 * a covered employee's governing law is selected.
 */
@Export
class WC7GenericGoverningLawTypeKeyForm extends FormData implements GenericFormInference {

  var _wc7CoveredEmployees : WC7CoveredEmployeeBase[]
  var _line : WC7Line

  override property get DisplayName() : String {
    return displaykey.Web.Policy.WC7.Forms.WC7GenericGoverningLawTypeKeyForm
  }

  override property get ValidPolicylines() : List<PolicyLinePattern> {
    return PolicyLinePattern.getAll().where(\ p -> p == "WC7Line")
  }

  override property get PolicyLineRequired() : boolean {
    return true
  }

  override function validateCustomFields(formPattern : FormPattern, validation : FormPatternValidation) {
    if (missingRequiredFields(formPattern, validation)) {
      return
    }

    if (formPattern.PolicyLinePatternRef == null) {
      validation.Result.addError(formPattern, "default", displaykey.Validation.FormPattern.Inference.LineDoesNotExist(formPattern.DisplayName, formPattern.PolicyLinePatternCode))
    } 
  }

  protected function missingRequiredFields(formPattern : FormPattern, validation : FormPatternValidation) : boolean {
    var missingRequired = false
    if (formPattern.PolicyLinePatternCode == null) {
      validation.Result.addError(formPattern, "default", displaykey.Validation.FormPattern.Inference.MissingRequired(formPattern.DisplayName, "PolicyLinePatternCode"))
      missingRequired = true
    }
    if (formPattern.GoverningLawType == null) {
      validation.Result.addError(formPattern, "default", displaykey.Validation.FormPattern.Inference.MissingRequired(formPattern.DisplayName, "GoverningLawType"))
      missingRequired = true
    }
    return missingRequired
  }

  override function clearCustomFields(formPattern : FormPattern) {
    formPattern.GoverningLawType = null
  }


  override function populateInferenceData(context : FormInferenceContext, availableStates : Set<Jurisdiction>) {
    _line = getLine(context) as WC7Line
    if (_line != null) {
      _wc7CoveredEmployees = _line.WC7CoveredEmployeeBases.where(\ c -> 
          c.GoverningLaw == Pattern.GoverningLawType and
          availableStates.contains(c.Jurisdiction.Jurisdiction))
    }
  }

  override property get InferredByCurrentData() : boolean {
    return _wc7CoveredEmployees.HasElements and
        _wc7CoveredEmployees.allMatch(\ c -> c.GoverningLaw == Pattern.GoverningLawType)
  }

  override function addDataForComparisonOrExport( contentNode: XMLNode ) : void {
    //Add the WC7CoveredEmployees
    var coveredEmployeesNode = new XMLNode("WC7CoveredEmployees")
    contentNode.addChild(coveredEmployeesNode)
    for (coveredEmp in _wc7CoveredEmployees) {
      var coveredEmpNode = new XMLNode("WC7CoveredEmployee")
      coveredEmployeesNode.addChild(coveredEmpNode)
      coveredEmpNode.addChild(createTextNode("Jurisdiction", coveredEmp.Jurisdiction.Jurisdiction.Code))
      coveredEmpNode.addChild(ignoreAll(createTextNode("Name", coveredEmp.DisplayName)))
      coveredEmpNode.addChild(ignoreAll(createTextNode("GoverningLaw", coveredEmp.GoverningLaw.Code)))
    }
  }

}