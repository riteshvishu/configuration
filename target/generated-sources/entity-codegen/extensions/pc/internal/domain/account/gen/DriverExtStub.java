
package extensions.pc.internal.domain.account.gen;

import com.guidewire.pc.domain.account.impl.DriverImpl;
import extensions.pc.internal.domain.account.impl.DriverExtInternal;
import extensions.pc.internal.domain.account.impl.DriverExtMethodsImpl;
import extensions.pc.policy.entity.MotorVehicleRecord;

public class DriverExtStub
    extends DriverImpl
    implements DriverExtInternal
{


    @Override
    public MotorVehicleRecord[] getMotorVehicleRecords() {
        return getExtensionDelegate(DriverExtMethodsImpl.class).getMotorVehicleRecords();
    }

    @Override
    public void addToMotorVehicleRecords(MotorVehicleRecord value) {
        getExtensionDelegate(DriverExtMethodsImpl.class).addToMotorVehicleRecords(value);
    }

    @Override
    public void removeFromMotorVehicleRecords(MotorVehicleRecord value) {
        getExtensionDelegate(DriverExtMethodsImpl.class).removeFromMotorVehicleRecords(value);
    }

}
