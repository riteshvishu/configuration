
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7CovCostImpl;
import extensions.pc.policy.entity.WC7CoveredEmployee;
import extensions.pc.policy.typekey.WC7CovEmpCostType;
import gw.pl.persistence.core.Key;

public abstract class WC7CovEmpCostStub
    extends WC7CovCostImpl
    implements WC7CovEmpCostInternalStubI
{


    @Override
    public WC7CoveredEmployee getWC7CoveredEmployee() {
        return ((WC7CoveredEmployee) getFieldValue(WC7COVEREDEMPLOYEE_PROP.get()));
    }

    @Override
    public void setWC7CoveredEmployee(WC7CoveredEmployee value) {
        setFieldValue(WC7COVEREDEMPLOYEE_PROP.get(), value);
    }

    @Override
    public Key getWC7CoveredEmployeeID() {
        return ((Key) getRawFieldValue(WC7COVEREDEMPLOYEE_PROP.get()));
    }

    @Override
    public void setWC7CoveredEmployeeID(Key value) {
        setFieldValue(WC7COVEREDEMPLOYEE_PROP.get(), value);
    }

    @Override
    public WC7CovEmpCostType getWC7CovEmpCostType() {
        return ((WC7CovEmpCostType) getFieldValue(WC7COVEMPCOSTTYPE_PROP.get()));
    }

    @Override
    public void setWC7CovEmpCostType(WC7CovEmpCostType value) {
        setFieldValue(WC7COVEMPCOSTTYPE_PROP.get(), value);
    }

}
