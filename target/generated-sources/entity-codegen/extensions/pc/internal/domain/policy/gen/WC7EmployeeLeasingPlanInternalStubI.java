
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import extensions.pc.policy.typekey.WC7EmployeeLeasingPlan;
import gw.pl.persistence.core.Key;

public interface WC7EmployeeLeasingPlanInternalStubI
    extends EffDatedInternal, WC7EmployeeLeasingPlanStubI
{


    /**
     * Sets the value of the Subtype field.
     * 
     */
    void setSubtype(WC7EmployeeLeasingPlan value);

    Key getWC7WorkersCompLineID();

    void setWC7WorkersCompLineID(Key value);

}
