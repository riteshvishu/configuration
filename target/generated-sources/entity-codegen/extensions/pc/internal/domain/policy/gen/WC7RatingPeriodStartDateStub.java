
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7Jurisdiction;
import extensions.pc.policy.entity.WC7RatingPeriodStartDate;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pc.policy.typekey.RPSDType;
import gw.pl.extract.entity.Extractable;
import gw.pl.persistence.core.Key;

public abstract class WC7RatingPeriodStartDateStub
    extends EffDatedBeanProxy
    implements WC7RatingPeriodStartDateInternalStubI
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
    public RPSDType getType() {
        return ((RPSDType) getFieldValue(TYPE_PROP.get()));
    }

    @Override
    public void setType(RPSDType value) {
        setFieldValue(TYPE_PROP.get(), value);
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
    public WC7RatingPeriodStartDate getBasedOn() {
        return ((WC7RatingPeriodStartDate) getBasedOnUntyped());
    }

    @Override
    public WC7RatingPeriodStartDate getSlice(Date sliceDate) {
        return ((WC7RatingPeriodStartDate) getSliceUntyped(sliceDate));
    }

    @Override
    public WC7RatingPeriodStartDate getUnsliced() {
        return ((WC7RatingPeriodStartDate) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public WC7RatingPeriodStartDate split(Date splitDate) {
        return ((WC7RatingPeriodStartDate) splitUntyped(splitDate));
    }

    @Override
    public WC7RatingPeriodStartDate clone() {
        return ((WC7RatingPeriodStartDate) cloneUntyped());
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
