
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.policy.audit.impl.AuditableInternal;
import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import extensions.pc.policy.typekey.WC7CoveredEmployeeBase;
import gw.pl.persistence.core.Key;

public interface WC7CoveredEmployeeBaseInternalStubI
    extends AuditableInternal, EffDatedInternal, WC7CoveredEmployeeBaseStubI
{


    /**
     * Sets the value of the Subtype field.
     * 
     */
    void setSubtype(WC7CoveredEmployeeBase value);

    Key getClassCodeID();

    void setClassCodeID(Key value);

    Key getLocationID();

    void setLocationID(Key value);

    Key getWC7WorkersCompLineID();

    void setWC7WorkersCompLineID(Key value);

}
