
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.financials.impl.CostInternal;
import extensions.pc.internal.domain.policy.impl.WC7CostInternal;
import gw.pl.persistence.core.Key;

public interface WC7FELACovEmpCostInternalStubI
    extends CostInternal, WC7FELACovEmpCostStubI, WC7CostInternal
{


    Key getWC7FELACoveredEmployeeID();

    void setWC7FELACoveredEmployeeID(Key value);

    Key getWC7FELACovID();

    void setWC7FELACovID(Key value);

}
