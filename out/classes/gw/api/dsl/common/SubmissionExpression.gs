package gw.api.dsl.common

uses gw.api.databuilder.common.ClauseContainingBuilder
uses gw.api.builder.SubmissionBuilder
uses gw.api.builder.PolicyConditionBuilder
uses gw.api.builder.CoverageBuilder
uses gw.api.builder.ExclusionBuilder

abstract class SubmissionExpression
  <B extends SubmissionBuilder, 
   L extends ClauseContainingBuilder, 
   E extends SubmissionExpression> {

  abstract property get SubmissionBuilder() : B
  
  /*
   * NOTE:
   * this assumes the line will be a coverable,
   * and hence have a clause-containing builder
   */
  abstract property get LineBuilder() : L
  
  function quote() : PolicyPeriod {
    return SubmissionBuilder.isQuoted().create()
  }
  
  function bind() : PolicyPeriod {
    return SubmissionBuilder.isBound().create()
  }
  
  function create() : PolicyPeriod {
    return SubmissionBuilder.create() 
  }
  
  function createAndCommit() : PolicyPeriod {
    return SubmissionBuilder.createAndCommit()
  }

  function isDraft() : E {
    SubmissionBuilder.isDraft()
    return this as E
  }
  
  function with(account : AccountExpression) : E {
    SubmissionBuilder.withAccount(account.DataBuilder)
    return this as E
  }
  
  function with(policyLocation : PolicyLocationExpression) : E {
    SubmissionBuilder.withPolicyLocation(policyLocation.DataBuilder)
    return this as E
  }

  /*
   * NOTE:
   * this assumes the line will be a coverable,
   * and hence have a clause-containing builder
   */
  function with(clauseExpression : DataBuilderExpression) : E {
    if (clauseExpression typeis DataBuilderExpression<CoverageBuilder>) {
      LineBuilder.withCoverage(clauseExpression.DataBuilder)
    } else if (clauseExpression typeis DataBuilderExpression<ExclusionBuilder>) {
      LineBuilder.withExclusion(clauseExpression.DataBuilder)
    } else if (clauseExpression typeis DataBuilderExpression<PolicyConditionBuilder>) {
      LineBuilder.withCondition(clauseExpression.DataBuilder)
    } else {
      throw "expression provided is not an expression for a clause builder"
    }
    return this as E
  }
}
