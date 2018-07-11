
package extensions.pc.internal.domain.lob.ba.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import gw.pc.lob.ba.entity.BusinessVehicle;
import gw.pc.lob.ba.typekey.IntraInterStateUsage;
import gw.pc.lob.ba.typekey.PipCovered;

public interface BusinessVehicleExtMethodsStubI {

    ColumnPropertyInfoCache DOESUMUIMAPPLY_PROP = new ColumnPropertyInfoCache(BusinessVehicle.TYPE, "DoesUMUIMApply");
    ColumnPropertyInfoCache ANTILOCKBRAKES_PROP = new ColumnPropertyInfoCache(BusinessVehicle.TYPE, "AntiLockBrakes");
    ColumnPropertyInfoCache ANTITHEFT_PROP = new ColumnPropertyInfoCache(BusinessVehicle.TYPE, "AntiTheft");
    ColumnPropertyInfoCache OWNEDBYPOLITICALSUB_PROP = new ColumnPropertyInfoCache(BusinessVehicle.TYPE, "OwnedByPoliticalSub");
    ColumnPropertyInfoCache SAFEDRIVINGCERT_PROP = new ColumnPropertyInfoCache(BusinessVehicle.TYPE, "SafeDrivingCert");
    TypekeyPropertyInfoCache INTRAINTERSTATEUSAGE_PROP = new TypekeyPropertyInfoCache(BusinessVehicle.TYPE, "IntraInterStateUsage");
    TypekeyPropertyInfoCache PIPCOVERED_PROP = new TypekeyPropertyInfoCache(BusinessVehicle.TYPE, "PipCovered");

    /**
     * Gets the value of the DoesUMUIMApply field.
     * Deprecated in PC 7.0 - Use vehicle modifier instead. Whether or not UM and UIM coverage applies to this vehicle
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Use vehicle modifier instead. Whether or not UM and UIM coverage applies to this vehicle
     */
    @Deprecated
    Boolean isDoesUMUIMApply();

    /**
     * Sets the value of the DoesUMUIMApply field.
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Use vehicle modifier instead. Whether or not UM and UIM coverage applies to this vehicle
     */
    @Deprecated
    void setDoesUMUIMApply(Boolean value);

    /**
     * Gets the value of the AntiLockBrakes field.
     * Deprecated in PC 7.0 - Use vehicle modifier instead. Whether or not the car has anti-lock brakes
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Use vehicle modifier instead. Whether or not the car has anti-lock brakes
     */
    @Deprecated
    Boolean isAntiLockBrakes();

    /**
     * Sets the value of the AntiLockBrakes field.
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Use vehicle modifier instead. Whether or not the car has anti-lock brakes
     */
    @Deprecated
    void setAntiLockBrakes(Boolean value);

    /**
     * Gets the value of the AntiTheft field.
     * Deprecated in PC 7.0 - Use vehicle modifier instead. Whether or not the car is equipped with an anti-theft device
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Use vehicle modifier instead. Whether or not the car is equipped with an anti-theft device
     */
    @Deprecated
    Boolean isAntiTheft();

    /**
     * Sets the value of the AntiTheft field.
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Use vehicle modifier instead. Whether or not the car is equipped with an anti-theft device
     */
    @Deprecated
    void setAntiTheft(Boolean value);

    /**
     * Gets the value of the OwnedByPoliticalSub field.
     * Deprecated in PC 7.0 - Use vehicle modifier instead. Owned by political subdivision
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Use vehicle modifier instead. Owned by political subdivision
     */
    @Deprecated
    Boolean isOwnedByPoliticalSub();

    /**
     * Sets the value of the OwnedByPoliticalSub field.
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Use vehicle modifier instead. Owned by political subdivision
     */
    @Deprecated
    void setOwnedByPoliticalSub(Boolean value);

    /**
     * Gets the value of the SafeDrivingCert field.
     * Deprecated in PC 7.0 - Use vehicle modifier instead. Whether or not the primary driver of the vehicle has a safe driving certificate
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Use vehicle modifier instead. Whether or not the primary driver of the vehicle has a safe driving certificate
     */
    @Deprecated
    Boolean isSafeDrivingCert();

    /**
     * Sets the value of the SafeDrivingCert field.
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Use vehicle modifier instead. Whether or not the primary driver of the vehicle has a safe driving certificate
     */
    @Deprecated
    void setSafeDrivingCert(Boolean value);

    /**
     * Gets the value of the IntraInterStateUsage field.
     * Deprecated in PC 7.0 - Use vehicle modifier instead. IntraInterStateUsage applicable only to MI
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Use vehicle modifier instead. IntraInterStateUsage applicable only to MI
     */
    @Deprecated
    IntraInterStateUsage getIntraInterStateUsage();

    /**
     * Sets the value of the IntraInterStateUsage field.
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Use vehicle modifier instead. IntraInterStateUsage applicable only to MI
     */
    @Deprecated
    void setIntraInterStateUsage(IntraInterStateUsage value);

    /**
     * Gets the value of the PipCovered field.
     * Deprecated in PC 7.0 - Use vehicle modifier instead. Indicate how PIP should be rated
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Use vehicle modifier instead. Indicate how PIP should be rated
     */
    @Deprecated
    PipCovered getPipCovered();

    /**
     * Sets the value of the PipCovered field.
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Use vehicle modifier instead. Indicate how PIP should be rated
     */
    @Deprecated
    void setPipCovered(PipCovered value);

}
