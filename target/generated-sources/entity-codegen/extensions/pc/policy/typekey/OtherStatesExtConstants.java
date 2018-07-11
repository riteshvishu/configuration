
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.OtherStates;
import gw.pc.policy.typekey.OtherStates.OtherStatesCache;

public final class OtherStatesExtConstants {

    public final static OtherStatesCache TC_ALLEXCEPT = new OtherStatesCache(OtherStates.TYPE, "AllExcept");
    public final static OtherStatesCache TC_ALLOTHER = new OtherStatesCache(OtherStates.TYPE, "AllOther");
    public final static OtherStatesCache TC_LISTEDONLY = new OtherStatesCache(OtherStates.TYPE, "ListedOnly");
    public final static OtherStatesCache TC_NONE = new OtherStatesCache(OtherStates.TYPE, "None");

}
