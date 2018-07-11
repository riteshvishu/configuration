
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.financials.impl.CostInternal;
import extensions.pc.internal.domain.policy.impl.WC7CostInternal;
import gw.pl.persistence.core.Key;

public interface WC7SupplDiseaseCostInternalStubI
    extends CostInternal, WC7SupplDiseaseCostStubI, WC7CostInternal
{


    Key getWC7SupplDiseaseExposureID();

    void setWC7SupplDiseaseExposureID(Key value);

}
