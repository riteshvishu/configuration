
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import com.guidewire.pl.system.entity.proxy.AbstractKeyableBeanProxy;

public abstract class RateAdjFactorExtStub
    extends AbstractKeyableBeanProxy
    implements RateAdjFactorExtInternalStubI
{


    @Override
    public String getFactorName() {
        return ((String) getFieldValueForCodegen(FACTORNAME_PROP.get()));
    }

    @Override
    public void setFactorName(String value) {
        setFieldValueForCodegen(FACTORNAME_PROP.get(), value);
    }

    @Override
    public String getFactorState() {
        return ((String) getFieldValueForCodegen(FACTORSTATE_PROP.get()));
    }

    @Override
    public void setFactorState(String value) {
        setFieldValueForCodegen(FACTORSTATE_PROP.get(), value);
    }

    @Override
    public String getStringOption() {
        return ((String) getFieldValueForCodegen(STRINGOPTION_PROP.get()));
    }

    @Override
    public void setStringOption(String value) {
        setFieldValueForCodegen(STRINGOPTION_PROP.get(), value);
    }

    @Override
    public String getStringOption2() {
        return ((String) getFieldValueForCodegen(STRINGOPTION2_PROP.get()));
    }

    @Override
    public void setStringOption2(String value) {
        setFieldValueForCodegen(STRINGOPTION2_PROP.get(), value);
    }

    @Override
    public BigDecimal getMinNumber() {
        return ((BigDecimal) getFieldValue(MINNUMBER_PROP.get()));
    }

    @Override
    public void setMinNumber(BigDecimal value) {
        setFieldValue(MINNUMBER_PROP.get(), value);
    }

    @Override
    public BigDecimal getMaxNumber() {
        return ((BigDecimal) getFieldValue(MAXNUMBER_PROP.get()));
    }

    @Override
    public void setMaxNumber(BigDecimal value) {
        setFieldValue(MAXNUMBER_PROP.get(), value);
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
    public BigDecimal getFactor() {
        return ((BigDecimal) getFieldValue(FACTOR_PROP.get()));
    }

    @Override
    public void setFactor(BigDecimal value) {
        setFieldValue(FACTOR_PROP.get(), value);
    }

}
