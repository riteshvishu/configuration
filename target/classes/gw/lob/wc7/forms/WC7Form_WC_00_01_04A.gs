package gw.lob.wc7.forms

uses java.util.Set
uses gw.forms.FormInferenceContext
uses gw.api.xml.XMLNode
uses gw.api.util.StateJurisdictionMappingUtil
uses gw.api.util.JurisdictionMappingUtil

@Export
class WC7Form_WC_00_01_04A extends WC7FormData {
  var _felaStates : List<FELAStateInfo>
  
  override function getLookupDate(context : FormInferenceContext, state : Jurisdiction) : DateTime {
    return context.Period.WC7Line.WC7FederalEmployersLiabilityActACov.ReferenceDate
  }

  private static class FELAStateInfo {
    var _state : State
    var _deductible : productmodel.PackageWCDeductibleType
    
    construct(s : State, d : productmodel.PackageWCDeductibleType) {
      _state = s
      _deductible = d  
    }
  }

  override function populateInferenceData(context : FormInferenceContext, specialCaseStates : Set<Jurisdiction>) : void {
    var line = context.Period.WC7Line
    //ToDo: Fix once WC7 product model clause patterns exist
    /*
    if (!line.WCFedEmpLiabCovExists) {
      _felaStates = {}  
    } else {
      var states = mapEmployeeBases(context, \ w -> w.WC7GoverningLaw == "fela" , \ w -> JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(w.Location))
      _felaStates = states.map(\s -> new FELAStateInfo(StateJurisdictionMappingUtil.getStateMappingForJurisdiction(s), line.getJurisdiction(s).WCWorkCompDeductCov.WCDeductibleTerm)) 
    }
    */
  }

  override property get InferredByCurrentData() : boolean {
    return !_felaStates.Empty
  }

  override function addDataForComparisonOrExport(contentNode : XMLNode) : void {
  }
}
