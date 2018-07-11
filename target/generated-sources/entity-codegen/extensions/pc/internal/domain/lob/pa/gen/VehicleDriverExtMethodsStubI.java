
package extensions.pc.internal.domain.lob.pa.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import gw.pc.lob.pa.entity.VehicleDriver;

public interface VehicleDriverExtMethodsStubI {

    ColumnPropertyInfoCache PRIMARYDRIVER_PROP = new ColumnPropertyInfoCache(VehicleDriver.TYPE, "PrimaryDriver");

    /**
     * Gets the value of the PrimaryDriver field.
     * Indicates whether this Driver is primary for the given vehicle or not. This field is deprecated in PC 7.0 and is no longer used by the out-of-the-box configuration.
     * 
     * @deprecated
     *     Indicates whether this Driver is primary for the given vehicle or not. This field is deprecated in PC 7.0 and is no longer used by the out-of-the-box configuration.
     */
    @Deprecated
    Boolean isPrimaryDriver();

    /**
     * Sets the value of the PrimaryDriver field.
     * 
     * @deprecated
     *     Indicates whether this Driver is primary for the given vehicle or not. This field is deprecated in PC 7.0 and is no longer used by the out-of-the-box configuration.
     */
    @Deprecated
    void setPrimaryDriver(Boolean value);

}
