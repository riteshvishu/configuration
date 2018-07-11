package gw.lob.wc7.forms

uses gw.forms.FormInferenceContext
uses gw.api.xml.XMLNode
uses java.util.ArrayList
uses java.util.Set

@Export
class WC7Form_WC_00_06_03_CT extends WC7FormData {
  var _deductible : gw.api.productmodel.CovTermPack
  
  override function getLookupDate(context : FormInferenceContext, state : Jurisdiction) : DateTime {
    //return context.Period.WC7Line.getJurisdiction(state).WCWorkCompDeductCov.ReferenceDate
    //ToDo: Update form
    return DateTime.createDateInstance(1, 1, 2000)
  }

  override function populateInferenceData( context: FormInferenceContext, specialCaseStates: Set<Jurisdiction> ) : void {
    var jurisdiction = context.Period.WC7Line.getJurisdiction( "CT" )
    /*
    if (jurisdiction != null and jurisdiction.WCWorkCompDeductCovExists and jurisdiction.WCWorkCompDeductCov.WCDeductibleTerm.PackageValue != null) {
      _deductible = jurisdiction.WCWorkCompDeductCov.WCDeductibleTerm.PackageValue    
    } 
    */  
  }

  override property get InferredByCurrentData() : boolean {
    return _deductible != null
  }

  override function addDataForComparisonOrExport( contentNode: XMLNode ) : void {
    contentNode.addChild(createScheduleNode( "States", "State", new ArrayList<String>(){"" + _deductible.PackageCode}))
  }

}
