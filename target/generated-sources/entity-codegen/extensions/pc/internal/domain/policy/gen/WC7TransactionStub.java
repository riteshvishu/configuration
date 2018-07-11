
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import com.guidewire.pc.domain.financials.impl.TransactionInternal;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7Cost;
import extensions.pc.policy.entity.WC7Transaction;
import gw.pc.currency.entity.PolicyFXRate;
import gw.pc.financials.entity.Cost;
import gw.pc.financials.entity.Transaction;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.currency.MonetaryAmount;
import gw.pl.currency.typekey.Currency;
import gw.pl.extract.entity.Extractable;
import gw.pl.persistence.core.Key;

public abstract class WC7TransactionStub
    extends EffDatedBeanProxy
    implements WC7TransactionInternalStubI
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
    public WC7Transaction getBasedOn() {
        return ((WC7Transaction) getBasedOnUntyped());
    }

    @Override
    public WC7Transaction getSlice(Date sliceDate) {
        return ((WC7Transaction) getSliceUntyped(sliceDate));
    }

    @Override
    public WC7Transaction getUnsliced() {
        return ((WC7Transaction) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public WC7Transaction split(Date splitDate) {
        return ((WC7Transaction) splitUntyped(splitDate));
    }

    @Override
    public WC7Transaction clone() {
        return ((WC7Transaction) cloneUntyped());
    }

    @Override
    public Long getArchivePartition() {
        return ((ExtractableInternal) getEntityDelegate(Extractable.class)).getArchivePartition();
    }

    @Override
    public void setArchivePartition(Long value) {
        ((ExtractableInternal) getEntityDelegate(Extractable.class)).setArchivePartition(value);
    }

    @Override
    public MonetaryAmount getAmount() {
        return ((TransactionInternal) getEntityDelegate(Transaction.class)).getAmount();
    }

    @Override
    public void setAmount(MonetaryAmount value) {
        ((TransactionInternal) getEntityDelegate(Transaction.class)).setAmount(value);
    }

    @Override
    public BigDecimal getAmount_amt() {
        return ((TransactionInternal) getEntityDelegate(Transaction.class)).getAmount_amt();
    }

    @Override
    public void setAmount_amt(BigDecimal value) {
        ((TransactionInternal) getEntityDelegate(Transaction.class)).setAmount_amt(value);
    }

    @Override
    public Currency getAmount_cur() {
        return ((TransactionInternal) getEntityDelegate(Transaction.class)).getAmount_cur();
    }

    @Override
    public void setAmount_cur(Currency value) {
        ((TransactionInternal) getEntityDelegate(Transaction.class)).setAmount_cur(value);
    }

    @Override
    public MonetaryAmount getAmountBilling() {
        return ((TransactionInternal) getEntityDelegate(Transaction.class)).getAmountBilling();
    }

    @Override
    public void setAmountBilling(MonetaryAmount value) {
        ((TransactionInternal) getEntityDelegate(Transaction.class)).setAmountBilling(value);
    }

    @Override
    public BigDecimal getAmountBilling_amt() {
        return ((TransactionInternal) getEntityDelegate(Transaction.class)).getAmountBilling_amt();
    }

    @Override
    public void setAmountBilling_amt(BigDecimal value) {
        ((TransactionInternal) getEntityDelegate(Transaction.class)).setAmountBilling_amt(value);
    }

    @Override
    public Currency getAmountBilling_cur() {
        return ((TransactionInternal) getEntityDelegate(Transaction.class)).getAmountBilling_cur();
    }

    @Override
    public void setAmountBilling_cur(Currency value) {
        ((TransactionInternal) getEntityDelegate(Transaction.class)).setAmountBilling_cur(value);
    }

    @Override
    public Date getEffDate() {
        return ((TransactionInternal) getEntityDelegate(Transaction.class)).getEffDate();
    }

    @Override
    public void setEffDate(Date value) {
        ((TransactionInternal) getEntityDelegate(Transaction.class)).setEffDate(value);
    }

    @Override
    public Date getExpDate() {
        return ((TransactionInternal) getEntityDelegate(Transaction.class)).getExpDate();
    }

    @Override
    public void setExpDate(Date value) {
        ((TransactionInternal) getEntityDelegate(Transaction.class)).setExpDate(value);
    }

    @Override
    public Boolean isWritten() {
        return ((TransactionInternal) getEntityDelegate(Transaction.class)).isWritten();
    }

    @Override
    public void setWritten(Boolean value) {
        ((TransactionInternal) getEntityDelegate(Transaction.class)).setWritten(value);
    }

    @Override
    public Boolean isCharged() {
        return ((TransactionInternal) getEntityDelegate(Transaction.class)).isCharged();
    }

    @Override
    public void setCharged(Boolean value) {
        ((TransactionInternal) getEntityDelegate(Transaction.class)).setCharged(value);
    }

    @Override
    public Boolean isToBeAccrued() {
        return ((TransactionInternal) getEntityDelegate(Transaction.class)).isToBeAccrued();
    }

    @Override
    public void setToBeAccrued(Boolean value) {
        ((TransactionInternal) getEntityDelegate(Transaction.class)).setToBeAccrued(value);
    }

    @Override
    public Date getPostedDate() {
        return ((TransactionInternal) getEntityDelegate(Transaction.class)).getPostedDate();
    }

    @Override
    public void setPostedDate(Date value) {
        ((TransactionInternal) getEntityDelegate(Transaction.class)).setPostedDate(value);
    }

    @Override
    public Date getWrittenDate() {
        return ((TransactionInternal) getEntityDelegate(Transaction.class)).getWrittenDate();
    }

    @Override
    public void setWrittenDate(Date value) {
        ((TransactionInternal) getEntityDelegate(Transaction.class)).setWrittenDate(value);
    }

    @Override
    public PolicyFXRate getPolicyFXRate() {
        return ((TransactionInternal) getEntityDelegate(Transaction.class)).getPolicyFXRate();
    }

    @Override
    public void setPolicyFXRate(PolicyFXRate value) {
        ((TransactionInternal) getEntityDelegate(Transaction.class)).setPolicyFXRate(value);
    }

    @Override
    public Key getPolicyFXRateID() {
        return ((TransactionInternal) getEntityDelegate(Transaction.class)).getPolicyFXRateID();
    }

    @Override
    public void setPolicyFXRateID(Key value) {
        ((TransactionInternal) getEntityDelegate(Transaction.class)).setPolicyFXRateID(value);
    }

    @Override
    public Cost getCost() {
        return getEntityDelegate(Transaction.class).getCost();
    }

    @Override
    public boolean isProrated() {
        return getEntityDelegate(Transaction.class).isProrated();
    }

    @Override
    public double getProration() {
        return getEntityDelegate(Transaction.class).getProration();
    }

    @Override
    public boolean merge(Transaction p0) {
        return getEntityDelegate(Transaction.class).merge(p0);
    }

    @Override
    public void removeFromTerm() {
        getEntityDelegate(Transaction.class).removeFromTerm();
    }

    @Override
    public String debugString() {
        return getEntityDelegate(Transaction.class).debugString();
    }

    @Override
    public void setPostedAndWrittenDate(Date p0, PolicyPeriod p1) {
        ((TransactionInternal) getEntityDelegate(Transaction.class)).setPostedAndWrittenDate(p0, p1);
    }

}
