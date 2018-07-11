
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import com.guidewire.pl.system.entity.proxy.AbstractKeyableBeanProxy;

public abstract class RateWCClassCodeExtStub
    extends AbstractKeyableBeanProxy
    implements RateWCClassCodeExtInternalStubI
{


    @Override
    public String getClasscode() {
        return ((String) getFieldValueForCodegen(CLASSCODE_PROP.get()));
    }

    @Override
    public void setClasscode(String value) {
        setFieldValueForCodegen(CLASSCODE_PROP.get(), value);
    }

    @Override
    public String getRateState() {
        return ((String) getFieldValueForCodegen(RATESTATE_PROP.get()));
    }

    @Override
    public void setRateState(String value) {
        setFieldValueForCodegen(RATESTATE_PROP.get(), value);
    }

    @Override
    public Date getEffDate() {
        return ((Date) getFieldValue(EFFDATE_PROP.get()));
    }

    @Override
    public void setEffDate(Date value) {
        setFieldValue(EFFDATE_PROP.get(), value);
    }

    @Override
    public Date getExpDate() {
        return ((Date) getFieldValue(EXPDATE_PROP.get()));
    }

    @Override
    public void setExpDate(Date value) {
        setFieldValue(EXPDATE_PROP.get(), value);
    }

    @Override
    public BigDecimal getRate() {
        return ((BigDecimal) getFieldValue(RATE_PROP.get()));
    }

    @Override
    public void setRate(BigDecimal value) {
        setFieldValue(RATE_PROP.get(), value);
    }

    @Override
    public Integer getMinPremium() {
        return ((Integer) getFieldValue(MINPREMIUM_PROP.get()));
    }

    @Override
    public void setMinPremium(Integer value) {
        setFieldValue(MINPREMIUM_PROP.get(), value);
    }

}
