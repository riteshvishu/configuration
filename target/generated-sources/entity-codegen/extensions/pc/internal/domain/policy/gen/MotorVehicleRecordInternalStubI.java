
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.domain.persistence.core.impl.RetireableInternal;
import gw.pl.persistence.core.Key;

public interface MotorVehicleRecordInternalStubI
    extends RetireableInternal, MotorVehicleRecordStubI
{


    /**
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - The Driver to which this report belongs
     */
    @Deprecated
    Key getDriverID();

    /**
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - The Driver to which this report belongs
     */
    @Deprecated
    void setDriverID(Key value);

}
