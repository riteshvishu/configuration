
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.reinsurance.impl.RICededPremiumHistoryInternal;
import com.guidewire.pl.domain.persistence.core.impl.RetireableInternal;
import gw.pl.persistence.core.Key;

public interface WC7CededPremiumHistoryInternalStubI
    extends RICededPremiumHistoryInternal, RetireableInternal, WC7CededPremiumHistoryStubI
{


    Key getWC7CededPremiumID();

    void setWC7CededPremiumID(Key value);

}
