
package extensions.pc.internal.domain.lob.pa.gen;

import com.guidewire.pc.domain.lob.pa.impl.VehicleDriverImpl;
import extensions.pc.internal.domain.lob.pa.impl.VehicleDriverExtInternal;
import extensions.pc.internal.domain.lob.pa.impl.VehicleDriverExtMethodsImpl;

public class VehicleDriverExtStub
    extends VehicleDriverImpl
    implements VehicleDriverExtInternal
{


    @Override
    public Boolean isPrimaryDriver() {
        return getExtensionDelegate(VehicleDriverExtMethodsImpl.class).isPrimaryDriver();
    }

    @Override
    public void setPrimaryDriver(Boolean value) {
        getExtensionDelegate(VehicleDriverExtMethodsImpl.class).setPrimaryDriver(value);
    }

}
