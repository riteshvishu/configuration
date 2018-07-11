
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7RetroRatingLetterOfCredit;
import extensions.pc.policy.entity.WC7RetrospectiveRatingPlan;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.extract.entity.Extractable;
import gw.pl.persistence.core.Key;

public abstract class WC7RetroRatingLetterOfCreditStub
    extends EffDatedBeanProxy
    implements WC7RetroRatingLetterOfCreditInternalStubI
{


    @Override
    public BigDecimal getAmount() {
        return ((BigDecimal) getFieldValue(AMOUNT_PROP.get()));
    }

    @Override
    public void setAmount(BigDecimal value) {
        setFieldValue(AMOUNT_PROP.get(), value);
    }

    @Override
    public String getIssuerName() {
        return ((String) getFieldValueForCodegen(ISSUERNAME_PROP.get()));
    }

    @Override
    public void setIssuerName(String value) {
        setFieldValueForCodegen(ISSUERNAME_PROP.get(), value);
    }

    @Override
    public Date getValidFrom() {
        return ((Date) getFieldValue(VALIDFROM_PROP.get()));
    }

    @Override
    public void setValidFrom(Date value) {
        setFieldValue(VALIDFROM_PROP.get(), value);
    }

    @Override
    public Date getValidTo() {
        return ((Date) getFieldValue(VALIDTO_PROP.get()));
    }

    @Override
    public void setValidTo(Date value) {
        setFieldValue(VALIDTO_PROP.get(), value);
    }

    @Override
    public WC7RetrospectiveRatingPlan getWC7RetrospectiveRatingPlan() {
        return ((WC7RetrospectiveRatingPlan) getFieldValue(WC7RETROSPECTIVERATINGPLAN_PROP.get()));
    }

    @Override
    public void setWC7RetrospectiveRatingPlan(WC7RetrospectiveRatingPlan value) {
        setFieldValue(WC7RETROSPECTIVERATINGPLAN_PROP.get(), value);
    }

    @Override
    public Key getWC7RetrospectiveRatingPlanID() {
        return ((Key) getRawFieldValue(WC7RETROSPECTIVERATINGPLAN_PROP.get()));
    }

    @Override
    public void setWC7RetrospectiveRatingPlanID(Key value) {
        setFieldValue(WC7RETROSPECTIVERATINGPLAN_PROP.get(), value);
    }

    @Override
    public WC7RetroRatingLetterOfCredit getBasedOn() {
        return ((WC7RetroRatingLetterOfCredit) getBasedOnUntyped());
    }

    @Override
    public WC7RetroRatingLetterOfCredit getSlice(Date sliceDate) {
        return ((WC7RetroRatingLetterOfCredit) getSliceUntyped(sliceDate));
    }

    @Override
    public WC7RetroRatingLetterOfCredit getUnsliced() {
        return ((WC7RetroRatingLetterOfCredit) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public WC7RetroRatingLetterOfCredit split(Date splitDate) {
        return ((WC7RetroRatingLetterOfCredit) splitUntyped(splitDate));
    }

    @Override
    public WC7RetroRatingLetterOfCredit clone() {
        return ((WC7RetroRatingLetterOfCredit) cloneUntyped());
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
