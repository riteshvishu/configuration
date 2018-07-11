
package extensions.pc.internal.domain.policy.period.gen;

import com.guidewire.pc.domain.policy.period.impl.PolicyTermImpl;
import extensions.pc.internal.domain.policy.period.impl.PolicyTermExtInternal;
import extensions.pc.internal.domain.policy.period.impl.PolicyTermExtMethodsImpl;
import extensions.pc.policy.entity.WC7AffinityGroup;
import gw.pl.persistence.core.Key;

public class PolicyTermExtStub
    extends PolicyTermImpl
    implements PolicyTermExtInternal
{


    @Override
    public WC7AffinityGroup getAffinityGroup() {
        return getExtensionDelegate(PolicyTermExtMethodsImpl.class).getAffinityGroup();
    }

    @Override
    public void setAffinityGroup(WC7AffinityGroup value) {
        getExtensionDelegate(PolicyTermExtMethodsImpl.class).setAffinityGroup(value);
    }

    @Override
    public Key getAffinityGroupID() {
        return getExtensionDelegate(PolicyTermExtMethodsImpl.class).getAffinityGroupID();
    }

    @Override
    public void setAffinityGroupID(Key value) {
        getExtensionDelegate(PolicyTermExtMethodsImpl.class).setAffinityGroupID(value);
    }

}
