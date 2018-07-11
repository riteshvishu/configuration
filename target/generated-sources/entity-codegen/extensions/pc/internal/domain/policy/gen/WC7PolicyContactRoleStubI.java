
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7PolicyContactRole;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import gw.pc.contact.entity.PolicyContactRole;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7PolicyContactRoleStubI
    extends PolicyContactRole
{

    EffDatedEntityIntrinsicTypeReference<WC7PolicyContactRole, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7PolicyContactRole, PolicyPeriod>("entity.WC7PolicyContactRole");
    LinkPropertyInfoCache WC7WORKERSCOMPLINE_PROP = new LinkPropertyInfoCache(TYPE, "WC7WorkersCompLine");

    /**
     * Gets the value of the WC7WorkersCompLine field.
     * The workers comp policy line this contact role is associated with.
     * 
     */
    WC7WorkersCompLine getWC7WorkersCompLine();

    /**
     * Sets the value of the WC7WorkersCompLine field.
     * 
     */
    void setWC7WorkersCompLine(WC7WorkersCompLine value);

}
