
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7CovCost;
import extensions.pc.policy.entity.WC7TerrorismCovCost;
import gw.pc.financials.entity.Cost;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.geodata.zone.typekey.Jurisdiction;

public interface WC7TerrorismCovCostStubI
    extends WC7CovCost, Cost
{

    EffDatedEntityIntrinsicTypeReference<WC7TerrorismCovCost, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7TerrorismCovCost, PolicyPeriod>("entity.WC7TerrorismCovCost");
    TypekeyPropertyInfoCache JURISDICTION_PROP = new TypekeyPropertyInfoCache(TYPE, "Jurisdiction");

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

}
