
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7CovCost;
import extensions.pc.policy.entity.WC7ELIncreasedLimitCost;
import extensions.pc.policy.typekey.WC7ELIncrLimitCostType;
import gw.pc.financials.entity.Cost;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.geodata.zone.typekey.Jurisdiction;

public interface WC7ELIncreasedLimitCostStubI
    extends WC7CovCost, Cost
{

    EffDatedEntityIntrinsicTypeReference<WC7ELIncreasedLimitCost, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7ELIncreasedLimitCost, PolicyPeriod>("entity.WC7ELIncreasedLimitCost");
    TypekeyPropertyInfoCache JURISDICTION_PROP = new TypekeyPropertyInfoCache(TYPE, "Jurisdiction");
    TypekeyPropertyInfoCache WC7ELINCREASEDLIMITCOSTTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "WC7ELIncreasedLimitCostType");

    /**
     * Gets the value of the Jurisdiction field.
     * The jurisdiction this cost applies to
     * 
     */
    Jurisdiction getJurisdiction();

    /**
     * Sets the value of the Jurisdiction field.
     * 
     */
    void setJurisdiction(Jurisdiction value);

    /**
     * Gets the value of the WC7ELIncreasedLimitCostType field.
     * 
     * 
     */
    WC7ELIncrLimitCostType getWC7ELIncreasedLimitCostType();

    /**
     * Sets the value of the WC7ELIncreasedLimitCostType field.
     * 
     */
    void setWC7ELIncreasedLimitCostType(WC7ELIncrLimitCostType value);

}
