
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import extensions.pc.policy.entity.WC7CovEmpCost;
import extensions.pc.policy.entity.WC7CoveredEmployee;
import extensions.pc.policy.entity.WC7CoveredEmployeeBase;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7CoveredEmployeeStubI
    extends WC7CoveredEmployeeBase
{

    EffDatedEntityIntrinsicTypeReference<WC7CoveredEmployee, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7CoveredEmployee, PolicyPeriod>("entity.WC7CoveredEmployee");
    ArrayPropertyInfoCache WC7COSTS_PROP = new ArrayPropertyInfoCache(TYPE, "WC7Costs");

    /**
     * Gets the value of the WC7Costs field.
     * 
     * 
     */
    WC7CovEmpCost[] getWC7Costs();

    /**
     * Adds the given element to the WC7Costs array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7Costs(WC7CovEmpCost value);

    /**
     * Removes the given element from the WC7Costs array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7Costs(WC7CovEmpCost value);

}
