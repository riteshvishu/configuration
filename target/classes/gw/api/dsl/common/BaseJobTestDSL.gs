package gw.api.dsl.common

interface BaseJobTestDSL<S extends SubmissionExpression> {

  function aSubmission() : S
  
  function quote(submission : S) : PolicyPeriod

  function bind(submission : S) : PolicyPeriod
  
  function createAndCommit(submission : S) : PolicyPeriod
  
  function requestQuoteFor(period : PolicyPeriod)

  function bind(period : PolicyPeriod)

  function aPolicyLocation() : PolicyLocationExpression

  function aPolicyLocation(name : String) : PolicyLocationExpression
  
  function anAccountLocation() : AccountLocationExpression
  
  function anAccountLocation(code : int) : AccountLocationExpression
  
  function anAccount() : AccountExpression
}
