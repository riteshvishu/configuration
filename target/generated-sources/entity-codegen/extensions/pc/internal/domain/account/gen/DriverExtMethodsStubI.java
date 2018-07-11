
package extensions.pc.internal.domain.account.gen;

import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import extensions.pc.policy.entity.MotorVehicleRecord;
import gw.pc.account.entity.Driver;

public interface DriverExtMethodsStubI {

    ArrayPropertyInfoCache MOTORVEHICLERECORDS_PROP = new ArrayPropertyInfoCache(Driver.TYPE, "MotorVehicleRecords");

    /**
     * Gets the value of the MotorVehicleRecords field.
     * Deprecated in PC 7.0 This table is no longer used - Motor vehicle records for this driver.
     * 
     * @deprecated
     *     Deprecated in PC 7.0 This table is no longer used - Motor vehicle records for this driver.
     */
    @Deprecated
    MotorVehicleRecord[] getMotorVehicleRecords();

    /**
     * Adds the given element to the MotorVehicleRecords array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     * @deprecated
     *     Deprecated in PC 7.0 This table is no longer used - Motor vehicle records for this driver.
     */
    @Deprecated
    void addToMotorVehicleRecords(MotorVehicleRecord value);

    /**
     * Removes the given element from the MotorVehicleRecords array. This is achieved by marking the element for removal.
     * 
     * @deprecated
     *     Deprecated in PC 7.0 This table is no longer used - Motor vehicle records for this driver.
     */
    @Deprecated
    void removeFromMotorVehicleRecords(MotorVehicleRecord value);

}
