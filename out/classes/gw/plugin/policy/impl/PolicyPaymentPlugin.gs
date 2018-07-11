package gw.plugin.policy.impl

uses gw.plugin.policy.IPolicyPaymentPlugin


@Export
class PolicyPaymentPlugin implements IPolicyPaymentPlugin {

  override function filterReportingPlans( policy : Policy, plans : PaymentPlanSummary[] ) : PaymentPlanSummary[]
  {
    // Customer may want to filter this according to things like policy size, type of business...
    // For OOTB implementation, we just return everything. 
    return plans  
  }

}