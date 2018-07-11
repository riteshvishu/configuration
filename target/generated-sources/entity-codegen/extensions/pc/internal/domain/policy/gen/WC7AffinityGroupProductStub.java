
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.system.entity.proxy.AbstractVersionableBeanProxy;
import extensions.pc.policy.entity.WC7AffinityGroup;
import gw.pl.persistence.core.Key;

public abstract class WC7AffinityGroupProductStub
    extends AbstractVersionableBeanProxy
    implements WC7AffinityGroupProductInternalStubI
{


    @Override
    public String getProductCode() {
        return ((String) getFieldValueForCodegen(PRODUCTCODE_PROP.get()));
    }

    @Override
    public void setProductCode(String value) {
        setFieldValueForCodegen(PRODUCTCODE_PROP.get(), value);
    }

    @Override
    public WC7AffinityGroup getAffinityGroup() {
        return ((WC7AffinityGroup) getFieldValue(AFFINITYGROUP_PROP.get()));
    }

    @Override
    public void setAffinityGroup(WC7AffinityGroup value) {
        setFieldValue(AFFINITYGROUP_PROP.get(), value);
    }

    @Override
    public Key getAffinityGroupID() {
        return ((Key) getRawFieldValue(AFFINITYGROUP_PROP.get()));
    }

    @Override
    public void setAffinityGroupID(Key value) {
        setFieldValue(AFFINITYGROUP_PROP.get(), value);
    }

}
