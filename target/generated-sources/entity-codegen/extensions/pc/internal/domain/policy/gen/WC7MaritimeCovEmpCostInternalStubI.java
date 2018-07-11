
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.financials.impl.CostInternal;
import extensions.pc.internal.domain.policy.impl.WC7CostInternal;
import gw.pl.persistence.core.Key;

public interface WC7MaritimeCovEmpCostInternalStubI
    extends CostInternal, WC7MaritimeCovEmpCostStubI, WC7CostInternal
{


    Key getWC7MaritimeCoveredEmployeeID();

    void setWC7MaritimeCoveredEmployeeID(Key value);

    Key getWC7MaritimeCovID();

    void setWC7MaritimeCovID(Key value);

}
