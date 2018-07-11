
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.contact.impl.PolicyContactRoleInternal;
import gw.pl.persistence.core.Key;

public interface WC7PolicyContactRoleInternalStubI
    extends PolicyContactRoleInternal, WC7PolicyContactRoleStubI
{


    Key getWC7WorkersCompLineID();

    void setWC7WorkersCompLineID(Key value);

}
