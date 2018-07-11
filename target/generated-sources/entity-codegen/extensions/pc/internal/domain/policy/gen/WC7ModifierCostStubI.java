
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7JurisdictionCost;
import extensions.pc.policy.entity.WC7Modifier;
import extensions.pc.policy.entity.WC7ModifierCost;
import gw.pc.financials.entity.Cost;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7ModifierCostStubI
    extends WC7JurisdictionCost, Cost
{

    EffDatedEntityIntrinsicTypeReference<WC7ModifierCost, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7ModifierCost, PolicyPeriod>("entity.WC7ModifierCost");
    LinkPropertyInfoCache WC7MODIFIER_PROP = new LinkPropertyInfoCache(TYPE, "WC7Modifier");

    /**
     * Gets the value of the WC7Modifier field.
     * 
     * 
     */
    WC7Modifier getWC7Modifier();

    /**
     * Sets the value of the WC7Modifier field.
     * 
     */
    void setWC7Modifier(WC7Modifier value);

}
