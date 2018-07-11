
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.policy.entity.Policy;

public abstract class PolicyExtMethodsStub
    extends AspectBase
    implements PolicyExtInternalMethodsStubI
{


    protected PolicyExtMethodsStub(Policy owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public Policy getOwner() {
        return ((Policy) super.getOwner());
    }

}
