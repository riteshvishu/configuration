
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7CostImpl;
import extensions.pc.policy.entity.WC7Jurisdiction;
import extensions.pc.policy.typekey.WC7JurisdictionCostType;
import gw.pl.persistence.core.Key;

public abstract class WC7JurisdictionCostStub
    extends WC7CostImpl
    implements WC7JurisdictionCostInternalStubI
{


    @Override
    public WC7JurisdictionCostType getJurisdictionCostType() {
        return ((WC7JurisdictionCostType) getFieldValue(JURISDICTIONCOSTTYPE_PROP.get()));
    }

    @Override
    public void setJurisdictionCostType(WC7JurisdictionCostType value) {
        setFieldValue(JURISDICTIONCOSTTYPE_PROP.get(), value);
    }

    @Override
    public WC7Jurisdiction getWC7Jurisdiction() {
        return ((WC7Jurisdiction) getFieldValue(WC7JURISDICTION_PROP.get()));
    }

    @Override
    public void setWC7Jurisdiction(WC7Jurisdiction value) {
        setFieldValue(WC7JURISDICTION_PROP.get(), value);
    }

    @Override
    public Key getWC7JurisdictionID() {
        return ((Key) getRawFieldValue(WC7JURISDICTION_PROP.get()));
    }

    @Override
    public void setWC7JurisdictionID(Key value) {
        setFieldValue(WC7JURISDICTION_PROP.get(), value);
    }

}
