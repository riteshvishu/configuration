
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7PolicyOwnerOfficerInternal;
import extensions.pc.policy.entity.WC7WorkersCompExcl;
import gw.pl.persistence.core.Key;

public interface WC7ExcludedOwnerOfficerInternalStubI
    extends WC7ExcludedOwnerOfficerStubI, WC7PolicyOwnerOfficerInternal
{


    /**
     * Sets the value of the OwnerOfficerExclusion field.
     * 
     */
    void setOwnerOfficerExclusion(WC7WorkersCompExcl value);

    Key getOwnerOfficerExclusionID();

    void setOwnerOfficerExclusionID(Key value);

}
