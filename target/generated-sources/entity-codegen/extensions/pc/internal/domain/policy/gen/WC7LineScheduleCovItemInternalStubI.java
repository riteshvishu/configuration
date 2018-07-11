
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.coverage.impl.CoverableInternal;
import com.guidewire.pc.domain.productmodel.impl.ScheduledItemInternal;
import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import extensions.pc.policy.typekey.WC7LineScheduleCovItem;
import gw.pl.persistence.core.Key;

public interface WC7LineScheduleCovItemInternalStubI
    extends CoverableInternal, ScheduledItemInternal, EffDatedInternal, WC7LineScheduleCovItemStubI
{


    /**
     * Sets the value of the Subtype field.
     * 
     */
    void setSubtype(WC7LineScheduleCovItem value);

    Key getScheduleID();

    void setScheduleID(Key value);

}
