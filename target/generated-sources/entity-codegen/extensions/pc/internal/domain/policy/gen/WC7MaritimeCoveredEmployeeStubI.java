
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7CoveredEmployeeBase;
import extensions.pc.policy.entity.WC7MaritimeCovEmpCost;
import extensions.pc.policy.entity.WC7MaritimeCoveredEmployee;
import extensions.pc.policy.entity.WC7WorkersCompCov;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7MaritimeCoveredEmployeeStubI
    extends WC7CoveredEmployeeBase
{

    EffDatedEntityIntrinsicTypeReference<WC7MaritimeCoveredEmployee, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7MaritimeCoveredEmployee, PolicyPeriod>("entity.WC7MaritimeCoveredEmployee");
    LinkPropertyInfoCache MARITIMECOVERAGE_PROP = new LinkPropertyInfoCache(TYPE, "MaritimeCoverage");
    ColumnPropertyInfoCache VESSEL_PROP = new ColumnPropertyInfoCache(TYPE, "Vessel");
    ArrayPropertyInfoCache WC7COSTS_PROP = new ArrayPropertyInfoCache(TYPE, "WC7Costs");

    /**
     * Gets the value of the MaritimeCoverage field.
     * The parent coverage for maritime covered employees
     * 
     */
    WC7WorkersCompCov getMaritimeCoverage();

    /**
     * Gets the value of the Vessel field.
     * Its the vessel associated with this exposure
     * 
     */
    String getVessel();

    /**
     * Sets the value of the Vessel field.
     * 
     */
    void setVessel(String value);

    /**
     * Gets the value of the WC7Costs field.
     * 
     * 
     */
    WC7MaritimeCovEmpCost[] getWC7Costs();

    /**
     * Adds the given element to the WC7Costs array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7Costs(WC7MaritimeCovEmpCost value);

    /**
     * Removes the given element from the WC7Costs array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7Costs(WC7MaritimeCovEmpCost value);

}
