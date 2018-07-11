
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7ManuscriptOption;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import gw.api.copier.EffDatedCopyable;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.extract.entity.Extractable;
import gw.pl.persistence.core.Key;
import gw.pl.persistence.core.effdate.entity.EffDated;

public abstract class WC7ManuscriptOptionStub
    extends EffDatedBeanProxy
    implements WC7ManuscriptOptionInternalStubI
{


    @Override
    public String getDescription() {
        return ((String) getFieldValueForCodegen(DESCRIPTION_PROP.get()));
    }

    @Override
    public void setDescription(String value) {
        setFieldValueForCodegen(DESCRIPTION_PROP.get(), value);
    }

    @Override
    public BigDecimal getPremium() {
        return ((BigDecimal) getFieldValue(PREMIUM_PROP.get()));
    }

    @Override
    public void setPremium(BigDecimal value) {
        setFieldValue(PREMIUM_PROP.get(), value);
    }

    @Override
    public WC7WorkersCompLine getWC7Line() {
        return ((WC7WorkersCompLine) getFieldValue(WC7LINE_PROP.get()));
    }

    @Override
    public void setWC7Line(WC7WorkersCompLine value) {
        setFieldValue(WC7LINE_PROP.get(), value);
    }

    @Override
    public Key getWC7LineID() {
        return ((Key) getRawFieldValue(WC7LINE_PROP.get()));
    }

    @Override
    public void setWC7LineID(Key value) {
        setFieldValue(WC7LINE_PROP.get(), value);
    }

    @Override
    public WC7ManuscriptOption getBasedOn() {
        return ((WC7ManuscriptOption) getBasedOnUntyped());
    }

    @Override
    public WC7ManuscriptOption getSlice(Date sliceDate) {
        return ((WC7ManuscriptOption) getSliceUntyped(sliceDate));
    }

    @Override
    public WC7ManuscriptOption getUnsliced() {
        return ((WC7ManuscriptOption) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public WC7ManuscriptOption split(Date splitDate) {
        return ((WC7ManuscriptOption) splitUntyped(splitDate));
    }

    @Override
    public WC7ManuscriptOption clone() {
        return ((WC7ManuscriptOption) cloneUntyped());
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

}
