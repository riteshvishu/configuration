
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.SpoilageType;
import gw.pc.policy.typekey.SpoilageType.SpoilageTypeCache;

public final class SpoilageTypeExtConstants {

    public final static SpoilageTypeCache TC_ALL = new SpoilageTypeCache(SpoilageType.TYPE, "All");
    public final static SpoilageTypeCache TC_BKDOWNCONTAM = new SpoilageTypeCache(SpoilageType.TYPE, "BkdownContam");
    public final static SpoilageTypeCache TC_POWEROUTAGE = new SpoilageTypeCache(SpoilageType.TYPE, "PowerOutage");

}
