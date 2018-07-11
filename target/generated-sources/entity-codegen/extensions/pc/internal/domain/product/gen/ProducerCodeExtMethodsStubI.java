
package extensions.pc.internal.domain.product.gen;

import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import extensions.pc.policy.entity.WC7AffinityGroupProducerCode;
import gw.pc.product.entity.ProducerCode;

public interface ProducerCodeExtMethodsStubI {

    ArrayPropertyInfoCache AFFINITYGROUPPRODUCERCODES_PROP = new ArrayPropertyInfoCache(ProducerCode.TYPE, "AffinityGroupProducerCodes");

    /**
     * Gets the value of the AffinityGroupProducerCodes field.
     * Available groups to a producer code.
     * 
     */
    WC7AffinityGroupProducerCode[] getAffinityGroupProducerCodes();

    /**
     * Adds the given element to the AffinityGroupProducerCodes array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToAffinityGroupProducerCodes(WC7AffinityGroupProducerCode value);

    /**
     * Removes the given element from the AffinityGroupProducerCodes array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromAffinityGroupProducerCodes(WC7AffinityGroupProducerCode value);

}
