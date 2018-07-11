
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import gw.pl.persistence.core.Key;

public interface WC7PremiumDiscountInternalStubI
    extends EffDatedInternal, WC7PremiumDiscountStubI
{


    Key getWC7JurisdictionID();

    void setWC7JurisdictionID(Key value);

}
