
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7JurisdictionCostImpl;
import extensions.pc.policy.entity.WC7JurisdictionCov;
import gw.pl.persistence.core.Key;

public abstract class WC7JurisdictionCovCostStub
    extends WC7JurisdictionCostImpl
    implements WC7JurisdictionCovCostInternalStubI
{


    @Override
    public WC7JurisdictionCov getWC7JurisdictionCov() {
        return ((WC7JurisdictionCov) getFieldValue(WC7JURISDICTIONCOV_PROP.get()));
    }

    @Override
    public void setWC7JurisdictionCov(WC7JurisdictionCov value) {
        setFieldValue(WC7JURISDICTIONCOV_PROP.get(), value);
    }

    @Override
    public Key getWC7JurisdictionCovID() {
        return ((Key) getRawFieldValue(WC7JURISDICTIONCOV_PROP.get()));
    }

    @Override
    public void setWC7JurisdictionCovID(Key value) {
        setFieldValue(WC7JURISDICTIONCOV_PROP.get(), value);
    }

}
