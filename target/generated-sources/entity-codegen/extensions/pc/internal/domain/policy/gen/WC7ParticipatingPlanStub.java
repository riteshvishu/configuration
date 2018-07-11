
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7ParticipatingPlan;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import extensions.pc.policy.typekey.WC7ParticipatingPlanID;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.extract.entity.Extractable;
import gw.pl.persistence.core.Key;
import gw.pl.persistence.core.effdate.entity.EffDated;
import gw.pl.persistence.core.entity.KeyableBean;

public abstract class WC7ParticipatingPlanStub
    extends EffDatedBeanProxy
    implements WC7ParticipatingPlanInternalStubI
{


    @Override
    public BigDecimal getLossConversionFactor() {
        return ((BigDecimal) getFieldValue(LOSSCONVERSIONFACTOR_PROP.get()));
    }

    @Override
    public void setLossConversionFactor(BigDecimal value) {
        setFieldValue(LOSSCONVERSIONFACTOR_PROP.get(), value);
    }

    @Override
    public BigDecimal getRetention() {
        return ((BigDecimal) getFieldValue(RETENTION_PROP.get()));
    }

    @Override
    public void setRetention(BigDecimal value) {
        setFieldValue(RETENTION_PROP.get(), value);
    }

    @Override
    public WC7ParticipatingPlanID getPlanID() {
        return ((WC7ParticipatingPlanID) getFieldValue(PLANID_PROP.get()));
    }

    @Override
    public void setPlanID(WC7ParticipatingPlanID value) {
        setFieldValue(PLANID_PROP.get(), value);
    }

    @Override
    public WC7WorkersCompLine getWC7WorkersCompLine() {
        return ((WC7WorkersCompLine) getFieldValue(WC7WORKERSCOMPLINE_PROP.get()));
    }

    @Override
    public void setWC7WorkersCompLine(WC7WorkersCompLine value) {
        setFieldValue(WC7WORKERSCOMPLINE_PROP.get(), value);
    }

    @Override
    public Key getWC7WorkersCompLineID() {
        return ((Key) getRawFieldValue(WC7WORKERSCOMPLINE_PROP.get()));
    }

    @Override
    public void setWC7WorkersCompLineID(Key value) {
        setFieldValue(WC7WORKERSCOMPLINE_PROP.get(), value);
    }

    @Override
    public WC7ParticipatingPlan getBasedOn() {
        return ((WC7ParticipatingPlan) getBasedOnUntyped());
    }

    @Override
    public WC7ParticipatingPlan getSlice(Date sliceDate) {
        return ((WC7ParticipatingPlan) getSliceUntyped(sliceDate));
    }

    @Override
    public WC7ParticipatingPlan getUnsliced() {
        return ((WC7ParticipatingPlan) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public WC7ParticipatingPlan split(Date splitDate) {
        return ((WC7ParticipatingPlan) splitUntyped(splitDate));
    }

    @Override
    public WC7ParticipatingPlan clone() {
        return ((WC7ParticipatingPlan) cloneUntyped());
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
