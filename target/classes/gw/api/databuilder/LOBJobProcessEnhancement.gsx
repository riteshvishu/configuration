package gw.api.databuilder
uses gw.job.JobProcessValidator
uses gw.job.JobProcessUWIssueEvaluator

enhancement LOBJobProcessEnhancement : gw.job.JobProcess {

  function noValidationQuote() {
    doSkippingValidation(\ -> this.requestQuote())
  }
  
  
  function noValidationBind() {
    doSkippingValidation(\ -> this.bind())
  }
  
  private function doSkippingValidation(action()) {
    var prevValidator = this.JobProcessValidator
    try {
      this.JobProcessValidator = JobProcessValidator.NO_OP_VALIDATOR
      action()
    } finally {
      this.JobProcessValidator = prevValidator
    }  
  }
}