
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7CededPremium;
import extensions.pc.policy.entity.WC7CededPremiumHistory;
import extensions.pc.policy.entity.WC7CededPremiumTransaction;
import extensions.pc.policy.entity.WC7Cost;
import gw.pc.reinsurance.entity.RICededPremium;
import gw.pl.persistence.core.entity.Retireable;

public interface WC7CededPremiumStubI
    extends RICededPremium, Retireable
{

    EntityIntrinsicTypeReference<WC7CededPremium> TYPE = new EntityIntrinsicTypeReference<WC7CededPremium>("entity.WC7CededPremium");
    LinkPropertyInfoCache WC7COST_PROP = new LinkPropertyInfoCache(TYPE, "WC7Cost");
    ArrayPropertyInfoCache CEDINGTRANSACTIONS_PROP = new ArrayPropertyInfoCache(TYPE, "CedingTransactions");
    ArrayPropertyInfoCache CEDINGHISTORY_PROP = new ArrayPropertyInfoCache(TYPE, "CedingHistory");
    ColumnPropertyInfoCache RETIREDVALUE_PROP = new ColumnPropertyInfoCache(TYPE, "RetiredValue");
    ColumnPropertyInfoCache CREATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "CreateTime");
    ColumnPropertyInfoCache UPDATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "UpdateTime");
    LinkPropertyInfoCache CREATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "CreateUser");
    LinkPropertyInfoCache UPDATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "UpdateUser");
    ColumnPropertyInfoCache BEANVERSION_PROP = new ColumnPropertyInfoCache(TYPE, "BeanVersion");
    ColumnPropertyInfoCache ID_PROP = new ColumnPropertyInfoCache(TYPE, "ID");
    ColumnPropertyInfoCache PUBLICID_PROP = new ColumnPropertyInfoCache(TYPE, "PublicID");
    ColumnPropertyInfoCache RISKNUMBER_PROP = new ColumnPropertyInfoCache(TYPE, "RiskNumber");
    ColumnPropertyInfoCache RISKDATE_PROP = new ColumnPropertyInfoCache(TYPE, "RiskDate");
    LinkPropertyInfoCache POLICYTERM_PROP = new LinkPropertyInfoCache(TYPE, "PolicyTerm");
    ColumnPropertyInfoCache EFFECTIVEDATE_PROP = new ColumnPropertyInfoCache(TYPE, "EffectiveDate");
    ColumnPropertyInfoCache EXPIRATIONDATE_PROP = new ColumnPropertyInfoCache(TYPE, "ExpirationDate");
    ColumnPropertyInfoCache ARCHIVEPARTITION_PROP = new ColumnPropertyInfoCache(TYPE, "ArchivePartition");

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

    /**
     * Gets the value of the CedingTransactions field.
     * 
     * 
     */
    WC7CededPremiumTransaction[] getCedingTransactions();

    /**
     * Adds the given element to the CedingTransactions array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToCedingTransactions(WC7CededPremiumTransaction value);

    /**
     * Removes the given element from the CedingTransactions array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromCedingTransactions(WC7CededPremiumTransaction value);

    /**
     * Gets the value of the CedingHistory field.
     * 
     * 
     */
    WC7CededPremiumHistory[] getCedingHistory();

    /**
     * Adds the given element to the CedingHistory array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToCedingHistory(WC7CededPremiumHistory value);

    /**
     * Removes the given element from the CedingHistory array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromCedingHistory(WC7CededPremiumHistory value);

}
