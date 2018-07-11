
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7Jurisdiction;
import extensions.pc.policy.entity.WC7RatingPeriodStartDate;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pc.policy.typekey.RPSDType;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7RatingPeriodStartDateStubI
    extends EffDated
{

    EffDatedEntityIntrinsicTypeReference<WC7RatingPeriodStartDate, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7RatingPeriodStartDate, PolicyPeriod>("entity.WC7RatingPeriodStartDate");
    ColumnPropertyInfoCache STARTDATE_PROP = new ColumnPropertyInfoCache(TYPE, "StartDate");
    TypekeyPropertyInfoCache TYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "Type");
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
     * Date this rating period takes effect.
     * 
     */
    Date getStartDate();

    /**
     * Sets the value of the StartDate field.
     * 
     */
    void setStartDate(Date value);

    /**
     * Gets the value of the Type field.
     * The type of RPSD (anniversary date, forced re-rate, etc)
     * 
     */
    RPSDType getType();

    /**
     * Sets the value of the Type field.
     * 
     */
    void setType(RPSDType value);

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

    WC7RatingPeriodStartDate getBasedOn();

    WC7RatingPeriodStartDate getSlice(Date sliceDate);

    WC7RatingPeriodStartDate getUnsliced();

    PolicyPeriod getBranch();

    WC7RatingPeriodStartDate split(Date splitDate);

    WC7RatingPeriodStartDate clone();

}
