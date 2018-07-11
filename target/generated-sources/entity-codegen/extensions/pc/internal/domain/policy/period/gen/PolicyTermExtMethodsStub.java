
package extensions.pc.internal.domain.policy.period.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import extensions.pc.policy.entity.WC7AffinityGroup;
import gw.pc.policy.period.entity.PolicyTerm;
import gw.pl.persistence.core.Key;

public abstract class PolicyTermExtMethodsStub
    extends AspectBase
    implements PolicyTermExtInternalMethodsStubI
{


    protected PolicyTermExtMethodsStub(PolicyTerm owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public PolicyTerm getOwner() {
        return ((PolicyTerm) super.getOwner());
    }

    @Override
    public WC7AffinityGroup getAffinityGroup() {
        return ((WC7AffinityGroup) getFieldValue(AFFINITYGROUP_PROP.get()));
    }

    @Override
    public void setAffinityGroup(WC7AffinityGroup value) {
        setFieldValue(AFFINITYGROUP_PROP.get(), value);
    }

    @Override
    public Key getAffinityGroupID() {
        return ((Key) getRawFieldValue(AFFINITYGROUP_PROP.get()));
    }

    @Override
    public void setAffinityGroupID(Key value) {
        setFieldValue(AFFINITYGROUP_PROP.get(), value);
    }

}
