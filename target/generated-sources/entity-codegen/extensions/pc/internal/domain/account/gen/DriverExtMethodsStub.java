
package extensions.pc.internal.domain.account.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import extensions.pc.policy.entity.MotorVehicleRecord;
import gw.pc.account.entity.Driver;

public abstract class DriverExtMethodsStub
    extends AspectBase
    implements DriverExtInternalMethodsStubI
{


    protected DriverExtMethodsStub(Driver owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public Driver getOwner() {
        return ((Driver) super.getOwner());
    }

    @Override
    public MotorVehicleRecord[] getMotorVehicleRecords() {
        return ((MotorVehicleRecord[]) getFieldValue(MOTORVEHICLERECORDS_PROP.get()));
    }

    @Override
    public void addToMotorVehicleRecords(MotorVehicleRecord value) {
        addArrayElement(MOTORVEHICLERECORDS_PROP.get(), value);
    }

    @Override
    public void removeFromMotorVehicleRecords(MotorVehicleRecord value) {
        removeArrayElement(MOTORVEHICLERECORDS_PROP.get(), value);
    }

}
