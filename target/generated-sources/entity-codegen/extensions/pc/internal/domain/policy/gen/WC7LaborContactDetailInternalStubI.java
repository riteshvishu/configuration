
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import extensions.pc.policy.typekey.WC7LaborContactDetail;
import gw.pl.persistence.core.Key;

public interface WC7LaborContactDetailInternalStubI
    extends EffDatedInternal, WC7LaborContactDetailStubI
{


    /**
     * Sets the value of the Subtype field.
     * 
     */
    void setSubtype(WC7LaborContactDetail value);

    Key getWC7LaborContactID();

    void setWC7LaborContactID(Key value);

}
