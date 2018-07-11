
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7CostImpl;
import extensions.pc.policy.entity.WC7MaritimeCoveredEmployee;
import extensions.pc.policy.entity.WC7WorkersCompCov;
import extensions.pc.policy.typekey.WC7MaritimeCovEmpCostType;
import gw.pl.persistence.core.Key;

public abstract class WC7MaritimeCovEmpCostStub
    extends WC7CostImpl
    implements WC7MaritimeCovEmpCostInternalStubI
{


    @Override
    public WC7MaritimeCoveredEmployee getWC7MaritimeCoveredEmployee() {
        return ((WC7MaritimeCoveredEmployee) getFieldValue(WC7MARITIMECOVEREDEMPLOYEE_PROP.get()));
    }

    @Override
    public void setWC7MaritimeCoveredEmployee(WC7MaritimeCoveredEmployee value) {
        setFieldValue(WC7MARITIMECOVEREDEMPLOYEE_PROP.get(), value);
    }

    @Override
    public Key getWC7MaritimeCoveredEmployeeID() {
        return ((Key) getRawFieldValue(WC7MARITIMECOVEREDEMPLOYEE_PROP.get()));
    }

    @Override
    public void setWC7MaritimeCoveredEmployeeID(Key value) {
        setFieldValue(WC7MARITIMECOVEREDEMPLOYEE_PROP.get(), value);
    }

    @Override
    public WC7WorkersCompCov getWC7MaritimeCov() {
        return ((WC7WorkersCompCov) getFieldValue(WC7MARITIMECOV_PROP.get()));
    }

    @Override
    public void setWC7MaritimeCov(WC7WorkersCompCov value) {
        setFieldValue(WC7MARITIMECOV_PROP.get(), value);
    }

    @Override
    public Key getWC7MaritimeCovID() {
        return ((Key) getRawFieldValue(WC7MARITIMECOV_PROP.get()));
    }

    @Override
    public void setWC7MaritimeCovID(Key value) {
        setFieldValue(WC7MARITIMECOV_PROP.get(), value);
    }

    @Override
    public WC7MaritimeCovEmpCostType getWC7MaritimeCovEmpCostType() {
        return ((WC7MaritimeCovEmpCostType) getFieldValue(WC7MARITIMECOVEMPCOSTTYPE_PROP.get()));
    }

    @Override
    public void setWC7MaritimeCovEmpCostType(WC7MaritimeCovEmpCostType value) {
        setFieldValue(WC7MARITIMECOVEMPCOSTTYPE_PROP.get(), value);
    }

}
