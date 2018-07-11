
package extensions.pc.internal.domain.contact.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pl.contact.entity.GlobalAddress;

public abstract class GlobalAddressExtMethodsStub
    extends AspectBase
    implements GlobalAddressExtInternalMethodsStubI
{


    protected GlobalAddressExtMethodsStub(GlobalAddress owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public GlobalAddress getOwner() {
        return ((GlobalAddress) super.getOwner());
    }

    @Override
    public String getAddressLine1Kanji() {
        return ((String) getFieldValueForCodegen(ADDRESSLINE1KANJI_DYNPROP.get(getOwner().getIntrinsicType())));
    }

    @Override
    public void setAddressLine1Kanji(String value) {
        setFieldValueForCodegen(ADDRESSLINE1KANJI_DYNPROP.get(getOwner().getIntrinsicType()), value);
    }

    @Override
    public String getAddressLine2Kanji() {
        return ((String) getFieldValueForCodegen(ADDRESSLINE2KANJI_DYNPROP.get(getOwner().getIntrinsicType())));
    }

    @Override
    public void setAddressLine2Kanji(String value) {
        setFieldValueForCodegen(ADDRESSLINE2KANJI_DYNPROP.get(getOwner().getIntrinsicType()), value);
    }

    @Override
    public String getCityKanji() {
        return ((String) getFieldValueForCodegen(CITYKANJI_DYNPROP.get(getOwner().getIntrinsicType())));
    }

    @Override
    public void setCityKanji(String value) {
        setFieldValueForCodegen(CITYKANJI_DYNPROP.get(getOwner().getIntrinsicType()), value);
    }

    @Override
    public Boolean isCEDEX() {
        return ((Boolean) getFieldValue(CEDEX_DYNPROP.get(getOwner().getIntrinsicType())));
    }

    @Override
    public void setCEDEX(Boolean value) {
        setFieldValue(CEDEX_DYNPROP.get(getOwner().getIntrinsicType()), value);
    }

    @Override
    public String getCEDEXBureau() {
        return ((String) getFieldValueForCodegen(CEDEXBUREAU_DYNPROP.get(getOwner().getIntrinsicType())));
    }

    @Override
    public void setCEDEXBureau(String value) {
        setFieldValueForCodegen(CEDEXBUREAU_DYNPROP.get(getOwner().getIntrinsicType()), value);
    }

}
