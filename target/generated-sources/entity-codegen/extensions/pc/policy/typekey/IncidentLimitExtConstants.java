
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.IncidentLimit;
import gw.pc.policy.typekey.IncidentLimit.IncidentLimitCache;

public final class IncidentLimitExtConstants {

    public final static IncidentLimitCache TC_ACTUALCASHVALUE = new IncidentLimitCache(IncidentLimit.TYPE, "ActualCashValue");
    public final static IncidentLimitCache TC_COSTREPAIR = new IncidentLimitCache(IncidentLimit.TYPE, "CostRepair");
    public final static IncidentLimitCache TC_DECLINE = new IncidentLimitCache(IncidentLimit.TYPE, "Decline");

}
