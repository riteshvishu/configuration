package gw.lob.wc7.forms

uses java.util.Set
uses gw.forms.FormInferenceContext
uses java.math.BigDecimal
uses gw.api.xml.XMLNode
uses java.util.Date
uses gw.api.util.JurisdictionMappingUtil

@Export
class WC7Form_WC_00_02_01 extends WC7FormData {

  var _mariInfoSet : Set<MARIInfo>

  private static class MARIInfo {
    var _classCode : WC7ClassCode
    var _premium : BigDecimal
    var _deductible : productmodel.PackageWCDeductibleType
    
    construct(c : WC7ClassCode, p : BigDecimal, d : productmodel.PackageWCDeductibleType) {
      _classCode = c
      _premium = p
      _deductible = d  
    }
    
    override function equals(o : Object) : boolean {
      if (o == null || !(o typeis MARIInfo)) {
        return false
      }
      var otherInfo = o as MARIInfo
      return otherInfo._classCode == _classCode and otherInfo._premium == _premium and otherInfo._deductible == _deductible
    }
    
    override function hashCode() : int {
      var result = 7
      result += _classCode == null ? 0 : _classCode.hashCode()
      result = result * 31 + (_premium == null ? 0 : _premium.hashCode())
      result = result * 31 + (_deductible == null ? 0 : _deductible.hashCode())
      return result
    }
  }

  override function getLookupDate(context : FormInferenceContext, state : Jurisdiction) : DateTime {
    return context.Period.WC7Line.WC7FederalEmployersLiabilityActACov.ReferenceDate
  }

  override function populateInferenceData( context: FormInferenceContext, specialCaseStates: Set<Jurisdiction> ) : void {
    var line = context.Period.WC7Line
    //ToDo: Fix once WC7 product model clause patterns exist
    /*
    if (!line.WCFedEmpLiabCovExists) {
      _mariInfoSet = {} 
    } else {    
      _mariInfoSet = mapEmployees(context, \ w -> w.WC7GoverningLaw == "mari", \w -> createMARIInfo(line, w))
    } 
    */   
  }
  
  private function createMARIInfo(line : WC7WorkersCompLine, emp : WC7CoveredEmployee) : MARIInfo {
    var jurisdiction = line.getJurisdiction( JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(emp.Location ))
    //ToDo: Fix once WC7 product model clause patterns exist
    
    
    var dedTerm : productmodel.PackageWCDeductibleType = null //jurisdiction.WC7BenefitsDedCov.WC7DeductibleTerm
    return new MARIInfo(emp.ClassCode, emp.WC7CovEmpCost.ActualAmount, dedTerm)    
  }

  override property get InferredByCurrentData() : boolean {
    return !_mariInfoSet.Empty
  }

  override function addDataForComparisonOrExport( contentNode: XMLNode ) : void {
  }

}
