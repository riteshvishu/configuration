
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.AntiTheftType;
import gw.pc.policy.typekey.AntiTheftType.AntiTheftTypeCache;

public final class AntiTheftTypeExtConstants {

    public final static AntiTheftTypeCache TC_ALARMONLY = new AntiTheftTypeCache(AntiTheftType.TYPE, "alarmonly");
    public final static AntiTheftTypeCache TC_DISABLE = new AntiTheftTypeCache(AntiTheftType.TYPE, "disable");
    public final static AntiTheftTypeCache TC_GPSLOCATOR = new AntiTheftTypeCache(AntiTheftType.TYPE, "gpslocator");
    public final static AntiTheftTypeCache TC_NONE = new AntiTheftTypeCache(AntiTheftType.TYPE, "none");

}
