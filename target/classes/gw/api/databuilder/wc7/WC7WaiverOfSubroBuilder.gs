package gw.api.databuilder.wc7

uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.BuilderContext
uses java.lang.Integer
uses gw.api.productmodel.ConditionPattern
uses gw.api.database.Query
uses java.util.Date

@Export
class WC7WaiverOfSubroBuilder extends DataBuilder<WC7WaiverOfSubro, WC7WaiverOfSubroBuilder> {

  var _type : typekey.WC7WaiverOfSubrogation as Type
  var _jurisdiction : typekey.Jurisdiction as WaiverJurisdiction
  var _classCodeCode : String

  construct() {
    super(WC7WaiverOfSubro)
  }

  protected override function createBean(context : BuilderContext) : WC7WaiverOfSubro {
    var line = context.getParentBean() as entity.WC7WorkersCompLine
    var waiverCondPattern : ConditionPattern = "WC7WaiverOfOurRightToRecoverFromOthersEndorsemCond"
    line.setConditionExists(waiverCondPattern, true)
    var newWaiver = line.createAndAddWaiver(Type, line.WC7WaiverOfOurRightToRecoverFromOthersEndorsemCond)
    if (Type == typekey.WC7WaiverOfSubrogation.TC_SPECIFIC){
      //Ensure that the class code and jurisdiction are set.
      if (WaiverJurisdiction == null){
        newWaiver.Jurisdiction = line.WC7Jurisdictions.first().Jurisdiction
      }
      if (_classCodeCode != null) {
        newWaiver.ClassCode = findFirstLegalClassCode(newWaiver)
      }
      if (newWaiver.ClassCode == null){        
        newWaiver.ClassCode = line.WC7CoveredEmployees.first().ClassCode
      }
    }
    return newWaiver
  }
  
  final function asSpecific() : WC7WaiverOfSubroBuilder {
    return withWaiverType(typekey.WC7WaiverOfSubrogation.TC_SPECIFIC) 
  }
  
  final function asBlanket() : WC7WaiverOfSubroBuilder {
    return withWaiverType(typekey.WC7WaiverOfSubrogation.TC_BLANKET) 
  }
    
  final function withWaiverType(waiverType : typekey.WC7WaiverOfSubrogation) : WC7WaiverOfSubroBuilder {
    set(WC7WaiverOfSubro.Type.TypeInfo.getProperty("Type"), waiverType)
    _type = waiverType
    return this
  }

  @Deprecated("Use #withJurisdiction(typekey.Jurisidction) : WC7WavierOfSubroBuilder")
  final function withState(theJurisdiction : Jurisdiction) : WC7WaiverOfSubroBuilder {
    return withJurisdiction(theJurisdiction)
  }    

  final function withJurisdiction(theJurisdiction : Jurisdiction) : WC7WaiverOfSubroBuilder {
    set(WC7WaiverOfSubro.Type.TypeInfo.getProperty("Jurisdiction"), theJurisdiction)
    return this
  }    
  
  final function withGoverningLawCov(governingLawCov : WC7GoverningLaw) : WC7WaiverOfSubroBuilder {
    set(WC7WaiverOfSubro.Type.TypeInfo.getProperty("GoverningLaw"), governingLawCov)
    return this
  }  
  
  final function withDescription(desc : String) : WC7WaiverOfSubroBuilder {
    set(WC7WaiverOfSubro.Type.TypeInfo.getProperty("Description"), desc)
    return this
  }
  
  @Deprecated("use #withPayroll(Integer) instead")
  final function withPayroll(payroll : Integer) : WC7WaiverOfSubroBuilder {
    return withBasis(payroll)
  }
  
  final function withBasis(basisAmount : Integer) : WC7WaiverOfSubroBuilder {
    set(WC7WaiverOfSubro.Type.TypeInfo.getProperty("BasisAmount"), basisAmount)
    return this
  }

  final function withJobID(jobID : String) : WC7WaiverOfSubroBuilder {
    set(WC7WaiverOfSubro.Type.TypeInfo.getProperty("JobID"), jobID)
    return this
  }
  
  final function withClassCode(code : WC7ClassCode) : WC7WaiverOfSubroBuilder {
    set(WC7WaiverOfSubro.Type.TypeInfo.getProperty("ClassCode"), code)
    return this
  }
  
  final function withClassCode(code : String) : WC7WaiverOfSubroBuilder {
    _classCodeCode = code
    return this
  }
  
  final function withSpecificDiseaseLoaded() : WC7WaiverOfSubroBuilder {
    set(WC7WaiverOfSubro.Type.TypeInfo.getProperty("SpecificDiseaseLoaded"), true)
    return this
  }
  
  final function withoutSpecificDiseaseLoaded() : WC7WaiverOfSubroBuilder {
    set(WC7WaiverOfSubro.Type.TypeInfo.getProperty("SpecificDiseaseLoaded"), false)
    return this
  }
  
  final function withEffectiveDate(effDate : Date) : WC7WaiverOfSubroBuilder {
    set(WC7WaiverOfSubro.Type.TypeInfo.getProperty("EffectiveDate"), effDate)
    return this
  }
  
  final function withExpirationDate(expDate : Date) : WC7WaiverOfSubroBuilder {
    set(WC7WaiverOfSubro.Type.TypeInfo.getProperty("ExpirationDate"), expDate)
    return this
  }
  
  private function findFirstLegalClassCode(waiver : WC7WaiverOfSubro) : WC7ClassCode {
    var result = Query.make(WC7ClassCode)
      .compare("Code", Equals, _classCodeCode)
      .compare("Jurisdiction", Equals, waiver.Jurisdiction)
    return result.select().FirstResult
  }
  
}
