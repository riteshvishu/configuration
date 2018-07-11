
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7JurisdictionCost;
import extensions.pc.policy.entity.WC7JurisdictionCov;
import extensions.pc.policy.entity.WC7JurisdictionCovCost;
import gw.pc.financials.entity.Cost;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7JurisdictionCovCostStubI
    extends WC7JurisdictionCost, Cost
{

    EffDatedEntityIntrinsicTypeReference<WC7JurisdictionCovCost, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7JurisdictionCovCost, PolicyPeriod>("entity.WC7JurisdictionCovCost");
    LinkPropertyInfoCache WC7JURISDICTIONCOV_PROP = new LinkPropertyInfoCache(TYPE, "WC7JurisdictionCov");

    /**
     * Gets the value of the WC7JurisdictionCov field.
     * 
     * 
     */
    WC7JurisdictionCov getWC7JurisdictionCov();

    /**
     * Sets the value of the WC7JurisdictionCov field.
     * 
     */
    void setWC7JurisdictionCov(WC7JurisdictionCov value);

}
