
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7JurisdictionCost;
import extensions.pc.policy.entity.WC7WaiverOfSubro;
import extensions.pc.policy.entity.WC7WaiverOfSubroCost;
import gw.pc.financials.entity.Cost;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7WaiverOfSubroCostStubI
    extends WC7JurisdictionCost, Cost
{

    EffDatedEntityIntrinsicTypeReference<WC7WaiverOfSubroCost, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7WaiverOfSubroCost, PolicyPeriod>("entity.WC7WaiverOfSubroCost");
    LinkPropertyInfoCache WC7WAIVEROFSUBRO_PROP = new LinkPropertyInfoCache(TYPE, "WC7WaiverOfSubro");

    /**
     * Gets the value of the WC7WaiverOfSubro field.
     * 
     * 
     */
    WC7WaiverOfSubro getWC7WaiverOfSubro();

    /**
     * Sets the value of the WC7WaiverOfSubro field.
     * 
     */
    void setWC7WaiverOfSubro(WC7WaiverOfSubro value);

}
