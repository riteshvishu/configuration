
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7Jurisdiction;
import extensions.pc.policy.entity.WC7PremiumDiscount;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7PremiumDiscountStubI
    extends EffDated
{

    EffDatedEntityIntrinsicTypeReference<WC7PremiumDiscount, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7PremiumDiscount, PolicyPeriod>("entity.WC7PremiumDiscount");
    ColumnPropertyInfoCache STARTDATE_PROP = new ColumnPropertyInfoCache(TYPE, "StartDate");
    ColumnPropertyInfoCache ENDDATE_PROP = new ColumnPropertyInfoCache(TYPE, "EndDate");
    ColumnPropertyInfoCache DISCOUNTRATE_PROP = new ColumnPropertyInfoCache(TYPE, "DiscountRate");
    LinkPropertyInfoCache WC7JURISDICTION_PROP = new LinkPropertyInfoCache(TYPE, "WC7Jurisdiction");
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
     * Gets the value of the StartDate field.
     * The start date of the rating period that the discount was calculated for.
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
     * The end date of the rating period that the discount was calculated for.
     * 
     */
    Date getEndDate();

    /**
     * Sets the value of the EndDate field.
     * 
     */
    void setEndDate(Date value);

    /**
     * Gets the value of the DiscountRate field.
     * Premium discount rate used for this rating period.
     * 
     */
    BigDecimal getDiscountRate();

    /**
     * Sets the value of the DiscountRate field.
     * 
     */
    void setDiscountRate(BigDecimal value);

    /**
     * Gets the value of the WC7Jurisdiction field.
     * The jurisdiction to which this rating period belongs.
     * 
     */
    WC7Jurisdiction getWC7Jurisdiction();

    /**
     * Sets the value of the WC7Jurisdiction field.
     * 
     */
    void setWC7Jurisdiction(WC7Jurisdiction value);

    WC7PremiumDiscount getBasedOn();

    WC7PremiumDiscount getSlice(Date sliceDate);

    WC7PremiumDiscount getUnsliced();

    PolicyPeriod getBranch();

    WC7PremiumDiscount split(Date splitDate);

    WC7PremiumDiscount clone();

}
