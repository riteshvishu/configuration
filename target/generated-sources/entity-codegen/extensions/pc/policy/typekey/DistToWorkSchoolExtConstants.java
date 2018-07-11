
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.DistToWorkSchool;
import gw.pc.policy.typekey.DistToWorkSchool.DistToWorkSchoolCache;

public final class DistToWorkSchoolExtConstants {

    public final static DistToWorkSchoolCache TC_OVER15MILES = new DistToWorkSchoolCache(DistToWorkSchool.TYPE, "Over15Miles");
    public final static DistToWorkSchoolCache TC_UNDER15MILES = new DistToWorkSchoolCache(DistToWorkSchool.TYPE, "Under15Miles");

}
