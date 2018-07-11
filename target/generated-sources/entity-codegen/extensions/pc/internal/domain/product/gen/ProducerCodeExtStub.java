
package extensions.pc.internal.domain.product.gen;

import com.guidewire.pc.domain.product.impl.ProducerCodeImpl;
import extensions.pc.internal.domain.product.impl.ProducerCodeExtInternal;
import extensions.pc.internal.domain.product.impl.ProducerCodeExtMethodsImpl;
import extensions.pc.policy.entity.WC7AffinityGroupProducerCode;

public class ProducerCodeExtStub
    extends ProducerCodeImpl
    implements ProducerCodeExtInternal
{


    @Override
    public WC7AffinityGroupProducerCode[] getAffinityGroupProducerCodes() {
        return getExtensionDelegate(ProducerCodeExtMethodsImpl.class).getAffinityGroupProducerCodes();
    }

    @Override
    public void addToAffinityGroupProducerCodes(WC7AffinityGroupProducerCode value) {
        getExtensionDelegate(ProducerCodeExtMethodsImpl.class).addToAffinityGroupProducerCodes(value);
    }

    @Override
    public void removeFromAffinityGroupProducerCodes(WC7AffinityGroupProducerCode value) {
        getExtensionDelegate(ProducerCodeExtMethodsImpl.class).removeFromAffinityGroupProducerCodes(value);
    }

}
