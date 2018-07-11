
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.financials.impl.CostInternal;
import extensions.pc.internal.domain.policy.impl.WC7JurisdictionCostInternal;
import gw.pl.persistence.core.Key;

public interface WC7ModifierCostInternalStubI
    extends CostInternal, WC7ModifierCostStubI, WC7JurisdictionCostInternal
{


    Key getWC7ModifierID();

    void setWC7ModifierID(Key value);

}
