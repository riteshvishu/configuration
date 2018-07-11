package gw.web.policy

uses gw.api.util.DisplayableException
uses gw.api.util.LocationUtil
uses gw.plugin.billing.BillingPeriodInfo
uses gw.plugin.billing.IBillingSummaryPlugin

uses java.lang.Exception
uses java.lang.Integer
uses java.util.LinkedHashSet
uses java.util.List

@Export
class PolicyBillingUIHelper {

  static function getTermNumberIndexes(termNumbers : Integer[]) : List<Integer>{
    var indexes = new java.util.ArrayList<Integer>(termNumbers.Count)
    for (i in 0..|termNumbers.Count) {
      indexes.add(i)
    }
    return indexes
  }

  static function getTermNumberIndex(policyPeriod : PolicyPeriod, termNumbers : Integer[]) : int {
    for (termNumber in termNumbers index i) {
      if (termNumber == policyPeriod.TermNumber) {
        return i
      }
    }
    return -1
  }

  /**
   * Return a sorted array of term numbers.
   * Note that the sort order needs to be the same as the list of policy period returned by BC in
   * {@link #retrieveAndValidateBillingSummary(IBillingSummaryPlugin, PolicyPeriod, int, int)
   */
  static function getSortedTermNumbers(policy : Policy) : Integer[] {
    var termNumbersOfPeriod = policy.Periods.where(\ p -> p.TermNumber != null)
        .sortBy(\ p -> p.EditEffectiveDate).map(\ p -> p.TermNumber)
    return new LinkedHashSet<Integer>(termNumbersOfPeriod)
  }

  static function retrieveAndValidateBillingSummary(billingPlugin : IBillingSummaryPlugin, policyPeriod : PolicyPeriod,
                                                    termNumber : int, pcTermNumberCount: int) : BillingPeriodInfo {
    var billingPeriodInfo = retrieveBillingSummary(billingPlugin, policyPeriod, termNumber)
    // BC will always return only one period per term. So, the PC term count should be the same as the periods returned
    // by BC.
    if (pcTermNumberCount != billingPeriodInfo.Periods.Count) {
      throw new DisplayableException(displaykey.Web.Billing.Error.InconsistentBillingPolicyPeriods(
          pcTermNumberCount, billingPeriodInfo.Periods.Count))
    }
    return billingPeriodInfo
  }

  static function retrieveBillingSummary(billingPlugin : IBillingSummaryPlugin, policyPeriod : PolicyPeriod,
                                         termNumber : int) : BillingPeriodInfo {
    try{
      return billingPlugin.retrievePolicyBillingSummary( policyPeriod.PolicyNumber, termNumber )
          as gw.plugin.billing.BillingPeriodInfo
    }catch(e : Exception){
      LocationUtil.addRequestScopedErrorMessage(e.LocalizedMessage)
      return new gw.plugin.billing.impl.MockPolicyPeriodBilling()
    }
  }
}

