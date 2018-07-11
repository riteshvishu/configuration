
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7CededPremium;
import extensions.pc.policy.entity.WC7CededPremiumHistory;
import gw.pc.reinsurance.entity.RICededPremiumHistory;
import gw.pl.persistence.core.entity.Retireable;

public interface WC7CededPremiumHistoryStubI
    extends RICededPremiumHistory, Retireable
{

    EntityIntrinsicTypeReference<WC7CededPremiumHistory> TYPE = new EntityIntrinsicTypeReference<WC7CededPremiumHistory>("entity.WC7CededPremiumHistory");
    LinkPropertyInfoCache WC7CEDEDPREMIUM_PROP = new LinkPropertyInfoCache(TYPE, "WC7CededPremium");
    ColumnPropertyInfoCache RETIREDVALUE_PROP = new ColumnPropertyInfoCache(TYPE, "RetiredValue");
    ColumnPropertyInfoCache CREATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "CreateTime");
    ColumnPropertyInfoCache UPDATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "UpdateTime");
    LinkPropertyInfoCache CREATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "CreateUser");
    LinkPropertyInfoCache UPDATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "UpdateUser");
    ColumnPropertyInfoCache BEANVERSION_PROP = new ColumnPropertyInfoCache(TYPE, "BeanVersion");
    ColumnPropertyInfoCache ID_PROP = new ColumnPropertyInfoCache(TYPE, "ID");
    ColumnPropertyInfoCache PUBLICID_PROP = new ColumnPropertyInfoCache(TYPE, "PublicID");
    ColumnPropertyInfoCache DATEOFRECALCULATION_PROP = new ColumnPropertyInfoCache(TYPE, "DateOfRecalculation");
    ColumnPropertyInfoCache COMMENTTEXT_PROP = new ColumnPropertyInfoCache(TYPE, "CommentText");
    TypekeyPropertyInfoCache REASON_PROP = new TypekeyPropertyInfoCache(TYPE, "Reason");
    ColumnPropertyInfoCache ARCHIVEPARTITION_PROP = new ColumnPropertyInfoCache(TYPE, "ArchivePartition");

    /**
     * Gets the value of the WC7CededPremium field.
     * 
     * 
     */
    WC7CededPremium getWC7CededPremium();

    /**
     * Sets the value of the WC7CededPremium field.
     * 
     */
    void setWC7CededPremium(WC7CededPremium value);

}
