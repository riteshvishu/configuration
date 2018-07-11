
package extensions.pc.internal.domain.contact.gen;

import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import gw.pc.account.entity.AccountContact;
import gw.pl.contact.entity.Contact;

public interface ContactExtMethodsStubI {

    ColumnPropertyInfoCache EXTERNALVERSION_PROP = new ColumnPropertyInfoCache(Contact.TYPE, "ExternalVersion");
    ColumnPropertyInfoCache CITYKANJIDENORM_PROP = new ColumnPropertyInfoCache(Contact.TYPE, "CityKanjiDenorm");
    ArrayPropertyInfoCache ACCOUNTCONTACTS_PROP = new ArrayPropertyInfoCache(Contact.TYPE, "AccountContacts");

    /**
     * Gets the value of the ExternalVersion field.
     * The version number of this contact in external contact system
     * 
     */
    Integer getExternalVersion();

    /**
     * Sets the value of the ExternalVersion field.
     * 
     */
    void setExternalVersion(Integer value);

    /**
     * Gets the value of the CityKanjiDenorm field.
     * Primary Address City Kanji, this is searchColumn for City Kanji on Address entity
     * 
     */
    String getCityKanjiDenorm();

    /**
     * Gets the value of the AccountContacts field.
     * All the accountcontacts related to this contact.
     * 
     */
    AccountContact[] getAccountContacts();

    /**
     * Adds the given element to the AccountContacts array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToAccountContacts(AccountContact value);

    /**
     * Removes the given element from the AccountContacts array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromAccountContacts(AccountContact value);

}
