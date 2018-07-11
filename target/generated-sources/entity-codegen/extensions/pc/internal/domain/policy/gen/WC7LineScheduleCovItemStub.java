
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import java.util.List;
import com.guidewire.pc.domain.coverage.impl.CoverableInternal;
import com.guidewire.pc.domain.productmodel.ClauseAvailabilityContext;
import com.guidewire.pc.domain.productmodel.CovTermAvailabilityContext;
import com.guidewire.pc.domain.productmodel.impl.ScheduledItemInternal;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import com.guidewire.pl.system.expression.SymbolSet;
import extensions.pc.policy.entity.WC7LineScheduleCov;
import gw.api.domain.Clause;
import gw.api.productmodel.ClausePattern;
import gw.api.productmodel.ConditionPattern;
import gw.api.productmodel.CovTermPattern;
import gw.api.productmodel.CoveragePattern;
import gw.api.productmodel.ExclusionPattern;
import gw.api.productmodel.Schedule;
import gw.api.web.productmodel.ProductModelSyncIssue;
import gw.pc.contact.entity.PolicyNamedInsured;
import gw.pc.coverage.entity.Coverable;
import gw.pc.coverage.entity.Coverage;
import gw.pc.coverage.entity.Exclusion;
import gw.pc.coverage.entity.PolicyCondition;
import gw.pc.policy.lines.entity.PolicyLine;
import gw.pc.policy.period.entity.PolicyLocation;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pc.productmodel.entity.ScheduledItem;
import gw.pl.currency.typekey.Currency;
import gw.pl.extract.entity.Extractable;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.Key;

public abstract class WC7LineScheduleCovItemStub
    extends EffDatedBeanProxy
    implements WC7LineScheduleCovItemInternalStubI
{


    @Override
    public extensions.pc.policy.typekey.WC7LineScheduleCovItem getSubtype() {
        return ((extensions.pc.policy.typekey.WC7LineScheduleCovItem) getFieldValue(SUBTYPE_PROP.get()));
    }

    @Override
    public void setSubtype(extensions.pc.policy.typekey.WC7LineScheduleCovItem value) {
        setFieldValue(SUBTYPE_PROP.get(), value);
    }

    @Override
    public WC7LineScheduleCov getSchedule() {
        return ((WC7LineScheduleCov) getFieldValue(SCHEDULE_PROP.get()));
    }

    @Override
    public void setSchedule(WC7LineScheduleCov value) {
        setFieldValue(SCHEDULE_PROP.get(), value);
    }

    @Override
    public Key getScheduleID() {
        return ((Key) getRawFieldValue(SCHEDULE_PROP.get()));
    }

    @Override
    public void setScheduleID(Key value) {
        setFieldValue(SCHEDULE_PROP.get(), value);
    }

    @Override
    public extensions.pc.policy.entity.WC7LineScheduleCovItem getBasedOn() {
        return ((extensions.pc.policy.entity.WC7LineScheduleCovItem) getBasedOnUntyped());
    }

    @Override
    public extensions.pc.policy.entity.WC7LineScheduleCovItem getSlice(Date sliceDate) {
        return ((extensions.pc.policy.entity.WC7LineScheduleCovItem) getSliceUntyped(sliceDate));
    }

    @Override
    public extensions.pc.policy.entity.WC7LineScheduleCovItem getUnsliced() {
        return ((extensions.pc.policy.entity.WC7LineScheduleCovItem) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public extensions.pc.policy.entity.WC7LineScheduleCovItem split(Date splitDate) {
        return ((extensions.pc.policy.entity.WC7LineScheduleCovItem) splitUntyped(splitDate));
    }

    @Override
    public extensions.pc.policy.entity.WC7LineScheduleCovItem clone() {
        return ((extensions.pc.policy.entity.WC7LineScheduleCovItem) cloneUntyped());
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
    public Integer getScheduleNumber() {
        return ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).getScheduleNumber();
    }

    @Override
    public void setScheduleNumber(Integer value) {
        ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).setScheduleNumber(value);
    }

    @Override
    public String getStringCol1() {
        return ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).getStringCol1();
    }

    @Override
    public void setStringCol1(String value) {
        ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).setStringCol1(value);
    }

    @Override
    public String getStringCol2() {
        return ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).getStringCol2();
    }

    @Override
    public void setStringCol2(String value) {
        ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).setStringCol2(value);
    }

    @Override
    public Integer getIntCol1() {
        return ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).getIntCol1();
    }

    @Override
    public void setIntCol1(Integer value) {
        ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).setIntCol1(value);
    }

    @Override
    public Integer getPosIntCol1() {
        return ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).getPosIntCol1();
    }

    @Override
    public void setPosIntCol1(Integer value) {
        ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).setPosIntCol1(value);
    }

    @Override
    public Boolean isBoolCol1() {
        return ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).isBoolCol1();
    }

    @Override
    public void setBoolCol1(Boolean value) {
        ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).setBoolCol1(value);
    }

    @Override
    public Boolean isBoolCol2() {
        return ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).isBoolCol2();
    }

    @Override
    public void setBoolCol2(Boolean value) {
        ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).setBoolCol2(value);
    }

    @Override
    public Date getDateCol1() {
        return ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).getDateCol1();
    }

    @Override
    public void setDateCol1(Date value) {
        ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).setDateCol1(value);
    }

    @Override
    public String getTypeKeyCol1() {
        return ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).getTypeKeyCol1();
    }

    @Override
    public void setTypeKeyCol1(String value) {
        ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).setTypeKeyCol1(value);
    }

    @Override
    public String getTypeKeyCol2() {
        return ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).getTypeKeyCol2();
    }

    @Override
    public void setTypeKeyCol2(String value) {
        ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).setTypeKeyCol2(value);
    }

    @Override
    public Date getReferenceDateInternal() {
        return ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).getReferenceDateInternal();
    }

    @Override
    public void setReferenceDateInternal(Date value) {
        ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).setReferenceDateInternal(value);
    }

    @Override
    public PolicyNamedInsured getNamedInsured() {
        return ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).getNamedInsured();
    }

    @Override
    public void setNamedInsured(PolicyNamedInsured value) {
        ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).setNamedInsured(value);
    }

    @Override
    public Key getNamedInsuredID() {
        return ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).getNamedInsuredID();
    }

    @Override
    public void setNamedInsuredID(Key value) {
        ((ScheduledItemInternal) getEntityDelegate(ScheduledItem.class)).setNamedInsuredID(value);
    }

    @Override
    public Schedule getScheduleParent() {
        return getEntityDelegate(ScheduledItem.class).getScheduleParent();
    }

    @Override
    public boolean hasClause() {
        return getEntityDelegate(ScheduledItem.class).hasClause();
    }

    @Override
    public Clause getClause() {
        return getEntityDelegate(ScheduledItem.class).getClause();
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

}
