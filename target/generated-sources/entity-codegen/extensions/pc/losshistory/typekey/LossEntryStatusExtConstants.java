
package extensions.pc.losshistory.typekey;

import gw.pc.losshistory.typekey.LossEntryStatus;
import gw.pc.losshistory.typekey.LossEntryStatus.LossEntryStatusCache;

public final class LossEntryStatusExtConstants {

    public final static LossEntryStatusCache TC_CLOSED = new LossEntryStatusCache(LossEntryStatus.TYPE, "Closed");
    public final static LossEntryStatusCache TC_OPEN = new LossEntryStatusCache(LossEntryStatus.TYPE, "Open");

}
