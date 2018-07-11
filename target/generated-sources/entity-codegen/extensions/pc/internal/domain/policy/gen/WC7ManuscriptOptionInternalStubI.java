
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import gw.pl.persistence.core.Key;

public interface WC7ManuscriptOptionInternalStubI
    extends EffDatedInternal, WC7ManuscriptOptionStubI
{


    Key getWC7LineID();

    void setWC7LineID(Key value);

}
