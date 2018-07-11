
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.BANonOwnedLiabCovCost;
import gw.pc.financials.entity.Cost;
import gw.pc.lob.ba.entity.BAStateCovCost;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pc.policy.typekey.BANonOwnedLiabCovCostType;

public interface BANonOwnedLiabCovCostStubI
    extends Cost, BAStateCovCost
{

    EffDatedEntityIntrinsicTypeReference<BANonOwnedLiabCovCost, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<BANonOwnedLiabCovCost, PolicyPeriod>("entity.BANonOwnedLiabCovCost");
    TypekeyPropertyInfoCache BANONOWNEDLIABCOVCOSTTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "BANonOwnedLiabCovCostType");

    /**
     * Gets the value of the BANonOwnedLiabCovCostType field.
     * deprecated - use BALineCovNonownedCost since non owned coverages have now been moved to the line level
     * 
     * @deprecated
     *     deprecated - use BALineCovNonownedCost since non owned coverages have now been moved to the line level
     */
    @Deprecated
    BANonOwnedLiabCovCostType getBANonOwnedLiabCovCostType();

    /**
     * Sets the value of the BANonOwnedLiabCovCostType field.
     * 
     * @deprecated
     *     deprecated - use BALineCovNonownedCost since non owned coverages have now been moved to the line level
     */
    @Deprecated
    void setBANonOwnedLiabCovCostType(BANonOwnedLiabCovCostType value);

}
