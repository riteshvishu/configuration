
package extensions.pc.internal.domain.policy.period.gen;

import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7AffinityGroup;
import gw.pc.policy.period.entity.PolicyTerm;

public interface PolicyTermExtMethodsStubI {

    LinkPropertyInfoCache AFFINITYGROUP_PROP = new LinkPropertyInfoCache(PolicyTerm.TYPE, "AffinityGroup");

    /**
     * Gets the value of the AffinityGroup field.
     * The affinity group assigned to this term
     * 
     */
    WC7AffinityGroup getAffinityGroup();

    /**
     * Sets the value of the AffinityGroup field.
     * 
     */
    void setAffinityGroup(WC7AffinityGroup value);

}
