
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7Cost;
import extensions.pc.policy.entity.WC7SupplDiseaseCost;
import extensions.pc.policy.entity.WC7SupplDiseaseExposure;
import gw.pc.financials.entity.Cost;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7SupplDiseaseCostStubI
    extends WC7Cost, Cost
{

    EffDatedEntityIntrinsicTypeReference<WC7SupplDiseaseCost, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7SupplDiseaseCost, PolicyPeriod>("entity.WC7SupplDiseaseCost");
    LinkPropertyInfoCache WC7SUPPLDISEASEEXPOSURE_PROP = new LinkPropertyInfoCache(TYPE, "WC7SupplDiseaseExposure");

    /**
     * Gets the value of the WC7SupplDiseaseExposure field.
     * 
     * 
     */
    WC7SupplDiseaseExposure getWC7SupplDiseaseExposure();

    /**
     * Sets the value of the WC7SupplDiseaseExposure field.
     * 
     */
    void setWC7SupplDiseaseExposure(WC7SupplDiseaseExposure value);

}
