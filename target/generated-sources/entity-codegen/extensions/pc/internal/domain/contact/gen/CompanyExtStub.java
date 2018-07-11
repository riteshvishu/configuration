
package extensions.pc.internal.domain.contact.gen;

import com.guidewire.pc.domain.contact.impl.CompanyCoreExtImpl;
import extensions.pc.internal.domain.contact.impl.ContactExtInternal;
import extensions.pc.internal.domain.contact.impl.ContactExtMethodsImpl;
import extensions.pc.internal.domain.contact.impl.GlobalContactNameExtInternal;
import extensions.pc.internal.domain.contact.impl.GlobalContactNameExtMethodsImpl;
import gw.pc.account.entity.AccountContact;

public class CompanyExtStub
    extends CompanyCoreExtImpl
    implements ContactExtInternal, GlobalContactNameExtInternal
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

}
