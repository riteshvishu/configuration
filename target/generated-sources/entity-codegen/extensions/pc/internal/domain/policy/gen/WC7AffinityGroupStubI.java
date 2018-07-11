
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7AffinityGroup;
import extensions.pc.policy.entity.WC7AffinityGroupJurisdiction;
import extensions.pc.policy.entity.WC7AffinityGroupProducerCode;
import extensions.pc.policy.entity.WC7AffinityGroupProduct;
import extensions.pc.policy.typekey.WC7AffinityGroupType;
import gw.pl.community.entity.Organization;
import gw.pl.persistence.core.entity.Retireable;

public interface WC7AffinityGroupStubI
    extends Retireable
{

    EntityIntrinsicTypeReference<WC7AffinityGroup> TYPE = new EntityIntrinsicTypeReference<WC7AffinityGroup>("entity.WC7AffinityGroup");
    ColumnPropertyInfoCache NAME_PROP = new ColumnPropertyInfoCache(TYPE, "Name");
    ColumnPropertyInfoCache NAMEDENORM_PROP = new ColumnPropertyInfoCache(TYPE, "NameDenorm");
    TypekeyPropertyInfoCache AFFINITYGROUPTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "AffinityGroupType");
    LinkPropertyInfoCache ORGANIZATION_PROP = new LinkPropertyInfoCache(TYPE, "Organization");
    ColumnPropertyInfoCache PRIMARYCONTACTFIRSTNAME_PROP = new ColumnPropertyInfoCache(TYPE, "PrimaryContactFirstName");
    ColumnPropertyInfoCache PRIMARYCONTACTFIRSTNAMEDENORM_PROP = new ColumnPropertyInfoCache(TYPE, "PrimaryContactFirstNameDenorm");
    ColumnPropertyInfoCache PRIMARYCONTACTLASTNAME_PROP = new ColumnPropertyInfoCache(TYPE, "PrimaryContactLastName");
    ColumnPropertyInfoCache PRIMARYCONTACTLASTNAMEDENORM_PROP = new ColumnPropertyInfoCache(TYPE, "PrimaryContactLastNameDenorm");
    ColumnPropertyInfoCache PRIMARYCONTACTPHONE_PROP = new ColumnPropertyInfoCache(TYPE, "PrimaryContactPhone");
    ColumnPropertyInfoCache STARTDATE_PROP = new ColumnPropertyInfoCache(TYPE, "StartDate");
    ColumnPropertyInfoCache ENDDATE_PROP = new ColumnPropertyInfoCache(TYPE, "EndDate");
    ColumnPropertyInfoCache DESCRIPTION_PROP = new ColumnPropertyInfoCache(TYPE, "Description");
    ArrayPropertyInfoCache JURISDICTIONS_PROP = new ArrayPropertyInfoCache(TYPE, "Jurisdictions");
    ArrayPropertyInfoCache AFFINITYGROUPPRODUCERCODES_PROP = new ArrayPropertyInfoCache(TYPE, "AffinityGroupProducerCodes");
    ArrayPropertyInfoCache PRODUCTS_PROP = new ArrayPropertyInfoCache(TYPE, "Products");
    ColumnPropertyInfoCache RETIREDVALUE_PROP = new ColumnPropertyInfoCache(TYPE, "RetiredValue");
    ColumnPropertyInfoCache CREATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "CreateTime");
    ColumnPropertyInfoCache UPDATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "UpdateTime");
    LinkPropertyInfoCache CREATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "CreateUser");
    LinkPropertyInfoCache UPDATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "UpdateUser");
    ColumnPropertyInfoCache BEANVERSION_PROP = new ColumnPropertyInfoCache(TYPE, "BeanVersion");
    ColumnPropertyInfoCache ID_PROP = new ColumnPropertyInfoCache(TYPE, "ID");
    ColumnPropertyInfoCache PUBLICID_PROP = new ColumnPropertyInfoCache(TYPE, "PublicID");

    /**
     * Gets the value of the Name field.
     * The name of affinity group.
     * 
     */
    String getName();

    /**
     * Sets the value of the Name field.
     * 
     */
    void setName(String value);

    /**
     * Gets the value of the AffinityGroupType field.
     * Type of group
     * 
     */
    WC7AffinityGroupType getAffinityGroupType();

    /**
     * Sets the value of the AffinityGroupType field.
     * 
     */
    void setAffinityGroupType(WC7AffinityGroupType value);

    /**
     * Gets the value of the Organization field.
     * The Organization that this group belongs to.
     * 
     */
    Organization getOrganization();

    /**
     * Sets the value of the Organization field.
     * 
     */
    void setOrganization(Organization value);

    /**
     * Gets the value of the PrimaryContactFirstName field.
     * First name of primary contact.
     * 
     */
    String getPrimaryContactFirstName();

    /**
     * Sets the value of the PrimaryContactFirstName field.
     * 
     */
    void setPrimaryContactFirstName(String value);

    /**
     * Gets the value of the PrimaryContactLastName field.
     * Last name of primary contact.
     * 
     */
    String getPrimaryContactLastName();

    /**
     * Sets the value of the PrimaryContactLastName field.
     * 
     */
    void setPrimaryContactLastName(String value);

    /**
     * Gets the value of the PrimaryContactPhone field.
     * Phone number of primary contact.
     * 
     */
    String getPrimaryContactPhone();

    /**
     * Sets the value of the PrimaryContactPhone field.
     * 
     */
    void setPrimaryContactPhone(String value);

    /**
     * Gets the value of the StartDate field.
     * Affinity group start date
     * 
     */
    Date getStartDate();

    /**
     * Sets the value of the StartDate field.
     * 
     */
    void setStartDate(Date value);

    /**
     * Gets the value of the EndDate field.
     * Affinity group end date
     * 
     */
    Date getEndDate();

    /**
     * Sets the value of the EndDate field.
     * 
     */
    void setEndDate(Date value);

    /**
     * Gets the value of the Description field.
     * Description of the affinity group
     * 
     */
    String getDescription();

    /**
     * Sets the value of the Description field.
     * 
     */
    void setDescription(String value);

    /**
     * Gets the value of the Jurisdictions field.
     * Jurisdictions that this affinity group is available to.
     * 
     */
    WC7AffinityGroupJurisdiction[] getJurisdictions();

    /**
     * Adds the given element to the Jurisdictions array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToJurisdictions(WC7AffinityGroupJurisdiction value);

    /**
     * Removes the given element from the Jurisdictions array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromJurisdictions(WC7AffinityGroupJurisdiction value);

    /**
     * Gets the value of the AffinityGroupProducerCodes field.
     * Producer Codes that this affinity group is available to.
     * 
     */
    WC7AffinityGroupProducerCode[] getAffinityGroupProducerCodes();

    /**
     * Adds the given element to the AffinityGroupProducerCodes array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToAffinityGroupProducerCodes(WC7AffinityGroupProducerCode value);

    /**
     * Removes the given element from the AffinityGroupProducerCodes array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromAffinityGroupProducerCodes(WC7AffinityGroupProducerCode value);

    /**
     * Gets the value of the Products field.
     * Products associated with this Affinity Group.
     * 
     */
    WC7AffinityGroupProduct[] getProducts();

    /**
     * Adds the given element to the Products array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToProducts(WC7AffinityGroupProduct value);

    /**
     * Removes the given element from the Products array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromProducts(WC7AffinityGroupProduct value);

}
