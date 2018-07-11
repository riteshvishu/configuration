
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7CovCostImpl;
import extensions.pc.policy.typekey.WC7ELIncrLimitCostType;
import gw.pl.geodata.zone.typekey.Jurisdiction;

public abstract class WC7ELIncreasedLimitCostStub
    extends WC7CovCostImpl
    implements WC7ELIncreasedLimitCostInternalStubI
{


    @Override
    public Jurisdiction getJurisdiction() {
        return ((Jurisdiction) getFieldValue(JURISDICTION_PROP.get()));
    }

    @Override
    public void setJurisdiction(Jurisdiction value) {
        setFieldValue(JURISDICTION_PROP.get(), value);
    }

    @Override
    public WC7ELIncrLimitCostType getWC7ELIncreasedLimitCostType() {
        return ((WC7ELIncrLimitCostType) getFieldValue(WC7ELINCREASEDLIMITCOSTTYPE_PROP.get()));
    }

    @Override
    public void setWC7ELIncreasedLimitCostType(WC7ELIncrLimitCostType value) {
        setFieldValue(WC7ELINCREASEDLIMITCOSTTYPE_PROP.get(), value);
    }

}
