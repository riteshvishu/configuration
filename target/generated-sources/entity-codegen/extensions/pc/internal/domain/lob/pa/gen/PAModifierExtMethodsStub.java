
package extensions.pc.internal.domain.lob.pa.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.lob.pa.entity.PAModifier;

public abstract class PAModifierExtMethodsStub
    extends AspectBase
    implements PAModifierExtInternalMethodsStubI
{


    protected PAModifierExtMethodsStub(PAModifier owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public PAModifier getOwner() {
        return ((PAModifier) super.getOwner());
    }

}
