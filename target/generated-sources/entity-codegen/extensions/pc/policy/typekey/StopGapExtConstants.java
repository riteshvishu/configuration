
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.StopGap;
import gw.pc.policy.typekey.StopGap.StopGapCache;

public final class StopGapExtConstants {

    public final static StopGapCache TC_ALLMONOPOLISTICSTATES = new StopGapCache(StopGap.TYPE, "AllMonopolisticStates");
    public final static StopGapCache TC_ALLMONOPOLYSTATES = new StopGapCache(StopGap.TYPE, "AllMonopolyStates");
    public final static StopGapCache TC_LISTEDSTATESONLY = new StopGapCache(StopGap.TYPE, "ListedStatesOnly");
    public final static StopGapCache TC_NONE = new StopGapCache(StopGap.TYPE, "None");

}
