
package extensions.pc.contact.typekey;

import gw.pl.contact.typekey.CustomerServiceTier;
import gw.pl.contact.typekey.CustomerServiceTier.CustomerServiceTierCache;

public final class CustomerServiceTierExtConstants {

    public final static CustomerServiceTierCache TC_GOLD = new CustomerServiceTierCache(CustomerServiceTier.TYPE, "gold");
    public final static CustomerServiceTierCache TC_PLATINUM = new CustomerServiceTierCache(CustomerServiceTier.TYPE, "platinum");
    public final static CustomerServiceTierCache TC_SILVER = new CustomerServiceTierCache(CustomerServiceTier.TYPE, "silver");

}
