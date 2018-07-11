
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import extensions.pc.policy.entity.WC7WorkersCompExcl;
import gw.pl.persistence.core.Key;

public interface WC7ExcludedWorkplaceInternalStubI
    extends EffDatedInternal, WC7ExcludedWorkplaceStubI
{


    Key getWCLineID();

    void setWCLineID(Key value);

    /**
     * Sets the value of the DesignatedWorkplacesExcl field.
     * 
     */
    void setDesignatedWorkplacesExcl(WC7WorkersCompExcl value);

    Key getDesignatedWorkplacesExclID();

    void setDesignatedWorkplacesExclID(Key value);

}
