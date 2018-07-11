
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7Cost;
import extensions.pc.policy.entity.WC7MaritimeCovEmpCost;
import extensions.pc.policy.entity.WC7MaritimeCoveredEmployee;
import extensions.pc.policy.entity.WC7WorkersCompCov;
import extensions.pc.policy.typekey.WC7MaritimeCovEmpCostType;
import gw.pc.financials.entity.Cost;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7MaritimeCovEmpCostStubI
    extends WC7Cost, Cost
{

    EffDatedEntityIntrinsicTypeReference<WC7MaritimeCovEmpCost, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7MaritimeCovEmpCost, PolicyPeriod>("entity.WC7MaritimeCovEmpCost");
    LinkPropertyInfoCache WC7MARITIMECOVEREDEMPLOYEE_PROP = new LinkPropertyInfoCache(TYPE, "WC7MaritimeCoveredEmployee");
    LinkPropertyInfoCache WC7MARITIMECOV_PROP = new LinkPropertyInfoCache(TYPE, "WC7MaritimeCov");
    TypekeyPropertyInfoCache WC7MARITIMECOVEMPCOSTTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "WC7MaritimeCovEmpCostType");

    /**
     * Gets the value of the WC7MaritimeCoveredEmployee field.
     * 
     * 
     */
    WC7MaritimeCoveredEmployee getWC7MaritimeCoveredEmployee();

    /**
     * Sets the value of the WC7MaritimeCoveredEmployee field.
     * 
     */
    void setWC7MaritimeCoveredEmployee(WC7MaritimeCoveredEmployee value);

    /**
     * Gets the value of the WC7MaritimeCov field.
     * 
     * 
     */
    WC7WorkersCompCov getWC7MaritimeCov();

    /**
     * Sets the value of the WC7MaritimeCov field.
     * 
     */
    void setWC7MaritimeCov(WC7WorkersCompCov value);

    /**
     * Gets the value of the WC7MaritimeCovEmpCostType field.
     * 
     * 
     */
    WC7MaritimeCovEmpCostType getWC7MaritimeCovEmpCostType();

    /**
     * Sets the value of the WC7MaritimeCovEmpCostType field.
     * 
     */
    void setWC7MaritimeCovEmpCostType(WC7MaritimeCovEmpCostType value);

}
