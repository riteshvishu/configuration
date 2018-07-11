
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.contact.impl.PolicyContactRoleImpl;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import gw.pl.persistence.core.Key;

public abstract class WC7PolicyContactRoleStub
    extends PolicyContactRoleImpl
    implements WC7PolicyContactRoleInternalStubI
{


    @Override
    public WC7WorkersCompLine getWC7WorkersCompLine() {
        return ((WC7WorkersCompLine) getFieldValue(WC7WORKERSCOMPLINE_PROP.get()));
    }

    @Override
    public void setWC7WorkersCompLine(WC7WorkersCompLine value) {
        setFieldValue(WC7WORKERSCOMPLINE_PROP.get(), value);
    }

    @Override
    public Key getWC7WorkersCompLineID() {
        return ((Key) getRawFieldValue(WC7WORKERSCOMPLINE_PROP.get()));
    }

    @Override
    public void setWC7WorkersCompLineID(Key value) {
        setFieldValue(WC7WORKERSCOMPLINE_PROP.get(), value);
    }

}
