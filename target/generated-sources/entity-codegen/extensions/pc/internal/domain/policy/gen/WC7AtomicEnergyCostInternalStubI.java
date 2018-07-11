
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.financials.impl.CostInternal;
import extensions.pc.internal.domain.policy.impl.WC7CostInternal;
import gw.pl.persistence.core.Key;

public interface WC7AtomicEnergyCostInternalStubI
    extends CostInternal, WC7AtomicEnergyCostStubI, WC7CostInternal
{


    Key getWC7AtomicEnergyExposureID();

    void setWC7AtomicEnergyExposureID(Key value);

}
