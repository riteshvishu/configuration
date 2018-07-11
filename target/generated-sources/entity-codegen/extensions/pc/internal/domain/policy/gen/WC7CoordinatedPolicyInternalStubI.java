
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import extensions.pc.policy.entity.WC7WorkersCompCond;
import gw.pl.persistence.core.Key;

public interface WC7CoordinatedPolicyInternalStubI
    extends EffDatedInternal, WC7CoordinatedPolicyStubI
{


    Key getWCLineID();

    void setWCLineID(Key value);

    Key getLaborContractorID();

    void setLaborContractorID(Key value);

    /**
     * Sets the value of the MultipleCoordindatedPolicyCond field.
     * 
     */
    void setMultipleCoordindatedPolicyCond(WC7WorkersCompCond value);

    Key getMultipleCoordindatedPolicyCondID();

    void setMultipleCoordindatedPolicyCondID(Key value);

}
