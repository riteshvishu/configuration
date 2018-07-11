
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.BurglarySafeguard;
import gw.pc.policy.typekey.BurglarySafeguard.BurglarySafeguardCache;

public final class BurglarySafeguardExtConstants {

    public final static BurglarySafeguardCache TC_NOWATCHMAN = new BurglarySafeguardCache(BurglarySafeguard.TYPE, "NoWatchman");
    public final static BurglarySafeguardCache TC_WATCHMAN = new BurglarySafeguardCache(BurglarySafeguard.TYPE, "Watchman");
    public final static BurglarySafeguardCache TC_WATCHMANCLOCK = new BurglarySafeguardCache(BurglarySafeguard.TYPE, "WatchmanClock");
    public final static BurglarySafeguardCache TC_WATCHMANSIGNAL = new BurglarySafeguardCache(BurglarySafeguard.TYPE, "WatchmanSignal");

}
