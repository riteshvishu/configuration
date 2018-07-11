
package extensions.pc.internal.domain.lob.pa.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.lob.pa.entity.VehicleDriver;

public abstract class VehicleDriverExtMethodsStub
    extends AspectBase
    implements VehicleDriverExtInternalMethodsStubI
{


    protected VehicleDriverExtMethodsStub(VehicleDriver owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public VehicleDriver getOwner() {
        return ((VehicleDriver) super.getOwner());
    }

    @Override
    public Boolean isPrimaryDriver() {
        return ((Boolean) getFieldValue(PRIMARYDRIVER_PROP.get()));
    }

    @Override
    public void setPrimaryDriver(Boolean value) {
        setFieldValue(PRIMARYDRIVER_PROP.get(), value);
    }

}
