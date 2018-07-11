
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import extensions.pc.policy.entity.WC7LaborContact;
import extensions.pc.policy.entity.WC7LaborContactDetail;
import extensions.pc.policy.entity.WC7PolicyContactRole;
import gw.api.domain.account.Mergeable;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7LaborContactStubI
    extends WC7PolicyContactRole, Mergeable
{

    EffDatedEntityIntrinsicTypeReference<WC7LaborContact, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7LaborContact, PolicyPeriod>("entity.WC7LaborContact");
    ArrayPropertyInfoCache WC7DETAILS_PROP = new ArrayPropertyInfoCache(TYPE, "WC7Details");

    /**
     * Gets the value of the WC7Details field.
     * 
     * 
     */
    WC7LaborContactDetail[] getWC7Details();

    /**
     * Adds the given element to the WC7Details array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7Details(WC7LaborContactDetail value);

    /**
     * Removes the given element from the WC7Details array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7Details(WC7LaborContactDetail value);

}
