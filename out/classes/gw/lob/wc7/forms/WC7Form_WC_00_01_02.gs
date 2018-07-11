package gw.lob.wc7.forms

uses gw.forms.FormInferenceContext
uses java.util.Set
uses gw.api.xml.XMLNode

@Export
class WC7Form_WC_00_01_02 extends WC7FormData {

  var _states : Set<State>
  
  override function populateInferenceData( context: FormInferenceContext, specialCaseStates: Set<Jurisdiction> ) : void {
    _states = mapEmployeeBases(context, \e -> e.GoverningLaw == WC7GoverningLaw.TC_FEDCOALMINE, \e -> e.Location.State)
  }

  override property get InferredByCurrentData() : boolean {
    return !_states.Empty
  }

  override function addDataForComparisonOrExport( contentNode: XMLNode ) : void {
    var statesNode = new XMLNode("States")
    contentNode.addChild(statesNode)
    for (s in _states) {
      var stateNode = new XMLNode("State")
      statesNode.addChild(stateNode)
      stateNode.addChild(createTextNode("Code", s.Code))
      stateNode.addChild(ignoreAll(createTextNode("Name", s.DisplayName)))
    }
  }

}
