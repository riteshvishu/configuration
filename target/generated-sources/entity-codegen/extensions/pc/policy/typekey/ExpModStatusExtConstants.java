
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.ExpModStatus;
import gw.pc.policy.typekey.ExpModStatus.ExpModStatusCache;

public final class ExpModStatusExtConstants {

    public final static ExpModStatusCache TC_EST = new ExpModStatusCache(ExpModStatus.TYPE, "est");
    public final static ExpModStatusCache TC_FIN = new ExpModStatusCache(ExpModStatus.TYPE, "fin");
    public final static ExpModStatusCache TC_NON = new ExpModStatusCache(ExpModStatus.TYPE, "non");

}
