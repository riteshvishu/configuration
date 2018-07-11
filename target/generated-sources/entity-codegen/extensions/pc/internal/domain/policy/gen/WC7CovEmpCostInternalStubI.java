
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.financials.impl.CostInternal;
import extensions.pc.internal.domain.policy.impl.WC7CovCostInternal;
import gw.pl.persistence.core.Key;

public interface WC7CovEmpCostInternalStubI
    extends CostInternal, WC7CovEmpCostStubI, WC7CovCostInternal
{


    Key getWC7CoveredEmployeeID();

    void setWC7CoveredEmployeeID(Key value);

}
