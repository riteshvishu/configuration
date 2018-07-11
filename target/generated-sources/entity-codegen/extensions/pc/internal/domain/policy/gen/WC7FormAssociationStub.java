
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.form.impl.FormAssociationImpl;
import extensions.pc.policy.entity.WC7WaiverOfSubro;
import gw.pl.persistence.core.Key;

public abstract class WC7FormAssociationStub
    extends FormAssociationImpl
    implements WC7FormAssociationInternalStubI
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
