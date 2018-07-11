
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.product.impl.SimpleEffDatedInternal;
import com.guidewire.pl.domain.persistence.core.impl.RetireableInternal;
import gw.pl.persistence.core.Key;

public interface WC7ClassCodeInternalStubI
    extends SimpleEffDatedInternal, RetireableInternal, WC7ClassCodeStubI
{


    Key getBasisID();

    void setBasisID(Key value);

}
