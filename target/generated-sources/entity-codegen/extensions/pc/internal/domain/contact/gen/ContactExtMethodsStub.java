
package extensions.pc.internal.domain.contact.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.account.entity.AccountContact;
import gw.pl.contact.entity.Contact;

public abstract class ContactExtMethodsStub
    extends AspectBase
    implements ContactExtInternalMethodsStubI
{


    protected ContactExtMethodsStub(Contact owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public Contact getOwner() {
        return ((Contact) super.getOwner());
    }

    @Override
    public Integer getExternalVersion() {
        return ((Integer) getFieldValue(EXTERNALVERSION_PROP.get()));
    }

    @Override
    public void setExternalVersion(Integer value) {
        setFieldValue(EXTERNALVERSION_PROP.get(), value);
    }

    @Override
    public String getCityKanjiDenorm() {
        return ((String) getFieldValueForCodegen(CITYKANJIDENORM_PROP.get()));
    }

    @Override
    public void setCityKanjiDenorm(String value) {
        setFieldValueForCodegen(CITYKANJIDENORM_PROP.get(), value);
    }

    @Override
    public AccountContact[] getAccountContacts() {
        return ((AccountContact[]) getFieldValue(ACCOUNTCONTACTS_PROP.get()));
    }

    @Override
    public void addToAccountContacts(AccountContact value) {
        addArrayElement(ACCOUNTCONTACTS_PROP.get(), value);
    }

    @Override
    public void removeFromAccountContacts(AccountContact value) {
        removeArrayElement(ACCOUNTCONTACTS_PROP.get(), value);
    }

}
