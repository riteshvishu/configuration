
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.contact.impl.ContactExtInternal;
import extensions.pc.internal.domain.contact.impl.ContactExtMethodsImpl;
import extensions.pc.internal.domain.contact.impl.GlobalContactNameExtInternal;
import extensions.pc.internal.domain.contact.impl.GlobalContactNameExtMethodsImpl;
import extensions.pc.internal.domain.contact.impl.GlobalPersonNameExtInternal;
import extensions.pc.internal.domain.contact.impl.GlobalPersonNameExtMethodsImpl;
import extensions.pc.internal.domain.contact.impl.PersonExtInternal;
import extensions.pc.internal.domain.policy.impl.AdjudicatorCoreExtImpl;
import gw.pc.account.entity.AccountContact;

public class AdjudicatorExtStub
    extends AdjudicatorCoreExtImpl
    implements ContactExtInternal, GlobalContactNameExtInternal, GlobalPersonNameExtInternal, PersonExtInternal
{


    @Override
    public Integer getExternalVersion() {
        return getExtensionDelegate(ContactExtMethodsImpl.class).getExternalVersion();
    }

    @Override
    public void setExternalVersion(Integer value) {
        getExtensionDelegate(ContactExtMethodsImpl.class).setExternalVersion(value);
    }

    @Override
    public String getCityKanjiDenorm() {
        return getExtensionDelegate(ContactExtMethodsImpl.class).getCityKanjiDenorm();
    }

    @Override
    public void setCityKanjiDenorm(String value) {
        getExtensionDelegate(ContactExtMethodsImpl.class).setCityKanjiDenorm(value);
    }

    @Override
    public AccountContact[] getAccountContacts() {
        return getExtensionDelegate(ContactExtMethodsImpl.class).getAccountContacts();
    }

    @Override
    public void addToAccountContacts(AccountContact value) {
        getExtensionDelegate(ContactExtMethodsImpl.class).addToAccountContacts(value);
    }

    @Override
    public void removeFromAccountContacts(AccountContact value) {
        getExtensionDelegate(ContactExtMethodsImpl.class).removeFromAccountContacts(value);
    }

    @Override
    public String getNameKanji() {
        return getExtensionDelegate(GlobalContactNameExtMethodsImpl.class).getNameKanji();
    }

    @Override
    public void setNameKanji(String value) {
        getExtensionDelegate(GlobalContactNameExtMethodsImpl.class).setNameKanji(value);
    }

    @Override
    public String getFirstNameKanji() {
        return getExtensionDelegate(GlobalPersonNameExtMethodsImpl.class).getFirstNameKanji();
    }

    @Override
    public void setFirstNameKanji(String value) {
        getExtensionDelegate(GlobalPersonNameExtMethodsImpl.class).setFirstNameKanji(value);
    }

    @Override
    public String getLastNameKanji() {
        return getExtensionDelegate(GlobalPersonNameExtMethodsImpl.class).getLastNameKanji();
    }

    @Override
    public void setLastNameKanji(String value) {
        getExtensionDelegate(GlobalPersonNameExtMethodsImpl.class).setLastNameKanji(value);
    }

    @Override
    public String getParticle() {
        return getExtensionDelegate(GlobalPersonNameExtMethodsImpl.class).getParticle();
    }

    @Override
    public void setParticle(String value) {
        getExtensionDelegate(GlobalPersonNameExtMethodsImpl.class).setParticle(value);
    }

}
