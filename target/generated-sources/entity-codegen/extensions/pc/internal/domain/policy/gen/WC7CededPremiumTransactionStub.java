
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import com.guidewire.pc.domain.product.impl.SimpleEffDatedInternal;
import com.guidewire.pc.domain.reinsurance.impl.RICededPremiumTransactionInternal;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.AbstractEditableRetireableBeanProxy;
import extensions.pc.policy.entity.WC7CededPremium;
import extensions.pc.policy.entity.WC7CededPremiumHistory;
import gw.pc.currency.entity.PolicyFXRate;
import gw.pc.product.entity.SimpleEffDated;
import gw.pc.reinsurance.entity.RIAgreement;
import gw.pc.reinsurance.entity.RICededPremium;
import gw.pc.reinsurance.entity.RICededPremiumHistory;
import gw.pc.reinsurance.entity.RICededPremiumTransaction;
import gw.pc.reinsurance.entity.RIProgram;
import gw.pl.currency.MonetaryAmount;
import gw.pl.currency.typekey.Currency;
import gw.pl.extract.entity.Extractable;
import gw.pl.persistence.core.Key;

public abstract class WC7CededPremiumTransactionStub
    extends AbstractEditableRetireableBeanProxy
    implements WC7CededPremiumTransactionInternalStubI
{


    @Override
    public WC7CededPremium getWC7CededPremium() {
        return ((WC7CededPremium) getFieldValue(WC7CEDEDPREMIUM_PROP.get()));
    }

    @Override
    public void setWC7CededPremium(WC7CededPremium value) {
        setFieldValue(WC7CEDEDPREMIUM_PROP.get(), value);
    }

    @Override
    public Key getWC7CededPremiumID() {
        return ((Key) getRawFieldValue(WC7CEDEDPREMIUM_PROP.get()));
    }

    @Override
    public void setWC7CededPremiumID(Key value) {
        setFieldValue(WC7CEDEDPREMIUM_PROP.get(), value);
    }

    @Override
    public WC7CededPremiumHistory getWC7CededPremiumHistory() {
        return ((WC7CededPremiumHistory) getFieldValue(WC7CEDEDPREMIUMHISTORY_PROP.get()));
    }

    @Override
    public void setWC7CededPremiumHistory(WC7CededPremiumHistory value) {
        setFieldValue(WC7CEDEDPREMIUMHISTORY_PROP.get(), value);
    }

    @Override
    public Key getWC7CededPremiumHistoryID() {
        return ((Key) getRawFieldValue(WC7CEDEDPREMIUMHISTORY_PROP.get()));
    }

    @Override
    public void setWC7CededPremiumHistoryID(Key value) {
        setFieldValue(WC7CEDEDPREMIUMHISTORY_PROP.get(), value);
    }

    @Override
    public MonetaryAmount getCededRiskAmount() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getCededRiskAmount();
    }

    @Override
    public void setCededRiskAmount(MonetaryAmount value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setCededRiskAmount(value);
    }

    @Override
    public BigDecimal getCededRiskAmount_amt() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getCededRiskAmount_amt();
    }

    @Override
    public void setCededRiskAmount_amt(BigDecimal value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setCededRiskAmount_amt(value);
    }

    @Override
    public Currency getCededRiskAmount_cur() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getCededRiskAmount_cur();
    }

    @Override
    public void setCededRiskAmount_cur(Currency value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setCededRiskAmount_cur(value);
    }

    @Override
    public MonetaryAmount getBasisGNP() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getBasisGNP();
    }

    @Override
    public void setBasisGNP(MonetaryAmount value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setBasisGNP(value);
    }

    @Override
    public BigDecimal getBasisGNP_amt() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getBasisGNP_amt();
    }

    @Override
    public void setBasisGNP_amt(BigDecimal value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setBasisGNP_amt(value);
    }

    @Override
    public Currency getBasisGNP_cur() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getBasisGNP_cur();
    }

    @Override
    public void setBasisGNP_cur(Currency value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setBasisGNP_cur(value);
    }

    @Override
    public BigDecimal getCedingRate() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getCedingRate();
    }

    @Override
    public void setCedingRate(BigDecimal value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setCedingRate(value);
    }

    @Override
    public BigDecimal getCommissionRate() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getCommissionRate();
    }

    @Override
    public void setCommissionRate(BigDecimal value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setCommissionRate(value);
    }

    @Override
    public BigDecimal getMarkupRate() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getMarkupRate();
    }

    @Override
    public void setMarkupRate(BigDecimal value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setMarkupRate(value);
    }

    @Override
    public MonetaryAmount getCededPremium() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getCededPremium();
    }

    @Override
    public void setCededPremium(MonetaryAmount value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setCededPremium(value);
    }

    @Override
    public BigDecimal getCededPremium_amt() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getCededPremium_amt();
    }

    @Override
    public void setCededPremium_amt(BigDecimal value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setCededPremium_amt(value);
    }

    @Override
    public Currency getCededPremium_cur() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getCededPremium_cur();
    }

    @Override
    public void setCededPremium_cur(Currency value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setCededPremium_cur(value);
    }

    @Override
    public MonetaryAmount getCededPremiumMarkup() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getCededPremiumMarkup();
    }

    @Override
    public void setCededPremiumMarkup(MonetaryAmount value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setCededPremiumMarkup(value);
    }

    @Override
    public BigDecimal getCededPremiumMarkup_amt() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getCededPremiumMarkup_amt();
    }

    @Override
    public void setCededPremiumMarkup_amt(BigDecimal value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setCededPremiumMarkup_amt(value);
    }

    @Override
    public Currency getCededPremiumMarkup_cur() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getCededPremiumMarkup_cur();
    }

    @Override
    public void setCededPremiumMarkup_cur(Currency value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setCededPremiumMarkup_cur(value);
    }

    @Override
    public MonetaryAmount getCommission() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getCommission();
    }

    @Override
    public void setCommission(MonetaryAmount value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setCommission(value);
    }

    @Override
    public BigDecimal getCommission_amt() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getCommission_amt();
    }

    @Override
    public void setCommission_amt(BigDecimal value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setCommission_amt(value);
    }

    @Override
    public Currency getCommission_cur() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getCommission_cur();
    }

    @Override
    public void setCommission_cur(Currency value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setCommission_cur(value);
    }

    @Override
    public Integer getCalculationOrder() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getCalculationOrder();
    }

    @Override
    public void setCalculationOrder(Integer value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setCalculationOrder(value);
    }

    @Override
    public Date getDatePosted() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getDatePosted();
    }

    @Override
    public void setDatePosted(Date value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setDatePosted(value);
    }

    @Override
    public Date getDateWritten() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getDateWritten();
    }

    @Override
    public void setDateWritten(Date value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setDateWritten(value);
    }

    @Override
    public Date getCalcTimestamp() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getCalcTimestamp();
    }

    @Override
    public void setCalcTimestamp(Date value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setCalcTimestamp(value);
    }

    @Override
    public PolicyFXRate getPolicyFXRate() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getPolicyFXRate();
    }

    @Override
    public void setPolicyFXRate(PolicyFXRate value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setPolicyFXRate(value);
    }

    @Override
    public Key getPolicyFXRateID() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getPolicyFXRateID();
    }

    @Override
    public void setPolicyFXRateID(Key value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setPolicyFXRateID(value);
    }

    @Override
    public RIAgreement getAgreement() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getAgreement();
    }

    @Override
    public void setAgreement(RIAgreement value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setAgreement(value);
    }

    @Override
    public Key getAgreementID() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getAgreementID();
    }

    @Override
    public void setAgreementID(Key value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setAgreementID(value);
    }

    @Override
    public RIProgram getProgram() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getProgram();
    }

    @Override
    public void setProgram(RIProgram value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setProgram(value);
    }

    @Override
    public Key getProgramID() {
        return ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).getProgramID();
    }

    @Override
    public void setProgramID(Key value) {
        ((RICededPremiumTransactionInternal) getEntityDelegate(RICededPremiumTransaction.class)).setProgramID(value);
    }

    @Override
    public Currency getAgreementCurrency() {
        return getEntityDelegate(RICededPremiumTransaction.class).getAgreementCurrency();
    }

    @Override
    public RICededPremium getRICededPremium() {
        return getEntityDelegate(RICededPremiumTransaction.class).getRICededPremium();
    }

    @Override
    public RICededPremiumHistory getRICededPremiumHistory() {
        return getEntityDelegate(RICededPremiumTransaction.class).getRICededPremiumHistory();
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
