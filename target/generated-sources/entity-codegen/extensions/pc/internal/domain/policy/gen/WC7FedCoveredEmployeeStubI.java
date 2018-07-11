
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7CoveredEmployeeBase;
import extensions.pc.policy.entity.WC7FELACovEmpCost;
import extensions.pc.policy.entity.WC7FedCoveredEmployee;
import extensions.pc.policy.entity.WC7WorkersCompCov;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7FedCoveredEmployeeStubI
    extends WC7CoveredEmployeeBase
{

    EffDatedEntityIntrinsicTypeReference<WC7FedCoveredEmployee, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7FedCoveredEmployee, PolicyPeriod>("entity.WC7FedCoveredEmployee");
    LinkPropertyInfoCache FEDEMPLIABCOVERAGE_PROP = new LinkPropertyInfoCache(TYPE, "FedEmpLiabCoverage");
    ArrayPropertyInfoCache WC7COSTS_PROP = new ArrayPropertyInfoCache(TYPE, "WC7Costs");

    /**
     * Gets the value of the FedEmpLiabCoverage field.
     * The parent coverage for federal covered employees
     * 
     */
    WC7WorkersCompCov getFedEmpLiabCoverage();

    /**
     * Gets the value of the WC7Costs field.
     * 
     * 
     */
    WC7FELACovEmpCost[] getWC7Costs();

    /**
     * Adds the given element to the WC7Costs array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7Costs(WC7FELACovEmpCost value);

    /**
     * Removes the given element from the WC7Costs array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7Costs(WC7FELACovEmpCost value);

}
