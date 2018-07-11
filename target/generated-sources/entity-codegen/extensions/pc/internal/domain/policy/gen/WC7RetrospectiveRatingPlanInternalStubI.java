
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import gw.pl.persistence.core.Key;

public interface WC7RetrospectiveRatingPlanInternalStubI
    extends EffDatedInternal, WC7RetrospectiveRatingPlanStubI
{


    Key getWC7WorkersCompLineID();

    void setWC7WorkersCompLineID(Key value);

}
