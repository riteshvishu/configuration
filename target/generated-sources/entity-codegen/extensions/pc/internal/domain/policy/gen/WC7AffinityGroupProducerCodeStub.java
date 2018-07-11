
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.system.entity.proxy.AbstractVersionableBeanProxy;
import extensions.pc.policy.entity.WC7AffinityGroup;
import gw.pc.product.entity.ProducerCode;
import gw.pl.persistence.core.Key;

public abstract class WC7AffinityGroupProducerCodeStub
    extends AbstractVersionableBeanProxy
    implements WC7AffinityGroupProducerCodeInternalStubI
{


    @Override
    public ProducerCode getProducerCode() {
        return ((ProducerCode) getFieldValue(PRODUCERCODE_PROP.get()));
    }

    @Override
    public void setProducerCode(ProducerCode value) {
        setFieldValue(PRODUCERCODE_PROP.get(), value);
    }

    @Override
    public Key getProducerCodeID() {
        return ((Key) getRawFieldValue(PRODUCERCODE_PROP.get()));
    }

    @Override
    public void setProducerCodeID(Key value) {
        setFieldValue(PRODUCERCODE_PROP.get(), value);
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
