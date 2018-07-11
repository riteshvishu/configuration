
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7Cost;
import extensions.pc.policy.entity.WC7FELACovEmpCost;
import extensions.pc.policy.entity.WC7FedCoveredEmployee;
import extensions.pc.policy.entity.WC7WorkersCompCov;
import extensions.pc.policy.typekey.WC7FELACovEmpCostType;
import gw.pc.financials.entity.Cost;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7FELACovEmpCostStubI
    extends WC7Cost, Cost
{

    EffDatedEntityIntrinsicTypeReference<WC7FELACovEmpCost, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7FELACovEmpCost, PolicyPeriod>("entity.WC7FELACovEmpCost");
    LinkPropertyInfoCache WC7FELACOVEREDEMPLOYEE_PROP = new LinkPropertyInfoCache(TYPE, "WC7FELACoveredEmployee");
    LinkPropertyInfoCache WC7FELACOV_PROP = new LinkPropertyInfoCache(TYPE, "WC7FELACov");
    TypekeyPropertyInfoCache WC7FELACOVEMPCOSTTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "WC7FELACovEmpCostType");

    /**
     * Gets the value of the WC7FELACoveredEmployee field.
     * 
     * 
     */
    WC7FedCoveredEmployee getWC7FELACoveredEmployee();

    /**
     * Sets the value of the WC7FELACoveredEmployee field.
     * 
     */
    void setWC7FELACoveredEmployee(WC7FedCoveredEmployee value);

    /**
     * Gets the value of the WC7FELACov field.
     * 
     * 
     */
    WC7WorkersCompCov getWC7FELACov();

    /**
     * Sets the value of the WC7FELACov field.
     * 
     */
    void setWC7FELACov(WC7WorkersCompCov value);

    /**
     * Gets the value of the WC7FELACovEmpCostType field.
     * 
     * 
     */
    WC7FELACovEmpCostType getWC7FELACovEmpCostType();

    /**
     * Sets the value of the WC7FELACovEmpCostType field.
     * 
     */
    void setWC7FELACovEmpCostType(WC7FELACovEmpCostType value);

}
