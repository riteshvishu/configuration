
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.reinsurance.impl.RICededPremiumInternal;
import com.guidewire.pl.domain.persistence.core.impl.RetireableInternal;
import gw.pl.persistence.core.Key;

public interface WC7CededPremiumInternalStubI
    extends RICededPremiumInternal, RetireableInternal, WC7CededPremiumStubI
{


    Key getWC7CostID();

    void setWC7CostID(Key value);

}
