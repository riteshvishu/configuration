
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.pl.system.entity.proxy.AbstractKeyableBeanProxy;
import extensions.pc.policy.typekey.RateConversionType;
import extensions.pc.policy.typekey.RateSubtotalType;
import extensions.pc.policy.typekey.WC7JurisdictionCostType;
import extensions.pc.policy.typekey.WCRateStepAction;
import gw.pc.financials.typekey.RateAmountType;

public abstract class WC7RatingStepExtStub
    extends AbstractKeyableBeanProxy
    implements WC7RatingStepExtInternalStubI
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
    public Integer getCalcOrder() {
        return ((Integer) getFieldValue(CALCORDER_PROP.get()));
    }

    @Override
    public void setCalcOrder(Integer value) {
        setFieldValue(CALCORDER_PROP.get(), value);
    }

    @Override
    public WCRateStepAction getStepAction() {
        return ((WCRateStepAction) getFieldValue(STEPACTION_PROP.get()));
    }

    @Override
    public void setStepAction(WCRateStepAction value) {
        setFieldValue(STEPACTION_PROP.get(), value);
    }

    @Override
    public String getCustomAction() {
        return ((String) getFieldValueForCodegen(CUSTOMACTION_PROP.get()));
    }

    @Override
    public void setCustomAction(String value) {
        setFieldValueForCodegen(CUSTOMACTION_PROP.get(), value);
    }

    @Override
    public RateSubtotalType getSubtotal() {
        return ((RateSubtotalType) getFieldValue(SUBTOTAL_PROP.get()));
    }

    @Override
    public void setSubtotal(RateSubtotalType value) {
        setFieldValue(SUBTOTAL_PROP.get(), value);
    }

    @Override
    public String getModifierID() {
        return ((String) getFieldValueForCodegen(MODIFIERID_PROP.get()));
    }

    @Override
    public void setModifierID(String value) {
        setFieldValueForCodegen(MODIFIERID_PROP.get(), value);
    }

    @Override
    public String getFactorName() {
        return ((String) getFieldValueForCodegen(FACTORNAME_PROP.get()));
    }

    @Override
    public void setFactorName(String value) {
        setFieldValueForCodegen(FACTORNAME_PROP.get(), value);
    }

    @Override
    public RateConversionType getRateConversionType() {
        return ((RateConversionType) getFieldValue(RATECONVERSIONTYPE_PROP.get()));
    }

    @Override
    public void setRateConversionType(RateConversionType value) {
        setFieldValue(RATECONVERSIONTYPE_PROP.get(), value);
    }

    @Override
    public String getClasscode() {
        return ((String) getFieldValueForCodegen(CLASSCODE_PROP.get()));
    }

    @Override
    public void setClasscode(String value) {
        setFieldValueForCodegen(CLASSCODE_PROP.get(), value);
    }

    @Override
    public WC7JurisdictionCostType getAggCostType() {
        return ((WC7JurisdictionCostType) getFieldValue(AGGCOSTTYPE_PROP.get()));
    }

    @Override
    public void setAggCostType(WC7JurisdictionCostType value) {
        setFieldValue(AGGCOSTTYPE_PROP.get(), value);
    }

    @Override
    public RateAmountType getAmountType() {
        return ((RateAmountType) getFieldValue(AMOUNTTYPE_PROP.get()));
    }

    @Override
    public void setAmountType(RateAmountType value) {
        setFieldValue(AMOUNTTYPE_PROP.get(), value);
    }

    @Override
    public String getDescription() {
        return ((String) getFieldValueForCodegen(DESCRIPTION_PROP.get()));
    }

    @Override
    public void setDescription(String value) {
        setFieldValueForCodegen(DESCRIPTION_PROP.get(), value);
    }

    @Override
    public Boolean isIncludeInReports() {
        return ((Boolean) getFieldValue(INCLUDEINREPORTS_PROP.get()));
    }

    @Override
    public void setIncludeInReports(Boolean value) {
        setFieldValue(INCLUDEINREPORTS_PROP.get(), value);
    }

}
