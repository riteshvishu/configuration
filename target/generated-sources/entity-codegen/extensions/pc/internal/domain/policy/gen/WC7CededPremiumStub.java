
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.pc.domain.product.impl.SimpleEffDatedInternal;
import com.guidewire.pc.domain.reinsurance.impl.RICededPremiumInternal;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.AbstractEditableRetireableBeanProxy;
import extensions.pc.policy.entity.WC7CededPremiumHistory;
import extensions.pc.policy.entity.WC7CededPremiumTransaction;
import extensions.pc.policy.entity.WC7Cost;
import gw.api.reinsurance.RICededPremiumAmount;
import gw.pc.financials.entity.Cost;
import gw.pc.policy.period.entity.PolicyTerm;
import gw.pc.product.entity.SimpleEffDated;
import gw.pc.reinsurance.entity.RICededPremium;
import gw.pc.reinsurance.entity.RICededPremiumHistory;
import gw.pc.reinsurance.entity.RICededPremiumTransaction;
import gw.pc.reinsurance.typekey.RIRecalcReason;
import gw.pl.extract.entity.Extractable;
import gw.pl.persistence.core.Bundle;
import gw.pl.persistence.core.Key;

public abstract class WC7CededPremiumStub
    extends AbstractEditableRetireableBeanProxy
    implements WC7CededPremiumInternalStubI
{


    @Override
    public WC7Cost getWC7Cost() {
        return ((WC7Cost) getFieldValue(WC7COST_PROP.get()));
    }

    @Override
    public void setWC7Cost(WC7Cost value) {
        setFieldValue(WC7COST_PROP.get(), value);
    }

    @Override
    public Key getWC7CostID() {
        return ((Key) getRawFieldValue(WC7COST_PROP.get()));
    }

    @Override
    public void setWC7CostID(Key value) {
        setFieldValue(WC7COST_PROP.get(), value);
    }

    @Override
    public WC7CededPremiumTransaction[] getCedingTransactions() {
        return ((WC7CededPremiumTransaction[]) getFieldValue(CEDINGTRANSACTIONS_PROP.get()));
    }

    @Override
    public void addToCedingTransactions(WC7CededPremiumTransaction value) {
        addArrayElement(CEDINGTRANSACTIONS_PROP.get(), value);
    }

    @Override
    public void removeFromCedingTransactions(WC7CededPremiumTransaction value) {
        removeArrayElement(CEDINGTRANSACTIONS_PROP.get(), value);
    }

    @Override
    public WC7CededPremiumHistory[] getCedingHistory() {
        return ((WC7CededPremiumHistory[]) getFieldValue(CEDINGHISTORY_PROP.get()));
    }

    @Override
    public void addToCedingHistory(WC7CededPremiumHistory value) {
        addArrayElement(CEDINGHISTORY_PROP.get(), value);
    }

    @Override
    public void removeFromCedingHistory(WC7CededPremiumHistory value) {
        removeArrayElement(CEDINGHISTORY_PROP.get(), value);
    }

    @Override
    public String getRiskNumber() {
        return ((RICededPremiumInternal) getEntityDelegate(RICededPremium.class)).getRiskNumber();
    }

    @Override
    public void setRiskNumber(String value) {
        ((RICededPremiumInternal) getEntityDelegate(RICededPremium.class)).setRiskNumber(value);
    }

    @Override
    public Date getRiskDate() {
        return ((RICededPremiumInternal) getEntityDelegate(RICededPremium.class)).getRiskDate();
    }

    @Override
    public void setRiskDate(Date value) {
        ((RICededPremiumInternal) getEntityDelegate(RICededPremium.class)).setRiskDate(value);
    }

    @Override
    public PolicyTerm getPolicyTerm() {
        return ((RICededPremiumInternal) getEntityDelegate(RICededPremium.class)).getPolicyTerm();
    }

    @Override
    public void setPolicyTerm(PolicyTerm value) {
        ((RICededPremiumInternal) getEntityDelegate(RICededPremium.class)).setPolicyTerm(value);
    }

    @Override
    public Key getPolicyTermID() {
        return ((RICededPremiumInternal) getEntityDelegate(RICededPremium.class)).getPolicyTermID();
    }

    @Override
    public void setPolicyTermID(Key value) {
        ((RICededPremiumInternal) getEntityDelegate(RICededPremium.class)).setPolicyTermID(value);
    }

    @Override
    public Cost getCost() {
        return getEntityDelegate(RICededPremium.class).getCost();
    }

    @Override
    public RICededPremiumTransaction createCedingTransaction(RICededPremiumAmount p0, RICededPremiumHistory p1, Date p2) {
        return getEntityDelegate(RICededPremium.class).createCedingTransaction(p0, p1, p2);
    }

    @Override
    public RICededPremiumTransaction createOffsetTransaction(RICededPremiumTransaction p0, RICededPremiumHistory p1, Date p2) {
        return getEntityDelegate(RICededPremium.class).createOffsetTransaction(p0, p1, p2);
    }

    @Override
    public RICededPremiumHistory createAndAddHistory(Date p0, RIRecalcReason p1, String p2) {
        return getEntityDelegate(RICededPremium.class).createAndAddHistory(p0, p1, p2);
    }

    @Override
    public RICededPremiumTransaction[] getCedings() {
        return getEntityDelegate(RICededPremium.class).getCedings();
    }

    @Override
    public RICededPremiumHistory[] getHistory() {
        return getEntityDelegate(RICededPremium.class).getHistory();
    }

    @Override
    public RICededPremium addToBundle(Bundle p0) {
        return getEntityDelegate(RICededPremium.class).addToBundle(p0);
    }

    @Override
    public Date getEffectiveDate() {
        return ((SimpleEffDatedInternal) getEntityDelegate(SimpleEffDated.class)).getEffectiveDate();
    }

    @Override
    public void setEffectiveDate(Date value) {
        ((SimpleEffDatedInternal) getEntityDelegate(SimpleEffDated.class)).setEffectiveDate(value);
    }

    @Override
    public Date getExpirationDate() {
        return ((SimpleEffDatedInternal) getEntityDelegate(SimpleEffDated.class)).getExpirationDate();
    }

    @Override
    public void setExpirationDate(Date value) {
        ((SimpleEffDatedInternal) getEntityDelegate(SimpleEffDated.class)).setExpirationDate(value);
    }

    @Override
    public boolean isEffectiveAt(Date p0) {
        return getEntityDelegate(SimpleEffDated.class).isEffectiveAt(p0);
    }

    @Override
    public boolean isEffective(Date p0, Date p1) {
        return getEntityDelegate(SimpleEffDated.class).isEffective(p0, p1);
    }

    @Override
    public boolean isOverlap(SimpleEffDated p0) {
        return getEntityDelegate(SimpleEffDated.class).isOverlap(p0);
    }

    @Override
    public Long getArchivePartition() {
        return ((ExtractableInternal) getEntityDelegate(Extractable.class)).getArchivePartition();
    }

    @Override
    public void setArchivePartition(Long value) {
        ((ExtractableInternal) getEntityDelegate(Extractable.class)).setArchivePartition(value);
    }

}
