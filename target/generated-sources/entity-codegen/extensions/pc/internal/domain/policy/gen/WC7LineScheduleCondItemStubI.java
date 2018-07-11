
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import com.guidewire.pl.system.entity.SubtypeBean;
import extensions.pc.policy.entity.WC7LineScheduleCond;
import extensions.pc.policy.entity.WC7ScheduledItem;
import gw.pc.coverage.entity.Coverable;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pc.productmodel.entity.ScheduledItem;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7LineScheduleCondItemStubI
    extends SubtypeBean, WC7ScheduledItem, Coverable, ScheduledItem, EffDated
{

    EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7LineScheduleCondItem, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7LineScheduleCondItem, PolicyPeriod>("entity.WC7LineScheduleCondItem");
    TypekeyPropertyInfoCache SUBTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "Subtype");
    LinkPropertyInfoCache SCHEDULE_PROP = new LinkPropertyInfoCache(TYPE, "Schedule");
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
    ColumnPropertyInfoCache SCHEDULENUMBER_PROP = new ColumnPropertyInfoCache(TYPE, "ScheduleNumber");
    ColumnPropertyInfoCache STRINGCOL1_PROP = new ColumnPropertyInfoCache(TYPE, "StringCol1");
    ColumnPropertyInfoCache STRINGCOL2_PROP = new ColumnPropertyInfoCache(TYPE, "StringCol2");
    ColumnPropertyInfoCache INTCOL1_PROP = new ColumnPropertyInfoCache(TYPE, "IntCol1");
    ColumnPropertyInfoCache POSINTCOL1_PROP = new ColumnPropertyInfoCache(TYPE, "PosIntCol1");
    ColumnPropertyInfoCache BOOLCOL1_PROP = new ColumnPropertyInfoCache(TYPE, "BoolCol1");
    ColumnPropertyInfoCache BOOLCOL2_PROP = new ColumnPropertyInfoCache(TYPE, "BoolCol2");
    ColumnPropertyInfoCache DATECOL1_PROP = new ColumnPropertyInfoCache(TYPE, "DateCol1");
    ColumnPropertyInfoCache TYPEKEYCOL1_PROP = new ColumnPropertyInfoCache(TYPE, "TypeKeyCol1");
    ColumnPropertyInfoCache TYPEKEYCOL2_PROP = new ColumnPropertyInfoCache(TYPE, "TypeKeyCol2");
    ColumnPropertyInfoCache REFERENCEDATEINTERNAL_PROP = new ColumnPropertyInfoCache(TYPE, "ReferenceDateInternal");
    LinkPropertyInfoCache NAMEDINSURED_PROP = new LinkPropertyInfoCache(TYPE, "NamedInsured");
    ColumnPropertyInfoCache STRINGCOL3_PROP = new ColumnPropertyInfoCache(TYPE, "StringCol3");
    ColumnPropertyInfoCache STRINGCOL4_PROP = new ColumnPropertyInfoCache(TYPE, "StringCol4");
    ColumnPropertyInfoCache INTCOL2_PROP = new ColumnPropertyInfoCache(TYPE, "IntCol2");
    ColumnPropertyInfoCache INITIALCOVERAGESCREATED_PROP = new ColumnPropertyInfoCache(TYPE, "InitialCoveragesCreated");
    ColumnPropertyInfoCache INITIALEXCLUSIONSCREATED_PROP = new ColumnPropertyInfoCache(TYPE, "InitialExclusionsCreated");
    ColumnPropertyInfoCache INITIALCONDITIONSCREATED_PROP = new ColumnPropertyInfoCache(TYPE, "InitialConditionsCreated");
    TypekeyPropertyInfoCache PREFERREDCOVERAGECURRENCY_PROP = new TypekeyPropertyInfoCache(TYPE, "PreferredCoverageCurrency");

    /**
     * Gets the value of the Subtype field.
     * Auto-generated subtype column
     * 
     */
    extensions.pc.policy.typekey.WC7LineScheduleCondItem getSubtype();

    /**
     * Gets the value of the Schedule field.
     * 
     * 
     */
    WC7LineScheduleCond getSchedule();

    /**
     * Sets the value of the Schedule field.
     * 
     */
    void setSchedule(WC7LineScheduleCond value);

    extensions.pc.policy.entity.WC7LineScheduleCondItem getBasedOn();

    extensions.pc.policy.entity.WC7LineScheduleCondItem getSlice(Date sliceDate);

    extensions.pc.policy.entity.WC7LineScheduleCondItem getUnsliced();

    PolicyPeriod getBranch();

    extensions.pc.policy.entity.WC7LineScheduleCondItem split(Date splitDate);

    extensions.pc.policy.entity.WC7LineScheduleCondItem clone();

}
