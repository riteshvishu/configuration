
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7LaborContactDetailInternal;
import extensions.pc.policy.entity.WC7WorkersCompExcl;
import gw.pl.persistence.core.Key;

public interface WC7ExcludedLaborContactDetailInternalStubI
    extends WC7ExcludedLaborContactDetailStubI, WC7LaborContactDetailInternal
{


    /**
     * Sets the value of the LaborContactExclusion field.
     * 
     */
    void setLaborContactExclusion(WC7WorkersCompExcl value);

    Key getLaborContactExclusionID();

    void setLaborContactExclusionID(Key value);

}
