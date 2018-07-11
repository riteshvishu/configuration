
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7LineScheduleExcl;
import extensions.pc.policy.entity.WC7LineScheduleExclItem;
import extensions.pc.policy.entity.WC7WorkersCompExcl;
import gw.api.productmodel.Schedule;
import gw.pc.lob.common.entity.ScheduleAutoNumberSequence;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7LineScheduleExclStubI
    extends WC7WorkersCompExcl, Schedule, ScheduleAutoNumberSequence
{

    EffDatedEntityIntrinsicTypeReference<WC7LineScheduleExcl, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7LineScheduleExcl, PolicyPeriod>("entity.WC7LineScheduleExcl");
    ArrayPropertyInfoCache WC7LINESCHEDULEEXCLITEMS_PROP = new ArrayPropertyInfoCache(TYPE, "WC7LineScheduleExclItems");
    LinkPropertyInfoCache SCHEDULEAUTONUMBERSEQ_PROP = new LinkPropertyInfoCache(TYPE, "ScheduleAutoNumberSeq");

    /**
     * Gets the value of the WC7LineScheduleExclItems field.
     * Exclusion scheduled items
     * 
     */
    WC7LineScheduleExclItem[] getWC7LineScheduleExclItems();

    /**
     * Adds the given element to the WC7LineScheduleExclItems array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7LineScheduleExclItems(WC7LineScheduleExclItem value);

    /**
     * Removes the given element from the WC7LineScheduleExclItems array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7LineScheduleExclItems(WC7LineScheduleExclItem value);

}
