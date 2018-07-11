
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7CoveredEmployeeBaseImpl;
import extensions.pc.policy.entity.WC7MaritimeCovEmpCost;
import extensions.pc.policy.entity.WC7WorkersCompCov;
import gw.pl.persistence.core.Key;

public abstract class WC7MaritimeCoveredEmployeeStub
    extends WC7CoveredEmployeeBaseImpl
    implements WC7MaritimeCoveredEmployeeInternalStubI
{


    @Override
    public WC7WorkersCompCov getMaritimeCoverage() {
        return ((WC7WorkersCompCov) getFieldValue(MARITIMECOVERAGE_PROP.get()));
    }

    @Override
    public void setMaritimeCoverage(WC7WorkersCompCov value) {
        setFieldValue(MARITIMECOVERAGE_PROP.get(), value);
    }

    @Override
    public Key getMaritimeCoverageID() {
        return ((Key) getRawFieldValue(MARITIMECOVERAGE_PROP.get()));
    }

    @Override
    public void setMaritimeCoverageID(Key value) {
        setFieldValue(MARITIMECOVERAGE_PROP.get(), value);
    }

    @Override
    public String getVessel() {
        return ((String) getFieldValueForCodegen(VESSEL_PROP.get()));
    }

    @Override
    public void setVessel(String value) {
        setFieldValueForCodegen(VESSEL_PROP.get(), value);
    }

    @Override
    public WC7MaritimeCovEmpCost[] getWC7Costs() {
        return ((WC7MaritimeCovEmpCost[]) getFieldValue(WC7COSTS_PROP.get()));
    }

    @Override
    public void addToWC7Costs(WC7MaritimeCovEmpCost value) {
        addArrayElement(WC7COSTS_PROP.get(), value);
    }

    @Override
    public void removeFromWC7Costs(WC7MaritimeCovEmpCost value) {
        removeArrayElement(WC7COSTS_PROP.get(), value);
    }

}
