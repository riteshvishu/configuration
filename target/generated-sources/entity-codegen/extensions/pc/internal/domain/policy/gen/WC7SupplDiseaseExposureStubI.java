
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import com.guidewire.pl.system.entity.SubtypeBean;
import extensions.pc.policy.entity.WC7DiseaseCode;
import extensions.pc.policy.entity.WC7SupplDiseaseCost;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.policy.audit.entity.Auditable;
import gw.pc.policy.period.entity.PolicyLocation;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7SupplDiseaseExposureStubI
    extends SubtypeBean, EffDatedCopyable, EffDatedLogicalMatcher, Auditable, EffDated
{

    EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7SupplDiseaseExposure, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7SupplDiseaseExposure, PolicyPeriod>("entity.WC7SupplDiseaseExposure");
    TypekeyPropertyInfoCache SUBTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "Subtype");
    ColumnPropertyInfoCache BASISAMOUNT_PROP = new ColumnPropertyInfoCache(TYPE, "BasisAmount");
    ColumnPropertyInfoCache IFANYEXPOSURE_PROP = new ColumnPropertyInfoCache(TYPE, "IfAnyExposure");
    ArrayPropertyInfoCache COSTS_PROP = new ArrayPropertyInfoCache(TYPE, "Costs");
    LinkPropertyInfoCache DISEASECODE_PROP = new LinkPropertyInfoCache(TYPE, "DiseaseCode");
    LinkPropertyInfoCache LOCATION_PROP = new LinkPropertyInfoCache(TYPE, "Location");
    LinkPropertyInfoCache WCLINE_PROP = new LinkPropertyInfoCache(TYPE, "WCLine");
    ColumnPropertyInfoCache EFFECTIVEDATE_PROP = new ColumnPropertyInfoCache(TYPE, "EffectiveDate");
    ColumnPropertyInfoCache EXPIRATIONDATE_PROP = new ColumnPropertyInfoCache(TYPE, "ExpirationDate");
    TypekeyPropertyInfoCache CHANGETYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "ChangeType");
    ColumnPropertyInfoCache CREATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "CreateTime");
    ColumnPropertyInfoCache UPDATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "UpdateTime");
    LinkPropertyInfoCache CREATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "CreateUser");
    LinkPropertyInfoCache UPDATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "UpdateUser");
    ColumnPropertyInfoCache BEANVERSION_PROP = new ColumnPropertyInfoCache(TYPE, "BeanVersion");
    ColumnPropertyInfoCache ID_PROP = new ColumnPropertyInfoCache(TYPE, "ID");
    ColumnPropertyInfoCache PUBLICID_PROP = new ColumnPropertyInfoCache(TYPE, "PublicID");
    ColumnPropertyInfoCache ARCHIVEPARTITION_PROP = new ColumnPropertyInfoCache(TYPE, "ArchivePartition");
    ColumnPropertyInfoCache AUDITEDAMOUNT_PROP = new ColumnPropertyInfoCache(TYPE, "AuditedAmount");

    /**
     * Gets the value of the Subtype field.
     * Auto-generated subtype column
     * 
     */
    extensions.pc.policy.typekey.WC7SupplDiseaseExposure getSubtype();

    /**
     * Gets the value of the BasisAmount field.
     * Basis Amount
     * 
     */
    Integer getBasisAmount();

    /**
     * Sets the value of the BasisAmount field.
     * 
     */
    void setBasisAmount(Integer value);

    /**
     * Gets the value of the IfAnyExposure field.
     * Option to indicate that coverage is provided with precise liability to be determined later (at audit)
     * 
     */
    Boolean isIfAnyExposure();

    /**
     * Sets the value of the IfAnyExposure field.
     * 
     */
    void setIfAnyExposure(Boolean value);

    /**
     * Gets the value of the Costs field.
     * 
     * 
     */
    WC7SupplDiseaseCost[] getCosts();

    /**
     * Adds the given element to the Costs array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToCosts(WC7SupplDiseaseCost value);

    /**
     * Removes the given element from the Costs array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromCosts(WC7SupplDiseaseCost value);

    /**
     * Gets the value of the DiseaseCode field.
     * Disease Code of exposure
     * 
     */
    WC7DiseaseCode getDiseaseCode();

    /**
     * Sets the value of the DiseaseCode field.
     * 
     */
    void setDiseaseCode(WC7DiseaseCode value);

    /**
     * Gets the value of the Location field.
     * Location of exposure.
     * 
     */
    PolicyLocation getLocation();

    /**
     * Sets the value of the Location field.
     * 
     */
    void setLocation(PolicyLocation value);

    /**
     * Gets the value of the WCLine field.
     * 
     * 
     */
    WC7WorkersCompLine getWCLine();

    /**
     * Sets the value of the WCLine field.
     * 
     */
    void setWCLine(WC7WorkersCompLine value);

    extensions.pc.policy.entity.WC7SupplDiseaseExposure getBasedOn();

    extensions.pc.policy.entity.WC7SupplDiseaseExposure getSlice(Date sliceDate);

    extensions.pc.policy.entity.WC7SupplDiseaseExposure getUnsliced();

    PolicyPeriod getBranch();

    extensions.pc.policy.entity.WC7SupplDiseaseExposure split(Date splitDate);

    extensions.pc.policy.entity.WC7SupplDiseaseExposure clone();

}
