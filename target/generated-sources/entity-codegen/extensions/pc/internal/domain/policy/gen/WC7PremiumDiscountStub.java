
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7Jurisdiction;
import extensions.pc.policy.entity.WC7PremiumDiscount;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.extract.entity.Extractable;
import gw.pl.persistence.core.Key;

public abstract class WC7PremiumDiscountStub
    extends EffDatedBeanProxy
    implements WC7PremiumDiscountInternalStubI
{


    @Override
    public Date getStartDate() {
        return ((Date) getFieldValue(STARTDATE_PROP.get()));
    }

    @Override
    public void setStartDate(Date value) {
        setFieldValue(STARTDATE_PROP.get(), value);
    }

    @Override
    public Date getEndDate() {
        return ((Date) getFieldValue(ENDDATE_PROP.get()));
    }

    @Override
    public void setEndDate(Date value) {
        setFieldValue(ENDDATE_PROP.get(), value);
    }

    @Override
    public BigDecimal getDiscountRate() {
        return ((BigDecimal) getFieldValue(DISCOUNTRATE_PROP.get()));
    }

    @Override
    public void setDiscountRate(BigDecimal value) {
        setFieldValue(DISCOUNTRATE_PROP.get(), value);
    }

    @Override
    public WC7Jurisdiction getWC7Jurisdiction() {
        return ((WC7Jurisdiction) getFieldValue(WC7JURISDICTION_PROP.get()));
    }

    @Override
    public void setWC7Jurisdiction(WC7Jurisdiction value) {
        setFieldValue(WC7JURISDICTION_PROP.get(), value);
    }

    @Override
    public Key getWC7JurisdictionID() {
        return ((Key) getRawFieldValue(WC7JURISDICTION_PROP.get()));
    }

    @Override
    public void setWC7JurisdictionID(Key value) {
        setFieldValue(WC7JURISDICTION_PROP.get(), value);
    }

    @Override
    public WC7PremiumDiscount getBasedOn() {
        return ((WC7PremiumDiscount) getBasedOnUntyped());
    }

    @Override
    public WC7PremiumDiscount getSlice(Date sliceDate) {
        return ((WC7PremiumDiscount) getSliceUntyped(sliceDate));
    }

    @Override
    public WC7PremiumDiscount getUnsliced() {
        return ((WC7PremiumDiscount) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public WC7PremiumDiscount split(Date splitDate) {
        return ((WC7PremiumDiscount) splitUntyped(splitDate));
    }

    @Override
    public WC7PremiumDiscount clone() {
        return ((WC7PremiumDiscount) cloneUntyped());
    }

    @Override
    public Long getArchivePartition() {
        return ((ExtractableInternal) getEntityDelegate(Extractable.class)).getArchivePartition();
    }

    @Override
    public void setArchivePartition(Long value) {
        ((ExtractableInternal) getEntityDelegate(Extractable.class)).setArchivePartition(value);
    }

}
