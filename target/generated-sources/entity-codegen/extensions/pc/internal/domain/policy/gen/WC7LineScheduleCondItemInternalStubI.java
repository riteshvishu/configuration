
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.coverage.impl.CoverableInternal;
import com.guidewire.pc.domain.productmodel.impl.ScheduledItemInternal;
import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import extensions.pc.internal.domain.policy.impl.WC7ScheduledItemInternal;
import extensions.pc.policy.typekey.WC7LineScheduleCondItem;
import gw.pl.persistence.core.Key;

public interface WC7LineScheduleCondItemInternalStubI
    extends CoverableInternal, ScheduledItemInternal, EffDatedInternal, WC7LineScheduleCondItemStubI, WC7ScheduledItemInternal
{


    /**
     * Sets the value of the Subtype field.
     * 
     */
    void setSubtype(WC7LineScheduleCondItem value);

    Key getScheduleID();

    void setScheduleID(Key value);

}
