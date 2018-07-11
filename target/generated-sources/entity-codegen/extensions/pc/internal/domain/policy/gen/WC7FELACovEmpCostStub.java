
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7CostImpl;
import extensions.pc.policy.entity.WC7FedCoveredEmployee;
import extensions.pc.policy.entity.WC7WorkersCompCov;
import extensions.pc.policy.typekey.WC7FELACovEmpCostType;
import gw.pl.persistence.core.Key;

public abstract class WC7FELACovEmpCostStub
    extends WC7CostImpl
    implements WC7FELACovEmpCostInternalStubI
{


    @Override
    public WC7FedCoveredEmployee getWC7FELACoveredEmployee() {
        return ((WC7FedCoveredEmployee) getFieldValue(WC7FELACOVEREDEMPLOYEE_PROP.get()));
    }

    @Override
    public void setWC7FELACoveredEmployee(WC7FedCoveredEmployee value) {
        setFieldValue(WC7FELACOVEREDEMPLOYEE_PROP.get(), value);
    }

    @Override
    public Key getWC7FELACoveredEmployeeID() {
        return ((Key) getRawFieldValue(WC7FELACOVEREDEMPLOYEE_PROP.get()));
    }

    @Override
    public void setWC7FELACoveredEmployeeID(Key value) {
        setFieldValue(WC7FELACOVEREDEMPLOYEE_PROP.get(), value);
    }

    @Override
    public WC7WorkersCompCov getWC7FELACov() {
        return ((WC7WorkersCompCov) getFieldValue(WC7FELACOV_PROP.get()));
    }

    @Override
    public void setWC7FELACov(WC7WorkersCompCov value) {
        setFieldValue(WC7FELACOV_PROP.get(), value);
    }

    @Override
    public Key getWC7FELACovID() {
        return ((Key) getRawFieldValue(WC7FELACOV_PROP.get()));
    }

    @Override
    public void setWC7FELACovID(Key value) {
        setFieldValue(WC7FELACOV_PROP.get(), value);
    }

    @Override
    public WC7FELACovEmpCostType getWC7FELACovEmpCostType() {
        return ((WC7FELACovEmpCostType) getFieldValue(WC7FELACOVEMPCOSTTYPE_PROP.get()));
    }

    @Override
    public void setWC7FELACovEmpCostType(WC7FELACovEmpCostType value) {
        setFieldValue(WC7FELACOVEMPCOSTTYPE_PROP.get(), value);
    }

}
