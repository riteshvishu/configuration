
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7PolicyOwnerOfficerInternal;
import extensions.pc.policy.entity.WC7WorkersCompCond;
import gw.pl.persistence.core.Key;

public interface WC7IncludedOwnerOfficerInternalStubI
    extends WC7IncludedOwnerOfficerStubI, WC7PolicyOwnerOfficerInternal
{


    Key getWC7ClassCodeID();

    void setWC7ClassCodeID(Key value);

    /**
     * Sets the value of the OwnerOfficerCondition field.
     * 
     */
    void setOwnerOfficerCondition(WC7WorkersCompCond value);

    Key getOwnerOfficerConditionID();

    void setOwnerOfficerConditionID(Key value);

}
