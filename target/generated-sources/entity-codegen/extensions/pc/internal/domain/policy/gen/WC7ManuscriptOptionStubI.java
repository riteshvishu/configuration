
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7ManuscriptOption;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import gw.api.copier.EffDatedCopyable;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7ManuscriptOptionStubI
    extends EffDatedCopyable, EffDated
{

    EffDatedEntityIntrinsicTypeReference<WC7ManuscriptOption, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7ManuscriptOption, PolicyPeriod>("entity.WC7ManuscriptOption");
    ColumnPropertyInfoCache DESCRIPTION_PROP = new ColumnPropertyInfoCache(TYPE, "Description");
    ColumnPropertyInfoCache PREMIUM_PROP = new ColumnPropertyInfoCache(TYPE, "Premium");
    LinkPropertyInfoCache WC7LINE_PROP = new LinkPropertyInfoCache(TYPE, "WC7Line");
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
     * Gets the value of the Description field.
     * The description of the manuscript endorsement
     * 
     */
    String getDescription();

    /**
     * Sets the value of the Description field.
     * 
     */
    void setDescription(String value);

    /**
     * Gets the value of the Premium field.
     * The cost associate with the manuscript endorsement
     * 
     */
    BigDecimal getPremium();

    /**
     * Sets the value of the Premium field.
     * 
     */
    void setPremium(BigDecimal value);

    /**
     * Gets the value of the WC7Line field.
     * 
     * 
     */
    WC7WorkersCompLine getWC7Line();

    /**
     * Sets the value of the WC7Line field.
     * 
     */
    void setWC7Line(WC7WorkersCompLine value);

    WC7ManuscriptOption getBasedOn();

    WC7ManuscriptOption getSlice(Date sliceDate);

    WC7ManuscriptOption getUnsliced();

    PolicyPeriod getBranch();

    WC7ManuscriptOption split(Date splitDate);

    WC7ManuscriptOption clone();

}
