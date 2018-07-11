
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.financials.impl.TransactionInternal;
import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import gw.pl.persistence.core.Key;

public interface WC7TransactionInternalStubI
    extends TransactionInternal, EffDatedInternal, WC7TransactionStubI
{


    Key getWC7CostID();

    void setWC7CostID(Key value);

}
