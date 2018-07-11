
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.financials.impl.CostInternal;
import extensions.pc.internal.domain.policy.impl.WC7CostInternal;
import gw.pl.persistence.core.Key;

public interface WC7JurisdictionCostInternalStubI
    extends CostInternal, WC7JurisdictionCostStubI, WC7CostInternal
{


    Key getWC7JurisdictionID();

    void setWC7JurisdictionID(Key value);

}
