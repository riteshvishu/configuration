
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import gw.pl.persistence.core.Key;

public interface WC7ParticipatingPlanInternalStubI
    extends EffDatedInternal, WC7ParticipatingPlanStubI
{


    Key getWC7WorkersCompLineID();

    void setWC7WorkersCompLineID(Key value);

}
