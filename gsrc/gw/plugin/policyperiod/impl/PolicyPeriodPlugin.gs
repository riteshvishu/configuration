package gw.plugin.policyperiod.impl

uses java.util.Date
uses gw.plugin.policyperiod.IPolicyPeriodPlugin
uses gw.entity.IEntityType
uses java.util.Set
uses gw.api.productmodel.SeriesAuditSchedulePattern
uses gw.job.audit.AuditDateCalculator
uses gw.api.domain.account.AccountSyncable
uses gw.plugin.reinsurance.IReinsurancePlugin
uses gw.plugin.Plugins
uses gw.api.domain.RefersOutOfDomainGraph
uses java.util.ArrayList
uses gw.api.domain.DenormalizedFKOutOfDomainGraph
uses gw.api.match.MatchableTreeTraverserUtils

/**
 * WARNING: this plugin should not contains line specific logic or some tests may fail
 */
@Export
class PolicyPeriodPlugin implements IPolicyPeriodPlugin {

  /**
   * Called after applyChangesFromBranch
   *
   * @param policyPeriod the branch which is the target of the changes
   * @param sourcePeriod the source branch
   */
  override function postApplyChangesFromBranch(policyPeriod : PolicyPeriod, sourcePeriod : PolicyPeriod) {
    for(line in policyPeriod.Lines){
      line.postApplyChangesFromBranch(sourcePeriod)
    }

    var plugin = Plugins.get(IReinsurancePlugin)
    plugin.postApplyChangesFromBranch(policyPeriod)  

    // if a line is added/removed from a multi line product, need to update TerritoryCodes on Locations
    if (policyPeriod.MultiLine) {
      policyPeriod.updateTerritoryCodes()
    }
  }

  /**
   * Returns the types of the beans that should not be copied from one period to the other.
   * Because a period is also a branch, you do not need to include any of the types that
   * are included in "returnTypesToNotCopyOnNewBranch"
   *
   * @return  set of bean types
   */
  override function returnTypesToNotCopyOnNewPeriod(): Set<IEntityType> {
    return { DiagnosticRatingWorksheet, RatingPeriodStartDate, Form, FormEdgeTable, FormAssociation,
             PARatingWorksheet, CPRatingWorksheet,
             WC7RatingWorksheet, WC7RatingPeriodStartDate }
  }

  /**
   * Filters all {@link Transaction} types.
   * @return The types of the beans that should not be copied form one branch to
   *         another.
   */
  override function returnTypesToNotCopyOnNewBranch(): Set<IEntityType> {
    // all entities which implement these delegates will be included in the result
    var delegateTypes : Set<IEntityType> = { entity.Transaction, entity.RatingWorksheet }
    // add non-delegate types to be included in the result
    var otherTypes : Set<IEntityType>= { }
    // We get LOB-specific delegate implementations reflectively from MatchableTreeTraverserUtils, because we do
    // not want to require LOB creators to edit central registries.  (It makes installable LOB content much harder to create.)
    //
    // The performance of getting these via reflection should not be a problem, because MatchableTreeTraverserUtils maintains a cache.
    var delegateImpls = MatchableTreeTraverserUtils.getSubAndImplementingTypes(delegateTypes) as Set<IEntityType>
    return delegateImpls.union(otherTypes)
  }

  /**
   * Some beans (for example, exposures in GL and WC lines) can be sliced
   * but a property change applied as of a certain date will cause incorrect prorating.
   *
   * @param bean that has a property change diff
   * @return true if a property change on this bean can be sliced, false otherwise.
   */
  override function canDateSliceOnPropertyChange(bean : KeyableBean) : boolean {
    if (bean typeis WCCoveredEmployee or bean typeis WCFedCoveredEmployee or bean typeis GLExposure or bean typeis WC7CoveredEmployee or
        bean typeis WC7FedCoveredEmployee) {
      // Apply property changes to the above objects in window mode
      return false
    }
    if (bean typeis WCModifier ) {
      // Modifiers on Jurisdiction and (theoretically) RPSD should also be applied in window mode
      return not ((bean.OwningModifiable typeis WCJurisdiction) or (bean.OwningModifiable typeis RatingPeriodStartDate))
    }
    if (bean typeis WC7Modifier ) {
      // Modifiers on Jurisdiction and (theoretically) RPSD should also be applied in window mode
      return not ((bean.OwningModifiable typeis WC7Jurisdiction) or (bean.OwningModifiable typeis RatingPeriodStartDate))
    }
    if (bean typeis EffDated) {
      var period = bean.BranchUntyped as PolicyPeriod
      for (line in period.Lines) {
        if (not line.canDateSliceOnPropertyChange(bean)) {
          return false
        }
      }
    }
    return true
  }
  
  /**
   * Some beans (for example, Jurisdiction in  WC lines) apply to the whole period,
   * and should never be split.  Applying a diff as of a particular date should not
   * be allowed to create a date split for these beans.
   *
   * @param period The PolicyPeriod
   * @return The types of the beans that should never be date sliced when applying a diff.
   */
  override function returnTypesToNotDateSliceOnApplyDiff(period : PolicyPeriod) : Set<IEntityType> {
    var allTypes : Set<IEntityType> = {RatingPeriodStartDate}
    for (line in period.Lines) {
      allTypes = allTypes.union(line.TypesToNotDateSliceOnApplyDiff)
    }
    return allTypes
  }

  /**
   * Called after the period dates have changed.
   *
   * @param policyPeriod The period the dates of which have changed
   * @param oldEffDate   The old effective date of the period
   * @param oldExpDate   The old expiration date of the period
   */
  override function postSetPeriodWindow(policyPeriod: PolicyPeriod, oldEffDate: Date, oldExpDate: Date) {
    for(line in policyPeriod.Lines){
      line.postSetPeriodWindow(oldEffDate, oldExpDate)
    }
    policyPeriod.expirePastDateApprovals()
  }

  /**
   * Called to initialize the period currencies when a term is being initialized.
   *
   * @param policyPeriod The period on which to initialize the currencies.
   */
  override function initializeCurrencies(policyPeriod : PolicyPeriod) {
    policyPeriod.PreferredCoverageCurrency = policyPeriod.Policy.Account.PreferredCoverageCurrency
    policyPeriod.PreferredSettlementCurrency = policyPeriod.Policy.Account.PreferredSettlementCurrency
  }

  /**
   * Called after a branch has been created in a new (logical) period. This will
   * be called for renewals and rewrites.
   *
   * @param policyPeriod The new period
   */
  override function postCreateDraftBranchInNewPeriod(policyPeriod: PolicyPeriod) {
    var draft = policyPeriod
    draft.AllAccountSyncables.each(\ a -> a.prepareForJobEdit())
    for(line in draft.Lines){
      line.postCreateDraftBranchInNewPeriod()
    }
    draft.clearDenormalizedReferenceDates()
    draft.RateAsOfDate = null //reset the Rate as of Date, this should not be carried over from a past Period
    draft.removePeriodAnswersToQuestionSetsOfType(QuestionSetType.TC_PREQUAL) //remove pre-qual question's answers
    draft.mergeDuplicatePolicyContactRoles()
  }
  
  /**
   * Called after a branch has been copied into new policy. This is used to copy
   * submission
   *
   * @param policyPeriod The new period
   */
  override function postCopyBranchIntoNewPolicy( policyPeriod : PolicyPeriod ) : void {
    var draft = policyPeriod
    draft.AllAccountSyncables.each(\ a -> a.prepareForJobEdit())
    draft.cloneAutoNumberSequences()
    draft.resetAutoNumberSequences()
    draft.UWIssuesIncludingSoftDeleted.each(\ issue -> issue.remove())
    draft.AllCosts.each(\  cost ->  cost.removeFromTerm())
    for(line in draft.Lines){
      line.postCopyBranchIntoNewPolicy()
    }
    draft.mergeDuplicatePolicyContactRoles()
    // make sure our policy locations have proper territory codes set
    draft.updateTerritoryCodes()
    
    draft.QuoteHidden = false
    draft.EditLocked = false
    draft.PolicyNumber = UnassignedPolicyNumberIdentifier
    draft.RateAsOfDate = null //reset the Rate as of Date, this should not be carried over from a past Period    
    draft.TermNumber = null
    draft.PolicyTerm.PreRenewalDirection = null
    
    // reset individual columns and denormalized field totals
    draft.AllocationOfRemainder = null
    draft.BillImmediatelyPercentage = null
    draft.DepositAmount = null
    draft.DepositCollected = null
    draft.DepositOverridePct = null
    draft.OverrideBillingAllocation = null
    draft.RefundCalcMethod = null
    draft.TotalCostRPT = null
    draft.TotalPremiumRPT = null
    draft.TransactionCostRPT = null
    draft.TransactionPremiumRPT = null
    draft.WaiveDepositChange = null

    // reset reinsurance values
    draft.AllReinsurables.each(\ r -> r.VersionList.AllVersions.each(\ s -> {s.RiskNumber = null}))

    //force recalculation of reference dates
    draft.Lines.each(\line ->line.clearDenormalizedReferenceDates())

    draft.Policy.MovedPolicySourceAccount = null
    draft.Policy.clearPolicyLinksForRewriteNewAccount()
    draft.setFieldValue("DoNotPurge", false)
  }

  /**
   * Called immediately before the branch promotion.
   *
   * @param policyPeriod The period being promoted
   */
  override function prePromote(policyPeriod: PolicyPeriod) {
    var draft = policyPeriod
    draft.denormalizeReferenceDates()
    for (issue in draft.UWIssuesIncludingSoftDeleted.where(\i -> i.HasApprovalOrRejection)) {
      issue.Approval.EditBeforeBind = true
    }
  }
  
  /**
   * Called after a branch has been created to handle a preemption. In this case
   * the new branch is created from the preempting branch (the branch that was
   * most recently bound). If you need to copy fields from the preempted branch
   * to this new branch do that here. See JobProcess.handlePreemptions for the
   * code that applies the preempted changes to the new preemption branch.
   *
   * @param preemption New branch created for preemption. NOTE: the changes made
   *                   previously to the preempted branch have not yet been
   *                   applied to this branch.
   * @param preempted  The old preempted branch that will  be thrown away
   */
  override function postCreateNewBranchForPreemption( preemption : PolicyPeriod, preempted : PolicyPeriod) {
    preemption.AllAccountSyncables.each(\ a -> a.prepareForJobEdit())
    preemption.mergeDuplicatePolicyContactRoles()
    copyNonEffDatedFieldsForPreemption( preemption, preempted )
  }

  /**
   * Called after an initial period has been created in a policy.
   *
   * @param period The newly created period
   */
  override function postCreateInitialBranch(period: PolicyPeriod)
  {
    period.PolicyNumber = UnassignedPolicyNumberIdentifier
  }
  /**
   *  Copies over non-EffDated fields from the preempted branch to the preemption branch
   * @param preemption The newly created preemption branch
   * @param preemted The preempted branch
   */
  private function copyNonEffDatedFieldsForPreemption( preemption : PolicyPeriod, preempted : PolicyPeriod ){
    
    if (preempted.BaseState != preempted.BasedOn.BaseState){
      preemption.BaseState = preempted.BaseState  
    }    
    if (preempted.BillImmediatelyPercentage != preempted.BasedOn.BillImmediatelyPercentage){
      preemption.BillImmediatelyPercentage = preempted.BillImmediatelyPercentage  
    }    
    if (preempted.BillingMethod != preempted.BasedOn.BillingMethod){
      preemption.BillingMethod = preempted.BillingMethod  
    }   
    if (preempted.DepositAmount != preempted.BasedOn.DepositAmount){
      preemption.DepositAmount = preempted.DepositAmount  
    }        
    if (preempted.DepositCollected != preempted.BasedOn.DepositCollected){
      preemption.DepositCollected = preempted.DepositCollected  
    }    
    if (preempted.DepositOverridePct != preempted.BasedOn.DepositOverridePct){
      preemption.DepositOverridePct = preempted.DepositOverridePct  
    }    
    if (preempted.InvoiceStreamCode != preempted.BasedOn.InvoiceStreamCode){
      preemption.InvoiceStreamCode = preempted.InvoiceStreamCode  
    }    
    if (preempted.NewInvoiceStream != preempted.BasedOn.NewInvoiceStream){
      preemption.NewInvoiceStream = preempted.NewInvoiceStream  
    }
    if (preempted.Offering != preempted.BasedOn.Offering){
      preemption.Offering = preempted.Offering  
    }
    if (preempted.OverrideBillingAllocation != preempted.BasedOn.OverrideBillingAllocation){
      preemption.OverrideBillingAllocation = preempted.OverrideBillingAllocation  
    }
    if (preempted.PaymentPlanID != preempted.BasedOn.PaymentPlanID){
      preemption.PaymentPlanID = preempted.PaymentPlanID  
    }
    if (preempted.PaymentPlanName != preempted.BasedOn.PaymentPlanName){
      preemption.PaymentPlanName = preempted.PaymentPlanName  
    }
    if (preempted.PeriodEnd != preempted.BasedOn.PeriodEnd){
      preemption.PeriodEnd = preempted.PeriodEnd  
    }
    if (preempted.ProducerCodeOfRecord != preempted.BasedOn.ProducerCodeOfRecord){
      preemption.ProducerCodeOfRecord = preempted.ProducerCodeOfRecord  
    }
    if (preempted.RateAsOfDate != preempted.BasedOn.RateAsOfDate){
      preemption.RateAsOfDate = preempted.RateAsOfDate  
    }
    if (preempted.ReportingPatternCode != preempted.BasedOn.ReportingPatternCode){
      preemption.ReportingPatternCode = preempted.ReportingPatternCode  
    }
    if (preempted.Segment != preempted.BasedOn.Segment){
      preemption.Segment = preempted.Segment  
    }
    if (preempted.UWCompany != preempted.BasedOn.UWCompany){
      preemption.UWCompany = preempted.UWCompany  
    }
    if (preempted.WaiveDepositChange != preempted.BasedOn.WaiveDepositChange){
      preemption.WaiveDepositChange = preempted.WaiveDepositChange  
    }
    if (!preemption.DoNotPurge and preempted.DoNotPurge) {
      preemption.setDoNotPurge(preempted.DoNotPurge, \->displaykey.PolicyPeriod.PurgeFlag.HandlingPreemptionReason)
    }

  }

  /**
   * Called after a branch has been created to handle a change to the edit effective
   * date of a job. In this case the new branch is created from as a side effect
   * of modifying the edit effective date for job such as a policy change.
   * See JobProcess#changeEditEffectiveDate(Date) for more details
   *
   * @param newBranch New branch created for change edit effective date. NOTE: the
   *                  changes made previously to the job branch have not yet been
   *                  applied to this branch.
   * @param oldBranch The old preempted branch that will  be thrown away
   */
  override function postCreateNewBranchForChangeEditEffectiveDate( newBranch : PolicyPeriod, oldBranch : PolicyPeriod) {
    copyNonEffDatedFieldsForPreemption( newBranch, oldBranch )
  }
  
  /**
   * Called after a branch has been created in the same (logical) period. This
   * will be called for policy change, etc.
   *
   * @param policyPeriod The new period
   */
  override function postCreateDraftBranchInSamePeriod( policyPeriod : PolicyPeriod ) {
    var draft = policyPeriod
    draft.AllAccountSyncables.each(\ a -> a.prepareForJobEdit())
    draft.removePeriodAnswersToQuestionSetsOfType(QuestionSetType.TC_PREQUAL) //remove pre-qual question's answers
    draft.mergeDuplicatePolicyContactRoles()
  }
  
  /**
   * Called after a branch has been created for a multi-version job, e.g. a new
   * version for a multi-quote.
   *
   * @param branch New branch
   */
  override function postCreateDraftMultiVersionJobBranch( branch : PolicyPeriod ) {
    var version = branch
    version.AllAccountSyncables.each(\ a -> a.prepareForJobEdit())
    version.mergeDuplicatePolicyContactRoles()
    version.setFieldValue("DoNotPurge", false)
  }

  /**
   * Determine the appropriate written date for the transaction in the
   * given policy period.  Doing this typically requires examining dates
   * in the policyPeriod and transaction.
   *
   * This method is called in order to populate the written date when
   * the posted date is set.
   *
   * @param policyPeriod The period to which the transaction belongs
   * @param transaction The transaction that needs a written date
   * @return Written date for the given transaction
   */
  override function determineWrittenDate( owningPolicyPeriod : PolicyPeriod, transaction : Transaction ) : Date {
    return {transaction.PostedDate, owningPolicyPeriod.EditEffectiveDate}.max()

  }

  /**
   * Determine the billing methods supported for this policy period
   * @param policyPeriod The policyPeriod for which we need a list of supported billing methods
   * @return All billing methods applicable to the given PolicyPeriod
   */
  override function getSupportedBillingMethods( policyPeriod : PolicyPeriod ) : BillingMethod[]
  {
    return BillingMethod.getTypeKeys( false ).toTypedArray()
  }


  /**
   * @param policyPeriod The policy to which the audit belongs
   * auditInfo The AuditInformation for an audit which is (a) for a non-reporting policy and
   * (b) a final audit
   * @return Whether the audit can be waived
   */
  override function canWaiveNonreportingFinalAudit(policyPeriod: PolicyPeriod, auditInfo: AuditInformation ) : boolean {
    return true //by default, don't add extra conditions
  }

  /**
   * Returns all AccountSyncables - PolicyContactRoles, PolicyLocations, PolicyAddresses,
   * plus any additional AccountSyncables defined in the config
   */
  override function getAllAccountSyncables(policyPeriod: PolicyPeriod) : AccountSyncable[] {
    var syncables = new ArrayList<AccountSyncable>()
    syncables.addAll(policyPeriod.PolicyContactRoles.toList())
    syncables.addAll(policyPeriod.PolicyLocations.toList())
    syncables.add(policyPeriod.PolicyAddress)
    return syncables.toTypedArray()
  }

  /**
   * Compute the initial set of dates that will be used to schedule new series audits.
   */
  override function computeAuditDates(policyPeriod : PolicyPeriod, pattern : SeriesAuditSchedulePattern) : List<Date> {
    // This code assume that the interval is monthly or quarterly. If another option is added
    // this code may have to be rewritten.
    return (pattern.IntervalComputationType == "CalendarMonth"
        ? AuditDateCalculator.forCalendarMonths(
              pattern.CalendarMonthRoundDate,
              pattern.Frequency,
              pattern.MinimumAuditPeriodLength,
              pattern.ExcludeLastAuditPeriod)
        : AuditDateCalculator.forPolicyMonths(
              pattern.Frequency,
              pattern.MinimumAuditPeriodLength,
              pattern.ExcludeLastAuditPeriod))
            .computeDates(policyPeriod.PeriodStart, policyPeriod.EndOfCoverageDate)
  }

  /**
   * Return all the {@link gw.api.domain.RefersOutOfDomainGraph} for the given {@link gw.pc.policy.period.entity.PolicyPeriod}.  This is
   * used when locking the Period Graph to mark the referred beans.
   * @param policyPeriod The PolicyPeriod to return RefersOutOfDomainGraphs for
   * @return all the RefersOutOfDomainGraphs on the PolicyPeriod
   */
  override function getTrackedOutOfGraphReferences(period : PolicyPeriod) : List<RefersOutOfDomainGraph> {
    var references = new ArrayList<RefersOutOfDomainGraph>()
    var versionList = period.VersionList
    references.addAll(versionList.PolicyContactRoles*.AllVersions.toList().flatten().toList())
    references.addAll(versionList.PolicyLocations*.AllVersions.toList().flatten().toList())
    references.addAll(versionList.EffectiveDatedFieldsArray*.AllVersions.toList().flatten()*.PolicyAddress.toList())
    return references
  }

  /**
   * Return all the {@link gw.api.domain.DenormalizedFKOutOfDomainGraph} for the given {@link gw.pc.policy.period.entity.PolicyPeriod}.  This is
   * used when restoring the PolicyPeriod from the archive to correct denormalized foreign keys.
   * @param policyPeriod The PolicyPeriod to return RefersOutOfDomainGraphWithDenormalizedFKs for
   * @return all the RefersOutOfDomainGraphWithDenormalizedFKs on the PolicyPeriod
   */
  override function getDenormalizedOutOfGraphReferences(period : PolicyPeriod) : List<DenormalizedFKOutOfDomainGraph> {
    var references = new ArrayList<DenormalizedFKOutOfDomainGraph>()
    var versionList = period.VersionList
    references.addAll(versionList.PolicyContactRoles*.AllVersions.toList().flatten().toList())
    references.addAll(versionList.PolicyLocations*.LocationRisks*.AllVersions.toList().flatten().toList())
    references.add(period)
    return references
  }

  /**
   * Defines the value used for marking the {@link gw.pc.policy.period.entity.PolicyPeriod#POLICYNUMBER_PROP PolicyNumber} field in
   * {@link gw.pc.policy.period.entity.PolicyPeriod} as unassigned. This identifier is not and should not be displayed on the UI.
   * @return the "unassigned" policy number marker
   */
  override property get UnassignedPolicyNumberIdentifier(): String {
    return "Unassigned"
  }
}
