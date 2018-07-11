
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.policy.impl.ModifierInternal;
import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import extensions.pc.policy.typekey.WC7Modifier;
import gw.pl.persistence.core.Key;

public interface WC7ModifierInternalStubI
    extends ModifierInternal, EffDatedInternal, WC7ModifierStubI
{


    /**
     * Sets the value of the Subtype field.
     * 
     */
    void setSubtype(WC7Modifier value);

    Key getWC7JurisdictionID();

    void setWC7JurisdictionID(Key value);

}
