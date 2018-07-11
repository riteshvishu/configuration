
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7LaborContactDetailInternal;
import extensions.pc.policy.entity.WC7WorkersCompCond;
import gw.pl.persistence.core.Key;

public interface WC7IncludedLaborContactDetailInternalStubI
    extends WC7IncludedLaborContactDetailStubI, WC7LaborContactDetailInternal
{


    /**
     * Sets the value of the LaborContactCondition field.
     * 
     */
    void setLaborContactCondition(WC7WorkersCompCond value);

    Key getLaborContactConditionID();

    void setLaborContactConditionID(Key value);

}
