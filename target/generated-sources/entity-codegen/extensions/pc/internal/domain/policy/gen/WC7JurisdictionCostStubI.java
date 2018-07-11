
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7Cost;
import extensions.pc.policy.entity.WC7Jurisdiction;
import extensions.pc.policy.entity.WC7JurisdictionCost;
import extensions.pc.policy.typekey.WC7JurisdictionCostType;
import gw.pc.financials.entity.Cost;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7JurisdictionCostStubI
    extends WC7Cost, Cost
{

    EffDatedEntityIntrinsicTypeReference<WC7JurisdictionCost, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7JurisdictionCost, PolicyPeriod>("entity.WC7JurisdictionCost");
    TypekeyPropertyInfoCache JURISDICTIONCOSTTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "JurisdictionCostType");
    LinkPropertyInfoCache WC7JURISDICTION_PROP = new LinkPropertyInfoCache(TYPE, "WC7Jurisdiction");

    /**
     * Gets the value of the JurisdictionCostType field.
     * 
     * 
     */
    WC7JurisdictionCostType getJurisdictionCostType();

    /**
     * Sets the value of the JurisdictionCostType field.
     * 
     */
    void setJurisdictionCostType(WC7JurisdictionCostType value);

    /**
     * Gets the value of the WC7Jurisdiction field.
     * 
     * 
     */
    WC7Jurisdiction getWC7Jurisdiction();

    /**
     * Sets the value of the WC7Jurisdiction field.
     * 
     */
    void setWC7Jurisdiction(WC7Jurisdiction value);

}
