
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.MonetaryAmountPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7CededPremium;
import extensions.pc.policy.entity.WC7CededPremiumHistory;
import extensions.pc.policy.entity.WC7CededPremiumTransaction;
import gw.pc.reinsurance.entity.RICededPremiumTransaction;
import gw.pl.persistence.core.entity.Retireable;

public interface WC7CededPremiumTransactionStubI
    extends RICededPremiumTransaction, Retireable
{

    EntityIntrinsicTypeReference<WC7CededPremiumTransaction> TYPE = new EntityIntrinsicTypeReference<WC7CededPremiumTransaction>("entity.WC7CededPremiumTransaction");
    LinkPropertyInfoCache WC7CEDEDPREMIUM_PROP = new LinkPropertyInfoCache(TYPE, "WC7CededPremium");
    LinkPropertyInfoCache WC7CEDEDPREMIUMHISTORY_PROP = new LinkPropertyInfoCache(TYPE, "WC7CededPremiumHistory");
    ColumnPropertyInfoCache RETIREDVALUE_PROP = new ColumnPropertyInfoCache(TYPE, "RetiredValue");
    ColumnPropertyInfoCache CREATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "CreateTime");
    ColumnPropertyInfoCache UPDATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "UpdateTime");
    LinkPropertyInfoCache CREATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "CreateUser");
    LinkPropertyInfoCache UPDATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "UpdateUser");
    ColumnPropertyInfoCache BEANVERSION_PROP = new ColumnPropertyInfoCache(TYPE, "BeanVersion");
    ColumnPropertyInfoCache ID_PROP = new ColumnPropertyInfoCache(TYPE, "ID");
    ColumnPropertyInfoCache PUBLICID_PROP = new ColumnPropertyInfoCache(TYPE, "PublicID");
    MonetaryAmountPropertyInfoCache CEDEDRISKAMOUNT_PROP = new MonetaryAmountPropertyInfoCache(TYPE, "CededRiskAmount");
    ColumnPropertyInfoCache CEDEDRISKAMOUNT_AMT_PROP = new ColumnPropertyInfoCache(TYPE, "CededRiskAmount_amt");
    TypekeyPropertyInfoCache CEDEDRISKAMOUNT_CUR_PROP = new TypekeyPropertyInfoCache(TYPE, "CededRiskAmount_cur");
    MonetaryAmountPropertyInfoCache BASISGNP_PROP = new MonetaryAmountPropertyInfoCache(TYPE, "BasisGNP");
    ColumnPropertyInfoCache BASISGNP_AMT_PROP = new ColumnPropertyInfoCache(TYPE, "BasisGNP_amt");
    TypekeyPropertyInfoCache BASISGNP_CUR_PROP = new TypekeyPropertyInfoCache(TYPE, "BasisGNP_cur");
    ColumnPropertyInfoCache CEDINGRATE_PROP = new ColumnPropertyInfoCache(TYPE, "CedingRate");
    ColumnPropertyInfoCache COMMISSIONRATE_PROP = new ColumnPropertyInfoCache(TYPE, "CommissionRate");
    ColumnPropertyInfoCache MARKUPRATE_PROP = new ColumnPropertyInfoCache(TYPE, "MarkupRate");
    MonetaryAmountPropertyInfoCache CEDEDPREMIUM_PROP = new MonetaryAmountPropertyInfoCache(TYPE, "CededPremium");
    ColumnPropertyInfoCache CEDEDPREMIUM_AMT_PROP = new ColumnPropertyInfoCache(TYPE, "CededPremium_amt");
    TypekeyPropertyInfoCache CEDEDPREMIUM_CUR_PROP = new TypekeyPropertyInfoCache(TYPE, "CededPremium_cur");
    MonetaryAmountPropertyInfoCache CEDEDPREMIUMMARKUP_PROP = new MonetaryAmountPropertyInfoCache(TYPE, "CededPremiumMarkup");
    ColumnPropertyInfoCache CEDEDPREMIUMMARKUP_AMT_PROP = new ColumnPropertyInfoCache(TYPE, "CededPremiumMarkup_amt");
    TypekeyPropertyInfoCache CEDEDPREMIUMMARKUP_CUR_PROP = new TypekeyPropertyInfoCache(TYPE, "CededPremiumMarkup_cur");
    MonetaryAmountPropertyInfoCache COMMISSION_PROP = new MonetaryAmountPropertyInfoCache(TYPE, "Commission");
    ColumnPropertyInfoCache COMMISSION_AMT_PROP = new ColumnPropertyInfoCache(TYPE, "Commission_amt");
    TypekeyPropertyInfoCache COMMISSION_CUR_PROP = new TypekeyPropertyInfoCache(TYPE, "Commission_cur");
    ColumnPropertyInfoCache CALCULATIONORDER_PROP = new ColumnPropertyInfoCache(TYPE, "CalculationOrder");
    ColumnPropertyInfoCache DATEPOSTED_PROP = new ColumnPropertyInfoCache(TYPE, "DatePosted");
    ColumnPropertyInfoCache DATEWRITTEN_PROP = new ColumnPropertyInfoCache(TYPE, "DateWritten");
    ColumnPropertyInfoCache CALCTIMESTAMP_PROP = new ColumnPropertyInfoCache(TYPE, "CalcTimestamp");
    LinkPropertyInfoCache POLICYFXRATE_PROP = new LinkPropertyInfoCache(TYPE, "PolicyFXRate");
    LinkPropertyInfoCache AGREEMENT_PROP = new LinkPropertyInfoCache(TYPE, "Agreement");
    LinkPropertyInfoCache PROGRAM_PROP = new LinkPropertyInfoCache(TYPE, "Program");
    ColumnPropertyInfoCache EFFECTIVEDATE_PROP = new ColumnPropertyInfoCache(TYPE, "EffectiveDate");
    ColumnPropertyInfoCache EXPIRATIONDATE_PROP = new ColumnPropertyInfoCache(TYPE, "ExpirationDate");
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

    /**
     * Gets the value of the WC7CededPremiumHistory field.
     * 
     * 
     */
    WC7CededPremiumHistory getWC7CededPremiumHistory();

    /**
     * Sets the value of the WC7CededPremiumHistory field.
     * 
     */
    void setWC7CededPremiumHistory(WC7CededPremiumHistory value);

}
