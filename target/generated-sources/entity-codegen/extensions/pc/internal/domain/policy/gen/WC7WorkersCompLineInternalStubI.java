
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.coverage.impl.CoverableInternal;
import com.guidewire.pc.domain.policy.lines.impl.PolicyLineInternal;
import gw.pl.persistence.core.Key;

public interface WC7WorkersCompLineInternalStubI
    extends CoverableInternal, PolicyLineInternal, WC7WorkersCompLineStubI
{


    Key getWC7GoverningClassID();

    void setWC7GoverningClassID(Key value);

    Key getEmployeeLeasingPlanID();

    void setEmployeeLeasingPlanID(Key value);

    Key getParticipatingPlanID();

    void setParticipatingPlanID(Key value);

    Key getRetrospectiveRatingPlanID();

    void setRetrospectiveRatingPlanID(Key value);

}
