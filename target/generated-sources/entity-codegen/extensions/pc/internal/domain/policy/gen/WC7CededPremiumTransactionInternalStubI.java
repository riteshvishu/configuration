
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.reinsurance.impl.RICededPremiumTransactionInternal;
import com.guidewire.pl.domain.persistence.core.impl.RetireableInternal;
import gw.pl.persistence.core.Key;

public interface WC7CededPremiumTransactionInternalStubI
    extends RICededPremiumTransactionInternal, RetireableInternal, WC7CededPremiumTransactionStubI
{


    Key getWC7CededPremiumID();

    void setWC7CededPremiumID(Key value);

    Key getWC7CededPremiumHistoryID();

    void setWC7CededPremiumHistoryID(Key value);

}
