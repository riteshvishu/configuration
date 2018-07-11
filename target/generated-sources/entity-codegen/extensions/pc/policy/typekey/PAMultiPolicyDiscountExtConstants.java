
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.PAMultiPolicyDiscount;
import gw.pc.policy.typekey.PAMultiPolicyDiscount.PAMultiPolicyDiscountCache;

public final class PAMultiPolicyDiscountExtConstants {

    public final static PAMultiPolicyDiscountCache TC_2POLICY = new PAMultiPolicyDiscountCache(PAMultiPolicyDiscount.TYPE, "2policy");
    public final static PAMultiPolicyDiscountCache TC_3POLICY = new PAMultiPolicyDiscountCache(PAMultiPolicyDiscount.TYPE, "3policy");
    public final static PAMultiPolicyDiscountCache TC_NONE = new PAMultiPolicyDiscountCache(PAMultiPolicyDiscount.TYPE, "none");

}
