
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.lob.ba.impl.BAStateCovCostImpl;
import gw.pc.policy.typekey.BANonOwnedLiabCovCostType;

public abstract class BANonOwnedLiabCovCostStub
    extends BAStateCovCostImpl
    implements BANonOwnedLiabCovCostInternalStubI
{


    @Override
    public BANonOwnedLiabCovCostType getBANonOwnedLiabCovCostType() {
        return ((BANonOwnedLiabCovCostType) getFieldValue(BANONOWNEDLIABCOVCOSTTYPE_PROP.get()));
    }

    @Override
    public void setBANonOwnedLiabCovCostType(BANonOwnedLiabCovCostType value) {
        setFieldValue(BANONOWNEDLIABCOVCOSTTYPE_PROP.get(), value);
    }

}
