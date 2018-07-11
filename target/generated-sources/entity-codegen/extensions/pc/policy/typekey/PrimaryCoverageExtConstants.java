
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.PrimaryCoverage;
import gw.pc.policy.typekey.PrimaryCoverage.PrimaryCoverageCache;

public final class PrimaryCoverageExtConstants {

    public final static PrimaryCoverageCache TC_PRIMARY = new PrimaryCoverageCache(PrimaryCoverage.TYPE, "Primary");
    public final static PrimaryCoverageCache TC_SECONDARY = new PrimaryCoverageCache(PrimaryCoverage.TYPE, "Secondary");

}
