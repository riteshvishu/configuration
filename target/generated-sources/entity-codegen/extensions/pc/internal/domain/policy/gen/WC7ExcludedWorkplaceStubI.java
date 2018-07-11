
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7ExcludedWorkplace;
import extensions.pc.policy.entity.WC7WorkersCompExcl;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7ExcludedWorkplaceStubI
    extends EffDatedCopyable, EffDatedLogicalMatcher, EffDated
{

    EffDatedEntityIntrinsicTypeReference<WC7ExcludedWorkplace, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7ExcludedWorkplace, PolicyPeriod>("entity.WC7ExcludedWorkplace");
    ColumnPropertyInfoCache ADDRESSLINE1_PROP = new ColumnPropertyInfoCache(TYPE, "AddressLine1");
    ColumnPropertyInfoCache ADDRESSLINE2_PROP = new ColumnPropertyInfoCache(TYPE, "AddressLine2");
    ColumnPropertyInfoCache CITY_PROP = new ColumnPropertyInfoCache(TYPE, "City");
    ColumnPropertyInfoCache EXCLUDEDITEM_PROP = new ColumnPropertyInfoCache(TYPE, "ExcludedItem");
    TypekeyPropertyInfoCache JURISDICTION_PROP = new TypekeyPropertyInfoCache(TYPE, "Jurisdiction");
    LinkPropertyInfoCache WCLINE_PROP = new LinkPropertyInfoCache(TYPE, "WCLine");
    LinkPropertyInfoCache DESIGNATEDWORKPLACESEXCL_PROP = new LinkPropertyInfoCache(TYPE, "DesignatedWorkplacesExcl");
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
     * Gets the value of the AddressLine1 field.
     * 
     * 
     */
    String getAddressLine1();

    /**
     * Sets the value of the AddressLine1 field.
     * 
     */
    void setAddressLine1(String value);

    /**
     * Gets the value of the AddressLine2 field.
     * 
     * 
     */
    String getAddressLine2();

    /**
     * Sets the value of the AddressLine2 field.
     * 
     */
    void setAddressLine2(String value);

    /**
     * Gets the value of the City field.
     * 
     * 
     */
    String getCity();

    /**
     * Sets the value of the City field.
     * 
     */
    void setCity(String value);

    /**
     * Gets the value of the ExcludedItem field.
     * 
     * 
     */
    String getExcludedItem();

    /**
     * Sets the value of the ExcludedItem field.
     * 
     */
    void setExcludedItem(String value);

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
     * Gets the value of the DesignatedWorkplacesExcl field.
     * The parent exclusion for workplaces
     * 
     */
    WC7WorkersCompExcl getDesignatedWorkplacesExcl();

    WC7ExcludedWorkplace getBasedOn();

    WC7ExcludedWorkplace getSlice(Date sliceDate);

    WC7ExcludedWorkplace getUnsliced();

    PolicyPeriod getBranch();

    WC7ExcludedWorkplace split(Date splitDate);

    WC7ExcludedWorkplace clone();

}
