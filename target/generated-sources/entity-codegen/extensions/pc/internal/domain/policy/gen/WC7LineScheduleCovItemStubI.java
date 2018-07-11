
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import com.guidewire.pl.system.entity.SubtypeBean;
import extensions.pc.policy.entity.WC7LineScheduleCov;
import gw.pc.coverage.entity.Coverable;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pc.productmodel.entity.ScheduledItem;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7LineScheduleCovItemStubI
    extends SubtypeBean, Coverable, ScheduledItem, EffDated
{

    EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7LineScheduleCovItem, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7LineScheduleCovItem, PolicyPeriod>("entity.WC7LineScheduleCovItem");
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
    ColumnPropertyInfoCache INITIALCOVERAGESCREATED_PROP = new ColumnPropertyInfoCache(TYPE, "InitialCoveragesCreated");
    ColumnPropertyInfoCache INITIALEXCLUSIONSCREATED_PROP = new ColumnPropertyInfoCache(TYPE, "InitialExclusionsCreated");
    ColumnPropertyInfoCache INITIALCONDITIONSCREATED_PROP = new ColumnPropertyInfoCache(TYPE, "InitialConditionsCreated");
    TypekeyPropertyInfoCache PREFERREDCOVERAGECURRENCY_PROP = new TypekeyPropertyInfoCache(TYPE, "PreferredCoverageCurrency");

    /**
     * Gets the value of the Subtype field.
     * Auto-generated subtype column
     * 
     */
    extensions.pc.policy.typekey.WC7LineScheduleCovItem getSubtype();

    /**
     * Gets the value of the Schedule field.
     * 
     * 
     */
    WC7LineScheduleCov getSchedule();

    /**
     * Sets the value of the Schedule field.
     * 
     */
    void setSchedule(WC7LineScheduleCov value);

    extensions.pc.policy.entity.WC7LineScheduleCovItem getBasedOn();

    extensions.pc.policy.entity.WC7LineScheduleCovItem getSlice(Date sliceDate);

    extensions.pc.policy.entity.WC7LineScheduleCovItem getUnsliced();

    PolicyPeriod getBranch();

    extensions.pc.policy.entity.WC7LineScheduleCovItem split(Date splitDate);

    extensions.pc.policy.entity.WC7LineScheduleCovItem clone();

}
