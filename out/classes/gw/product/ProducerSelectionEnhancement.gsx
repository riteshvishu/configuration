package gw.product
uses entity.ProducerSelection
uses java.util.List
uses entity.ProducerCodeQuery
uses typekey.ProducerStatusUse
uses java.lang.String
uses entity.PolicyProductRoot

uses gw.api.web.producer.ProducerUtil
uses java.util.ArrayList
uses gw.api.web.job.submission.SubmissionUtil

enhancement ProducerSelectionEnhancement : entity.ProducerSelection {

  /**
   * Checks validity of producer, returning string err if not.  Useful for PCF.
   */
  function validateProducer(): String {
    if (this.Producer == null or this.Producer.ProducerStatus.hasCategory(ProducerStatusUse.TC_SUBMISSIONOKAY)) {
      return null
    } else {
      return displaykey.Web.ProducerSelection.ProducerAgencyNotActive(this.Producer)
    }
  }

  /**
   * Checks validity of producer code, returning string err if not.  Useful for PCF.
   */
  function validateProducerCodeForSubmission() : String {
    if (SubmissionUtil.canUseProducerCodeForSubmission( this.ProducerCode )) {
      return null
    }
    return displaykey.Java.ProducerCodePickerWidget.Error.Gosu_SuspendedProducerCode(this.ProducerCode)
  }

  function validateProducerCodeForAccount() : String {
    if (this.ProducerCode.ProducerStatus.hasCategory(ProducerStatusUse.TC_OKAY)) {
      return null
    } else {
      return displaykey.Java.ProducerCodePickerWidget.Error.Gosu_SuspendedProducerCode(this.ProducerCode)
    }
  }

  /**
   * Given the currently selected producer and the current user, returns a valid
   * range of producer codes.
   */
  function getRangeOfActiveProducerCodesForCurrentUser() : List {
    var list : List = new ArrayList()
    var producerCodes = ProducerUtil.getProducerCodeRange(this.Producer, ProducerStatusUse.TC_SUBMISSIONOKAY) as ProducerCodeQuery
    for(var p in producerCodes) {
      list.add(p)
    }
    return list
  }

  property get SubmissionPolicyProductRoot() : PolicyProductRoot {
    return new PolicyProductRoot(this.Bundle) {
      :Account = this.Account,
      :EffDate = this.DefaultPPEffDate,
      :Producer = this.Producer,
      :ProducerCode = this.ProducerCode,
      :State = this.State,
      :JobType = TC_SUBMISSION
    }
  }

}