
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import java.util.List;
import com.guidewire.pc.domain.coverage.impl.CoverableInternal;
import com.guidewire.pc.domain.policy.impl.ModifiableInternal;
import com.guidewire.pc.domain.productmodel.ClauseAvailabilityContext;
import com.guidewire.pc.domain.productmodel.CovTermAvailabilityContext;
import com.guidewire.pc.domain.productmodel.RateFactorAvailabilityContext;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import com.guidewire.pl.system.expression.SymbolSet;
import extensions.pc.policy.entity.WC7Jurisdiction;
import extensions.pc.policy.entity.WC7JurisdictionCost;
import extensions.pc.policy.entity.WC7JurisdictionCov;
import extensions.pc.policy.entity.WC7Modifier;
import extensions.pc.policy.entity.WC7PremiumDiscount;
import extensions.pc.policy.entity.WC7RatingPeriodStartDate;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import gw.api.copier.EffDatedCopyable;
import gw.api.domain.Clause;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.api.productmodel.ClausePattern;
import gw.api.productmodel.ConditionPattern;
import gw.api.productmodel.CovTermPattern;
import gw.api.productmodel.CoveragePattern;
import gw.api.productmodel.ExclusionPattern;
import gw.api.productmodel.ModifierPatternBase;
import gw.api.web.productmodel.ProductModelSyncIssue;
import gw.pc.coverage.entity.Coverable;
import gw.pc.coverage.entity.Coverage;
import gw.pc.coverage.entity.Exclusion;
import gw.pc.coverage.entity.PolicyCondition;
import gw.pc.policy.entity.Modifiable;
import gw.pc.policy.entity.Modifier;
import gw.pc.policy.lines.entity.PolicyLine;
import gw.pc.policy.period.entity.PolicyLocation;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.currency.typekey.Currency;
import gw.pl.extract.entity.Extractable;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.Key;
import gw.pl.persistence.core.effdate.entity.EffDated;
import gw.pl.persistence.core.entity.KeyableBean;

public abstract class WC7JurisdictionStub
    extends EffDatedBeanProxy
    implements WC7JurisdictionInternalStubI
{


    @Override
    public Date getAnniversaryDateInternal() {
        return ((Date) getFieldValue(ANNIVERSARYDATEINTERNAL_PROP.get()));
    }

    @Override
    public void setAnniversaryDateInternal(Date value) {
        setFieldValue(ANNIVERSARYDATEINTERNAL_PROP.get(), value);
    }

    @Override
    public Date getReferenceDateInternal() {
        return ((Date) getFieldValue(REFERENCEDATEINTERNAL_PROP.get()));
    }

    @Override
    public void setReferenceDateInternal(Date value) {
        setFieldValue(REFERENCEDATEINTERNAL_PROP.get(), value);
    }

    @Override
    public Jurisdiction getJurisdiction() {
        return ((Jurisdiction) getFieldValue(JURISDICTION_PROP.get()));
    }

    @Override
    public void setJurisdiction(Jurisdiction value) {
        setFieldValue(JURISDICTION_PROP.get(), value);
    }

    @Override
    public WC7WorkersCompLine getWCLine() {
        return ((WC7WorkersCompLine) getFieldValue(WCLINE_PROP.get()));
    }

    @Override
    public void setWCLine(WC7WorkersCompLine value) {
        setFieldValue(WCLINE_PROP.get(), value);
    }

    @Override
    public Key getWCLineID() {
        return ((Key) getRawFieldValue(WCLINE_PROP.get()));
    }

    @Override
    public void setWCLineID(Key value) {
        setFieldValue(WCLINE_PROP.get(), value);
    }

    @Override
    public WC7JurisdictionCost[] getCosts() {
        return ((WC7JurisdictionCost[]) getFieldValue(COSTS_PROP.get()));
    }

    @Override
    public void addToCosts(WC7JurisdictionCost value) {
        addArrayElement(COSTS_PROP.get(), value);
    }

    @Override
    public void removeFromCosts(WC7JurisdictionCost value) {
        removeArrayElement(COSTS_PROP.get(), value);
    }

    @Override
    public WC7JurisdictionCov[] getCoverages() {
        return ((WC7JurisdictionCov[]) getFieldValue(COVERAGES_PROP.get()));
    }

    @Override
    public void addToCoverages(WC7JurisdictionCov value) {
        addArrayElement(COVERAGES_PROP.get(), value);
    }

    @Override
    public void removeFromCoverages(WC7JurisdictionCov value) {
        removeArrayElement(COVERAGES_PROP.get(), value);
    }

    @Override
    public WC7RatingPeriodStartDate[] getWC7RatingPeriodStartDates() {
        return ((WC7RatingPeriodStartDate[]) getFieldValue(WC7RATINGPERIODSTARTDATES_PROP.get()));
    }

    @Override
    public void addToWC7RatingPeriodStartDates(WC7RatingPeriodStartDate value) {
        addArrayElement(WC7RATINGPERIODSTARTDATES_PROP.get(), value);
    }

    @Override
    public void removeFromWC7RatingPeriodStartDates(WC7RatingPeriodStartDate value) {
        removeArrayElement(WC7RATINGPERIODSTARTDATES_PROP.get(), value);
    }

    @Override
    public WC7PremiumDiscount[] getWC7PremiumDiscounts() {
        return ((WC7PremiumDiscount[]) getFieldValue(WC7PREMIUMDISCOUNTS_PROP.get()));
    }

    @Override
    public void addToWC7PremiumDiscounts(WC7PremiumDiscount value) {
        addArrayElement(WC7PREMIUMDISCOUNTS_PROP.get(), value);
    }

    @Override
    public void removeFromWC7PremiumDiscounts(WC7PremiumDiscount value) {
        removeArrayElement(WC7PREMIUMDISCOUNTS_PROP.get(), value);
    }

    @Override
    public WC7Modifier[] getWC7Modifiers() {
        return ((WC7Modifier[]) getFieldValue(WC7MODIFIERS_PROP.get()));
    }

    @Override
    public void addToWC7Modifiers(WC7Modifier value) {
        addArrayElement(WC7MODIFIERS_PROP.get(), value);
    }

    @Override
    public void removeFromWC7Modifiers(WC7Modifier value) {
        removeArrayElement(WC7MODIFIERS_PROP.get(), value);
    }

    @Override
    public WC7Jurisdiction getBasedOn() {
        return ((WC7Jurisdiction) getBasedOnUntyped());
    }

    @Override
    public WC7Jurisdiction getSlice(Date sliceDate) {
        return ((WC7Jurisdiction) getSliceUntyped(sliceDate));
    }

    @Override
    public WC7Jurisdiction getUnsliced() {
        return ((WC7Jurisdiction) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public WC7Jurisdiction split(Date splitDate) {
        return ((WC7Jurisdiction) splitUntyped(splitDate));
    }

    @Override
    public WC7Jurisdiction clone() {
        return ((WC7Jurisdiction) cloneUntyped());
    }

    @Override
    public Long getArchivePartition() {
        return ((ExtractableInternal) getEntityDelegate(Extractable.class)).getArchivePartition();
    }

    @Override
    public void setArchivePartition(Long value) {
        ((ExtractableInternal) getEntityDelegate(Extractable.class)).setArchivePartition(value);
    }

    @Override
    public Boolean isInitialCoveragesCreated() {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).isInitialCoveragesCreated();
    }

    @Override
    public void setInitialCoveragesCreated(Boolean value) {
        ((CoverableInternal) getEntityDelegate(Coverable.class)).setInitialCoveragesCreated(value);
    }

    @Override
    public Boolean isInitialExclusionsCreated() {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).isInitialExclusionsCreated();
    }

    @Override
    public void setInitialExclusionsCreated(Boolean value) {
        ((CoverableInternal) getEntityDelegate(Coverable.class)).setInitialExclusionsCreated(value);
    }

    @Override
    public Boolean isInitialConditionsCreated() {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).isInitialConditionsCreated();
    }

    @Override
    public void setInitialConditionsCreated(Boolean value) {
        ((CoverableInternal) getEntityDelegate(Coverable.class)).setInitialConditionsCreated(value);
    }

    @Override
    public Currency getPreferredCoverageCurrency() {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).getPreferredCoverageCurrency();
    }

    @Override
    public void setPreferredCoverageCurrency(Currency value) {
        ((CoverableInternal) getEntityDelegate(Coverable.class)).setPreferredCoverageCurrency(value);
    }

    @Override
    public void setCoverageExists(CoveragePattern p0, Boolean p1) {
        getEntityDelegate(Coverable.class).setCoverageExists(p0, p1);
    }

    @Override
    public void setExclusionExists(ExclusionPattern p0, Boolean p1) {
        getEntityDelegate(Coverable.class).setExclusionExists(p0, p1);
    }

    @Override
    public void setConditionExists(ConditionPattern p0, Boolean p1) {
        getEntityDelegate(Coverable.class).setConditionExists(p0, p1);
    }

    @Override
    public void setCoverageConditionOrExclusionExists(ClausePattern p0, Boolean p1) {
        getEntityDelegate(Coverable.class).setCoverageConditionOrExclusionExists(p0, p1);
    }

    @Override
    public void createCoverages() {
        getEntityDelegate(Coverable.class).createCoverages();
    }

    @Override
    public void createExclusions() {
        getEntityDelegate(Coverable.class).createExclusions();
    }

    @Override
    public void createConditions() {
        getEntityDelegate(Coverable.class).createConditions();
    }

    @Override
    public void createCoveragesConditionsAndExclusions() {
        getEntityDelegate(Coverable.class).createCoveragesConditionsAndExclusions();
    }

    @Override
    public Coverage createCoverage(CoveragePattern p0) {
        return getEntityDelegate(Coverable.class).createCoverage(p0);
    }

    @Override
    public Exclusion createExclusion(ExclusionPattern p0) {
        return getEntityDelegate(Coverable.class).createExclusion(p0);
    }

    @Override
    public PolicyCondition createCondition(ConditionPattern p0) {
        return getEntityDelegate(Coverable.class).createCondition(p0);
    }

    @Override
    public Clause createCoverageConditionOrExclusion(ClausePattern p0) {
        return getEntityDelegate(Coverable.class).createCoverageConditionOrExclusion(p0);
    }

    @Override
    public void removeCoverageFromCoverable(Coverage p0) {
        getEntityDelegate(Coverable.class).removeCoverageFromCoverable(p0);
    }

    @Override
    public void removeExclusionFromCoverable(Exclusion p0) {
        getEntityDelegate(Coverable.class).removeExclusionFromCoverable(p0);
    }

    @Override
    public void removeConditionFromCoverable(PolicyCondition p0) {
        getEntityDelegate(Coverable.class).removeConditionFromCoverable(p0);
    }

    @Override
    public void removeCoverageConditionOrExclusionFromCoverable(Clause p0) {
        getEntityDelegate(Coverable.class).removeCoverageConditionOrExclusionFromCoverable(p0);
    }

    @Override
    public Coverage getCoverage(CoveragePattern p0) {
        return getEntityDelegate(Coverable.class).getCoverage(p0);
    }

    @Override
    public Exclusion getExclusion(ExclusionPattern p0) {
        return getEntityDelegate(Coverable.class).getExclusion(p0);
    }

    @Override
    public PolicyCondition getCondition(ConditionPattern p0) {
        return getEntityDelegate(Coverable.class).getCondition(p0);
    }

    @Override
    public Clause getCoverageConditionOrExclusion(ClausePattern p0) {
        return getEntityDelegate(Coverable.class).getCoverageConditionOrExclusion(p0);
    }

    @Override
    public Coverage[] getCoveragesFromCoverable() {
        return getEntityDelegate(Coverable.class).getCoveragesFromCoverable();
    }

    @Override
    public Exclusion[] getExclusionsFromCoverable() {
        return getEntityDelegate(Coverable.class).getExclusionsFromCoverable();
    }

    @Override
    public PolicyCondition[] getConditionsFromCoverable() {
        return getEntityDelegate(Coverable.class).getConditionsFromCoverable();
    }

    @Override
    public Clause[] getCoveragesConditionsAndExclusionsFromCoverable() {
        return getEntityDelegate(Coverable.class).getCoveragesConditionsAndExclusionsFromCoverable();
    }

    @Override
    public boolean hasCoverage(CoveragePattern p0) {
        return getEntityDelegate(Coverable.class).hasCoverage(p0);
    }

    @Override
    public boolean hasExclusion(ExclusionPattern p0) {
        return getEntityDelegate(Coverable.class).hasExclusion(p0);
    }

    @Override
    public boolean hasCondition(ConditionPattern p0) {
        return getEntityDelegate(Coverable.class).hasCondition(p0);
    }

    @Override
    public boolean hasCoverageConditionOrExclusion(ClausePattern p0) {
        return getEntityDelegate(Coverable.class).hasCoverageConditionOrExclusion(p0);
    }

    @Override
    public Date getCoverableReferenceDate() {
        return getEntityDelegate(Coverable.class).getCoverableReferenceDate();
    }

    @Override
    public void denormalizeCoverableReferenceDate() {
        getEntityDelegate(Coverable.class).denormalizeCoverableReferenceDate();
    }

    @Override
    public void clearCoverableReferenceDateInternal() {
        getEntityDelegate(Coverable.class).clearCoverableReferenceDateInternal();
    }

    @Override
    public PolicyLine getPolicyLine() {
        return getEntityDelegate(Coverable.class).getPolicyLine();
    }

    @Override
    public PolicyLocation[] getPolicyLocations() {
        return getEntityDelegate(Coverable.class).getPolicyLocations();
    }

    @Override
    public Jurisdiction getCoverableState() {
        return getEntityDelegate(Coverable.class).getCoverableState();
    }

    @Override
    public Boolean isCoverageAvailable(CoveragePattern p0) {
        return getEntityDelegate(Coverable.class).isCoverageAvailable(p0);
    }

    @Override
    public Boolean isExclusionAvailable(ExclusionPattern p0) {
        return getEntityDelegate(Coverable.class).isExclusionAvailable(p0);
    }

    @Override
    public Boolean isConditionAvailable(ConditionPattern p0) {
        return getEntityDelegate(Coverable.class).isConditionAvailable(p0);
    }

    @Override
    public Boolean isCoverageConditionOrExclusionAvailable(ClausePattern p0) {
        return getEntityDelegate(Coverable.class).isCoverageConditionOrExclusionAvailable(p0);
    }

    @Override
    public Boolean isCovTermAvailable(CovTermPattern p0) {
        return getEntityDelegate(Coverable.class).isCovTermAvailable(p0);
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkCoveragesAgainstProductModel() {
        return getEntityDelegate(Coverable.class).checkCoveragesAgainstProductModel();
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkCoveragesAgainstProductModel(CoveragePattern[] p0) {
        return getEntityDelegate(Coverable.class).checkCoveragesAgainstProductModel(p0);
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkExclusionsAgainstProductModel() {
        return getEntityDelegate(Coverable.class).checkExclusionsAgainstProductModel();
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkExclusionsAgainstProductModel(ExclusionPattern[] p0) {
        return getEntityDelegate(Coverable.class).checkExclusionsAgainstProductModel(p0);
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkConditionsAgainstProductModel() {
        return getEntityDelegate(Coverable.class).checkConditionsAgainstProductModel();
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkConditionsAgainstProductModel(ConditionPattern[] p0) {
        return getEntityDelegate(Coverable.class).checkConditionsAgainstProductModel(p0);
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkCoveragesConditionsAndExclusionsAgainstProductModel() {
        return getEntityDelegate(Coverable.class).checkCoveragesConditionsAndExclusionsAgainstProductModel();
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkCoveragesAgainstProductModelwLine(PolicyLine p0) {
        return getEntityDelegate(Coverable.class).checkCoveragesAgainstProductModelwLine(p0);
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkConditionsAgainstProductModelwLine(PolicyLine p0) {
        return getEntityDelegate(Coverable.class).checkConditionsAgainstProductModelwLine(p0);
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkExclusionsAgainstProductModelwLine(PolicyLine p0) {
        return getEntityDelegate(Coverable.class).checkExclusionsAgainstProductModelwLine(p0);
    }

    @Override
    public void initializeCurrency() {
        getEntityDelegate(Coverable.class).initializeCurrency();
    }

    @Override
    public Coverage createCoverage(CoveragePattern p0, CovTermAvailabilityContext p1) {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).createCoverage(p0, p1);
    }

    @Override
    public Exclusion createExclusion(ExclusionPattern p0, CovTermAvailabilityContext p1) {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).createExclusion(p0, p1);
    }

    @Override
    public PolicyCondition createCondition(ConditionPattern p0, CovTermAvailabilityContext p1) {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).createCondition(p0, p1);
    }

    @Override
    public Clause createCoverageConditionOrExclusion(ClausePattern p0, CovTermAvailabilityContext p1) {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).createCoverageConditionOrExclusion(p0, p1);
    }

    @Override
    public void removeCoverage(CoveragePattern p0) {
        ((CoverableInternal) getEntityDelegate(Coverable.class)).removeCoverage(p0);
    }

    @Override
    public void removeExclusion(ExclusionPattern p0) {
        ((CoverableInternal) getEntityDelegate(Coverable.class)).removeExclusion(p0);
    }

    @Override
    public void removeCondition(ConditionPattern p0) {
        ((CoverableInternal) getEntityDelegate(Coverable.class)).removeCondition(p0);
    }

    @Override
    public void removeCoverageConditionOrExclusion(ClausePattern p0) {
        ((CoverableInternal) getEntityDelegate(Coverable.class)).removeCoverageConditionOrExclusion(p0);
    }

    @Override
    public SymbolSet makeAvailabilitySymbolSet() {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).makeAvailabilitySymbolSet();
    }

    @Override
    public SymbolSet makeExistenceSymbolSet() {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).makeExistenceSymbolSet();
    }

    @Override
    public ClauseAvailabilityContext getAvailabilityContext(ClausePattern p0) {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).getAvailabilityContext(p0);
    }

    @Override
    public CoveragePattern[] getCoverageTypesForCoverable() {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).getCoverageTypesForCoverable();
    }

    @Override
    public ExclusionPattern[] getExclusionTypesForCoverable() {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).getExclusionTypesForCoverable();
    }

    @Override
    public ConditionPattern[] getConditionTypesForCoverable() {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).getConditionTypesForCoverable();
    }

    @Override
    public ClausePattern[] getCoverageConditionAndExclusionTypesForCoverable() {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).getCoverageConditionAndExclusionTypesForCoverable();
    }

    @Override
    public List<? extends ProductModelSyncIssue> updateModifiers() {
        return getEntityDelegate(Modifiable.class).updateModifiers();
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkModifiersAgainstProductModel() {
        return getEntityDelegate(Modifiable.class).checkModifiersAgainstProductModel();
    }

    @Override
    public Modifier[] getModifiers() {
        return getEntityDelegate(Modifiable.class).getModifiers();
    }

    @Override
    public Modifier getModifier(ModifierPatternBase p0) {
        return getEntityDelegate(Modifiable.class).getModifier(p0);
    }

    @Override
    public Modifier getModifier(String p0) {
        return getEntityDelegate(Modifiable.class).getModifier(p0);
    }

    @Override
    public PolicyLine getModifiableLine() {
        return getEntityDelegate(Modifiable.class).getModifiableLine();
    }

    @Override
    public PolicyPeriod getModifiablePolicyPeriod() {
        return getEntityDelegate(Modifiable.class).getModifiablePolicyPeriod();
    }

    @Override
    public Jurisdiction getModifiableState() {
        return getEntityDelegate(Modifiable.class).getModifiableState();
    }

    @Override
    public Date getModifiableReferenceDate() {
        return getEntityDelegate(Modifiable.class).getModifiableReferenceDate();
    }

    @Override
    public void denormalizeModifiableReferenceDate() {
        getEntityDelegate(Modifiable.class).denormalizeModifiableReferenceDate();
    }

    @Override
    public void clearModifiableReferenceDateInternal() {
        getEntityDelegate(Modifiable.class).clearModifiableReferenceDateInternal();
    }

    @Override
    public Modifier createModifier(ModifierPatternBase p0) {
        return ((ModifiableInternal) getEntityDelegate(Modifiable.class)).createModifier(p0);
    }

    @Override
    public void addToModifiers(Modifier p0) {
        ((ModifiableInternal) getEntityDelegate(Modifiable.class)).addToModifiers(p0);
    }

    @Override
    public void removeFromModifiers(Modifier p0) {
        ((ModifiableInternal) getEntityDelegate(Modifiable.class)).removeFromModifiers(p0);
    }

    @Override
    public RateFactorAvailabilityContext getRateFactorAvailabilityContext(ModifierPatternBase p0) {
        return ((ModifiableInternal) getEntityDelegate(Modifiable.class)).getRateFactorAvailabilityContext(p0);
    }

    @Override
    public SymbolSet makeModifiableAvailabilitySymbolSet() {
        return ((ModifiableInternal) getEntityDelegate(Modifiable.class)).makeModifiableAvailabilitySymbolSet();
    }

    @Override
    public void copyFromBeanUntyped(EffDated p0) {
        getInterfaceDelegate(EffDatedCopyable.class).copyFromBeanUntyped(p0);
    }

    @Override
    public void copyBasicFieldsFromBeanUntyped(EffDated p0) {
        getInterfaceDelegate(EffDatedCopyable.class).copyBasicFieldsFromBeanUntyped(p0);
    }

    @Override
    public List<EffDated> findMatchesInPeriodUntyped(PolicyPeriod p0, boolean p1) {
        return getInterfaceDelegate(EffDatedLogicalMatcher.class).findMatchesInPeriodUntyped(p0, p1);
    }

    @Override
    public boolean isLogicalMatchUntyped(KeyableBean p0) {
        return getInterfaceDelegate(EffDatedLogicalMatcher.class).isLogicalMatchUntyped(p0);
    }

    @Override
    public Object genKey() {
        return getInterfaceDelegate(EffDatedLogicalMatcher.class).genKey();
    }

}
