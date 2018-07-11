package gw.web.contact

uses gw.api.web.filter.TypeFilter
uses gw.pl.currency.MonetaryAmount

uses java.math.BigDecimal
uses java.util.Collections
uses java.util.Date
uses java.util.Set

/**
 * Collects the Policy Metrics for the Accounts associated with a Contact
 *      through a specific AccountContact Role.
 *
 * Used by the PCF page ContactFile_AccountHolder located at:
 *   pc\config\web\pcf\contactfile\ContactFile_AccountHolder.pcf
 */
@Export
class ContactMetricsImpl implements ContactMetrics {

  static var _policyMetrics = AccountHolderPolicyMetrics.Instance
  static var _claimMetrics = AccountHolderClaimMetrics.Instance
  static var _billingMetrics = AccountHolderBillingMetrics.Instance

  property get Currency() : Currency {
    return Contact.PreferredSettlementCurrency
  }
  
  /**
   * The Contact.
   */
  var _contact : Contact as readonly Contact

  /**
   * The AccountContactRole type.
   */
  var _roles : Set<Type<AccountContactRole>> as readonly Roles

  /**
   * The 1st effective date for account policies associated with the Contact.
   */
  var _firstEffectivePolicyDate : Date as readonly FirstEffectivePolicyDate

  /**
   * The number of active policies for the accounts associated with the Contact.
   */
  var _activePoliciesCount : int as readonly ActivePoliciesCount

  /**
   * The total in-force policy premiums for the accounts associated with
   *    the Contact.
   */
  var _totalInForcePremium : MonetaryAmount as readonly TotalInForcePremium

  /**
   * The number of accounts associated with the Contact.
   */
  var _accountsCount : int as readonly AccountsCount

  /**
   * The number of cancellations made by the customer for the account policies
   *    associated with the Contact.
   */
  var _cancellationsByCustomerCount : int as readonly CancellationsByCustomerCount

  /**
   * The number of cancellations made by the carrier for non-payment
   *    for the account policies associated with the Contact.
   */
  var _cancellationsForNonPaymentCount : int as readonly CancellationsForNonPaymentCount

  /**
   * The number of cancellations made by the carrier for other reasons
   *    for the account policies associated with the Contact.
   */
  var _otherCancellationsCount : int as readonly OtherCancellationsCount

  var _openCancellationsCount : int = 0

  /**
   * The total lifetime premium for all policies of the accounts
   *    associated with the Contact.
   */
  var _totalLifetimePremium : MonetaryAmount as readonly TotalLifetimePremium

  var _jobs : Job[] as readonly Jobs

  /**
   * The ClaimSet for the policies for the accounts associated with the Contact.
   */
  var _claimSet : ClaimSet as readonly ClaimSet

  /**
   * The summation of TotalIncurred taken across all claims contained in ClaimSet
   */
  var _netTotalIncurred : BigDecimal as readonly NetTotalIncurred

  var _totalUnbilled : BigDecimal as readonly TotalUnbilled

  var _totalCurrentlyBilled : BigDecimal as readonly TotalCurrentlyBilled

  var _totalPastDueBilled : BigDecimal as readonly TotalPastDueBilled

  var _totalOutstandingBilled : BigDecimal as readonly TotalOutstandingBilled

  var _directBillOnly : boolean as readonly DirectBillOnly

  /**
   * A list of alert messages.
   */
  var _alerts : List<String> = {}

  static final var CancellationsByCustomerFilter = AccountHolderPolicyMetrics.CancellationsFilter.cancellationsByCustomer()

  static final var CancellationsForNonPaymentFilter = AccountHolderPolicyMetrics.CancellationsFilter.cancellationsForNonPayment()

  static final var OtherCancellationsFilter = AccountHolderPolicyMetrics.CancellationsFilter.otherCancellations()

  protected construct(contactValue : Contact, rolesValue : Set<Type<AccountContactRole>>) {
    _contact = contactValue
    _roles = rolesValue
  }

  override property get Alerts() : List<String> {
    return ( _alerts == null ) ? null : Collections.unmodifiableList(_alerts)
  }

  function initialize() {
    initializePolicyMetrics()
    initializeClaimMetrics()
    initializeBillingMetrics()
    createAlerts()
  }

  /**
   * Initialize the claim metrics.
   */
  internal function initializeClaimMetrics() {
    /* set of distinct, unique PolicyNumber's (as a List)... */
    var policyNumbers =
        _policyMetrics.activePolicyPeriodsQueryFor(_contact, _roles)
          .withDistinct(true)
          .select(\ p -> p.PolicyNumber)

    _claimSet = _claimMetrics.findOpenClaimsFor(policyNumbers.toSet())
    _netTotalIncurred =_claimMetrics.calculateTotalIncurred(Currency, _claimSet.Claims)
  }

  /**
   * Initialize the billing metrics.
   */
  internal function initializeBillingMetrics() {
    var accountNumbers =
        _policyMetrics.linkedAccountsQueryFor(_contact, _roles)
          .select(\ a -> a.AccountNumber)

    _totalUnbilled = 0.0
    _totalCurrentlyBilled = 0.0
    _totalPastDueBilled = 0.0
    _totalOutstandingBilled = 0.0
    var billingSummaries = _billingMetrics.findBillingInfosForAccounts(accountNumbers.toSet())
    for ( billingSummary in billingSummaries ) {        
      if ( billingSummary.UnbilledTotal != null ) {
        _totalUnbilled += billingSummary.UnbilledTotal
      }
      if ( billingSummary.BilledOutstandingCurrent != null ) {
        _totalCurrentlyBilled += billingSummary.BilledOutstandingCurrent
      }
      if ( billingSummary.BilledOutstandingPastDue != null ) {
        _totalPastDueBilled += billingSummary.BilledOutstandingPastDue
      }
      if ( billingSummary.BilledOutstandingTotal != null ) {
        _totalOutstandingBilled += billingSummary.BilledOutstandingTotal
      }
    }

    _directBillOnly = true
  }

  /**
   * Initialize the policy metrics.
   */
  internal function initializePolicyMetrics() {
    _firstEffectivePolicyDate = _policyMetrics.firstEffectivePolicyDateFor(_contact, _roles)
    _activePoliciesCount = _policyMetrics.countActivePoliciesFor(_contact, _roles)
    _totalInForcePremium = _policyMetrics.sumInForcePremiumFor(_contact, _roles, Currency)
    _accountsCount = _policyMetrics.countAccountsFor(_contact, _roles)
    _totalLifetimePremium = _policyMetrics.calculateLifetimePremium(_contact, _roles, Currency)

    var openJobResults = _policyMetrics.openJobResultsFor(_contact, _roles)

    /* open Cancellations... */
    openJobResults.clearFilters()
    openJobResults.addFilter(new TypeFilter<Cancellation>() {})
    _openCancellationsCount = openJobResults.Count

    /* all open Jobs... */
    openJobResults.clearFilters()
    _jobs = openJobResults.toTypedArray()

    /* Cancellations in fixed time period window counts... */
    var filterCancellations = AccountHolderPolicyMetrics.CancellationsFilter
    var cancellations = _policyMetrics.cancellationsResultFor(_contact, _roles)
    _cancellationsByCustomerCount = filterCancellations.countCancellationsBy(cancellations, CancellationsByCustomerFilter)
    _cancellationsForNonPaymentCount = filterCancellations.countCancellationsBy(cancellations, CancellationsForNonPaymentFilter)
    _otherCancellationsCount = filterCancellations.countCancellationsBy(cancellations, OtherCancellationsFilter)
  }

  /**
   * Add an alert to the list of alerts.
   */
  private function addAlert(alertText : String) {
    _alerts.add(alertText)
  }

  internal function createPolicyAlerts() {
    if ( _openCancellationsCount > 0 ) {
      addAlert(displaykey.Web.ContactFile.AccountHolder.Alerts.CancellationsInProgress)
    }
  }

  internal function createClaimAlerts() {
    if (not _claimSet.Claims.IsEmpty) {
      addAlert(displaykey.Web.ContactFile.AccountHolder.Alerts.OpenClaims)
    }
  }

  internal function createAlerts() {
    _alerts = {}
    createPolicyAlerts()
    createClaimAlerts()
  }

  override property get OpenClaimsCount() : int {
    return _claimSet.Claims.Count
  }

}