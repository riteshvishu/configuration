
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import com.guidewire.pl.system.entity.SubtypeBean;
import extensions.pc.policy.entity.WC7ClassCode;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import extensions.pc.policy.typekey.WC7GoverningLaw;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.policy.audit.entity.Auditable;
import gw.pc.policy.period.entity.PolicyLocation;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7CoveredEmployeeBaseStubI
    extends SubtypeBean, EffDatedCopyable, EffDatedLogicalMatcher, Auditable, EffDated
{

    EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7CoveredEmployeeBase, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7CoveredEmployeeBase, PolicyPeriod>("entity.WC7CoveredEmployeeBase");
    TypekeyPropertyInfoCache SUBTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "Subtype");
    ColumnPropertyInfoCache BASISAMOUNT_PROP = new ColumnPropertyInfoCache(TYPE, "BasisAmount");
    ColumnPropertyInfoCache IFANYEXPOSURE_PROP = new ColumnPropertyInfoCache(TYPE, "IfAnyExposure");
    ColumnPropertyInfoCache NUMEMPLOYEES_PROP = new ColumnPropertyInfoCache(TYPE, "NumEmployees");
    ColumnPropertyInfoCache SPECIFICDISEASELOADED_PROP = new ColumnPropertyInfoCache(TYPE, "SpecificDiseaseLoaded");
    ColumnPropertyInfoCache SUPPLEMENTALDISEASELOADED_PROP = new ColumnPropertyInfoCache(TYPE, "SupplementalDiseaseLoaded");
    ColumnPropertyInfoCache SUPPLEMENTALDISEASELOADINGRATE_PROP = new ColumnPropertyInfoCache(TYPE, "SupplementalDiseaseLoadingRate");
    ColumnPropertyInfoCache CLASSCODERATE_PROP = new ColumnPropertyInfoCache(TYPE, "ClassCodeRate");
    TypekeyPropertyInfoCache GOVERNINGLAW_PROP = new TypekeyPropertyInfoCache(TYPE, "GoverningLaw");
    LinkPropertyInfoCache CLASSCODE_PROP = new LinkPropertyInfoCache(TYPE, "ClassCode");
    LinkPropertyInfoCache LOCATION_PROP = new LinkPropertyInfoCache(TYPE, "Location");
    LinkPropertyInfoCache WC7WORKERSCOMPLINE_PROP = new LinkPropertyInfoCache(TYPE, "WC7WorkersCompLine");
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
    extensions.pc.policy.typekey.WC7CoveredEmployeeBase getSubtype();

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
     * Gets the value of the NumEmployees field.
     * Number of employees
     * 
     */
    Integer getNumEmployees();

    /**
     * Sets the value of the NumEmployees field.
     * 
     */
    void setNumEmployees(Integer value);

    /**
     * Gets the value of the SpecificDiseaseLoaded field.
     * Option to indicate that coverage is specific disease loaded
     * 
     */
    Boolean isSpecificDiseaseLoaded();

    /**
     * Sets the value of the SpecificDiseaseLoaded field.
     * 
     */
    void setSpecificDiseaseLoaded(Boolean value);

    /**
     * Gets the value of the SupplementalDiseaseLoaded field.
     * Option to indicate that coverage is supplemental disease loaded
     * 
     */
    Boolean isSupplementalDiseaseLoaded();

    /**
     * Sets the value of the SupplementalDiseaseLoaded field.
     * 
     */
    void setSupplementalDiseaseLoaded(Boolean value);

    /**
     * Gets the value of the SupplementalDiseaseLoadingRate field.
     * Supplemental Disease Loading Rate
     * 
     */
    BigDecimal getSupplementalDiseaseLoadingRate();

    /**
     * Sets the value of the SupplementalDiseaseLoadingRate field.
     * 
     */
    void setSupplementalDiseaseLoadingRate(BigDecimal value);

    /**
     * Gets the value of the ClassCodeRate field.
     * Rate of Class Code
     * 
     */
    BigDecimal getClassCodeRate();

    /**
     * Sets the value of the ClassCodeRate field.
     * 
     */
    void setClassCodeRate(BigDecimal value);

    /**
     * Gets the value of the GoverningLaw field.
     * Special Coverage Class for this set of employees
     * 
     */
    WC7GoverningLaw getGoverningLaw();

    /**
     * Sets the value of the GoverningLaw field.
     * 
     */
    void setGoverningLaw(WC7GoverningLaw value);

    /**
     * Gets the value of the ClassCode field.
     * Class Code of covered employees
     * 
     */
    WC7ClassCode getClassCode();

    /**
     * Sets the value of the ClassCode field.
     * 
     */
    void setClassCode(WC7ClassCode value);

    /**
     * Gets the value of the Location field.
     * Location of covered employees.
     * 
     */
    PolicyLocation getLocation();

    /**
     * Sets the value of the Location field.
     * 
     */
    void setLocation(PolicyLocation value);

    /**
     * Gets the value of the WC7WorkersCompLine field.
     * 
     * 
     */
    WC7WorkersCompLine getWC7WorkersCompLine();

    /**
     * Sets the value of the WC7WorkersCompLine field.
     * 
     */
    void setWC7WorkersCompLine(WC7WorkersCompLine value);

    extensions.pc.policy.entity.WC7CoveredEmployeeBase getBasedOn();

    extensions.pc.policy.entity.WC7CoveredEmployeeBase getSlice(Date sliceDate);

    extensions.pc.policy.entity.WC7CoveredEmployeeBase getUnsliced();

    PolicyPeriod getBranch();

    extensions.pc.policy.entity.WC7CoveredEmployeeBase split(Date splitDate);

    extensions.pc.policy.entity.WC7CoveredEmployeeBase clone();

}
