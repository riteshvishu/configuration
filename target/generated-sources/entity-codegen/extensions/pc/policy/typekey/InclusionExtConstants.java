
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.Inclusion;
import gw.pc.policy.typekey.Inclusion.InclusionCache;

public final class InclusionExtConstants {

    public final static InclusionCache TC_EXCL = new InclusionCache(Inclusion.TYPE, "excl");
    public final static InclusionCache TC_INCL = new InclusionCache(Inclusion.TYPE, "incl");

}
