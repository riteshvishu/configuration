
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.financials.impl.CostInternal;
import extensions.pc.internal.domain.policy.impl.WC7JurisdictionCostInternal;
import gw.pl.persistence.core.Key;

public interface WC7WaiverOfSubroCostInternalStubI
    extends CostInternal, WC7WaiverOfSubroCostStubI, WC7JurisdictionCostInternal
{


    Key getWC7WaiverOfSubroID();

    void setWC7WaiverOfSubroID(Key value);

}
