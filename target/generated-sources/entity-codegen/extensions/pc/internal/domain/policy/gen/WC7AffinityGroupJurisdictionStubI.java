
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7AffinityGroup;
import extensions.pc.policy.entity.WC7AffinityGroupJurisdiction;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.entity.Versionable;

public interface WC7AffinityGroupJurisdictionStubI
    extends Versionable
{

    EntityIntrinsicTypeReference<WC7AffinityGroupJurisdiction> TYPE = new EntityIntrinsicTypeReference<WC7AffinityGroupJurisdiction>("entity.WC7AffinityGroupJurisdiction");
    TypekeyPropertyInfoCache JURISDICTION_PROP = new TypekeyPropertyInfoCache(TYPE, "Jurisdiction");
    LinkPropertyInfoCache AFFINITYGROUP_PROP = new LinkPropertyInfoCache(TYPE, "AffinityGroup");
    ColumnPropertyInfoCache BEANVERSION_PROP = new ColumnPropertyInfoCache(TYPE, "BeanVersion");
    ColumnPropertyInfoCache ID_PROP = new ColumnPropertyInfoCache(TYPE, "ID");
    ColumnPropertyInfoCache PUBLICID_PROP = new ColumnPropertyInfoCache(TYPE, "PublicID");

    /**
     * Gets the value of the Jurisdiction field.
     * Jurisdiction for an affinity group
     * 
     */
    Jurisdiction getJurisdiction();

    /**
     * Sets the value of the Jurisdiction field.
     * 
     */
    void setJurisdiction(Jurisdiction value);

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
