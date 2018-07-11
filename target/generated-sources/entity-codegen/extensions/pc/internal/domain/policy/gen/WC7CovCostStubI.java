
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7Cost;
import extensions.pc.policy.entity.WC7CovCost;
import extensions.pc.policy.entity.WC7WorkersCompCov;
import gw.pc.financials.entity.Cost;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7CovCostStubI
    extends WC7Cost, Cost
{

    EffDatedEntityIntrinsicTypeReference<WC7CovCost, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7CovCost, PolicyPeriod>("entity.WC7CovCost");
    LinkPropertyInfoCache WC7WORKERSCOMPCOV_PROP = new LinkPropertyInfoCache(TYPE, "WC7WorkersCompCov");

    /**
     * Gets the value of the WC7WorkersCompCov field.
     * 
     * 
     */
    WC7WorkersCompCov getWC7WorkersCompCov();

    /**
     * Sets the value of the WC7WorkersCompCov field.
     * 
     */
    void setWC7WorkersCompCov(WC7WorkersCompCov value);

}
