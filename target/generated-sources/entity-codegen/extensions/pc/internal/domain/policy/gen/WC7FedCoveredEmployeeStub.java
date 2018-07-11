
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7CoveredEmployeeBaseImpl;
import extensions.pc.policy.entity.WC7FELACovEmpCost;
import extensions.pc.policy.entity.WC7WorkersCompCov;
import gw.pl.persistence.core.Key;

public abstract class WC7FedCoveredEmployeeStub
    extends WC7CoveredEmployeeBaseImpl
    implements WC7FedCoveredEmployeeInternalStubI
{


    @Override
    public WC7WorkersCompCov getFedEmpLiabCoverage() {
        return ((WC7WorkersCompCov) getFieldValue(FEDEMPLIABCOVERAGE_PROP.get()));
    }

    @Override
    public void setFedEmpLiabCoverage(WC7WorkersCompCov value) {
        setFieldValue(FEDEMPLIABCOVERAGE_PROP.get(), value);
    }

    @Override
    public Key getFedEmpLiabCoverageID() {
        return ((Key) getRawFieldValue(FEDEMPLIABCOVERAGE_PROP.get()));
    }

    @Override
    public void setFedEmpLiabCoverageID(Key value) {
        setFieldValue(FEDEMPLIABCOVERAGE_PROP.get(), value);
    }

    @Override
    public WC7FELACovEmpCost[] getWC7Costs() {
        return ((WC7FELACovEmpCost[]) getFieldValue(WC7COSTS_PROP.get()));
    }

    @Override
    public void addToWC7Costs(WC7FELACovEmpCost value) {
        addArrayElement(WC7COSTS_PROP.get(), value);
    }

    @Override
    public void removeFromWC7Costs(WC7FELACovEmpCost value) {
        removeArrayElement(WC7COSTS_PROP.get(), value);
    }

}
