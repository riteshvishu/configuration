package gw.forms.generic
uses gw.forms.GenericFormInference
uses gw.forms.FormData
uses gw.api.productmodel.PolicyLinePattern
uses gw.admin.FormPatternValidation
uses gw.forms.FormInferenceContext
uses java.util.Set
uses gw.xml.XMLNode
uses java.util.HashMap
uses java.util.Map

/**
 * WC7 specific generic class that can be used for any form that should be added to a policy whenever 
 * specific class code, is selected.
 */
@Export
class WC7GenericClassCodeSpecificForm extends FormData implements GenericFormInference {

  var _wc7ClassCode : WC7ClassCode
  var _line : WC7Line

  override property get DisplayName() : String {
    return displaykey.Web.Policy.WC7.Forms.WC7GenericClassCodeSpecificForm
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
    if (!formPattern.WC7FormPatternClassCodes.HasElements) {
        validation.Result.addError(formPattern, "default", displaykey.Validation.FormPattern.Inference.MissingRequired(formPattern.DisplayName, "Form Pattern Class Codes"))
        missingRequired = true
    }
    return missingRequired
  }

  override function clearCustomFields(formPattern : FormPattern) {
    formPattern.WC7FormPatternClassCodes.each(\ w -> formPattern.removeFromWC7FormPatternClassCodes(w))
  }


  override function populateInferenceData(context : FormInferenceContext, availableStates : Set<Jurisdiction>) {
    _line = getLine(context) as WC7Line
    if (_line != null) {
      var wc7CoveredEmployees = _line.WC7CoveredEmployees.where(\ c -> availableStates.contains(c.Jurisdiction.Jurisdiction))
      _wc7ClassCode = wc7CoveredEmployees*.ClassCode.firstWhere(\ cc -> Pattern.WC7FormPatternClassCodes.hasMatch(\ s -> s.Code == cc.Code))
    }
  }

  override property get InferredByCurrentData() : boolean {
    var shouldInfer = true
    if (_wc7ClassCode.Code.Empty or _wc7ClassCode == null) {
      shouldInfer = false
    } else if(not Pattern.WC7FormPatternClassCodes*.Code.contains(_wc7ClassCode.Code)) {
      shouldInfer = false
    } 

    return shouldInfer
  }
  
  override function getLookupDates(context : FormInferenceContext) : Map<Jurisdiction, DateTime> {        
    var resultMap = new HashMap<Jurisdiction,DateTime>()        
    for (classCode in Pattern.WC7FormPatternClassCodes){
      resultMap.put(classCode.Jurisdiction, getLookupDate(context, classCode.Jurisdiction))
    }
    return resultMap
  }
  
  override function addDataForComparisonOrExport( contentNode: XMLNode ) : void {
    //Add the WC7ClassCode
    var wc7ClassCodeNode = new XMLNode("WC7ClassCode")
    contentNode.addChild(wc7ClassCodeNode)
    wc7ClassCodeNode.addChild(createTextNode("ClassCode", _wc7ClassCode.Code))
    wc7ClassCodeNode.addChild(createTextNode("Classification", _wc7ClassCode.Classification))
    wc7ClassCodeNode.addChild(createTextNode("Jurisdiction", _wc7ClassCode.Jurisdiction.Code))
    wc7ClassCodeNode.addChild(ignoreAll(createTextNode("Description", _wc7ClassCode.ShortDesc)))
    
    contentNode.print()
  }

}