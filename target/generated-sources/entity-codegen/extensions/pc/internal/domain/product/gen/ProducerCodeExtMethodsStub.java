
package extensions.pc.internal.domain.product.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import extensions.pc.policy.entity.WC7AffinityGroupProducerCode;
import gw.pc.product.entity.ProducerCode;

public abstract class ProducerCodeExtMethodsStub
    extends AspectBase
    implements ProducerCodeExtInternalMethodsStubI
{


    protected ProducerCodeExtMethodsStub(ProducerCode owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public ProducerCode getOwner() {
        return ((ProducerCode) super.getOwner());
    }

    @Override
    public WC7AffinityGroupProducerCode[] getAffinityGroupProducerCodes() {
        return ((WC7AffinityGroupProducerCode[]) getFieldValue(AFFINITYGROUPPRODUCERCODES_PROP.get()));
    }

    @Override
    public void addToAffinityGroupProducerCodes(WC7AffinityGroupProducerCode value) {
        addArrayElement(AFFINITYGROUPPRODUCERCODES_PROP.get(), value);
    }

    @Override
    public void removeFromAffinityGroupProducerCodes(WC7AffinityGroupProducerCode value) {
        removeArrayElement(AFFINITYGROUPPRODUCERCODES_PROP.get(), value);
    }

}
