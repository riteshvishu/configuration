
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import com.guidewire.pc.domain.policy.impl.RateFactorInternal;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7Modifier;
import extensions.pc.policy.entity.WC7RateFactor;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.api.productmodel.RateFactorPatternBase;
import gw.pc.policy.entity.Modifier;
import gw.pc.policy.entity.RateFactor;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pc.policy.typekey.RateFactorType;
import gw.pl.extract.entity.Extractable;
import gw.pl.persistence.core.Key;
import gw.pl.persistence.core.effdate.entity.EffDated;
import gw.pl.persistence.core.entity.KeyableBean;

public abstract class WC7RateFactorStub
    extends EffDatedBeanProxy
    implements WC7RateFactorInternalStubI
{


    @Override
    public WC7Modifier getWC7Modifier() {
        return ((WC7Modifier) getFieldValue(WC7MODIFIER_PROP.get()));
    }

    @Override
    public void setWC7Modifier(WC7Modifier value) {
        setFieldValue(WC7MODIFIER_PROP.get(), value);
    }

    @Override
    public Key getWC7ModifierID() {
        return ((Key) getRawFieldValue(WC7MODIFIER_PROP.get()));
    }

    @Override
    public void setWC7ModifierID(Key value) {
        setFieldValue(WC7MODIFIER_PROP.get(), value);
    }

    @Override
    public WC7RateFactor getBasedOn() {
        return ((WC7RateFactor) getBasedOnUntyped());
    }

    @Override
    public WC7RateFactor getSlice(Date sliceDate) {
        return ((WC7RateFactor) getSliceUntyped(sliceDate));
    }

    @Override
    public WC7RateFactor getUnsliced() {
        return ((WC7RateFactor) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public WC7RateFactor split(Date splitDate) {
        return ((WC7RateFactor) splitUntyped(splitDate));
    }

    @Override
    public WC7RateFactor clone() {
        return ((WC7RateFactor) cloneUntyped());
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
    public BigDecimal getAssessment() {
        return ((RateFactorInternal) getEntityDelegate(RateFactor.class)).getAssessment();
    }

    @Override
    public void setAssessment(BigDecimal value) {
        ((RateFactorInternal) getEntityDelegate(RateFactor.class)).setAssessment(value);
    }

    @Override
    public String getJustification() {
        return ((RateFactorInternal) getEntityDelegate(RateFactor.class)).getJustification();
    }

    @Override
    public void setJustification(String value) {
        ((RateFactorInternal) getEntityDelegate(RateFactor.class)).setJustification(value);
    }

    @Override
    public String getPatternCode() {
        return ((RateFactorInternal) getEntityDelegate(RateFactor.class)).getPatternCode();
    }

    @Override
    public void setPatternCode(String value) {
        ((RateFactorInternal) getEntityDelegate(RateFactor.class)).setPatternCode(value);
    }

    @Override
    public Modifier getModifier() {
        return getEntityDelegate(RateFactor.class).getModifier();
    }

    @Override
    public RateFactorType getRateFactorType() {
        return getEntityDelegate(RateFactor.class).getRateFactorType();
    }

    @Override
    public BigDecimal getMinimum() {
        return getEntityDelegate(RateFactor.class).getMinimum();
    }

    @Override
    public BigDecimal getMaximum() {
        return getEntityDelegate(RateFactor.class).getMaximum();
    }

    @Override
    public BigDecimal getAssessmentWithinLimits() {
        return getEntityDelegate(RateFactor.class).getAssessmentWithinLimits();
    }

    @Override
    public void setAssessmentWithinLimits(BigDecimal p0) {
        getEntityDelegate(RateFactor.class).setAssessmentWithinLimits(p0);
    }

    @Override
    public RateFactorPatternBase getPattern() {
        return getEntityDelegate(RateFactor.class).getPattern();
    }

    @Override
    public void setPattern(RateFactorPatternBase p0) {
        getEntityDelegate(RateFactor.class).setPattern(p0);
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
