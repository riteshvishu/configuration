package gw.lob.wc7.forms

uses gw.api.xml.XMLNode
uses gw.forms.FormInferenceContext
uses java.util.Set

@Export
class WC7Form_WC_00_06_03_US extends WC7FormData {
  var _jurisdictions : WC7Jurisdiction[]

  override function getLookupDate(context : FormInferenceContext, state : Jurisdiction) : DateTime {
    //return context.Period.WC7Line.getJurisdiction(state).WCWorkCompDeductCov.ReferenceDate
    //ToDo: Update form
    return DateTime.createDateInstance(1, 1, 2000)
  }

  override function populateInferenceData(context : FormInferenceContext, specialCaseStates : Set<Jurisdiction>) : void {
    //ToDo: Update form when workers comp product module clause patterns are comlete
    /*
    _jurisdictions = context.Period.WC7Line.WC7Jurisdictions
      .where(\j -> specialCaseStates.contains(j.State) and j.WCWorkCompDeductCov.WCDeductibleTerm.PackageValue != null)
      */
  }

  override property get InferredByCurrentData() : boolean {
    return _jurisdictions.Count > 0
  }

  override function addDataForComparisonOrExport(contentNode : XMLNode) : void {
    //ToDo: Update form when workers comp product module clause patterns are comlete
    /*
    var scheduleNode = createScheduleNode("States", "State",
      _jurisdictions.map(\j -> j.State.Code + " - " + j.WCWorkCompDeductCov.WCDeductibleTerm.PackageValue.PackageCode).toList())
    contentNode.Children.add(scheduleNode)
    */
  }
}
