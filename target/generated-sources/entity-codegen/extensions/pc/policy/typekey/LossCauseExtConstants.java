
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.LossCause;
import gw.pc.policy.typekey.LossCause.LossCauseCache;

public final class LossCauseExtConstants {

    public final static LossCauseCache TC_ALLRISK = new LossCauseCache(LossCause.TYPE, "AllRisk");
    public final static LossCauseCache TC_BASIC = new LossCauseCache(LossCause.TYPE, "Basic");
    public final static LossCauseCache TC_BROAD = new LossCauseCache(LossCause.TYPE, "Broad");
    public final static LossCauseCache TC_EARTHQUAKE = new LossCauseCache(LossCause.TYPE, "Earthquake");
    public final static LossCauseCache TC_NAMEDPERILS = new LossCauseCache(LossCause.TYPE, "NamedPerils");
    public final static LossCauseCache TC_SPECIAL = new LossCauseCache(LossCause.TYPE, "Special");

}
