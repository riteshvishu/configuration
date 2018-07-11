
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7IncludedLaborContactDetail;
import extensions.pc.policy.entity.WC7LaborContactDetail;
import extensions.pc.policy.entity.WC7WorkersCompCond;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7IncludedLaborContactDetailStubI
    extends WC7LaborContactDetail
{

    EffDatedEntityIntrinsicTypeReference<WC7IncludedLaborContactDetail, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7IncludedLaborContactDetail, PolicyPeriod>("entity.WC7IncludedLaborContactDetail");
    LinkPropertyInfoCache LABORCONTACTCONDITION_PROP = new LinkPropertyInfoCache(TYPE, "LaborContactCondition");

    /**
     * Gets the value of the LaborContactCondition field.
     * The parent condition for this specific scheduled item
     * 
     */
    WC7WorkersCompCond getLaborContactCondition();

}
