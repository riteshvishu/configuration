
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7LineScheduleCov;
import extensions.pc.policy.entity.WC7LineScheduleCovItem;
import extensions.pc.policy.entity.WC7WorkersCompCov;
import gw.api.productmodel.Schedule;
import gw.pc.lob.common.entity.ScheduleAutoNumberSequence;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7LineScheduleCovStubI
    extends WC7WorkersCompCov, Schedule, ScheduleAutoNumberSequence
{

    EffDatedEntityIntrinsicTypeReference<WC7LineScheduleCov, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7LineScheduleCov, PolicyPeriod>("entity.WC7LineScheduleCov");
    ArrayPropertyInfoCache WC7LINESCHEDULECOVITEMS_PROP = new ArrayPropertyInfoCache(TYPE, "WC7LineScheduleCovItems");
    LinkPropertyInfoCache SCHEDULEAUTONUMBERSEQ_PROP = new LinkPropertyInfoCache(TYPE, "ScheduleAutoNumberSeq");

    /**
     * Gets the value of the WC7LineScheduleCovItems field.
     * Coverage scheduled items
     * 
     */
    WC7LineScheduleCovItem[] getWC7LineScheduleCovItems();

    /**
     * Adds the given element to the WC7LineScheduleCovItems array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7LineScheduleCovItems(WC7LineScheduleCovItem value);

    /**
     * Removes the given element from the WC7LineScheduleCovItems array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7LineScheduleCovItems(WC7LineScheduleCovItem value);

}
