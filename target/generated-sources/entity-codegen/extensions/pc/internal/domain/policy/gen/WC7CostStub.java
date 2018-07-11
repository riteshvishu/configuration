
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;
import java.util.List;
import java.util.Set;
import com.guidewire.pc.domain.financials.impl.CostInternal;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7RatingWorksheet;
import extensions.pc.policy.entity.WC7Transaction;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import extensions.pc.policy.typekey.WC7PremiumLevelType;
import gw.api.domain.financials.CostKey;
import gw.pc.coverage.entity.Coverable;
import gw.pc.currency.entity.PolicyFXRate;
import gw.pc.financials.entity.Cost;
import gw.pc.financials.entity.Transaction;
import gw.pc.financials.typekey.ChargePattern;
import gw.pc.financials.typekey.OverrideSourceType;
import gw.pc.financials.typekey.ProrationMethod;
import gw.pc.financials.typekey.RateAmountType;
import gw.pc.financials.typekey.RoundingModeType;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pc.rating.entity.RateBook;
import gw.pc.rating.worksheet.entity.RatingWorksheet;
import gw.pc.reinsurance.entity.Reinsurable;
import gw.pl.currency.MonetaryAmount;
import gw.pl.currency.typekey.Currency;
import gw.pl.extract.entity.Extractable;
import gw.pl.persistence.core.Key;
import gw.pl.persistence.core.effdate.entity.EffDated;
import gw.pl.persistence.core.entity.KeyableBean;

public abstract class WC7CostStub
    extends EffDatedBeanProxy
    implements WC7CostInternalStubI
{


    @Override
    public extensions.pc.policy.typekey.WC7Cost getSubtype() {
        return ((extensions.pc.policy.typekey.WC7Cost) getFieldValue(SUBTYPE_PROP.get()));
    }

    @Override
    public void setSubtype(extensions.pc.policy.typekey.WC7Cost value) {
        setFieldValue(SUBTYPE_PROP.get(), value);
    }

    @Override
    public Integer getCalcOrder() {
        return ((Integer) getFieldValue(CALCORDER_PROP.get()));
    }

    @Override
    public void setCalcOrder(Integer value) {
        setFieldValue(CALCORDER_PROP.get(), value);
    }

    @Override
    public Integer getDisplayOrder() {
        return ((Integer) getFieldValue(DISPLAYORDER_PROP.get()));
    }

    @Override
    public void setDisplayOrder(Integer value) {
        setFieldValue(DISPLAYORDER_PROP.get(), value);
    }

    @Override
    public String getStatCode() {
        return ((String) getFieldValueForCodegen(STATCODE_PROP.get()));
    }

    @Override
    public void setStatCode(String value) {
        setFieldValueForCodegen(STATCODE_PROP.get(), value);
    }

    @Override
    public WC7PremiumLevelType getPremiumLevelType() {
        return ((WC7PremiumLevelType) getFieldValue(PREMIUMLEVELTYPE_PROP.get()));
    }

    @Override
    public void setPremiumLevelType(WC7PremiumLevelType value) {
        setFieldValue(PREMIUMLEVELTYPE_PROP.get(), value);
    }

    @Override
    public WC7WorkersCompLine getWC7WorkersCompLine() {
        return ((WC7WorkersCompLine) getFieldValue(WC7WORKERSCOMPLINE_PROP.get()));
    }

    @Override
    public void setWC7WorkersCompLine(WC7WorkersCompLine value) {
        setFieldValue(WC7WORKERSCOMPLINE_PROP.get(), value);
    }

    @Override
    public Key getWC7WorkersCompLineID() {
        return ((Key) getRawFieldValue(WC7WORKERSCOMPLINE_PROP.get()));
    }

    @Override
    public void setWC7WorkersCompLineID(Key value) {
        setFieldValue(WC7WORKERSCOMPLINE_PROP.get(), value);
    }

    @Override
    public WC7Transaction[] getTransactions() {
        return ((WC7Transaction[]) getFieldValue(TRANSACTIONS_PROP.get()));
    }

    @Override
    public void addToTransactions(WC7Transaction value) {
        addArrayElement(TRANSACTIONS_PROP.get(), value);
    }

    @Override
    public void removeFromTransactions(WC7Transaction value) {
        removeArrayElement(TRANSACTIONS_PROP.get(), value);
    }

    @Override
    public WC7RatingWorksheet getWC7RatingWorksheet() {
        return ((WC7RatingWorksheet) getFieldValue(WC7RATINGWORKSHEET_PROP.get()));
    }

    @Override
    public void setWC7RatingWorksheet(WC7RatingWorksheet value) {
        setFieldValue(WC7RATINGWORKSHEET_PROP.get(), value);
    }

    @Override
    public Key getWC7RatingWorksheetID() {
        return ((Key) getRawFieldValue(WC7RATINGWORKSHEET_PROP.get()));
    }

    @Override
    public void setWC7RatingWorksheetID(Key value) {
        setFieldValue(WC7RATINGWORKSHEET_PROP.get(), value);
    }

    @Override
    public extensions.pc.policy.entity.WC7Cost getBasedOn() {
        return ((extensions.pc.policy.entity.WC7Cost) getBasedOnUntyped());
    }

    @Override
    public extensions.pc.policy.entity.WC7Cost getSlice(Date sliceDate) {
        return ((extensions.pc.policy.entity.WC7Cost) getSliceUntyped(sliceDate));
    }

    @Override
    public extensions.pc.policy.entity.WC7Cost getUnsliced() {
        return ((extensions.pc.policy.entity.WC7Cost) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public extensions.pc.policy.entity.WC7Cost split(Date splitDate) {
        return ((extensions.pc.policy.entity.WC7Cost) splitUntyped(splitDate));
    }

    @Override
    public extensions.pc.policy.entity.WC7Cost clone() {
        return ((extensions.pc.policy.entity.WC7Cost) cloneUntyped());
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
    public MonetaryAmount getActualAmount() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getActualAmount();
    }

    @Override
    public void setActualAmount(MonetaryAmount value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setActualAmount(value);
    }

    @Override
    public BigDecimal getActualAmount_amt() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getActualAmount_amt();
    }

    @Override
    public void setActualAmount_amt(BigDecimal value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setActualAmount_amt(value);
    }

    @Override
    public Currency getActualAmount_cur() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getActualAmount_cur();
    }

    @Override
    public void setActualAmount_cur(Currency value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setActualAmount_cur(value);
    }

    @Override
    public MonetaryAmount getActualAmountBilling() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getActualAmountBilling();
    }

    @Override
    public void setActualAmountBilling(MonetaryAmount value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setActualAmountBilling(value);
    }

    @Override
    public BigDecimal getActualAmountBilling_amt() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getActualAmountBilling_amt();
    }

    @Override
    public void setActualAmountBilling_amt(BigDecimal value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setActualAmountBilling_amt(value);
    }

    @Override
    public Currency getActualAmountBilling_cur() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getActualAmountBilling_cur();
    }

    @Override
    public void setActualAmountBilling_cur(Currency value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setActualAmountBilling_cur(value);
    }

    @Override
    public MonetaryAmount getStandardAmount() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getStandardAmount();
    }

    @Override
    public void setStandardAmount(MonetaryAmount value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setStandardAmount(value);
    }

    @Override
    public BigDecimal getStandardAmount_amt() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getStandardAmount_amt();
    }

    @Override
    public void setStandardAmount_amt(BigDecimal value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setStandardAmount_amt(value);
    }

    @Override
    public Currency getStandardAmount_cur() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getStandardAmount_cur();
    }

    @Override
    public void setStandardAmount_cur(Currency value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setStandardAmount_cur(value);
    }

    @Override
    public MonetaryAmount getStandardAmountBilling() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getStandardAmountBilling();
    }

    @Override
    public void setStandardAmountBilling(MonetaryAmount value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setStandardAmountBilling(value);
    }

    @Override
    public BigDecimal getStandardAmountBilling_amt() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getStandardAmountBilling_amt();
    }

    @Override
    public void setStandardAmountBilling_amt(BigDecimal value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setStandardAmountBilling_amt(value);
    }

    @Override
    public Currency getStandardAmountBilling_cur() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getStandardAmountBilling_cur();
    }

    @Override
    public void setStandardAmountBilling_cur(Currency value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setStandardAmountBilling_cur(value);
    }

    @Override
    public MonetaryAmount getOverrideAmount() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getOverrideAmount();
    }

    @Override
    public void setOverrideAmount(MonetaryAmount value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setOverrideAmount(value);
    }

    @Override
    public BigDecimal getOverrideAmount_amt() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getOverrideAmount_amt();
    }

    @Override
    public void setOverrideAmount_amt(BigDecimal value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setOverrideAmount_amt(value);
    }

    @Override
    public Currency getOverrideAmount_cur() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getOverrideAmount_cur();
    }

    @Override
    public void setOverrideAmount_cur(Currency value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setOverrideAmount_cur(value);
    }

    @Override
    public MonetaryAmount getOverrideAmountBilling() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getOverrideAmountBilling();
    }

    @Override
    public void setOverrideAmountBilling(MonetaryAmount value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setOverrideAmountBilling(value);
    }

    @Override
    public BigDecimal getOverrideAmountBilling_amt() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getOverrideAmountBilling_amt();
    }

    @Override
    public void setOverrideAmountBilling_amt(BigDecimal value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setOverrideAmountBilling_amt(value);
    }

    @Override
    public Currency getOverrideAmountBilling_cur() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getOverrideAmountBilling_cur();
    }

    @Override
    public void setOverrideAmountBilling_cur(Currency value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setOverrideAmountBilling_cur(value);
    }

    @Override
    public MonetaryAmount getActualTermAmount() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getActualTermAmount();
    }

    @Override
    public void setActualTermAmount(MonetaryAmount value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setActualTermAmount(value);
    }

    @Override
    public BigDecimal getActualTermAmount_amt() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getActualTermAmount_amt();
    }

    @Override
    public void setActualTermAmount_amt(BigDecimal value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setActualTermAmount_amt(value);
    }

    @Override
    public Currency getActualTermAmount_cur() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getActualTermAmount_cur();
    }

    @Override
    public void setActualTermAmount_cur(Currency value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setActualTermAmount_cur(value);
    }

    @Override
    public MonetaryAmount getActualTermAmountBilling() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getActualTermAmountBilling();
    }

    @Override
    public void setActualTermAmountBilling(MonetaryAmount value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setActualTermAmountBilling(value);
    }

    @Override
    public BigDecimal getActualTermAmountBilling_amt() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getActualTermAmountBilling_amt();
    }

    @Override
    public void setActualTermAmountBilling_amt(BigDecimal value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setActualTermAmountBilling_amt(value);
    }

    @Override
    public Currency getActualTermAmountBilling_cur() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getActualTermAmountBilling_cur();
    }

    @Override
    public void setActualTermAmountBilling_cur(Currency value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setActualTermAmountBilling_cur(value);
    }

    @Override
    public MonetaryAmount getStandardTermAmount() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getStandardTermAmount();
    }

    @Override
    public void setStandardTermAmount(MonetaryAmount value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setStandardTermAmount(value);
    }

    @Override
    public BigDecimal getStandardTermAmount_amt() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getStandardTermAmount_amt();
    }

    @Override
    public void setStandardTermAmount_amt(BigDecimal value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setStandardTermAmount_amt(value);
    }

    @Override
    public Currency getStandardTermAmount_cur() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getStandardTermAmount_cur();
    }

    @Override
    public void setStandardTermAmount_cur(Currency value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setStandardTermAmount_cur(value);
    }

    @Override
    public MonetaryAmount getStandardTermAmountBilling() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getStandardTermAmountBilling();
    }

    @Override
    public void setStandardTermAmountBilling(MonetaryAmount value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setStandardTermAmountBilling(value);
    }

    @Override
    public BigDecimal getStandardTermAmountBilling_amt() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getStandardTermAmountBilling_amt();
    }

    @Override
    public void setStandardTermAmountBilling_amt(BigDecimal value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setStandardTermAmountBilling_amt(value);
    }

    @Override
    public Currency getStandardTermAmountBilling_cur() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getStandardTermAmountBilling_cur();
    }

    @Override
    public void setStandardTermAmountBilling_cur(Currency value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setStandardTermAmountBilling_cur(value);
    }

    @Override
    public MonetaryAmount getOverrideTermAmount() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getOverrideTermAmount();
    }

    @Override
    public void setOverrideTermAmount(MonetaryAmount value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setOverrideTermAmount(value);
    }

    @Override
    public BigDecimal getOverrideTermAmount_amt() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getOverrideTermAmount_amt();
    }

    @Override
    public void setOverrideTermAmount_amt(BigDecimal value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setOverrideTermAmount_amt(value);
    }

    @Override
    public Currency getOverrideTermAmount_cur() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getOverrideTermAmount_cur();
    }

    @Override
    public void setOverrideTermAmount_cur(Currency value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setOverrideTermAmount_cur(value);
    }

    @Override
    public MonetaryAmount getOverrideTermAmountBilling() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getOverrideTermAmountBilling();
    }

    @Override
    public void setOverrideTermAmountBilling(MonetaryAmount value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setOverrideTermAmountBilling(value);
    }

    @Override
    public BigDecimal getOverrideTermAmountBilling_amt() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getOverrideTermAmountBilling_amt();
    }

    @Override
    public void setOverrideTermAmountBilling_amt(BigDecimal value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setOverrideTermAmountBilling_amt(value);
    }

    @Override
    public Currency getOverrideTermAmountBilling_cur() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getOverrideTermAmountBilling_cur();
    }

    @Override
    public void setOverrideTermAmountBilling_cur(Currency value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setOverrideTermAmountBilling_cur(value);
    }

    @Override
    public BigDecimal getBasis() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getBasis();
    }

    @Override
    public void setBasis(BigDecimal value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setBasis(value);
    }

    @Override
    public BigDecimal getActualAdjRate() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getActualAdjRate();
    }

    @Override
    public void setActualAdjRate(BigDecimal value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setActualAdjRate(value);
    }

    @Override
    public BigDecimal getStandardAdjRate() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getStandardAdjRate();
    }

    @Override
    public void setStandardAdjRate(BigDecimal value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setStandardAdjRate(value);
    }

    @Override
    public BigDecimal getOverrideAdjRate() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getOverrideAdjRate();
    }

    @Override
    public void setOverrideAdjRate(BigDecimal value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setOverrideAdjRate(value);
    }

    @Override
    public BigDecimal getActualBaseRate() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getActualBaseRate();
    }

    @Override
    public void setActualBaseRate(BigDecimal value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setActualBaseRate(value);
    }

    @Override
    public BigDecimal getStandardBaseRate() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getStandardBaseRate();
    }

    @Override
    public void setStandardBaseRate(BigDecimal value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setStandardBaseRate(value);
    }

    @Override
    public BigDecimal getOverrideBaseRate() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getOverrideBaseRate();
    }

    @Override
    public void setOverrideBaseRate(BigDecimal value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setOverrideBaseRate(value);
    }

    @Override
    public String getOverrideReason() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getOverrideReason();
    }

    @Override
    public void setOverrideReason(String value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setOverrideReason(value);
    }

    @Override
    public Integer getNumDaysInRatedTerm() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getNumDaysInRatedTerm();
    }

    @Override
    public void setNumDaysInRatedTerm(Integer value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setNumDaysInRatedTerm(value);
    }

    @Override
    public Boolean isOverridable() {
        return ((CostInternal) getEntityDelegate(Cost.class)).isOverridable();
    }

    @Override
    public void setOverridable(Boolean value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setOverridable(value);
    }

    @Override
    public Boolean isSubjectToReporting() {
        return ((CostInternal) getEntityDelegate(Cost.class)).isSubjectToReporting();
    }

    @Override
    public void setSubjectToReporting(Boolean value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setSubjectToReporting(value);
    }

    @Override
    public String getChargeGroup() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getChargeGroup();
    }

    @Override
    public void setChargeGroup(String value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setChargeGroup(value);
    }

    @Override
    public Boolean isFXRateConversionUsed() {
        return ((CostInternal) getEntityDelegate(Cost.class)).isFXRateConversionUsed();
    }

    @Override
    public void setFXRateConversionUsed(Boolean value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setFXRateConversionUsed(value);
    }

    @Override
    public RateAmountType getRateAmountType() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getRateAmountType();
    }

    @Override
    public void setRateAmountType(RateAmountType value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setRateAmountType(value);
    }

    @Override
    public ChargePattern getChargePattern() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getChargePattern();
    }

    @Override
    public void setChargePattern(ChargePattern value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setChargePattern(value);
    }

    @Override
    public Integer getRoundingLevel() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getRoundingLevel();
    }

    @Override
    public void setRoundingLevel(Integer value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setRoundingLevel(value);
    }

    @Override
    public RoundingModeType getRoundingMode() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getRoundingMode();
    }

    @Override
    public void setRoundingMode(RoundingModeType value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setRoundingMode(value);
    }

    @Override
    public ProrationMethod getProrationMethod() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getProrationMethod();
    }

    @Override
    public void setProrationMethod(ProrationMethod value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setProrationMethod(value);
    }

    @Override
    public RateBook getRateBook() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getRateBook();
    }

    @Override
    public void setRateBook(RateBook value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setRateBook(value);
    }

    @Override
    public Key getRateBookID() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getRateBookID();
    }

    @Override
    public void setRateBookID(Key value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setRateBookID(value);
    }

    @Override
    public OverrideSourceType getOverrideSource() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getOverrideSource();
    }

    @Override
    public void setOverrideSource(OverrideSourceType value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setOverrideSource(value);
    }

    @Override
    public PolicyFXRate getPolicyFXRate() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getPolicyFXRate();
    }

    @Override
    public void setPolicyFXRate(PolicyFXRate value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setPolicyFXRate(value);
    }

    @Override
    public Key getPolicyFXRateID() {
        return ((CostInternal) getEntityDelegate(Cost.class)).getPolicyFXRateID();
    }

    @Override
    public void setPolicyFXRateID(Key value) {
        ((CostInternal) getEntityDelegate(Cost.class)).setPolicyFXRateID(value);
    }

    @Override
    public boolean isProrated() {
        return getEntityDelegate(Cost.class).isProrated();
    }

    @Override
    public double getProration() {
        return getEntityDelegate(Cost.class).getProration();
    }

    @Override
    public Date getEffDate() {
        return getEntityDelegate(Cost.class).getEffDate();
    }

    @Override
    public void setEffDate(Date p0) {
        getEntityDelegate(Cost.class).setEffDate(p0);
    }

    @Override
    public Date getExpDate() {
        return getEntityDelegate(Cost.class).getExpDate();
    }

    @Override
    public void setExpDate(Date p0) {
        getEntityDelegate(Cost.class).setExpDate(p0);
    }

    @Override
    public void updateAmount(RoundingMode p0) {
        getEntityDelegate(Cost.class).updateAmount(p0);
    }

    @Override
    public boolean isCostEqual(Cost p0) {
        return getEntityDelegate(Cost.class).isCostEqual(p0);
    }

    @Override
    public CostKey getCostKey() {
        return getEntityDelegate(Cost.class).getCostKey();
    }

    @Override
    public List<Transaction> onset(PolicyPeriod p0, Set<Date> p1, RoundingMode p2) {
        return getEntityDelegate(Cost.class).onset(p0, p1, p2);
    }

    @Override
    public List<Transaction> offset(PolicyPeriod p0, Set<Date> p1, RoundingMode p2) {
        return getEntityDelegate(Cost.class).offset(p0, p1, p2);
    }

    @Override
    public MonetaryAmount getAmountAt(Date p0, RoundingMode p1) {
        return getEntityDelegate(Cost.class).getAmountAt(p0, p1);
    }

    @Override
    public MonetaryAmount getAmountBetween(Date p0, Date p1, RoundingMode p2) {
        return getEntityDelegate(Cost.class).getAmountBetween(p0, p1, p2);
    }

    @Override
    public boolean mergeIfCostEqual(Cost p0) {
        return getEntityDelegate(Cost.class).mergeIfCostEqual(p0);
    }

    @Override
    public boolean merge(Cost p0) {
        return getEntityDelegate(Cost.class).merge(p0);
    }

    @Override
    public void removeFromTerm() {
        getEntityDelegate(Cost.class).removeFromTerm();
    }

    @Override
    public String debugString() {
        return getEntityDelegate(Cost.class).debugString();
    }

    @Override
    public void copyStandardColumnsToActualColumns() {
        getEntityDelegate(Cost.class).copyStandardColumnsToActualColumns();
    }

    @Override
    public Transaction createTransaction(PolicyPeriod p0) {
        return getEntityDelegate(Cost.class).createTransaction(p0);
    }

    @Override
    public Reinsurable getReinsurable() {
        return getEntityDelegate(Cost.class).getReinsurable();
    }

    @Override
    public EffDated cloneUntyped() {
        return getEntityDelegate(Cost.class).cloneUntyped();
    }

    @Override
    public String getNameOfCoverable() {
        return getEntityDelegate(Cost.class).getNameOfCoverable();
    }

    @Override
    public boolean isMatchingBean(KeyableBean p0) {
        return getEntityDelegate(Cost.class).isMatchingBean(p0);
    }

    @Override
    public RatingWorksheet getWorksheet() {
        return getEntityDelegate(Cost.class).getWorksheet();
    }

    @Override
    public void initializeWorksheet() {
        getEntityDelegate(Cost.class).initializeWorksheet();
    }

    @Override
    public Coverable getCoverable() {
        return getEntityDelegate(Cost.class).getCoverable();
    }

}
