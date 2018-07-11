
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7JurisdictionMultiplier;
import extensions.pc.policy.entity.WC7RetroRatingLetterOfCredit;
import extensions.pc.policy.entity.WC7RetrospectiveRatingPlan;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.extract.entity.Extractable;
import gw.pl.persistence.core.Key;
import gw.pl.persistence.core.effdate.entity.EffDated;
import gw.pl.persistence.core.entity.KeyableBean;

public abstract class WC7RetrospectiveRatingPlanStub
    extends EffDatedBeanProxy
    implements WC7RetrospectiveRatingPlanInternalStubI
{


    @Override
    public BigDecimal getBasicPremiumFactor1() {
        return ((BigDecimal) getFieldValue(BASICPREMIUMFACTOR1_PROP.get()));
    }

    @Override
    public void setBasicPremiumFactor1(BigDecimal value) {
        setFieldValue(BASICPREMIUMFACTOR1_PROP.get(), value);
    }

    @Override
    public BigDecimal getBasicPremiumFactor2() {
        return ((BigDecimal) getFieldValue(BASICPREMIUMFACTOR2_PROP.get()));
    }

    @Override
    public void setBasicPremiumFactor2(BigDecimal value) {
        setFieldValue(BASICPREMIUMFACTOR2_PROP.get(), value);
    }

    @Override
    public BigDecimal getBasicPremiumFactor3() {
        return ((BigDecimal) getFieldValue(BASICPREMIUMFACTOR3_PROP.get()));
    }

    @Override
    public void setBasicPremiumFactor3(BigDecimal value) {
        setFieldValue(BASICPREMIUMFACTOR3_PROP.get(), value);
    }

    @Override
    public Integer getComputationInterval() {
        return ((Integer) getFieldValue(COMPUTATIONINTERVAL_PROP.get()));
    }

    @Override
    public void setComputationInterval(Integer value) {
        setFieldValue(COMPUTATIONINTERVAL_PROP.get(), value);
    }

    @Override
    public BigDecimal getEstimatedStandardPremium() {
        return ((BigDecimal) getFieldValue(ESTIMATEDSTANDARDPREMIUM_PROP.get()));
    }

    @Override
    public void setEstimatedStandardPremium(BigDecimal value) {
        setFieldValue(ESTIMATEDSTANDARDPREMIUM_PROP.get(), value);
    }

    @Override
    public Date getFirstComputationDate() {
        return ((Date) getFieldValue(FIRSTCOMPUTATIONDATE_PROP.get()));
    }

    @Override
    public void setFirstComputationDate(Date value) {
        setFieldValue(FIRSTCOMPUTATIONDATE_PROP.get(), value);
    }

    @Override
    public Boolean isIncludeALAE() {
        return ((Boolean) getFieldValue(INCLUDEALAE_PROP.get()));
    }

    @Override
    public void setIncludeALAE(Boolean value) {
        setFieldValue(INCLUDEALAE_PROP.get(), value);
    }

    @Override
    public Date getLastComputationDate() {
        return ((Date) getFieldValue(LASTCOMPUTATIONDATE_PROP.get()));
    }

    @Override
    public void setLastComputationDate(Date value) {
        setFieldValue(LASTCOMPUTATIONDATE_PROP.get(), value);
    }

    @Override
    public BigDecimal getLossConversionFactor() {
        return ((BigDecimal) getFieldValue(LOSSCONVERSIONFACTOR_PROP.get()));
    }

    @Override
    public void setLossConversionFactor(BigDecimal value) {
        setFieldValue(LOSSCONVERSIONFACTOR_PROP.get(), value);
    }

    @Override
    public BigDecimal getLossLimitAmount() {
        return ((BigDecimal) getFieldValue(LOSSLIMITAMOUNT_PROP.get()));
    }

    @Override
    public void setLossLimitAmount(BigDecimal value) {
        setFieldValue(LOSSLIMITAMOUNT_PROP.get(), value);
    }

    @Override
    public BigDecimal getMaxRetroPremiumRatio() {
        return ((BigDecimal) getFieldValue(MAXRETROPREMIUMRATIO_PROP.get()));
    }

    @Override
    public void setMaxRetroPremiumRatio(BigDecimal value) {
        setFieldValue(MAXRETROPREMIUMRATIO_PROP.get(), value);
    }

    @Override
    public BigDecimal getMinRetroPremiumRatio() {
        return ((BigDecimal) getFieldValue(MINRETROPREMIUMRATIO_PROP.get()));
    }

    @Override
    public void setMinRetroPremiumRatio(BigDecimal value) {
        setFieldValue(MINRETROPREMIUMRATIO_PROP.get(), value);
    }

    @Override
    public BigDecimal getPercentStandardPremium1() {
        return ((BigDecimal) getFieldValue(PERCENTSTANDARDPREMIUM1_PROP.get()));
    }

    @Override
    public void setPercentStandardPremium1(BigDecimal value) {
        setFieldValue(PERCENTSTANDARDPREMIUM1_PROP.get(), value);
    }

    @Override
    public BigDecimal getPercentStandardPremium2() {
        return ((BigDecimal) getFieldValue(PERCENTSTANDARDPREMIUM2_PROP.get()));
    }

    @Override
    public void setPercentStandardPremium2(BigDecimal value) {
        setFieldValue(PERCENTSTANDARDPREMIUM2_PROP.get(), value);
    }

    @Override
    public BigDecimal getPercentStandardPremium3() {
        return ((BigDecimal) getFieldValue(PERCENTSTANDARDPREMIUM3_PROP.get()));
    }

    @Override
    public void setPercentStandardPremium3(BigDecimal value) {
        setFieldValue(PERCENTSTANDARDPREMIUM3_PROP.get(), value);
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
    public WC7RetroRatingLetterOfCredit[] getLettersOfCredit() {
        return ((WC7RetroRatingLetterOfCredit[]) getFieldValue(LETTERSOFCREDIT_PROP.get()));
    }

    @Override
    public void addToLettersOfCredit(WC7RetroRatingLetterOfCredit value) {
        addArrayElement(LETTERSOFCREDIT_PROP.get(), value);
    }

    @Override
    public void removeFromLettersOfCredit(WC7RetroRatingLetterOfCredit value) {
        removeArrayElement(LETTERSOFCREDIT_PROP.get(), value);
    }

    @Override
    public WC7JurisdictionMultiplier[] getJurisdictionMultipliers() {
        return ((WC7JurisdictionMultiplier[]) getFieldValue(JURISDICTIONMULTIPLIERS_PROP.get()));
    }

    @Override
    public void addToJurisdictionMultipliers(WC7JurisdictionMultiplier value) {
        addArrayElement(JURISDICTIONMULTIPLIERS_PROP.get(), value);
    }

    @Override
    public void removeFromJurisdictionMultipliers(WC7JurisdictionMultiplier value) {
        removeArrayElement(JURISDICTIONMULTIPLIERS_PROP.get(), value);
    }

    @Override
    public WC7RetrospectiveRatingPlan getBasedOn() {
        return ((WC7RetrospectiveRatingPlan) getBasedOnUntyped());
    }

    @Override
    public WC7RetrospectiveRatingPlan getSlice(Date sliceDate) {
        return ((WC7RetrospectiveRatingPlan) getSliceUntyped(sliceDate));
    }

    @Override
    public WC7RetrospectiveRatingPlan getUnsliced() {
        return ((WC7RetrospectiveRatingPlan) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public WC7RetrospectiveRatingPlan split(Date splitDate) {
        return ((WC7RetrospectiveRatingPlan) splitUntyped(splitDate));
    }

    @Override
    public WC7RetrospectiveRatingPlan clone() {
        return ((WC7RetrospectiveRatingPlan) cloneUntyped());
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
    public void copyFromBeanUntyped(EffDated p0) {
        getInterfaceDelegate(EffDatedCopyable.class).copyFromBeanUntyped(p0);
    }

    @Override
    public void copyBasicFieldsFromBeanUntyped(EffDated p0) {
        getInterfaceDelegate(EffDatedCopyable.class).copyBasicFieldsFromBeanUntyped(p0);
    }

    @Override
    public List<EffDated> findMatchesInPeriodUntyped(PolicyPeriod p0, boolean p1) {
        return getInterfaceDelegate(EffDatedLogicalMatcher.class).findMatchesInPeriodUntyped(p0, p1);
    }

    @Override
    public boolean isLogicalMatchUntyped(KeyableBean p0) {
        return getInterfaceDelegate(EffDatedLogicalMatcher.class).isLogicalMatchUntyped(p0);
    }

    @Override
    public Object genKey() {
        return getInterfaceDelegate(EffDatedLogicalMatcher.class).genKey();
    }

}
