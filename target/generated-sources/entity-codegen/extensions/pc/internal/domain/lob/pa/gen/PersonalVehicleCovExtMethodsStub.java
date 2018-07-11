
package extensions.pc.internal.domain.lob.pa.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.lob.pa.entity.PersonalVehicleCov;

public abstract class PersonalVehicleCovExtMethodsStub
    extends AspectBase
    implements PersonalVehicleCovExtInternalMethodsStubI
{


    protected PersonalVehicleCovExtMethodsStub(PersonalVehicleCov owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public PersonalVehicleCov getOwner() {
        return ((PersonalVehicleCov) super.getOwner());
    }

}
