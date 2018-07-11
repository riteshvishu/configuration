package gw.lob.wc7.forms

uses java.util.Set
uses gw.forms.FormInferenceContext
uses gw.api.xml.XMLNode

@Export
class WC7Form_WC_00_01_01A extends WC7FormData {
  var _classCodes : Set<WC7ClassCode> // set of "deba" class codes

  override function populateInferenceData( context : FormInferenceContext, specialCaseStates: Set<Jurisdiction> ) : void {
    _classCodes = mapEmployeeBases(context, \e -> e.GoverningLaw == WC7GoverningLaw.TC_DEFENSEBASEACT, \e -> e.ClassCode)
  }

  override property get InferredByCurrentData() : boolean {
    return !_classCodes.Empty
  }

  override function addDataForComparisonOrExport( contentNode: XMLNode ) : void {
    var classCodesNode = new XMLNode("ClassCodes")
    contentNode.addChild(classCodesNode)
    for (c in _classCodes) {
      var classCodeNode = new XMLNode("ClassCode")
      classCodesNode.addChild(classCodeNode)
      classCodeNode.addChild(createTextNode("PublicId", c.PublicID))
      classCodeNode.addChild(ignoreAll(createTextNode("Description", c.ShortDesc)))
    }
  }

}
