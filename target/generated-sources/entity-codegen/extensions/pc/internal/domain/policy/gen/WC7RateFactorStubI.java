
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7Modifier;
import extensions.pc.policy.entity.WC7RateFactor;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.policy.entity.RateFactor;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7RateFactorStubI
    extends EffDatedCopyable, EffDatedLogicalMatcher, RateFactor, EffDated
{

    EffDatedEntityIntrinsicTypeReference<WC7RateFactor, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7RateFactor, PolicyPeriod>("entity.WC7RateFactor");
    LinkPropertyInfoCache WC7MODIFIER_PROP = new LinkPropertyInfoCache(TYPE, "WC7Modifier");
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
    ColumnPropertyInfoCache ASSESSMENT_PROP = new ColumnPropertyInfoCache(TYPE, "Assessment");
    ColumnPropertyInfoCache JUSTIFICATION_PROP = new ColumnPropertyInfoCache(TYPE, "Justification");
    ColumnPropertyInfoCache PATTERNCODE_PROP = new ColumnPropertyInfoCache(TYPE, "PatternCode");

    /**
     * Gets the value of the WC7Modifier field.
     * 
     * 
     */
    WC7Modifier getWC7Modifier();

    /**
     * Sets the value of the WC7Modifier field.
     * 
     */
    void setWC7Modifier(WC7Modifier value);

    WC7RateFactor getBasedOn();

    WC7RateFactor getSlice(Date sliceDate);

    WC7RateFactor getUnsliced();

    PolicyPeriod getBranch();

    WC7RateFactor split(Date splitDate);

    WC7RateFactor clone();

}
