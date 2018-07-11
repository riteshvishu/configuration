
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7CostImpl;
import extensions.pc.policy.entity.WC7AtomicEnergyExposure;
import gw.pl.persistence.core.Key;

public abstract class WC7AtomicEnergyCostStub
    extends WC7CostImpl
    implements WC7AtomicEnergyCostInternalStubI
{


    @Override
    public WC7AtomicEnergyExposure getWC7AtomicEnergyExposure() {
        return ((WC7AtomicEnergyExposure) getFieldValue(WC7ATOMICENERGYEXPOSURE_PROP.get()));
    }

    @Override
    public void setWC7AtomicEnergyExposure(WC7AtomicEnergyExposure value) {
        setFieldValue(WC7ATOMICENERGYEXPOSURE_PROP.get(), value);
    }

    @Override
    public Key getWC7AtomicEnergyExposureID() {
        return ((Key) getRawFieldValue(WC7ATOMICENERGYEXPOSURE_PROP.get()));
    }

    @Override
    public void setWC7AtomicEnergyExposureID(Key value) {
        setFieldValue(WC7ATOMICENERGYEXPOSURE_PROP.get(), value);
    }

}
