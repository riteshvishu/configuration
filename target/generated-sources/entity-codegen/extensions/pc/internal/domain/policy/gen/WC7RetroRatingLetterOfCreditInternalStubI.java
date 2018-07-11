
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import gw.pl.persistence.core.Key;

public interface WC7RetroRatingLetterOfCreditInternalStubI
    extends EffDatedInternal, WC7RetroRatingLetterOfCreditStubI
{


    Key getWC7RetrospectiveRatingPlanID();

    void setWC7RetrospectiveRatingPlanID(Key value);

}
