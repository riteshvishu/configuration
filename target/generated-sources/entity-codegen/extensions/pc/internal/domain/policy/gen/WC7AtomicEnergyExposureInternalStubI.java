
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.policy.audit.impl.AuditableInternal;
import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import extensions.pc.policy.typekey.WC7AtomicEnergyExposure;
import gw.pl.persistence.core.Key;

public interface WC7AtomicEnergyExposureInternalStubI
    extends AuditableInternal, EffDatedInternal, WC7AtomicEnergyExposureStubI
{


    /**
     * Sets the value of the Subtype field.
     * 
     */
    void setSubtype(WC7AtomicEnergyExposure value);

    Key getClassCodeID();

    void setClassCodeID(Key value);

    Key getLocationID();

    void setLocationID(Key value);

    Key getWCLineID();

    void setWCLineID(Key value);

}
