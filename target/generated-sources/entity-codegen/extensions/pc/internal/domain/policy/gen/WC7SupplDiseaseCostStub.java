
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7CostImpl;
import extensions.pc.policy.entity.WC7SupplDiseaseExposure;
import gw.pl.persistence.core.Key;

public abstract class WC7SupplDiseaseCostStub
    extends WC7CostImpl
    implements WC7SupplDiseaseCostInternalStubI
{


    @Override
    public WC7SupplDiseaseExposure getWC7SupplDiseaseExposure() {
        return ((WC7SupplDiseaseExposure) getFieldValue(WC7SUPPLDISEASEEXPOSURE_PROP.get()));
    }

    @Override
    public void setWC7SupplDiseaseExposure(WC7SupplDiseaseExposure value) {
        setFieldValue(WC7SUPPLDISEASEEXPOSURE_PROP.get(), value);
    }

    @Override
    public Key getWC7SupplDiseaseExposureID() {
        return ((Key) getRawFieldValue(WC7SUPPLDISEASEEXPOSURE_PROP.get()));
    }

    @Override
    public void setWC7SupplDiseaseExposureID(Key value) {
        setFieldValue(WC7SUPPLDISEASEEXPOSURE_PROP.get(), value);
    }

}
