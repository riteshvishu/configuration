
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import com.guidewire.pc.domain.policy.impl.ModifierInternal;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7Jurisdiction;
import extensions.pc.policy.entity.WC7RateFactor;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.api.productmodel.ModifierPatternBase;
import gw.api.productmodel.RateFactorPatternBase;
import gw.api.web.productmodel.ProductModelSyncIssue;
import gw.pc.policy.entity.Modifiable;
import gw.pc.policy.entity.Modifier;
import gw.pc.policy.entity.RateFactor;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pc.policy.typekey.ModifierDataType;
import gw.pc.policy.typekey.RateFactorType;
import gw.pl.extract.entity.Extractable;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.Key;
import gw.pl.persistence.core.effdate.entity.EffDated;
import gw.pl.persistence.core.entity.KeyableBean;

public abstract class WC7ModifierStub
    extends EffDatedBeanProxy
    implements WC7ModifierInternalStubI
{


    @Override
    public extensions.pc.policy.typekey.WC7Modifier getSubtype() {
        return ((extensions.pc.policy.typekey.WC7Modifier) getFieldValue(SUBTYPE_PROP.get()));
    }

    @Override
    public void setSubtype(extensions.pc.policy.typekey.WC7Modifier value) {
        setFieldValue(SUBTYPE_PROP.get(), value);
    }

    @Override
    public WC7Jurisdiction getWC7Jurisdiction() {
        return ((WC7Jurisdiction) getFieldValue(WC7JURISDICTION_PROP.get()));
    }

    @Override
    public void setWC7Jurisdiction(WC7Jurisdiction value) {
        setFieldValue(WC7JURISDICTION_PROP.get(), value);
    }

    @Override
    public Key getWC7JurisdictionID() {
        return ((Key) getRawFieldValue(WC7JURISDICTION_PROP.get()));
    }

    @Override
    public void setWC7JurisdictionID(Key value) {
        setFieldValue(WC7JURISDICTION_PROP.get(), value);
    }

    @Override
    public WC7RateFactor[] getWC7RateFactors() {
        return ((WC7RateFactor[]) getFieldValue(WC7RATEFACTORS_PROP.get()));
    }

    @Override
    public void addToWC7RateFactors(WC7RateFactor value) {
        addArrayElement(WC7RATEFACTORS_PROP.get(), value);
    }

    @Override
    public void removeFromWC7RateFactors(WC7RateFactor value) {
        removeArrayElement(WC7RATEFACTORS_PROP.get(), value);
    }

    @Override
    public extensions.pc.policy.entity.WC7Modifier getBasedOn() {
        return ((extensions.pc.policy.entity.WC7Modifier) getBasedOnUntyped());
    }

    @Override
    public extensions.pc.policy.entity.WC7Modifier getSlice(Date sliceDate) {
        return ((extensions.pc.policy.entity.WC7Modifier) getSliceUntyped(sliceDate));
    }

    @Override
    public extensions.pc.policy.entity.WC7Modifier getUnsliced() {
        return ((extensions.pc.policy.entity.WC7Modifier) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public extensions.pc.policy.entity.WC7Modifier split(Date splitDate) {
        return ((extensions.pc.policy.entity.WC7Modifier) splitUntyped(splitDate));
    }

    @Override
    public extensions.pc.policy.entity.WC7Modifier clone() {
        return ((extensions.pc.policy.entity.WC7Modifier) cloneUntyped());
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
    public Boolean isBooleanModifier() {
        return ((ModifierInternal) getEntityDelegate(Modifier.class)).isBooleanModifier();
    }

    @Override
    public void setBooleanModifier(Boolean value) {
        ((ModifierInternal) getEntityDelegate(Modifier.class)).setBooleanModifier(value);
    }

    @Override
    public Date getDateModifier() {
        return ((ModifierInternal) getEntityDelegate(Modifier.class)).getDateModifier();
    }

    @Override
    public void setDateModifier(Date value) {
        ((ModifierInternal) getEntityDelegate(Modifier.class)).setDateModifier(value);
    }

    @Override
    public Boolean isEligible() {
        return ((ModifierInternal) getEntityDelegate(Modifier.class)).isEligible();
    }

    @Override
    public void setEligible(Boolean value) {
        ((ModifierInternal) getEntityDelegate(Modifier.class)).setEligible(value);
    }

    @Override
    public String getJustification() {
        return ((ModifierInternal) getEntityDelegate(Modifier.class)).getJustification();
    }

    @Override
    public void setJustification(String value) {
        ((ModifierInternal) getEntityDelegate(Modifier.class)).setJustification(value);
    }

    @Override
    public String getPatternCode() {
        return ((ModifierInternal) getEntityDelegate(Modifier.class)).getPatternCode();
    }

    @Override
    public void setPatternCode(String value) {
        ((ModifierInternal) getEntityDelegate(Modifier.class)).setPatternCode(value);
    }

    @Override
    public BigDecimal getRateModifier() {
        return ((ModifierInternal) getEntityDelegate(Modifier.class)).getRateModifier();
    }

    @Override
    public void setRateModifier(BigDecimal value) {
        ((ModifierInternal) getEntityDelegate(Modifier.class)).setRateModifier(value);
    }

    @Override
    public Date getReferenceDateInternal() {
        return ((ModifierInternal) getEntityDelegate(Modifier.class)).getReferenceDateInternal();
    }

    @Override
    public void setReferenceDateInternal(Date value) {
        ((ModifierInternal) getEntityDelegate(Modifier.class)).setReferenceDateInternal(value);
    }

    @Override
    public String getTypeKeyModifier() {
        return ((ModifierInternal) getEntityDelegate(Modifier.class)).getTypeKeyModifier();
    }

    @Override
    public void setTypeKeyModifier(String value) {
        ((ModifierInternal) getEntityDelegate(Modifier.class)).setTypeKeyModifier(value);
    }

    @Override
    public Boolean isValueFinal() {
        return ((ModifierInternal) getEntityDelegate(Modifier.class)).isValueFinal();
    }

    @Override
    public void setValueFinal(Boolean value) {
        ((ModifierInternal) getEntityDelegate(Modifier.class)).setValueFinal(value);
    }

    @Override
    public Jurisdiction getState() {
        return ((ModifierInternal) getEntityDelegate(Modifier.class)).getState();
    }

    @Override
    public void setState(Jurisdiction value) {
        ((ModifierInternal) getEntityDelegate(Modifier.class)).setState(value);
    }

    @Override
    public boolean isScheduleRate() {
        return getEntityDelegate(Modifier.class).isScheduleRate();
    }

    @Override
    public BigDecimal getRateWithinLimits() {
        return getEntityDelegate(Modifier.class).getRateWithinLimits();
    }

    @Override
    public void setRateWithinLimits(BigDecimal p0) {
        getEntityDelegate(Modifier.class).setRateWithinLimits(p0);
    }

    @Override
    public ModifierDataType getDataType() {
        return getEntityDelegate(Modifier.class).getDataType();
    }

    @Override
    public String getTypeList() {
        return getEntityDelegate(Modifier.class).getTypeList();
    }

    @Override
    public String getModifierType() {
        return getEntityDelegate(Modifier.class).getModifierType();
    }

    @Override
    public BigDecimal getMinimum() {
        return getEntityDelegate(Modifier.class).getMinimum();
    }

    @Override
    public BigDecimal getMaximum() {
        return getEntityDelegate(Modifier.class).getMaximum();
    }

    @Override
    public RateFactor getRateFactor(RateFactorType p0) {
        return getEntityDelegate(Modifier.class).getRateFactor(p0);
    }

    @Override
    public boolean hasRateFactors() {
        return getEntityDelegate(Modifier.class).hasRateFactors();
    }

    @Override
    public void updateRateModifierFromRateFactors() {
        getEntityDelegate(Modifier.class).updateRateModifierFromRateFactors();
    }

    @Override
    public ModifierPatternBase getPattern() {
        return getEntityDelegate(Modifier.class).getPattern();
    }

    @Override
    public void syncRateFactorsWithProductModel(Modifiable p0) {
        getEntityDelegate(Modifier.class).syncRateFactorsWithProductModel(p0);
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkRateFactorsAgainstProductModel(Modifiable p0) {
        return getEntityDelegate(Modifier.class).checkRateFactorsAgainstProductModel(p0);
    }

    @Override
    public Date getReferenceDate() {
        return getEntityDelegate(Modifier.class).getReferenceDate();
    }

    @Override
    public void denormalizeReferenceDate() {
        getEntityDelegate(Modifier.class).denormalizeReferenceDate();
    }

    @Override
    public void clearReferenceDateInternal() {
        getEntityDelegate(Modifier.class).clearReferenceDateInternal();
    }

    @Override
    public RateFactor[] getRateFactors() {
        return getEntityDelegate(Modifier.class).getRateFactors();
    }

    @Override
    public void addToRateFactors(RateFactor p0) {
        getEntityDelegate(Modifier.class).addToRateFactors(p0);
    }

    @Override
    public void removeFromRateFactors(RateFactor p0) {
        getEntityDelegate(Modifier.class).removeFromRateFactors(p0);
    }

    @Override
    public Modifiable getOwningModifiable() {
        return getEntityDelegate(Modifier.class).getOwningModifiable();
    }

    @Override
    public boolean isSelected() {
        return ((ModifierInternal) getEntityDelegate(Modifier.class)).isSelected();
    }

    @Override
    public void setPattern(ModifierPatternBase p0) {
        ((ModifierInternal) getEntityDelegate(Modifier.class)).setPattern(p0);
    }

    @Override
    public RateFactor createRateFactor(RateFactorPatternBase p0) {
        return ((ModifierInternal) getEntityDelegate(Modifier.class)).createRateFactor(p0);
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
