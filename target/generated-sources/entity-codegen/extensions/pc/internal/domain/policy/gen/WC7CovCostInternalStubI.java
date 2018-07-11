
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.financials.impl.CostInternal;
import extensions.pc.internal.domain.policy.impl.WC7CostInternal;
import gw.pl.persistence.core.Key;

public interface WC7CovCostInternalStubI
    extends CostInternal, WC7CovCostStubI, WC7CostInternal
{


    Key getWC7WorkersCompCovID();

    void setWC7WorkersCompCovID(Key value);

}
