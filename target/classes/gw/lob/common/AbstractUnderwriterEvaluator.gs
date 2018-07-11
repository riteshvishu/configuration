package gw.lob.common
uses gw.policy.PolicyEvalContext

@Export
abstract class AbstractUnderwriterEvaluator implements UnderwriterEvaluator {

  protected var _policyEvalContext : PolicyEvalContext

  construct (policyEvalContext : PolicyEvalContext){
    _policyEvalContext = policyEvalContext
  }

  override function canEvaluate() : boolean {
    return true
  }

  override function evaluate() {
    if (not canEvaluate()) {
      return
    }

    switch(_policyEvalContext.CheckingSet) {
      case (UWIssueCheckingSet.TC_PREQUOTE) :
        onPrequote()
        break
      case (UWIssueCheckingSet.TC_REFERRAL) :
        onReferral()
        break
      case (UWIssueCheckingSet.TC_QUESTION) :
        onQuestion()
        break
      case (UWIssueCheckingSet.TC_RENEWAL) :
        onRenewal()
        break
      case (UWIssueCheckingSet.TC_REINSURANCE) :
        onReinsurance()
        break
      default :
        onDefault()
        break
    }
  }

  protected function onDefault() {}
  protected function onPrequote() {}
  protected function onQuestion() {}
  protected function onReferral() {}
  protected function onReinsurance() {}
  protected function onRenewal() {}

}