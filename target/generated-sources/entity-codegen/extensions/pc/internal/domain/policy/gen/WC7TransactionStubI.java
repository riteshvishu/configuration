
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.MonetaryAmountPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7Cost;
import extensions.pc.policy.entity.WC7Transaction;
import gw.pc.financials.entity.Transaction;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7TransactionStubI
    extends Transaction, EffDated
{

    EffDatedEntityIntrinsicTypeReference<WC7Transaction, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7Transaction, PolicyPeriod>("entity.WC7Transaction");
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
    MonetaryAmountPropertyInfoCache AMOUNT_PROP = new MonetaryAmountPropertyInfoCache(TYPE, "Amount");
    ColumnPropertyInfoCache AMOUNT_AMT_PROP = new ColumnPropertyInfoCache(TYPE, "Amount_amt");
    TypekeyPropertyInfoCache AMOUNT_CUR_PROP = new TypekeyPropertyInfoCache(TYPE, "Amount_cur");
    MonetaryAmountPropertyInfoCache AMOUNTBILLING_PROP = new MonetaryAmountPropertyInfoCache(TYPE, "AmountBilling");
    ColumnPropertyInfoCache AMOUNTBILLING_AMT_PROP = new ColumnPropertyInfoCache(TYPE, "AmountBilling_amt");
    TypekeyPropertyInfoCache AMOUNTBILLING_CUR_PROP = new TypekeyPropertyInfoCache(TYPE, "AmountBilling_cur");
    ColumnPropertyInfoCache EFFDATE_PROP = new ColumnPropertyInfoCache(TYPE, "EffDate");
    ColumnPropertyInfoCache EXPDATE_PROP = new ColumnPropertyInfoCache(TYPE, "ExpDate");
    ColumnPropertyInfoCache WRITTEN_PROP = new ColumnPropertyInfoCache(TYPE, "Written");
    ColumnPropertyInfoCache CHARGED_PROP = new ColumnPropertyInfoCache(TYPE, "Charged");
    ColumnPropertyInfoCache TOBEACCRUED_PROP = new ColumnPropertyInfoCache(TYPE, "ToBeAccrued");
    ColumnPropertyInfoCache POSTEDDATE_PROP = new ColumnPropertyInfoCache(TYPE, "PostedDate");
    ColumnPropertyInfoCache WRITTENDATE_PROP = new ColumnPropertyInfoCache(TYPE, "WrittenDate");
    LinkPropertyInfoCache POLICYFXRATE_PROP = new LinkPropertyInfoCache(TYPE, "PolicyFXRate");

    /**
     * Gets the value of the WC7Cost field.
     * The cost this transaction modifies.
     * 
     */
    WC7Cost getWC7Cost();

    /**
     * Sets the value of the WC7Cost field.
     * 
     */
    void setWC7Cost(WC7Cost value);

    WC7Transaction getBasedOn();

    WC7Transaction getSlice(Date sliceDate);

    WC7Transaction getUnsliced();

    PolicyPeriod getBranch();

    WC7Transaction split(Date splitDate);

    WC7Transaction clone();

}
