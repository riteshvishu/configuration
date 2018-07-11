
package extensions.pc.internal.domain.lob.pa.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.lob.pa.entity.PAVehicleModifier;

public abstract class PAVehicleModifierExtMethodsStub
    extends AspectBase
    implements PAVehicleModifierExtInternalMethodsStubI
{


    protected PAVehicleModifierExtMethodsStub(PAVehicleModifier owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public PAVehicleModifier getOwner() {
        return ((PAVehicleModifier) super.getOwner());
    }

}
