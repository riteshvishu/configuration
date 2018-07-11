package gw.lob.wc7.contact

/**
 * Methods for {@link WC7PolicyLaborClient}
 */
@Export
enhancement WC7PolicyLaborContractorEnhancement : entity.WC7PolicyLaborContractor {
  
  /**
   * Adds a new {@link WC7IncludedLaborContactDetail} for this {@link WC7LaborClient}.
   * The detail's contract effective period is initialized to the branch's policy period.
   */
  function addNewIncludedLaborContractorDetail(laborContractorCond : PolicyCondition) : WC7IncludedLaborContactDetail {
    var detail = new WC7IncludedLaborContactDetail(this.Branch)
    detail.setFieldValue("LaborContactCondition", laborContractorCond)
    detail.ContractEffectiveDate  = this.Branch.PeriodStart
    detail.ContractExpirationDate = this.Branch.PeriodEnd
    this.addToWC7Details(detail)
    return detail
  }
  
  /**
   * Adds a new {@link WC7ExcludedLaborContactDetail} for this {@link WC7LaborClient}.
   * The detail's contract effective period is initialized to the branch's policy period.
   */
  function addNewExcludedLaborContractorDetail(laborContractorExcl : Exclusion) : WC7ExcludedLaborContactDetail {
    var detail = new WC7ExcludedLaborContactDetail(this.Branch)
    detail.setFieldValue("LaborContactExclusion", laborContractorExcl)
    detail.ContractEffectiveDate  = this.Branch.PeriodStart
    detail.ContractExpirationDate = this.Branch.PeriodEnd
    this.addToWC7Details(detail)
    return detail
  }
}

