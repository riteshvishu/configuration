
package extensions.pc.internal.domain.policy.period.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.policy.period.entity.PolicyAddress;

public abstract class PolicyAddressExtMethodsStub
    extends AspectBase
    implements PolicyAddressExtInternalMethodsStubI
{


    protected PolicyAddressExtMethodsStub(PolicyAddress owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public PolicyAddress getOwner() {
        return ((PolicyAddress) super.getOwner());
    }

    @Override
    public String getAddressLine1KanjiInternal() {
        return ((String) getFieldValueForCodegen(ADDRESSLINE1KANJIINTERNAL_PROP.get()));
    }

    @Override
    public void setAddressLine1KanjiInternal(String value) {
        setFieldValueForCodegen(ADDRESSLINE1KANJIINTERNAL_PROP.get(), value);
    }

    @Override
    public String getAddressLine2KanjiInternal() {
        return ((String) getFieldValueForCodegen(ADDRESSLINE2KANJIINTERNAL_PROP.get()));
    }

    @Override
    public void setAddressLine2KanjiInternal(String value) {
        setFieldValueForCodegen(ADDRESSLINE2KANJIINTERNAL_PROP.get(), value);
    }

    @Override
    public String getCityKanjiInternal() {
        return ((String) getFieldValueForCodegen(CITYKANJIINTERNAL_PROP.get()));
    }

    @Override
    public void setCityKanjiInternal(String value) {
        setFieldValueForCodegen(CITYKANJIINTERNAL_PROP.get(), value);
    }

    @Override
    public Boolean isCEDEXInternal() {
        return ((Boolean) getFieldValue(CEDEXINTERNAL_PROP.get()));
    }

    @Override
    public void setCEDEXInternal(Boolean value) {
        setFieldValue(CEDEXINTERNAL_PROP.get(), value);
    }

    @Override
    public String getCEDEXBureauInternal() {
        return ((String) getFieldValueForCodegen(CEDEXBUREAUINTERNAL_PROP.get()));
    }

    @Override
    public void setCEDEXBureauInternal(String value) {
        setFieldValueForCodegen(CEDEXBUREAUINTERNAL_PROP.get(), value);
    }

}
