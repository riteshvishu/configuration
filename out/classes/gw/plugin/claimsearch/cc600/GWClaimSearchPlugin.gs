package gw.plugin.claimsearch.cc600
uses entity.Policy
uses entity.ClaimDetail
uses java.util.List
uses entity.ClaimSet
uses java.lang.String
uses gw.lang.Export
uses entity.Claim

uses gw.plugin.claimsearch.IClaimSearchPlugin
uses gw.api.soap.GWAuthenticationHandler
uses soap.CCClaimSearchAPI.entity.PCClaim
uses soap.CCClaimSearchAPI.api.PCClaimSearchIntegrationAPI
uses java.util.Map
uses gw.plugin.InitializablePlugin
uses gw.losshistory.ClaimPolicyPeriodFilterSet
uses gw.plugin.claimsearch.NoResultsClaimSearchException
uses gw.plugin.claimsearch.ResultsCappedClaimSearchException
uses gw.plugin.claimsearch.IClaimSearchCriteria
uses soap.CCClaimSearchAPI.entity.PCClaimSearchCriteria
uses gw.plugin.claimsearch.ClaimSearchSpec

@Export
class GWClaimSearchPlugin implements IClaimSearchPlugin, InitializablePlugin {

  static var MAX_NUMBER_ALLOWABLE = 100
  
  static var _claimSearchService : PCClaimSearchIntegrationAPI
  
  var _username : String
  var _password : String

  override function searchForClaims(claimSearchCriteria : IClaimSearchCriteria) : ClaimSet {
    var claimResult = getClaimsFromExternalSystem(claimSearchCriteria.SearchSpecs)
    if (claimResult == null or claimResult.size() == 0) {
      throw new NoResultsClaimSearchException()
    }
    var result : ClaimSet
    gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
      result = new ClaimSet(bundle)
      for (pcClaim in claimResult) {
        var claim = addClaimToClaimSet(pcClaim, result)
        mapClaimToPeriod(claim, pcClaim.PolicyNumber)
      }
      var claimFilter = new ClaimPolicyPeriodFilterSet(result.Claims)
      result.setClaimsFilter(claimFilter)
    })
    return result
  }
    
    
  /**
   * Intended override point for tests.
   */
  protected function getClaimsFromExternalSystem(specs : List<ClaimSearchSpec>)  : List<PCClaim> {
    var api = getClaimSearchService()
    var criteriaForCC = specs.map(\ c -> toPCClaimSearchCriteria(c)).toTypedArray()
    validateCriteria(criteriaForCC)
    var claimCount = api.getNumberOfClaimsMultiCriteria(criteriaForCC)    
    if (claimCount == 0 ) {
      return null
    } else if (claimCount > MAX_NUMBER_ALLOWABLE) {
      throw new ResultsCappedClaimSearchException()
    }
      
    return api.searchForClaimsMultiCriteria(criteriaForCC).toList()
  }
    /**
     * Sets the policyperiod by first finding the policy that matches the policyNumber
     * and then choosing the most recent bound period associated with that policy with
     * an effective date range containing the lossDate.  This
     * allows the claim to be attached to a period with a different policy number, for example
     * when a new job has been bound that changes the policy number, but the claims system
     * is not aware of the change and returns the prior policy number.
     */
    private function mapClaimToPeriod(claim : Claim, policyNumber : String) {
      // First finds the policy from the policyNumber, then the matching period.
      claim.PolicyPeriod = Policy.finder.findPolicyPeriodByPolicyNumberAndAsOfDate(policyNumber, claim.LossDate)
      claim.PolicyInForce = (claim.PolicyPeriod != null)
    }

  private function toPCClaimSearchCriteria(searchSpec : ClaimSearchSpec) :  PCClaimSearchCriteria {
    var pcClaimSearchCriteria = new PCClaimSearchCriteria()
    var dateRange = searchSpec.DateRange
    pcClaimSearchCriteria.BeginDate = dateRange.AllTime ? null : dateRange.BeginDate.toCalendar()
    pcClaimSearchCriteria.EndDate = dateRange.AllTime ? null : dateRange.EndDate.toCalendar()
    
    // Find all related policy numbers by looking up all policy periods and extracting
    // the unique set of policy numbers relating to those periods
    pcClaimSearchCriteria.PolicyNumbers = searchSpec.PolicyNumbers
    pcClaimSearchCriteria.Status = searchSpec.ClaimStatus   
    return pcClaimSearchCriteria
  }
  
  private function validateCriteria(criteria : PCClaimSearchCriteria[]) {
    // Test to see if there are no policy numbers specified
    if (criteria*.PolicyNumbers.Count == 0) {
      throw new NoResultsClaimSearchException()      
    }
  }

  override function giveUserViewPermissionsOnClaim(username: String, claimPublicID: String) {
    var api = getClaimSearchService()
    api.giveUserClaimViewPermission(claimPublicID, username)
  }

  override function getClaimDetailByClaimNumber(inclaim : Claim) : ClaimDetail {
    var api = getClaimSearchService()
    var pcClaimDetail = api.getClaimByClaimNumber(inclaim.ClaimNumber)
    if (pcClaimDetail != null) {
      var claimDetail = new ClaimDetail(inclaim)
      claimDetail.Claim = inclaim
      claimDetail.Description = pcClaimDetail.Description
      claimDetail.LossCause = pcClaimDetail.LossCause
      claimDetail.ClaimSecurityType = pcClaimDetail.ClaimSecurityType
      claimDetail.ClaimPublicID = pcClaimDetail.ClaimPublicID
      claimDetail.ClaimInfoPublicID = pcClaimDetail.ClaimInfoPublicID
      claimDetail.Injuries = pcClaimDetail.Injury
      claimDetail.Litigation = pcClaimDetail.Litigation
      claimDetail.Recoveries = pcClaimDetail.Recoveries?.ofDefaultCurrency()
      claimDetail.RemainingReserves = pcClaimDetail.RemainingReserves?.ofDefaultCurrency()
      claimDetail.TotalPaid = pcClaimDetail.TotalPaid?.ofDefaultCurrency()
      return claimDetail
    } 
    return null
  }
  
  private function addClaimToClaimSet(pcClaim : PCClaim, claimSet : ClaimSet) : Claim {
    var claim = new Claim(claimSet)
    claim.ClaimNumber = pcClaim.ClaimNumber
    claim.PolicyType = pcClaim.PolicyTypeName
    claim.LossDate = pcClaim.LossDate.Time
    claim.Status = pcClaim.Status
    claim.TotalIncurred = pcClaim.TotalIncurred?.ofDefaultCurrency()
    claimSet.addToClaims(claim)
    return claim
  }
  
  /**
   * Called on initialization to set paramters from the plugin definition.  Part of the
   * InitializablePlugin interface.
   */
  override function setParameters(params : Map) {
    _username = params.get("username") as String
    _password = params.get("password") as String    
  }
  
  private function getClaimSearchService() : PCClaimSearchIntegrationAPI {
    if(_claimSearchService == null) {
      _claimSearchService = new PCClaimSearchIntegrationAPI()
      _claimSearchService.addHandler(new GWAuthenticationHandler(_username, _password))
    }
    return _claimSearchService
  }
}
