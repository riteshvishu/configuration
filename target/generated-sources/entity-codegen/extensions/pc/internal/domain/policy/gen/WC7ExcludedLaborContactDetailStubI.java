
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7ExcludedLaborContactDetail;
import extensions.pc.policy.entity.WC7LaborContactDetail;
import extensions.pc.policy.entity.WC7WorkersCompExcl;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7ExcludedLaborContactDetailStubI
    extends WC7LaborContactDetail
{

    EffDatedEntityIntrinsicTypeReference<WC7ExcludedLaborContactDetail, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7ExcludedLaborContactDetail, PolicyPeriod>("entity.WC7ExcludedLaborContactDetail");
    LinkPropertyInfoCache LABORCONTACTEXCLUSION_PROP = new LinkPropertyInfoCache(TYPE, "LaborContactExclusion");

    /**
     * Gets the value of the LaborContactExclusion field.
     * The parent exclusion for this specific scheduled item
     * 
     */
    WC7WorkersCompExcl getLaborContactExclusion();

}
