
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7JurisdictionMultiplier;
import extensions.pc.policy.entity.WC7RetrospectiveRatingPlan;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.extract.entity.Extractable;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.Key;

public abstract class WC7JurisdictionMultiplierStub
    extends EffDatedBeanProxy
    implements WC7JurisdictionMultiplierInternalStubI
{


    @Override
    public BigDecimal getFederalExcessLossFactor() {
        return ((BigDecimal) getFieldValue(FEDERALEXCESSLOSSFACTOR_PROP.get()));
    }

    @Override
    public void setFederalExcessLossFactor(BigDecimal value) {
        setFieldValue(FEDERALEXCESSLOSSFACTOR_PROP.get(), value);
    }

    @Override
    public BigDecimal getFederalTaxMultiplier() {
        return ((BigDecimal) getFieldValue(FEDERALTAXMULTIPLIER_PROP.get()));
    }

    @Override
    public void setFederalTaxMultiplier(BigDecimal value) {
        setFieldValue(FEDERALTAXMULTIPLIER_PROP.get(), value);
    }

    @Override
    public BigDecimal getJurisdictionExcessLossFactor() {
        return ((BigDecimal) getFieldValue(JURISDICTIONEXCESSLOSSFACTOR_PROP.get()));
    }

    @Override
    public void setJurisdictionExcessLossFactor(BigDecimal value) {
        setFieldValue(JURISDICTIONEXCESSLOSSFACTOR_PROP.get(), value);
    }

    @Override
    public BigDecimal getJurisdictionTaxMultiplier() {
        return ((BigDecimal) getFieldValue(JURISDICTIONTAXMULTIPLIER_PROP.get()));
    }

    @Override
    public void setJurisdictionTaxMultiplier(BigDecimal value) {
        setFieldValue(JURISDICTIONTAXMULTIPLIER_PROP.get(), value);
    }

    @Override
    public Jurisdiction getJurisdiction() {
        return ((Jurisdiction) getFieldValue(JURISDICTION_PROP.get()));
    }

    @Override
    public void setJurisdiction(Jurisdiction value) {
        setFieldValue(JURISDICTION_PROP.get(), value);
    }

    @Override
    public WC7RetrospectiveRatingPlan getWC7RetrospectiveRatingPlan() {
        return ((WC7RetrospectiveRatingPlan) getFieldValue(WC7RETROSPECTIVERATINGPLAN_PROP.get()));
    }

    @Override
    public void setWC7RetrospectiveRatingPlan(WC7RetrospectiveRatingPlan value) {
        setFieldValue(WC7RETROSPECTIVERATINGPLAN_PROP.get(), value);
    }

    @Override
    public Key getWC7RetrospectiveRatingPlanID() {
        return ((Key) getRawFieldValue(WC7RETROSPECTIVERATINGPLAN_PROP.get()));
    }

    @Override
    public void setWC7RetrospectiveRatingPlanID(Key value) {
        setFieldValue(WC7RETROSPECTIVERATINGPLAN_PROP.get(), value);
    }

    @Override
    public WC7JurisdictionMultiplier getBasedOn() {
        return ((WC7JurisdictionMultiplier) getBasedOnUntyped());
    }

    @Override
    public WC7JurisdictionMultiplier getSlice(Date sliceDate) {
        return ((WC7JurisdictionMultiplier) getSliceUntyped(sliceDate));
    }

    @Override
    public WC7JurisdictionMultiplier getUnsliced() {
        return ((WC7JurisdictionMultiplier) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public WC7JurisdictionMultiplier split(Date splitDate) {
        return ((WC7JurisdictionMultiplier) splitUntyped(splitDate));
    }

    @Override
    public WC7JurisdictionMultiplier clone() {
        return ((WC7JurisdictionMultiplier) cloneUntyped());
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
