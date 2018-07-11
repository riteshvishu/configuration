
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7PolicyContactRoleImpl;
import extensions.pc.policy.entity.WC7LaborContactDetail;

public abstract class WC7LaborContactStub
    extends WC7PolicyContactRoleImpl
    implements WC7LaborContactInternalStubI
{


    @Override
    public WC7LaborContactDetail[] getWC7Details() {
        return ((WC7LaborContactDetail[]) getFieldValue(WC7DETAILS_PROP.get()));
    }

    @Override
    public void addToWC7Details(WC7LaborContactDetail value) {
        addArrayElement(WC7DETAILS_PROP.get(), value);
    }

    @Override
    public void removeFromWC7Details(WC7LaborContactDetail value) {
        removeArrayElement(WC7DETAILS_PROP.get(), value);
    }

}
