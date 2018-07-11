
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7ParticipatingPlan;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import extensions.pc.policy.typekey.WC7ParticipatingPlanID;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7ParticipatingPlanStubI
    extends EffDatedCopyable, EffDatedLogicalMatcher, EffDated
{

    EffDatedEntityIntrinsicTypeReference<WC7ParticipatingPlan, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7ParticipatingPlan, PolicyPeriod>("entity.WC7ParticipatingPlan");
    ColumnPropertyInfoCache LOSSCONVERSIONFACTOR_PROP = new ColumnPropertyInfoCache(TYPE, "LossConversionFactor");
    ColumnPropertyInfoCache RETENTION_PROP = new ColumnPropertyInfoCache(TYPE, "Retention");
    TypekeyPropertyInfoCache PLANID_PROP = new TypekeyPropertyInfoCache(TYPE, "PlanID");
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

    /**
     * Gets the value of the LossConversionFactor field.
     * Loss Conversion Factor
     * 
     */
    BigDecimal getLossConversionFactor();

    /**
     * Sets the value of the LossConversionFactor field.
     * 
     */
    void setLossConversionFactor(BigDecimal value);

    /**
     * Gets the value of the Retention field.
     * The retention amount (percent)
     * 
     */
    BigDecimal getRetention();

    /**
     * Sets the value of the Retention field.
     * 
     */
    void setRetention(BigDecimal value);

    /**
     * Gets the value of the PlanID field.
     * The ID of this participating plan
     * 
     */
    WC7ParticipatingPlanID getPlanID();

    /**
     * Sets the value of the PlanID field.
     * 
     */
    void setPlanID(WC7ParticipatingPlanID value);

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

    WC7ParticipatingPlan getBasedOn();

    WC7ParticipatingPlan getSlice(Date sliceDate);

    WC7ParticipatingPlan getUnsliced();

    PolicyPeriod getBranch();

    WC7ParticipatingPlan split(Date splitDate);

    WC7ParticipatingPlan clone();

}
