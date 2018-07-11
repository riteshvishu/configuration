
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7ClassCode;
import extensions.pc.policy.entity.WC7WaiverOfSubro;
import extensions.pc.policy.entity.WC7WaiverOfSubroCost;
import extensions.pc.policy.entity.WC7WorkersCompCond;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import extensions.pc.policy.typekey.WC7GoverningLaw;
import extensions.pc.policy.typekey.WC7WaiverOfSubrogation;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.policy.audit.entity.Auditable;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7WaiverOfSubroStubI
    extends EffDatedCopyable, EffDatedLogicalMatcher, Auditable, EffDated
{

    EffDatedEntityIntrinsicTypeReference<WC7WaiverOfSubro, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7WaiverOfSubro, PolicyPeriod>("entity.WC7WaiverOfSubro");
    LinkPropertyInfoCache WAIVERCONDITION_PROP = new LinkPropertyInfoCache(TYPE, "WaiverCondition");
    ColumnPropertyInfoCache BASISAMOUNT_PROP = new ColumnPropertyInfoCache(TYPE, "BasisAmount");
    ColumnPropertyInfoCache DESCRIPTION_PROP = new ColumnPropertyInfoCache(TYPE, "Description");
    ColumnPropertyInfoCache IFANYEXPOSURE_PROP = new ColumnPropertyInfoCache(TYPE, "IfAnyExposure");
    ColumnPropertyInfoCache JOBID_PROP = new ColumnPropertyInfoCache(TYPE, "JobID");
    ColumnPropertyInfoCache NUMEMPLOYEES_PROP = new ColumnPropertyInfoCache(TYPE, "NumEmployees");
    ColumnPropertyInfoCache SPECIFICDISEASELOADED_PROP = new ColumnPropertyInfoCache(TYPE, "SpecificDiseaseLoaded");
    TypekeyPropertyInfoCache GOVERNINGLAW_PROP = new TypekeyPropertyInfoCache(TYPE, "GoverningLaw");
    TypekeyPropertyInfoCache JURISDICTION_PROP = new TypekeyPropertyInfoCache(TYPE, "Jurisdiction");
    TypekeyPropertyInfoCache TYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "Type");
    LinkPropertyInfoCache CLASSCODE_PROP = new LinkPropertyInfoCache(TYPE, "ClassCode");
    LinkPropertyInfoCache WCLINE_PROP = new LinkPropertyInfoCache(TYPE, "WCLine");
    ArrayPropertyInfoCache WAIVEROFSUBROCOSTS_PROP = new ArrayPropertyInfoCache(TYPE, "WaiverOfSubroCosts");
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
     * Gets the value of the WaiverCondition field.
     * The parent condition for waivers
     * 
     */
    WC7WorkersCompCond getWaiverCondition();

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
     * Gets the value of the Description field.
     * Description
     * 
     */
    String getDescription();

    /**
     * Sets the value of the Description field.
     * 
     */
    void setDescription(String value);

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
     * Gets the value of the JobID field.
     * The job identifier
     * 
     */
    String getJobID();

    /**
     * Sets the value of the JobID field.
     * 
     */
    void setJobID(String value);

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
     * Gets the value of the Jurisdiction field.
     * 
     * 
     */
    Jurisdiction getJurisdiction();

    /**
     * Sets the value of the Jurisdiction field.
     * 
     */
    void setJurisdiction(Jurisdiction value);

    /**
     * Gets the value of the Type field.
     * The type of waiver of subro.
     * 
     */
    WC7WaiverOfSubrogation getType();

    /**
     * Sets the value of the Type field.
     * 
     */
    void setType(WC7WaiverOfSubrogation value);

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

    /**
     * Gets the value of the WaiverOfSubroCosts field.
     * 
     * 
     */
    WC7WaiverOfSubroCost[] getWaiverOfSubroCosts();

    /**
     * Adds the given element to the WaiverOfSubroCosts array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWaiverOfSubroCosts(WC7WaiverOfSubroCost value);

    /**
     * Removes the given element from the WaiverOfSubroCosts array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWaiverOfSubroCosts(WC7WaiverOfSubroCost value);

    WC7WaiverOfSubro getBasedOn();

    WC7WaiverOfSubro getSlice(Date sliceDate);

    WC7WaiverOfSubro getUnsliced();

    PolicyPeriod getBranch();

    WC7WaiverOfSubro split(Date splitDate);

    WC7WaiverOfSubro clone();

}
