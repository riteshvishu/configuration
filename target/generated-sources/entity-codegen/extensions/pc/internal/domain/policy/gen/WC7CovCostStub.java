
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7CostImpl;
import extensions.pc.policy.entity.WC7WorkersCompCov;
import gw.pl.persistence.core.Key;

public abstract class WC7CovCostStub
    extends WC7CostImpl
    implements WC7CovCostInternalStubI
{


    @Override
    public WC7WorkersCompCov getWC7WorkersCompCov() {
        return ((WC7WorkersCompCov) getFieldValue(WC7WORKERSCOMPCOV_PROP.get()));
    }

    @Override
    public void setWC7WorkersCompCov(WC7WorkersCompCov value) {
        setFieldValue(WC7WORKERSCOMPCOV_PROP.get(), value);
    }

    @Override
    public Key getWC7WorkersCompCovID() {
        return ((Key) getRawFieldValue(WC7WORKERSCOMPCOV_PROP.get()));
    }

    @Override
    public void setWC7WorkersCompCovID(Key value) {
        setFieldValue(WC7WORKERSCOMPCOV_PROP.get(), value);
    }

}
