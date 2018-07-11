
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7AffinityGroup;
import extensions.pc.policy.entity.WC7AffinityGroupProducerCode;
import gw.pc.product.entity.ProducerCode;
import gw.pl.persistence.core.entity.Versionable;

public interface WC7AffinityGroupProducerCodeStubI
    extends Versionable
{

    EntityIntrinsicTypeReference<WC7AffinityGroupProducerCode> TYPE = new EntityIntrinsicTypeReference<WC7AffinityGroupProducerCode>("entity.WC7AffinityGroupProducerCode");
    LinkPropertyInfoCache PRODUCERCODE_PROP = new LinkPropertyInfoCache(TYPE, "ProducerCode");
    LinkPropertyInfoCache AFFINITYGROUP_PROP = new LinkPropertyInfoCache(TYPE, "AffinityGroup");
    ColumnPropertyInfoCache BEANVERSION_PROP = new ColumnPropertyInfoCache(TYPE, "BeanVersion");
    ColumnPropertyInfoCache ID_PROP = new ColumnPropertyInfoCache(TYPE, "ID");
    ColumnPropertyInfoCache PUBLICID_PROP = new ColumnPropertyInfoCache(TYPE, "PublicID");

    /**
     * Gets the value of the ProducerCode field.
     * The ProducerCode.
     * 
     */
    ProducerCode getProducerCode();

    /**
     * Sets the value of the ProducerCode field.
     * 
     */
    void setProducerCode(ProducerCode value);

    /**
     * Gets the value of the AffinityGroup field.
     * Affinity group granted to the producer code.
     * 
     */
    WC7AffinityGroup getAffinityGroup();

    /**
     * Sets the value of the AffinityGroup field.
     * 
     */
    void setAffinityGroup(WC7AffinityGroup value);

}
