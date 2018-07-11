
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7AffinityGroup;
import extensions.pc.policy.entity.WC7AffinityGroupProduct;
import gw.pl.persistence.core.entity.Versionable;

public interface WC7AffinityGroupProductStubI
    extends Versionable
{

    EntityIntrinsicTypeReference<WC7AffinityGroupProduct> TYPE = new EntityIntrinsicTypeReference<WC7AffinityGroupProduct>("entity.WC7AffinityGroupProduct");
    ColumnPropertyInfoCache PRODUCTCODE_PROP = new ColumnPropertyInfoCache(TYPE, "ProductCode");
    LinkPropertyInfoCache AFFINITYGROUP_PROP = new LinkPropertyInfoCache(TYPE, "AffinityGroup");
    ColumnPropertyInfoCache BEANVERSION_PROP = new ColumnPropertyInfoCache(TYPE, "BeanVersion");
    ColumnPropertyInfoCache ID_PROP = new ColumnPropertyInfoCache(TYPE, "ID");
    ColumnPropertyInfoCache PUBLICID_PROP = new ColumnPropertyInfoCache(TYPE, "PublicID");

    /**
     * Gets the value of the ProductCode field.
     * The Product defining what kind of Policy this is
     * 
     */
    String getProductCode();

    /**
     * Sets the value of the ProductCode field.
     * 
     */
    void setProductCode(String value);

    /**
     * Gets the value of the AffinityGroup field.
     * The associated affinity group.
     * 
     */
    WC7AffinityGroup getAffinityGroup();

    /**
     * Sets the value of the AffinityGroup field.
     * 
     */
    void setAffinityGroup(WC7AffinityGroup value);

}
