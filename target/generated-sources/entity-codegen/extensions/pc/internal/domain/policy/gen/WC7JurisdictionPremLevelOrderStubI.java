
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7JurisdictionPremLevelOrder;
import extensions.pc.policy.typekey.WC7PremiumLevelType;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.entity.KeyableBean;

public interface WC7JurisdictionPremLevelOrderStubI
    extends KeyableBean
{

    EntityIntrinsicTypeReference<WC7JurisdictionPremLevelOrder> TYPE = new EntityIntrinsicTypeReference<WC7JurisdictionPremLevelOrder>("entity.WC7JurisdictionPremLevelOrder");
    TypekeyPropertyInfoCache JURISDICTION_PROP = new TypekeyPropertyInfoCache(TYPE, "Jurisdiction");
    TypekeyPropertyInfoCache PREMIUMLEVELTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "PremiumLevelType");
    ColumnPropertyInfoCache PREMIUMLEVELCALCORDER_PROP = new ColumnPropertyInfoCache(TYPE, "PremiumLevelCalcOrder");
    ColumnPropertyInfoCache ID_PROP = new ColumnPropertyInfoCache(TYPE, "ID");
    ColumnPropertyInfoCache PUBLICID_PROP = new ColumnPropertyInfoCache(TYPE, "PublicID");

    /**
     * Gets the value of the Jurisdiction field.
     * The jurisdiction for which this premium level belongs to.
     * 
     */
    Jurisdiction getJurisdiction();

    /**
     * Sets the value of the Jurisdiction field.
     * 
     */
    void setJurisdiction(Jurisdiction value);

    /**
     * Gets the value of the PremiumLevelType field.
     * 
     * 
     */
    WC7PremiumLevelType getPremiumLevelType();

    /**
     * Sets the value of the PremiumLevelType field.
     * 
     */
    void setPremiumLevelType(WC7PremiumLevelType value);

    /**
     * Gets the value of the PremiumLevelCalcOrder field.
     * The order in which the premium levels for calculated for a given jurisdiction.
     * 
     */
    Integer getPremiumLevelCalcOrder();

    /**
     * Sets the value of the PremiumLevelCalcOrder field.
     * 
     */
    void setPremiumLevelCalcOrder(Integer value);

}
