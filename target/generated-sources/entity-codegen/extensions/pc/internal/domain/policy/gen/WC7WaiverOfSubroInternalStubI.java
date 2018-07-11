
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.policy.audit.impl.AuditableInternal;
import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import extensions.pc.policy.entity.WC7WorkersCompCond;
import gw.pl.persistence.core.Key;

public interface WC7WaiverOfSubroInternalStubI
    extends AuditableInternal, EffDatedInternal, WC7WaiverOfSubroStubI
{


    /**
     * Sets the value of the WaiverCondition field.
     * 
     */
    void setWaiverCondition(WC7WorkersCompCond value);

    Key getWaiverConditionID();

    void setWaiverConditionID(Key value);

    Key getClassCodeID();

    void setClassCodeID(Key value);

    Key getWCLineID();

    void setWCLineID(Key value);

}
