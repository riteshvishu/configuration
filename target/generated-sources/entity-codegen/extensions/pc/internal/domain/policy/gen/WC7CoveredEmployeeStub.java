
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7CoveredEmployeeBaseImpl;
import extensions.pc.policy.entity.WC7CovEmpCost;

public abstract class WC7CoveredEmployeeStub
    extends WC7CoveredEmployeeBaseImpl
    implements WC7CoveredEmployeeInternalStubI
{


    @Override
    public WC7CovEmpCost[] getWC7Costs() {
        return ((WC7CovEmpCost[]) getFieldValue(WC7COSTS_PROP.get()));
    }

    @Override
    public void addToWC7Costs(WC7CovEmpCost value) {
        addArrayElement(WC7COSTS_PROP.get(), value);
    }

    @Override
    public void removeFromWC7Costs(WC7CovEmpCost value) {
        removeArrayElement(WC7COSTS_PROP.get(), value);
    }

}
