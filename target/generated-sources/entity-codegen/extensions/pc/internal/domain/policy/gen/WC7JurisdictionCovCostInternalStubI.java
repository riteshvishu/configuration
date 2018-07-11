
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.financials.impl.CostInternal;
import extensions.pc.internal.domain.policy.impl.WC7JurisdictionCostInternal;
import gw.pl.persistence.core.Key;

public interface WC7JurisdictionCovCostInternalStubI
    extends CostInternal, WC7JurisdictionCovCostStubI, WC7JurisdictionCostInternal
{


    Key getWC7JurisdictionCovID();

    void setWC7JurisdictionCovID(Key value);

}
