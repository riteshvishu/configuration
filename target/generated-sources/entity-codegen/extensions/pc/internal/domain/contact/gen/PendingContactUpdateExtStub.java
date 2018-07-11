
package extensions.pc.internal.domain.contact.gen;

import com.guidewire.pc.domain.contact.impl.PendingContactUpdateImpl;
import extensions.pc.internal.domain.contact.impl.PendingContactUpdateExtInternal;
import extensions.pc.internal.domain.contact.impl.PendingContactUpdateExtMethodsImpl;

public class PendingContactUpdateExtStub
    extends PendingContactUpdateImpl
    implements PendingContactUpdateExtInternal
{


    @Override
    public String getCompanyNameKanji() {
        return getExtensionDelegate(PendingContactUpdateExtMethodsImpl.class).getCompanyNameKanji();
    }

    @Override
    public void setCompanyNameKanji(String value) {
        getExtensionDelegate(PendingContactUpdateExtMethodsImpl.class).setCompanyNameKanji(value);
    }

    @Override
    public Boolean isCompanyNameKanjiIsNull() {
        return getExtensionDelegate(PendingContactUpdateExtMethodsImpl.class).isCompanyNameKanjiIsNull();
    }

    @Override
    public void setCompanyNameKanjiIsNull(Boolean value) {
        getExtensionDelegate(PendingContactUpdateExtMethodsImpl.class).setCompanyNameKanjiIsNull(value);
    }

    @Override
    public String getFirstNameKanji() {
        return getExtensionDelegate(PendingContactUpdateExtMethodsImpl.class).getFirstNameKanji();
    }

    @Override
    public void setFirstNameKanji(String value) {
        getExtensionDelegate(PendingContactUpdateExtMethodsImpl.class).setFirstNameKanji(value);
    }

    @Override
    public Boolean isFirstNameKanjiIsNull() {
        return getExtensionDelegate(PendingContactUpdateExtMethodsImpl.class).isFirstNameKanjiIsNull();
    }

    @Override
    public void setFirstNameKanjiIsNull(Boolean value) {
        getExtensionDelegate(PendingContactUpdateExtMethodsImpl.class).setFirstNameKanjiIsNull(value);
    }

    @Override
    public String getLastNameKanji() {
        return getExtensionDelegate(PendingContactUpdateExtMethodsImpl.class).getLastNameKanji();
    }

    @Override
    public void setLastNameKanji(String value) {
        getExtensionDelegate(PendingContactUpdateExtMethodsImpl.class).setLastNameKanji(value);
    }

    @Override
    public Boolean isLastNameKanjiIsNull() {
        return getExtensionDelegate(PendingContactUpdateExtMethodsImpl.class).isLastNameKanjiIsNull();
    }

    @Override
    public void setLastNameKanjiIsNull(Boolean value) {
        getExtensionDelegate(PendingContactUpdateExtMethodsImpl.class).setLastNameKanjiIsNull(value);
    }

    @Override
    public String getParticle() {
        return getExtensionDelegate(PendingContactUpdateExtMethodsImpl.class).getParticle();
    }

    @Override
    public void setParticle(String value) {
        getExtensionDelegate(PendingContactUpdateExtMethodsImpl.class).setParticle(value);
    }

    @Override
    public Boolean isParticleIsNull() {
        return getExtensionDelegate(PendingContactUpdateExtMethodsImpl.class).isParticleIsNull();
    }

    @Override
    public void setParticleIsNull(Boolean value) {
        getExtensionDelegate(PendingContactUpdateExtMethodsImpl.class).setParticleIsNull(value);
    }

}
