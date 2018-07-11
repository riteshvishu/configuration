
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.BlanketType;
import gw.pc.policy.typekey.BlanketType.BlanketTypeCache;

public final class BlanketTypeExtConstants {

    public final static BlanketTypeCache TC_ALL = new BlanketTypeCache(BlanketType.TYPE, "all");
    public final static BlanketTypeCache TC_BUILD = new BlanketTypeCache(BlanketType.TYPE, "build");
    public final static BlanketTypeCache TC_BUS = new BlanketTypeCache(BlanketType.TYPE, "bus");
    public final static BlanketTypeCache TC_BUSBUILD = new BlanketTypeCache(BlanketType.TYPE, "busbuild");
    public final static BlanketTypeCache TC_DECLINE = new BlanketTypeCache(BlanketType.TYPE, "decline");
    public final static BlanketTypeCache TC_LOCATION = new BlanketTypeCache(BlanketType.TYPE, "location");
    public final static BlanketTypeCache TC_MULTILOC = new BlanketTypeCache(BlanketType.TYPE, "multiloc");
    public final static BlanketTypeCache TC_SINGLECOV = new BlanketTypeCache(BlanketType.TYPE, "singlecov");
    public final static BlanketTypeCache TC_SINGLELOC = new BlanketTypeCache(BlanketType.TYPE, "singleloc");

}
