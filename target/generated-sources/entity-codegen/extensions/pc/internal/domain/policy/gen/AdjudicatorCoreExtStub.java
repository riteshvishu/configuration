
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.pc.domain.contact.impl.ContactCoreExtInternal;
import com.guidewire.pc.domain.contact.impl.ContactCoreExtMethodsImpl;
import extensions.pc.internal.domain.policy.impl.AdjudicatorImpl;
import gw.pl.currency.typekey.Currency;
import gw.pl.geodata.zone.typekey.Country;
import gw.pl.geodata.zone.typekey.State;

public class AdjudicatorCoreExtStub
    extends AdjudicatorImpl
    implements ContactCoreExtInternal
{


    @Override
    public Integer getAccountHolderCount() {
        return getExtensionDelegate(ContactCoreExtMethodsImpl.class).getAccountHolderCount();
    }

    @Override
    public void setAccountHolderCount(Integer value) {
        getExtensionDelegate(ContactCoreExtMethodsImpl.class).setAccountHolderCount(value);
    }

    @Override
    public Date getLastUpdateTime() {
        return getExtensionDelegate(ContactCoreExtMethodsImpl.class).getLastUpdateTime();
    }

    @Override
    public void setLastUpdateTime(Date value) {
        getExtensionDelegate(ContactCoreExtMethodsImpl.class).setLastUpdateTime(value);
    }

    @Override
    public Date getTemporaryLastUpdateTime() {
        return getExtensionDelegate(ContactCoreExtMethodsImpl.class).getTemporaryLastUpdateTime();
    }

    @Override
    public void setTemporaryLastUpdateTime(Date value) {
        getExtensionDelegate(ContactCoreExtMethodsImpl.class).setTemporaryLastUpdateTime(value);
    }

    @Override
    public String getCityDenorm() {
        return getExtensionDelegate(ContactCoreExtMethodsImpl.class).getCityDenorm();
    }

    @Override
    public void setCityDenorm(String value) {
        getExtensionDelegate(ContactCoreExtMethodsImpl.class).setCityDenorm(value);
    }

    @Override
    public String getPostalCodeDenorm() {
        return getExtensionDelegate(ContactCoreExtMethodsImpl.class).getPostalCodeDenorm();
    }

    @Override
    public void setPostalCodeDenorm(String value) {
        getExtensionDelegate(ContactCoreExtMethodsImpl.class).setPostalCodeDenorm(value);
    }

    @Override
    public State getState() {
        return getExtensionDelegate(ContactCoreExtMethodsImpl.class).getState();
    }

    @Override
    public void setState(State value) {
        getExtensionDelegate(ContactCoreExtMethodsImpl.class).setState(value);
    }

    @Override
    public Country getCountry() {
        return getExtensionDelegate(ContactCoreExtMethodsImpl.class).getCountry();
    }

    @Override
    public void setCountry(Country value) {
        getExtensionDelegate(ContactCoreExtMethodsImpl.class).setCountry(value);
    }

    @Override
    public Currency getPreferredSettlementCurrency() {
        return getExtensionDelegate(ContactCoreExtMethodsImpl.class).getPreferredSettlementCurrency();
    }

    @Override
    public void setPreferredSettlementCurrency(Currency value) {
        getExtensionDelegate(ContactCoreExtMethodsImpl.class).setPreferredSettlementCurrency(value);
    }

    @Override
    public void handleBeforeInsert() {
        getExtensionDelegate(ContactCoreExtMethodsImpl.class).handleBeforeInsert();
    }

    @Override
    public void handleBeforeUpdate() {
        getExtensionDelegate(ContactCoreExtMethodsImpl.class).handleBeforeUpdate();
    }

    @Override
    public void handleBeforeRemove() {
        getExtensionDelegate(ContactCoreExtMethodsImpl.class).handleBeforeRemove();
    }

    @Override
    public void handleInitNew() {
        getExtensionDelegate(ContactCoreExtMethodsImpl.class).handleInitNew();
    }

}
