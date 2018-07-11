
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.pc.domain.coverage.impl.CoverableInternal;
import com.guidewire.pc.domain.policy.impl.ModifiableInternal;
import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import gw.pl.persistence.core.Key;

public interface WC7JurisdictionInternalStubI
    extends CoverableInternal, ModifiableInternal, EffDatedInternal, WC7JurisdictionStubI
{


    /**
     * Gets the value of the AnniversaryDateInternal field.
     * Anniversary date for this jurisdiction
     * 
     */
    Date getAnniversaryDateInternal();

    /**
     * Sets the value of the AnniversaryDateInternal field.
     * 
     */
    void setAnniversaryDateInternal(Date value);

    /**
     * Gets the value of the ReferenceDateInternal field.
     * Internal field for storing the reference date of this entity on bound policy periods.
     * 
     */
    Date getReferenceDateInternal();

    /**
     * Sets the value of the ReferenceDateInternal field.
     * 
     */
    void setReferenceDateInternal(Date value);

    Key getWCLineID();

    void setWCLineID(Key value);

}
