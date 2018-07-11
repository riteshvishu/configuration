
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import com.guidewire.pl.system.entity.proxy.AbstractKeyableBeanProxy;

public abstract class ShortRateFactorExtStub
    extends AbstractKeyableBeanProxy
    implements ShortRateFactorExtInternalStubI
{


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
    public Integer getDaysInPeriod() {
        return ((Integer) getFieldValue(DAYSINPERIOD_PROP.get()));
    }

    @Override
    public void setDaysInPeriod(Integer value) {
        setFieldValue(DAYSINPERIOD_PROP.get(), value);
    }

    @Override
    public BigDecimal getShortRatePercent() {
        return ((BigDecimal) getFieldValue(SHORTRATEPERCENT_PROP.get()));
    }

    @Override
    public void setShortRatePercent(BigDecimal value) {
        setFieldValue(SHORTRATEPERCENT_PROP.get(), value);
    }

    @Override
    public BigDecimal getShortRateFactor() {
        return ((BigDecimal) getFieldValue(SHORTRATEFACTOR_PROP.get()));
    }

    @Override
    public void setShortRateFactor(BigDecimal value) {
        setFieldValue(SHORTRATEFACTOR_PROP.get(), value);
    }

}
