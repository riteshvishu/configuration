
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.MoneySecurityType;
import gw.pc.policy.typekey.MoneySecurityType.MoneySecurityTypeCache;

public final class MoneySecurityTypeExtConstants {

    public final static MoneySecurityTypeCache TC_INSIDE = new MoneySecurityTypeCache(MoneySecurityType.TYPE, "inside");
    public final static MoneySecurityTypeCache TC_MESSENGER = new MoneySecurityTypeCache(MoneySecurityType.TYPE, "messenger");

}
