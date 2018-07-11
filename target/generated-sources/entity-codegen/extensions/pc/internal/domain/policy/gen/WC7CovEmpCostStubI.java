
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7CovCost;
import extensions.pc.policy.entity.WC7CovEmpCost;
import extensions.pc.policy.entity.WC7CoveredEmployee;
import extensions.pc.policy.typekey.WC7CovEmpCostType;
import gw.pc.financials.entity.Cost;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7CovEmpCostStubI
    extends WC7CovCost, Cost
{

    EffDatedEntityIntrinsicTypeReference<WC7CovEmpCost, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7CovEmpCost, PolicyPeriod>("entity.WC7CovEmpCost");
    LinkPropertyInfoCache WC7COVEREDEMPLOYEE_PROP = new LinkPropertyInfoCache(TYPE, "WC7CoveredEmployee");
    TypekeyPropertyInfoCache WC7COVEMPCOSTTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "WC7CovEmpCostType");

    /**
     * Gets the value of the WC7CoveredEmployee field.
     * 
     * 
     */
    WC7CoveredEmployee getWC7CoveredEmployee();

    /**
     * Sets the value of the WC7CoveredEmployee field.
     * 
     */
    void setWC7CoveredEmployee(WC7CoveredEmployee value);

    /**
     * Gets the value of the WC7CovEmpCostType field.
     * 
     * 
     */
    WC7CovEmpCostType getWC7CovEmpCostType();

    /**
     * Sets the value of the WC7CovEmpCostType field.
     * 
     */
    void setWC7CovEmpCostType(WC7CovEmpCostType value);

}
