
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import com.guidewire.pl.system.entity.SubtypeBean;
import extensions.pc.policy.entity.WC7Cost;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pc.rating.worksheet.entity.RatingWorksheet;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7RatingWorksheetStubI
    extends SubtypeBean, RatingWorksheet, EffDated
{

    EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7RatingWorksheet, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7RatingWorksheet, PolicyPeriod>("entity.WC7RatingWorksheet");
    TypekeyPropertyInfoCache SUBTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "Subtype");
    LinkPropertyInfoCache WC7COST_PROP = new LinkPropertyInfoCache(TYPE, "WC7Cost");
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
    ColumnPropertyInfoCache TEXTDATA_PROP = new ColumnPropertyInfoCache(TYPE, "TextData");

    /**
     * Gets the value of the Subtype field.
     * Auto-generated subtype column
     * 
     */
    extensions.pc.policy.typekey.WC7RatingWorksheet getSubtype();

    /**
     * Gets the value of the WC7Cost field.
     * 
     * 
     */
    WC7Cost getWC7Cost();

    /**
     * Sets the value of the WC7Cost field.
     * 
     */
    void setWC7Cost(WC7Cost value);

    extensions.pc.policy.entity.WC7RatingWorksheet getBasedOn();

    extensions.pc.policy.entity.WC7RatingWorksheet getSlice(Date sliceDate);

    extensions.pc.policy.entity.WC7RatingWorksheet getUnsliced();

    PolicyPeriod getBranch();

    extensions.pc.policy.entity.WC7RatingWorksheet split(Date splitDate);

    extensions.pc.policy.entity.WC7RatingWorksheet clone();

}
