package gw.api.dsl.common

abstract class BaseJobTestDSLDelegate<S extends SubmissionExpression> implements BaseJobTestDSL<S> {

  override function requestQuoteFor(period : PolicyPeriod) {
    period.JobProcess.requestQuote()
  }

  override function bind(period : PolicyPeriod) {
    period.JobProcess.requestQuote()
    period.JobProcess.bind()
  }
  
  override function aPolicyLocation() : PolicyLocationExpression {
    return new PolicyLocationExpression()
  }
  
  override function aPolicyLocation(name : String) : PolicyLocationExpression {
    return new PolicyLocationExpression().withName(name)
  }

  override function anAccountLocation() : AccountLocationExpression {
    return new AccountLocationExpression()
  }

  override function anAccountLocation(code : int) : AccountLocationExpression {
    return new AccountLocationExpression(code)
  }

  override function anAccount() : AccountExpression {
    return new AccountExpression()
  }

  override function quote(submission : S) : PolicyPeriod {
    return submission.quote()
  }

  override function bind(submission : S) : PolicyPeriod {
    return submission.bind()
  }

  override function createAndCommit(submission : S) : PolicyPeriod {
    return submission.createAndCommit()
  }
}
