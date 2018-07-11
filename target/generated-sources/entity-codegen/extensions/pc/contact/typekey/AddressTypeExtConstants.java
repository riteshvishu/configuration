
package extensions.pc.contact.typekey;

import gw.pl.contact.typekey.AddressType;
import gw.pl.contact.typekey.AddressType.AddressTypeCache;

public final class AddressTypeExtConstants {

    public final static AddressTypeCache TC_BILLING = new AddressTypeCache(AddressType.TYPE, "billing");
    public final static AddressTypeCache TC_BUSINESS = new AddressTypeCache(AddressType.TYPE, "business");
    public final static AddressTypeCache TC_HOME = new AddressTypeCache(AddressType.TYPE, "home");
    public final static AddressTypeCache TC_OTHER = new AddressTypeCache(AddressType.TYPE, "other");

}
