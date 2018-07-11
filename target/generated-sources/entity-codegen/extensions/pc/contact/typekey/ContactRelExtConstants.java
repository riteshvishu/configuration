
package extensions.pc.contact.typekey;

import gw.pl.contact.typekey.ContactRel;
import gw.pl.contact.typekey.ContactRel.ContactRelCache;

public final class ContactRelExtConstants {

    public final static ContactRelCache TC_COLLECTIONAGENCY = new ContactRelCache(ContactRel.TYPE, "collectionagency");
    public final static ContactRelCache TC_EMPLOYER = new ContactRelCache(ContactRel.TYPE, "employer");
    public final static ContactRelCache TC_GUARDIAN = new ContactRelCache(ContactRel.TYPE, "guardian");
    public final static ContactRelCache TC_PRIMARYCONTACT = new ContactRelCache(ContactRel.TYPE, "primarycontact");
    public final static ContactRelCache TC_THIRDPARTYINSURER = new ContactRelCache(ContactRel.TYPE, "thirdpartyinsurer");

}
