
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7AtomicEnergyCost;
import extensions.pc.policy.entity.WC7AtomicEnergyExposure;
import extensions.pc.policy.entity.WC7Cost;
import gw.pc.financials.entity.Cost;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7AtomicEnergyCostStubI
    extends WC7Cost, Cost
{

    EffDatedEntityIntrinsicTypeReference<WC7AtomicEnergyCost, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7AtomicEnergyCost, PolicyPeriod>("entity.WC7AtomicEnergyCost");
    LinkPropertyInfoCache WC7ATOMICENERGYEXPOSURE_PROP = new LinkPropertyInfoCache(TYPE, "WC7AtomicEnergyExposure");

    /**
     * Gets the value of the WC7AtomicEnergyExposure field.
     * 
     * 
     */
    WC7AtomicEnergyExposure getWC7AtomicEnergyExposure();

    /**
     * Sets the value of the WC7AtomicEnergyExposure field.
     * 
     */
    void setWC7AtomicEnergyExposure(WC7AtomicEnergyExposure value);

}
