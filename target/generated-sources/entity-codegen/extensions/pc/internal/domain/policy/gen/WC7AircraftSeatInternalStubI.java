
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import extensions.pc.policy.entity.WC7WorkersCompCond;
import gw.pl.persistence.core.Key;

public interface WC7AircraftSeatInternalStubI
    extends EffDatedInternal, WC7AircraftSeatStubI
{


    Key getWCLineID();

    void setWCLineID(Key value);

    /**
     * Sets the value of the AircraftSeatCondition field.
     * 
     */
    void setAircraftSeatCondition(WC7WorkersCompCond value);

    Key getAircraftSeatConditionID();

    void setAircraftSeatConditionID(Key value);

}
