
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7LineScheduleCond;
import extensions.pc.policy.entity.WC7LineScheduleCondItem;
import extensions.pc.policy.entity.WC7WorkersCompCond;
import gw.api.productmodel.Schedule;
import gw.pc.lob.common.entity.ScheduleAutoNumberSequence;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7LineScheduleCondStubI
    extends WC7WorkersCompCond, Schedule, ScheduleAutoNumberSequence
{

    EffDatedEntityIntrinsicTypeReference<WC7LineScheduleCond, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7LineScheduleCond, PolicyPeriod>("entity.WC7LineScheduleCond");
    ArrayPropertyInfoCache WC7LINESCHEDULECONDITEMS_PROP = new ArrayPropertyInfoCache(TYPE, "WC7LineScheduleCondItems");
    LinkPropertyInfoCache SCHEDULEAUTONUMBERSEQ_PROP = new LinkPropertyInfoCache(TYPE, "ScheduleAutoNumberSeq");

    /**
     * Gets the value of the WC7LineScheduleCondItems field.
     * Condition scheduled items
     * 
     */
    WC7LineScheduleCondItem[] getWC7LineScheduleCondItems();

    /**
     * Adds the given element to the WC7LineScheduleCondItems array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7LineScheduleCondItems(WC7LineScheduleCondItem value);

    /**
     * Removes the given element from the WC7LineScheduleCondItems array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7LineScheduleCondItems(WC7LineScheduleCondItem value);

}
