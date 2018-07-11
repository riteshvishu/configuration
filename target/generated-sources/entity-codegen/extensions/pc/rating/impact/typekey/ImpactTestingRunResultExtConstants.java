
package extensions.pc.rating.impact.typekey;

import gw.pc.rating.impact.typekey.ImpactTestingRunResult;
import gw.pc.rating.impact.typekey.ImpactTestingRunResult.ImpactTestingRunResultCache;

public final class ImpactTestingRunResultExtConstants {

    public final static ImpactTestingRunResultCache TC_SUCCESS = new ImpactTestingRunResultCache(ImpactTestingRunResult.TYPE, "success");
    public final static ImpactTestingRunResultCache TC_TESTPERIODQUOTEFAILED = new ImpactTestingRunResultCache(ImpactTestingRunResult.TYPE, "testperiodquotefailed");
    public final static ImpactTestingRunResultCache TC_UNEXPECTEDFAILURE = new ImpactTestingRunResultCache(ImpactTestingRunResult.TYPE, "unexpectedfailure");

}
