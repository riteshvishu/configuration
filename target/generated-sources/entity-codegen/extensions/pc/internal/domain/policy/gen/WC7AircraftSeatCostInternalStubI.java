
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.financials.impl.CostInternal;
import extensions.pc.internal.domain.policy.impl.WC7JurisdictionCostInternal;
import gw.pl.persistence.core.Key;

public interface WC7AircraftSeatCostInternalStubI
    extends CostInternal, WC7AircraftSeatCostStubI, WC7JurisdictionCostInternal
{


    Key getWC7AircraftSeatID();

    void setWC7AircraftSeatID(Key value);

}
