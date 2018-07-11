
package extensions.pc.lob.bop.typekey;

import gw.pc.lob.bop.typekey.InterestType;
import gw.pc.lob.bop.typekey.InterestType.InterestTypeCache;

public final class InterestTypeExtConstants {

    public final static InterestTypeCache TC_OTHER = new InterestTypeCache(InterestType.TYPE, "Other");
    public final static InterestTypeCache TC_OWNER = new InterestTypeCache(InterestType.TYPE, "Owner");
    public final static InterestTypeCache TC_TENANT = new InterestTypeCache(InterestType.TYPE, "Tenant");

}
