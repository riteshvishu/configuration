
package extensions.pc.internal.domain.address.gen;

import com.guidewire.pc.domain.address.impl.PendingAddressUpdateImpl;
import extensions.pc.internal.domain.address.impl.PendingAddressUpdateExtInternal;
import extensions.pc.internal.domain.address.impl.PendingAddressUpdateExtMethodsImpl;

public class PendingAddressUpdateExtStub
    extends PendingAddressUpdateImpl
    implements PendingAddressUpdateExtInternal
{


    @Override
    public String getAddressLine1Kanji() {
        return getExtensionDelegate(PendingAddressUpdateExtMethodsImpl.class).getAddressLine1Kanji();
    }

    @Override
    public void setAddressLine1Kanji(String value) {
        getExtensionDelegate(PendingAddressUpdateExtMethodsImpl.class).setAddressLine1Kanji(value);
    }

    @Override
    public Boolean isAddressLine1KanjiIsNull() {
        return getExtensionDelegate(PendingAddressUpdateExtMethodsImpl.class).isAddressLine1KanjiIsNull();
    }

    @Override
    public void setAddressLine1KanjiIsNull(Boolean value) {
        getExtensionDelegate(PendingAddressUpdateExtMethodsImpl.class).setAddressLine1KanjiIsNull(value);
    }

    @Override
    public String getAddressLine2Kanji() {
        return getExtensionDelegate(PendingAddressUpdateExtMethodsImpl.class).getAddressLine2Kanji();
    }

    @Override
    public void setAddressLine2Kanji(String value) {
        getExtensionDelegate(PendingAddressUpdateExtMethodsImpl.class).setAddressLine2Kanji(value);
    }

    @Override
    public Boolean isAddressLine2KanjiIsNull() {
        return getExtensionDelegate(PendingAddressUpdateExtMethodsImpl.class).isAddressLine2KanjiIsNull();
    }

    @Override
    public void setAddressLine2KanjiIsNull(Boolean value) {
        getExtensionDelegate(PendingAddressUpdateExtMethodsImpl.class).setAddressLine2KanjiIsNull(value);
    }

    @Override
    public String getCityKanji() {
        return getExtensionDelegate(PendingAddressUpdateExtMethodsImpl.class).getCityKanji();
    }

    @Override
    public void setCityKanji(String value) {
        getExtensionDelegate(PendingAddressUpdateExtMethodsImpl.class).setCityKanji(value);
    }

    @Override
    public Boolean isCityKanjiIsNull() {
        return getExtensionDelegate(PendingAddressUpdateExtMethodsImpl.class).isCityKanjiIsNull();
    }

    @Override
    public void setCityKanjiIsNull(Boolean value) {
        getExtensionDelegate(PendingAddressUpdateExtMethodsImpl.class).setCityKanjiIsNull(value);
    }

    @Override
    public Boolean isCEDEX() {
        return getExtensionDelegate(PendingAddressUpdateExtMethodsImpl.class).isCEDEX();
    }

    @Override
    public void setCEDEX(Boolean value) {
        getExtensionDelegate(PendingAddressUpdateExtMethodsImpl.class).setCEDEX(value);
    }

    @Override
    public Boolean isCEDEXIsNull() {
        return getExtensionDelegate(PendingAddressUpdateExtMethodsImpl.class).isCEDEXIsNull();
    }

    @Override
    public void setCEDEXIsNull(Boolean value) {
        getExtensionDelegate(PendingAddressUpdateExtMethodsImpl.class).setCEDEXIsNull(value);
    }

    @Override
    public String getCEDEXBureau() {
        return getExtensionDelegate(PendingAddressUpdateExtMethodsImpl.class).getCEDEXBureau();
    }

    @Override
    public void setCEDEXBureau(String value) {
        getExtensionDelegate(PendingAddressUpdateExtMethodsImpl.class).setCEDEXBureau(value);
    }

    @Override
    public Boolean isCEDEXBureauIsNull() {
        return getExtensionDelegate(PendingAddressUpdateExtMethodsImpl.class).isCEDEXBureauIsNull();
    }

    @Override
    public void setCEDEXBureauIsNull(Boolean value) {
        getExtensionDelegate(PendingAddressUpdateExtMethodsImpl.class).setCEDEXBureauIsNull(value);
    }

}
