package gw.plugin.policyperiod.impl
uses gw.plugin.policyperiod.IPolicyTermPlugin
uses java.util.Date
uses java.lang.Math


@Export
class PolicyTermPlugin implements IPolicyTermPlugin {
  
  /**
   * Given the effective date and the term for a new PolicyPeriod,
   * returns the default expiration date.  This should always return a date.
   *
   * @param effDate the policy period effective or start date
   * @param term the policy period term
   *
   * Implementation Note: Called from Java.
   * Every TermType should be mentioned, the period expiration date must be set.
   * The time part of the returned expiration date will be ignored, in favor
   * of the existing expiration time (as set by the effective time plugin).
   */
  override function calculatePeriodEnd( effDate : Date, term : TermType ): Date {
    if (effDate == null) {
      return null
    }
    switch (term) {
      case TermType.TC_ANNUAL:
        return effDate.addYears(1)

      case TermType.TC_HALFYEAR:
        return effDate.addMonths(6)

      case TermType.TC_OTHER:
        return effDate.addMonths(3)    
    }
    throw "Could not find a formula for calculating default expiration date for TermType '${term}'"
  }

  /**
   * Given a set of period dates calculates the policy term.
   *
   * Implementation Note: Called from Java
   */
  override function calculatePolicyTerm(policyPeriod : PolicyPeriod, periodStart: Date, periodEnd: Date): TermType {
    // Make calculations time-insensitive
    periodStart = periodStart.trimToMidnight()
    periodEnd = periodEnd.trimToMidnight()
    
    var terms = policyPeriod.Policy.Product.AvailablePolicyTerms.map(\term -> term.TermType)    
    
    var annual = TermType.TC_ANNUAL
    var halfYear = TermType.TC_HALFYEAR
    if (isAnnualTerm(policyPeriod, terms, periodStart, periodEnd)) {
      return annual
    } else if (isTermType(terms, halfYear, periodStart, periodEnd)) {
      return halfYear
    } else {
      return TermType.TC_OTHER
    }
  }
  
  private function isAnnualTerm(policyPeriod : PolicyPeriod, terms : List<typekey.TermType>, periodStart: Date, periodEnd: Date): boolean {    
    var maxAdditionalDays = 0
    for (line in policyPeriod.Lines) {
      maxAdditionalDays = Math.max(maxAdditionalDays, line.AdditionalDaysInAnnualTerm)
    }
    
    if (maxAdditionalDays != 0) {
      var minExpDate = calculatePeriodEnd(periodStart, TermType.TC_ANNUAL)    
      var maxExpDate = calculatePeriodEnd(periodStart, TermType.TC_ANNUAL).addDays(maxAdditionalDays)   
      if (not periodEnd.before(minExpDate) and not periodEnd.after(maxExpDate)) {
        return true
      }
    }
    
    return isTermType(terms, TermType.TC_ANNUAL, periodStart, periodEnd)
  }
  
  private function isTermType(terms : List<typekey.TermType>, theTermType : TermType, periodStart: Date, periodEnd: Date): boolean {    
    return 
      (periodEnd == calculatePeriodEnd(periodStart, theTermType) and terms.contains(theTermType))         
  }
    
}
