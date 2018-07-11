
package extensions.pc.internal.domain.policy.lines.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.policy.lines.entity.PolicyLine;

public abstract class PolicyLineExtMethodsStub
    extends AspectBase
    implements PolicyLineExtInternalMethodsStubI
{


    protected PolicyLineExtMethodsStub(PolicyLine owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public PolicyLine getOwner() {
        return ((PolicyLine) super.getOwner());
    }

}
