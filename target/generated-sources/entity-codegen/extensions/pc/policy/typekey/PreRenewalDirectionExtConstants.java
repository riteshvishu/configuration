
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.PreRenewalDirection;
import gw.pc.policy.typekey.PreRenewalDirection.PreRenewalDirectionCache;

public final class PreRenewalDirectionExtConstants {

    public final static PreRenewalDirectionCache TC_ASSISTANT = new PreRenewalDirectionCache(PreRenewalDirection.TYPE, "assistant");
    public final static PreRenewalDirectionCache TC_CUSTREP = new PreRenewalDirectionCache(PreRenewalDirection.TYPE, "custrep");
    public final static PreRenewalDirectionCache TC_NONRENEW = new PreRenewalDirectionCache(PreRenewalDirection.TYPE, "nonrenew");
    public final static PreRenewalDirectionCache TC_NONRENEWREFER = new PreRenewalDirectionCache(PreRenewalDirection.TYPE, "nonrenewrefer");
    public final static PreRenewalDirectionCache TC_NOTTAKEN = new PreRenewalDirectionCache(PreRenewalDirection.TYPE, "nottaken");
    public final static PreRenewalDirectionCache TC_UNDERWRITER = new PreRenewalDirectionCache(PreRenewalDirection.TYPE, "underwriter");

}
