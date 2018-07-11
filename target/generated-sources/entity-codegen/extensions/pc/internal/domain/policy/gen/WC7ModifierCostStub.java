
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7JurisdictionCostImpl;
import extensions.pc.policy.entity.WC7Modifier;
import gw.pl.persistence.core.Key;

public abstract class WC7ModifierCostStub
    extends WC7JurisdictionCostImpl
    implements WC7ModifierCostInternalStubI
{


    @Override
    public WC7Modifier getWC7Modifier() {
        return ((WC7Modifier) getFieldValue(WC7MODIFIER_PROP.get()));
    }

    @Override
    public void setWC7Modifier(WC7Modifier value) {
        setFieldValue(WC7MODIFIER_PROP.get(), value);
    }

    @Override
    public Key getWC7ModifierID() {
        return ((Key) getRawFieldValue(WC7MODIFIER_PROP.get()));
    }

    @Override
    public void setWC7ModifierID(Key value) {
        setFieldValue(WC7MODIFIER_PROP.get(), value);
    }

}
