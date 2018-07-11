
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7JurisdictionCostImpl;
import extensions.pc.policy.entity.WC7WaiverOfSubro;
import gw.pl.persistence.core.Key;

public abstract class WC7WaiverOfSubroCostStub
    extends WC7JurisdictionCostImpl
    implements WC7WaiverOfSubroCostInternalStubI
{


    @Override
    public WC7WaiverOfSubro getWC7WaiverOfSubro() {
        return ((WC7WaiverOfSubro) getFieldValue(WC7WAIVEROFSUBRO_PROP.get()));
    }

    @Override
    public void setWC7WaiverOfSubro(WC7WaiverOfSubro value) {
        setFieldValue(WC7WAIVEROFSUBRO_PROP.get(), value);
    }

    @Override
    public Key getWC7WaiverOfSubroID() {
        return ((Key) getRawFieldValue(WC7WAIVEROFSUBRO_PROP.get()));
    }

    @Override
    public void setWC7WaiverOfSubroID(Key value) {
        setFieldValue(WC7WAIVEROFSUBRO_PROP.get(), value);
    }

}
