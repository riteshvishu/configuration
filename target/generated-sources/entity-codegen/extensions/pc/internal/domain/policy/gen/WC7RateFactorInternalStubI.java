
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.policy.impl.RateFactorInternal;
import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import gw.pl.persistence.core.Key;

public interface WC7RateFactorInternalStubI
    extends RateFactorInternal, EffDatedInternal, WC7RateFactorStubI
{


    Key getWC7ModifierID();

    void setWC7ModifierID(Key value);

}
