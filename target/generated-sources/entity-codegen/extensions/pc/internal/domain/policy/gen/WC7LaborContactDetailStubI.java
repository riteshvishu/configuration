
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import com.guidewire.pl.system.entity.SubtypeBean;
import extensions.pc.policy.entity.WC7LaborContact;
import gw.api.copier.EffDatedCopyable;
import gw.api.domain.account.Mergeable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.contact.typekey.OrganizationType;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7LaborContactDetailStubI
    extends SubtypeBean, EffDatedCopyable, Mergeable, EffDatedLogicalMatcher, EffDated
{

    EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7LaborContactDetail, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7LaborContactDetail, PolicyPeriod>("entity.WC7LaborContactDetail");
    TypekeyPropertyInfoCache SUBTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "Subtype");
    ColumnPropertyInfoCache WORKLOCATION_PROP = new ColumnPropertyInfoCache(TYPE, "WorkLocation");
    ColumnPropertyInfoCache DESCRIPTIONOFDUTIES_PROP = new ColumnPropertyInfoCache(TYPE, "DescriptionOfDuties");
    ColumnPropertyInfoCache NUMBEROFEMPLOYEES_PROP = new ColumnPropertyInfoCache(TYPE, "NumberOfEmployees");
    ColumnPropertyInfoCache CONTRACTEFFECTIVEDATE_PROP = new ColumnPropertyInfoCache(TYPE, "ContractEffectiveDate");
    ColumnPropertyInfoCache CONTRACTEXPIRATIONDATE_PROP = new ColumnPropertyInfoCache(TYPE, "ContractExpirationDate");
    ColumnPropertyInfoCache CONTRACTPROJECT_PROP = new ColumnPropertyInfoCache(TYPE, "ContractProject");
    ColumnPropertyInfoCache LABORCONTRACTORPOLICYNUMBER_PROP = new ColumnPropertyInfoCache(TYPE, "LaborContractorPolicyNumber");
    TypekeyPropertyInfoCache JURISDICTION_PROP = new TypekeyPropertyInfoCache(TYPE, "Jurisdiction");
    TypekeyPropertyInfoCache ENTITYSTATUS_PROP = new TypekeyPropertyInfoCache(TYPE, "EntityStatus");
    LinkPropertyInfoCache WC7LABORCONTACT_PROP = new LinkPropertyInfoCache(TYPE, "WC7LaborContact");
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

    /**
     * Gets the value of the Subtype field.
     * Auto-generated subtype column
     * 
     */
    extensions.pc.policy.typekey.WC7LaborContactDetail getSubtype();

    /**
     * Gets the value of the WorkLocation field.
     * The address at which the employees are working
     * 
     */
    String getWorkLocation();

    /**
     * Sets the value of the WorkLocation field.
     * 
     */
    void setWorkLocation(String value);

    /**
     * Gets the value of the DescriptionOfDuties field.
     * Description of Duties
     * 
     */
    String getDescriptionOfDuties();

    /**
     * Sets the value of the DescriptionOfDuties field.
     * 
     */
    void setDescriptionOfDuties(String value);

    /**
     * Gets the value of the NumberOfEmployees field.
     * Number of employees
     * 
     */
    Integer getNumberOfEmployees();

    /**
     * Sets the value of the NumberOfEmployees field.
     * 
     */
    void setNumberOfEmployees(Integer value);

    /**
     * Gets the value of the ContractEffectiveDate field.
     * Effective Date
     * 
     */
    Date getContractEffectiveDate();

    /**
     * Sets the value of the ContractEffectiveDate field.
     * 
     */
    void setContractEffectiveDate(Date value);

    /**
     * Gets the value of the ContractExpirationDate field.
     * Expiration Date
     * 
     */
    Date getContractExpirationDate();

    /**
     * Sets the value of the ContractExpirationDate field.
     * 
     */
    void setContractExpirationDate(Date value);

    /**
     * Gets the value of the ContractProject field.
     * Contract or Project
     * 
     */
    String getContractProject();

    /**
     * Sets the value of the ContractProject field.
     * 
     */
    void setContractProject(String value);

    /**
     * Gets the value of the LaborContractorPolicyNumber field.
     * 
     * 
     */
    String getLaborContractorPolicyNumber();

    /**
     * Sets the value of the LaborContractorPolicyNumber field.
     * 
     */
    void setLaborContractorPolicyNumber(String value);

    /**
     * Gets the value of the Jurisdiction field.
     * The jurisdiction in which this contact is defined
     * 
     */
    Jurisdiction getJurisdiction();

    /**
     * Sets the value of the Jurisdiction field.
     * 
     */
    void setJurisdiction(Jurisdiction value);

    /**
     * Gets the value of the EntityStatus field.
     * Entity status
     * 
     */
    OrganizationType getEntityStatus();

    /**
     * Sets the value of the EntityStatus field.
     * 
     */
    void setEntityStatus(OrganizationType value);

    /**
     * Gets the value of the WC7LaborContact field.
     * 
     * 
     */
    WC7LaborContact getWC7LaborContact();

    /**
     * Sets the value of the WC7LaborContact field.
     * 
     */
    void setWC7LaborContact(WC7LaborContact value);

    extensions.pc.policy.entity.WC7LaborContactDetail getBasedOn();

    extensions.pc.policy.entity.WC7LaborContactDetail getSlice(Date sliceDate);

    extensions.pc.policy.entity.WC7LaborContactDetail getUnsliced();

    PolicyPeriod getBranch();

    extensions.pc.policy.entity.WC7LaborContactDetail split(Date splitDate);

    extensions.pc.policy.entity.WC7LaborContactDetail clone();

}
