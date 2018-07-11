package gw.solr
uses gw.api.solr.SolrDocument
uses java.util.Date
uses java.lang.StringBuilder

/**
 * Represents a PC search result
 */
@Export
class SolrPolicyResultDocument implements SolrDocument {

  var _policyNumber : String as PolicyNumber
  var _sliceDate : Date as SliceDate
  var _urn : String as URN
  var _periodID : String as PeriodID
  var _status : String as PeriodStatus
  var _jobType : String as JobType
  var _score : String as Score
  var _rank : int as Rank
  var _fullName : String as FullName
  var _company : String as Company
  var _productCode : String as ProductCode
  var _producer : String as Producer
  var _producerCodeOfService : String as ProducerCodeOfService
  var _addressLine1 : String as AddressLine1
  var _city : String as City
  var _state : String as State
  var _postalCode : String as PostalCode
  var _periodStart : Date as PeriodStart
  var _periodEnd : Date as PeriodEnd
  var _officialId : String as OfficialId
  var _aniCompanies : List<String> as ANICompanies = {}
  var _aniPersons : List<String> as ANIPersons = {}
  var _phones : List<String> as Phones

  override function toString() : String {
    var sb = new StringBuilder()
    sb.append(typeof this)
    sb.append("[")
    
    sb.append("PolicyNumber="); sb.append(PolicyNumber); sb.append(", ")
    sb.append("URN="); sb.append(URN); sb.append(", ")
    sb.append("PeriodID="); sb.append(PeriodID); sb.append(", ")
    sb.append("PeriodStatus="); sb.append(PeriodStatus); sb.append(", ")
    sb.append("JobType="); sb.append(JobType); sb.append(", ")
    sb.append("Score="); sb.append(Score); sb.append(", ")
    sb.append("Rank="); sb.append(Rank); sb.append(", ")
    sb.append("FullName="); sb.append(FullName); sb.append(", ")
    sb.append("Company="); sb.append(Company); sb.append(", ")
    sb.append("ProductCode="); sb.append(ProductCode); sb.append(", ")
    sb.append("Producer="); sb.append(Producer); sb.append(", ")
    sb.append("ProducerCodeOfService="); sb.append(ProducerCodeOfService); sb.append(", ")
    sb.append("AddressLine1="); sb.append(AddressLine1); sb.append(", ")
    sb.append("City="); sb.append(City); sb.append(", ")
    sb.append("State="); sb.append(State); sb.append(", ")
    sb.append("PostalCode="); sb.append(PostalCode); sb.append(", ")
    sb.append("PeriodStart="); sb.append(PeriodStart); sb.append(", ")
    sb.append("PeriodEnd="); sb.append(PeriodEnd); sb.append(", ")
    sb.append("SliceDate="); sb.append(SliceDate);
    sb.append("OfficialId="); sb.append(OfficialId); sb.append(", ")
    sb.append("ANICompanies="); sb.append(ANICompanies); sb.append(", ")
    sb.append("ANIPersons="); sb.append(ANIPersons); sb.append(", ")
    sb.append("Phone="); sb.append(Phones);
    
    sb.append("]")
    
    return sb.toString()
  }
  
  property get PrimaryInsuredName() : String {
    return Company.HasContent ? Company : FullName
  }

  property get PolicyAddress() : String {
    return AddressLine1 + "\n" + City + ", " + State + " " + PostalCode
  }
  
  property get AdditionalInsureds() : List<String>{
    return _aniPersons.union(_aniCompanies).order()
  }
  
          
}
