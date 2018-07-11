
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7DiseaseCode;
import gw.pc.product.entity.SimpleEffDated;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.entity.Retireable;

public interface WC7DiseaseCodeStubI
    extends SimpleEffDated, Retireable
{

    EntityIntrinsicTypeReference<WC7DiseaseCode> TYPE = new EntityIntrinsicTypeReference<WC7DiseaseCode>("entity.WC7DiseaseCode");
    ColumnPropertyInfoCache CODE_PROP = new ColumnPropertyInfoCache(TYPE, "Code");
    ColumnPropertyInfoCache SUPPLDISEASELOADINGTYPE_PROP = new ColumnPropertyInfoCache(TYPE, "SupplDiseaseLoadingType");
    TypekeyPropertyInfoCache JURISDICTION_PROP = new TypekeyPropertyInfoCache(TYPE, "Jurisdiction");
    ColumnPropertyInfoCache RETIREDVALUE_PROP = new ColumnPropertyInfoCache(TYPE, "RetiredValue");
    ColumnPropertyInfoCache CREATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "CreateTime");
    ColumnPropertyInfoCache UPDATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "UpdateTime");
    LinkPropertyInfoCache CREATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "CreateUser");
    LinkPropertyInfoCache UPDATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "UpdateUser");
    ColumnPropertyInfoCache BEANVERSION_PROP = new ColumnPropertyInfoCache(TYPE, "BeanVersion");
    ColumnPropertyInfoCache ID_PROP = new ColumnPropertyInfoCache(TYPE, "ID");
    ColumnPropertyInfoCache PUBLICID_PROP = new ColumnPropertyInfoCache(TYPE, "PublicID");
    ColumnPropertyInfoCache EFFECTIVEDATE_PROP = new ColumnPropertyInfoCache(TYPE, "EffectiveDate");
    ColumnPropertyInfoCache EXPIRATIONDATE_PROP = new ColumnPropertyInfoCache(TYPE, "ExpirationDate");

    /**
     * Gets the value of the Code field.
     * The Disease Code for a line of insurance
     * 
     */
    String getCode();

    /**
     * Sets the value of the Code field.
     * 
     */
    void setCode(String value);

    /**
     * Gets the value of the SupplDiseaseLoadingType field.
     * Description for the code
     * 
     */
    String getSupplDiseaseLoadingType();

    /**
     * Sets the value of the SupplDiseaseLoadingType field.
     * 
     */
    void setSupplDiseaseLoadingType(String value);

    /**
     * Gets the value of the Jurisdiction field.
     * The jurisdiction for which this code value is allowed.
     * 
     */
    Jurisdiction getJurisdiction();

    /**
     * Sets the value of the Jurisdiction field.
     * 
     */
    void setJurisdiction(Jurisdiction value);

}
