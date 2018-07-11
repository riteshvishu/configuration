package gw.rating.impact

uses gw.api.database.EmptyQuery
uses gw.api.database.IQueryBeanResult
uses gw.api.database.Query
uses gw.api.productmodel.Product
uses gw.lang.Export
uses java.io.Serializable
uses java.lang.String
uses java.util.Date
uses typekey.Jurisdiction

/**
 * The ImpactTestingSearchCriteria is used to select a set of policy periods for running rating impact testing on.
 */
@Export
class ImpactTestingSearchCriteria implements Serializable{

  var _products : Product[] as Products = {}
  var _jurisdictions : Jurisdiction[] as Jurisdictions = {}
  var _searchOnPostalCodeList : boolean as SearchOnPostalCodeList  // If true, use the list, if false, search on range
  var _postalCodesList : String as PostalCodesList
  var _postalCodeRangeMin : String as PostalCodeRangeMin
  var _postalCodeRangeMax : String as PostalCodeRangeMax
  var _useStartsWithForPostalCodes : boolean as UseStartsWithForPostalCodes = true
  var _producerCodes : ProducerCode[] as ProducerCodes = {}
  var _effectiveDateMin : Date as EffectiveDateMin
  var _effectiveDateMax : Date as EffectiveDateMax
  var _expirationDateMin : Date as ExpirationDateMin
  var _expirationDateMax : Date as ExpirationDateMax
  var _inForceOnDate : Date as InForceOnDate
  
  var _postalCodes : String[]
  var _resultContainer : List<IQueryBeanResult<PolicyPeriod>> // List of size one, allows passing the results back to the screen via this argument

  construct() {
    this({new EmptyQuery<PolicyPeriod>(PolicyPeriod).select()})
  }

  construct(container : List<IQueryBeanResult<PolicyPeriod>>) {
    UseStartsWithForPostalCodes = true
    _resultContainer = container
    _resultContainer[0] = new EmptyQuery<PolicyPeriod>(PolicyPeriod).select()
  }
  
  /** Creates a query based on the search parameters.  Only the most recent model of a
   * particular policy term is included in the result set
   *
   * For each of the search parameters, this method also creates a descriptive string.
   *
   * @return The query
   */
  public function createQuery() : Query<PolicyPeriod>{

    var PolicyPeriodQuery = Query.make(PolicyPeriod)

    // can only do Impact Testing on periods that are not archived
    PolicyPeriodQuery.compare("ArchiveState", Equals, null)

    PolicyPeriodQuery.compare("CancellationDate", Equals, null)

    PolicyPeriodQuery.compare("MostRecentModel", Equals, true)
    PolicyPeriodQuery.withDistinct(true)

    if (Products.HasElements){
      PolicyPeriodQuery.join("Policy").compareIn("ProductCode", Products*.Code )
    }

    if (Jurisdictions.HasElements){
      PolicyPeriodQuery.compareIn("BaseState", Jurisdictions )
    }

    if (ProducerCodes.HasElements){
      PolicyPeriodQuery.join("ProducerCodeOfRecord").compareIn("Code", ProducerCodes*.Code )
    }

    parsePostalCodes()
    if (_postalCodes.HasElements && SearchOnPostalCodeList){
      var joined = PolicyPeriodQuery.join("EffectiveDatedFields").join("PrimaryLocation")
      if( UseStartsWithForPostalCodes ){
        joined.or(\ restriction -> {
          _postalCodes.each(\ p -> {
            restriction.startsWith("PostalCodeInternal", p, true )
          })
        })
      } else {
        joined.compareIn("PostalCodeInternal", _postalCodes )
      }
    } else if (!SearchOnPostalCodeList && (PostalCodeRangeMin != null || PostalCodeRangeMax != null)){
      var join = PolicyPeriodQuery.join("EffectiveDatedFields").join("PrimaryLocation")
      if (PostalCodeRangeMin != null){
        join.compare("PostalCodeInternal", GreaterThanOrEquals, PostalCodeRangeMin)
      }
      if (PostalCodeRangeMax != null){
        join.compare("PostalCodeInternal", LessThanOrEquals, PostalCodeRangeMax)
      }
    }

    if (EffectiveDateMin != null){
      PolicyPeriodQuery.compare("PeriodStart", GreaterThanOrEquals, EffectiveDateMin)
    }

    if (EffectiveDateMax != null){
      PolicyPeriodQuery.compare("PeriodStart", LessThanOrEquals, EffectiveDateMax)
    }

    if (ExpirationDateMin != null){
      PolicyPeriodQuery.compare("PeriodEnd", GreaterThanOrEquals, ExpirationDateMin)
    }

    if (ExpirationDateMax != null){
      PolicyPeriodQuery.compare("PeriodEnd", LessThanOrEquals, ExpirationDateMax)
    }

    if (InForceOnDate != null){
      PolicyPeriodQuery.compare("PeriodStart", LessThanOrEquals, InForceOnDate)
      PolicyPeriodQuery.compare("PeriodEnd", GreaterThanOrEquals, InForceOnDate)
    }

    return PolicyPeriodQuery
  }


  /** Creates and executes a query
   *
   * @return The result set
   */
  function search() : PolicyPeriodQuery {
    var resultSet = createQuery().withLogSQL(true).select()
    _resultContainer[0] = resultSet // Populate the ResultContainer with the resultSet so that it can be passed back via the constructor argument to the screen.
    return resultSet
  }

  private function parsePostalCodes() {
    if( PostalCodesList != null && PostalCodesList.HasContent ){
      _postalCodes = PostalCodesList.split(",")
      _postalCodes.eachWithIndex(\ s, i -> { _postalCodes[i] = s.trim() })
      _postalCodes = _postalCodes.subtract(_postalCodes.where(\ s -> s.length == 0)).toTypedArray()
    }
    else {
      _postalCodes = {}
    }
  }
  
}