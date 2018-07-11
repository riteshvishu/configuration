
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.domain.persistence.core.impl.VersionableInternal;
import gw.pl.persistence.core.Key;

public interface WC7AffinityGroupProducerCodeInternalStubI
    extends VersionableInternal, WC7AffinityGroupProducerCodeStubI
{


    Key getProducerCodeID();

    void setProducerCodeID(Key value);

    Key getAffinityGroupID();

    void setAffinityGroupID(Key value);

}
