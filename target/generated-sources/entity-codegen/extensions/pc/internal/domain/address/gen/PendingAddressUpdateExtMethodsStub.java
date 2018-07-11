
package extensions.pc.internal.domain.address.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.address.entity.PendingAddressUpdate;

public abstract class PendingAddressUpdateExtMethodsStub
    extends AspectBase
    implements PendingAddressUpdateExtInternalMethodsStubI
{


    protected PendingAddressUpdateExtMethodsStub(PendingAddressUpdate owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public PendingAddressUpdate getOwner() {
        return ((PendingAddressUpdate) super.getOwner());
    }

    @Override
    public String getAddressLine1Kanji() {
        return ((String) getFieldValueForCodegen(ADDRESSLINE1KANJI_PROP.get()));
    }

    @Override
    public void setAddressLine1Kanji(String value) {
        setFieldValueForCodegen(ADDRESSLINE1KANJI_PROP.get(), value);
    }

    @Override
    public Boolean isAddressLine1KanjiIsNull() {
        return ((Boolean) getFieldValue(ADDRESSLINE1KANJIISNULL_PROP.get()));
    }

    @Override
    public void setAddressLine1KanjiIsNull(Boolean value) {
        setFieldValue(ADDRESSLINE1KANJIISNULL_PROP.get(), value);
    }

    @Override
    public String getAddressLine2Kanji() {
        return ((String) getFieldValueForCodegen(ADDRESSLINE2KANJI_PROP.get()));
    }

    @Override
    public void setAddressLine2Kanji(String value) {
        setFieldValueForCodegen(ADDRESSLINE2KANJI_PROP.get(), value);
    }

    @Override
    public Boolean isAddressLine2KanjiIsNull() {
        return ((Boolean) getFieldValue(ADDRESSLINE2KANJIISNULL_PROP.get()));
    }

    @Override
    public void setAddressLine2KanjiIsNull(Boolean value) {
        setFieldValue(ADDRESSLINE2KANJIISNULL_PROP.get(), value);
    }

    @Override
    public String getCityKanji() {
        return ((String) getFieldValueForCodegen(CITYKANJI_PROP.get()));
    }

    @Override
    public void setCityKanji(String value) {
        setFieldValueForCodegen(CITYKANJI_PROP.get(), value);
    }

    @Override
    public Boolean isCityKanjiIsNull() {
        return ((Boolean) getFieldValue(CITYKANJIISNULL_PROP.get()));
    }

    @Override
    public void setCityKanjiIsNull(Boolean value) {
        setFieldValue(CITYKANJIISNULL_PROP.get(), value);
    }

    @Override
    public Boolean isCEDEX() {
        return ((Boolean) getFieldValue(CEDEX_PROP.get()));
    }

    @Override
    public void setCEDEX(Boolean value) {
        setFieldValue(CEDEX_PROP.get(), value);
    }

    @Override
    public Boolean isCEDEXIsNull() {
        return ((Boolean) getFieldValue(CEDEXISNULL_PROP.get()));
    }

    @Override
    public void setCEDEXIsNull(Boolean value) {
        setFieldValue(CEDEXISNULL_PROP.get(), value);
    }

    @Override
    public String getCEDEXBureau() {
        return ((String) getFieldValueForCodegen(CEDEXBUREAU_PROP.get()));
    }

    @Override
    public void setCEDEXBureau(String value) {
        setFieldValueForCodegen(CEDEXBUREAU_PROP.get(), value);
    }

    @Override
    public Boolean isCEDEXBureauIsNull() {
        return ((Boolean) getFieldValue(CEDEXBUREAUISNULL_PROP.get()));
    }

    @Override
    public void setCEDEXBureauIsNull(Boolean value) {
        setFieldValue(CEDEXBUREAUISNULL_PROP.get(), value);
    }

}
