package gw.lob.wc7

uses java.util.Date
uses java.io.Serializable
uses gw.api.database.Query
uses gw.api.database.Relop
uses gw.api.effdate.EffDatedFinderUtil

@Export
class WC7ClassCodeSearchCriteria implements Serializable {
  var _code: String as Code
  var _classification: String as Classification
  var _shortDesc: String as ShortDesc
  var _jurisdiction : Jurisdiction as Jurisdiction
  var _effectiveAsOfDate: Date as EffectiveAsOfDate
  var _previousSelectedClassCode : WC7ClassCode as PreviousSelectedClassCode
  var _classCodeType : WC7ClassCodeType as ClassCodeType
  var _constructionType : boolean as ConstructionType
  var _diseaseType : boolean as DiseaseType
  var _programType : WC7ClassCodeProgramType as ProgramType
  var _excludedClassCodeTypes : List<WC7ClassCodeType> as ExcludedClassCodeTypes

  function performSearch() : WC7ClassCodeQuery {
    var query = constructBaseQuery()
    if (this.Code != null) {
      query.startsWith(WC7ClassCode.Type.TypeInfo.getProperty("Code") as String, this.Code, true ) 
    }
    
    if (this.EffectiveAsOfDate != null) {
      EffDatedFinderUtil.addRestrictionsForEffectiveOnDate(query, this.EffectiveAsOfDate)
    }
    
    // don't need to do union if it's searching for specific code and the code is not previous code
    if (this.PreviousSelectedClassCode != null and (this.Code == null or this.PreviousSelectedClassCode.Code.startsWith(this.Code))) { 
      return query.union( getQueryForPreviousClassCode()).select()
    }
    return query.select()
  }

  function performExactSearch() : WC7ClassCodeQuery {
    var query = constructBaseQuery()
    if (this.Code != null) {
      query.compare(WC7ClassCode.Type.TypeInfo.getProperty("Code") as String, Relop.Equals, this.Code) 
    }
    
    if (this.EffectiveAsOfDate != null) {
      EffDatedFinderUtil.addRestrictionsForEffectiveOnDate(query, this.EffectiveAsOfDate)
    }
    
    if (this.PreviousSelectedClassCode != null and (this.Code == null or this.PreviousSelectedClassCode.Code == this.Code)) {
      return query.union( getQueryForPreviousClassCode()).select()
    }
    return query.select()
  }
  
  private function constructBaseQuery() : Query<WC7ClassCode> {
    var aQuery = Query.make(WC7ClassCode)
    
    if (this.Classification != null ) {
      aQuery.contains("Classification", this.Classification, true)
    }
    if (this.ShortDesc != null ) {
      aQuery.contains("ShortDesc", this.ShortDesc, true)
    }
    if (this.Jurisdiction != null ) {
      aQuery.compare("Jurisdiction", Relop.Equals, this.Jurisdiction)
    }  
    if (this.ClassCodeType != null) {
      aQuery.compare("ClassCodeType", Relop.Equals, this.ClassCodeType)
    } else if (this.ExcludedClassCodeTypes.HasElements) {
      aQuery.or(\ restriction -> restriction.compare("ClassCodeType", Relop.Equals, null)
             .compareNotIn("ClassCodeType", this.ExcludedClassCodeTypes.toArray()))
    }
    if (this.ConstructionType) {
      aQuery.compare("ConstructionType", Relop.Equals, true)
    }
    if (this.DiseaseType) {
      aQuery.compare("DiseaseType", Relop.Equals, true)
    }
    if (this.ProgramType != null) {
      aQuery.compare("ProgramType", Relop.Equals, this.ProgramType)
    }
    return aQuery
  }
  
  private function getQueryForPreviousClassCode() : Query<WC7ClassCode> {
    var q = constructBaseQuery()
    if (this.PreviousSelectedClassCode != null) {
      q.compare(WC7ClassCode.Type.TypeInfo.getProperty("Code") as String, Relop.Equals, this.PreviousSelectedClassCode.Code)
    }
    return q
  }  
}
