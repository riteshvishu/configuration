
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.domain.persistence.core.impl.RetireableInternal;
import gw.pl.persistence.core.Key;

public interface WC7AffinityGroupInternalStubI
    extends RetireableInternal, WC7AffinityGroupStubI
{


    /**
     * Gets the value of the NameDenorm field.
     * 
     * 
     */
    String getNameDenorm();

    /**
     * Sets the value of the NameDenorm field.
     * 
     */
    void setNameDenorm(String value);

    Key getOrganizationID();

    void setOrganizationID(Key value);

    /**
     * Gets the value of the PrimaryContactFirstNameDenorm field.
     * 
     * 
     */
    String getPrimaryContactFirstNameDenorm();

    /**
     * Sets the value of the PrimaryContactFirstNameDenorm field.
     * 
     */
    void setPrimaryContactFirstNameDenorm(String value);

    /**
     * Gets the value of the PrimaryContactLastNameDenorm field.
     * 
     * 
     */
    String getPrimaryContactLastNameDenorm();

    /**
     * Sets the value of the PrimaryContactLastNameDenorm field.
     * 
     */
    void setPrimaryContactLastNameDenorm(String value);

}
