
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.policy.entity.LicensedState;

public abstract class LicensedStateExtMethodsStub
    extends AspectBase
    implements LicensedStateExtInternalMethodsStubI
{


    protected LicensedStateExtMethodsStub(LicensedState owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public LicensedState getOwner() {
        return ((LicensedState) super.getOwner());
    }

}
