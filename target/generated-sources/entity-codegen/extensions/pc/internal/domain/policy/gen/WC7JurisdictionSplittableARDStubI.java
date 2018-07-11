
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7JurisdictionSplittableARD;
import gw.pc.product.entity.SimpleEffDated;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.entity.KeyableBean;

public interface WC7JurisdictionSplittableARDStubI
    extends SimpleEffDated, KeyableBean
{

    EntityIntrinsicTypeReference<WC7JurisdictionSplittableARD> TYPE = new EntityIntrinsicTypeReference<WC7JurisdictionSplittableARD>("entity.WC7JurisdictionSplittableARD");
    TypekeyPropertyInfoCache JURISDICTION_PROP = new TypekeyPropertyInfoCache(TYPE, "Jurisdiction");
    ColumnPropertyInfoCache SPLITTABLEARD_PROP = new ColumnPropertyInfoCache(TYPE, "SplittableARD");
    ColumnPropertyInfoCache ID_PROP = new ColumnPropertyInfoCache(TYPE, "ID");
    ColumnPropertyInfoCache PUBLICID_PROP = new ColumnPropertyInfoCache(TYPE, "PublicID");
    ColumnPropertyInfoCache EFFECTIVEDATE_PROP = new ColumnPropertyInfoCache(TYPE, "EffectiveDate");
    ColumnPropertyInfoCache EXPIRATIONDATE_PROP = new ColumnPropertyInfoCache(TYPE, "ExpirationDate");

    /**
     * Gets the value of the Jurisdiction field.
     * The jurisdiction for which this SplittableARD flag is defined.
     * 
     */
    Jurisdiction getJurisdiction();

    /**
     * Sets the value of the Jurisdiction field.
     * 
     */
    void setJurisdiction(Jurisdiction value);

    /**
     * Gets the value of the SplittableARD field.
     * Defines whether the Jurisdiction is splittableARD.
     * 
     */
    Boolean isSplittableARD();

    /**
     * Sets the value of the SplittableARD field.
     * 
     */
    void setSplittableARD(Boolean value);

}
