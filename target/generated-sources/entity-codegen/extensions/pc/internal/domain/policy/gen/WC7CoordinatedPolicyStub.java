
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import java.util.List;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7CoordinatedPolicy;
import extensions.pc.policy.entity.WC7WorkersCompCond;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.account.entity.LaborContractor;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.extract.entity.Extractable;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.Key;
import gw.pl.persistence.core.effdate.entity.EffDated;
import gw.pl.persistence.core.entity.KeyableBean;

public abstract class WC7CoordinatedPolicyStub
    extends EffDatedBeanProxy
    implements WC7CoordinatedPolicyInternalStubI
{


    @Override
    public String getLaborContractorPolicyNumber() {
        return ((String) getFieldValueForCodegen(LABORCONTRACTORPOLICYNUMBER_PROP.get()));
    }

    @Override
    public void setLaborContractorPolicyNumber(String value) {
        setFieldValueForCodegen(LABORCONTRACTORPOLICYNUMBER_PROP.get(), value);
    }

    @Override
    public String getContractProject() {
        return ((String) getFieldValueForCodegen(CONTRACTPROJECT_PROP.get()));
    }

    @Override
    public void setContractProject(String value) {
        setFieldValueForCodegen(CONTRACTPROJECT_PROP.get(), value);
    }

    @Override
    public Jurisdiction getStatePerformed() {
        return ((Jurisdiction) getFieldValue(STATEPERFORMED_PROP.get()));
    }

    @Override
    public void setStatePerformed(Jurisdiction value) {
        setFieldValue(STATEPERFORMED_PROP.get(), value);
    }

    @Override
    public WC7WorkersCompLine getWCLine() {
        return ((WC7WorkersCompLine) getFieldValue(WCLINE_PROP.get()));
    }

    @Override
    public void setWCLine(WC7WorkersCompLine value) {
        setFieldValue(WCLINE_PROP.get(), value);
    }

    @Override
    public Key getWCLineID() {
        return ((Key) getRawFieldValue(WCLINE_PROP.get()));
    }

    @Override
    public void setWCLineID(Key value) {
        setFieldValue(WCLINE_PROP.get(), value);
    }

    @Override
    public LaborContractor getLaborContractor() {
        return ((LaborContractor) getFieldValue(LABORCONTRACTOR_PROP.get()));
    }

    @Override
    public void setLaborContractor(LaborContractor value) {
        setFieldValue(LABORCONTRACTOR_PROP.get(), value);
    }

    @Override
    public Key getLaborContractorID() {
        return ((Key) getRawFieldValue(LABORCONTRACTOR_PROP.get()));
    }

    @Override
    public void setLaborContractorID(Key value) {
        setFieldValue(LABORCONTRACTOR_PROP.get(), value);
    }

    @Override
    public WC7WorkersCompCond getMultipleCoordindatedPolicyCond() {
        return ((WC7WorkersCompCond) getFieldValue(MULTIPLECOORDINDATEDPOLICYCOND_PROP.get()));
    }

    @Override
    public void setMultipleCoordindatedPolicyCond(WC7WorkersCompCond value) {
        setFieldValue(MULTIPLECOORDINDATEDPOLICYCOND_PROP.get(), value);
    }

    @Override
    public Key getMultipleCoordindatedPolicyCondID() {
        return ((Key) getRawFieldValue(MULTIPLECOORDINDATEDPOLICYCOND_PROP.get()));
    }

    @Override
    public void setMultipleCoordindatedPolicyCondID(Key value) {
        setFieldValue(MULTIPLECOORDINDATEDPOLICYCOND_PROP.get(), value);
    }

    @Override
    public WC7CoordinatedPolicy getBasedOn() {
        return ((WC7CoordinatedPolicy) getBasedOnUntyped());
    }

    @Override
    public WC7CoordinatedPolicy getSlice(Date sliceDate) {
        return ((WC7CoordinatedPolicy) getSliceUntyped(sliceDate));
    }

    @Override
    public WC7CoordinatedPolicy getUnsliced() {
        return ((WC7CoordinatedPolicy) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public WC7CoordinatedPolicy split(Date splitDate) {
        return ((WC7CoordinatedPolicy) splitUntyped(splitDate));
    }

    @Override
    public WC7CoordinatedPolicy clone() {
        return ((WC7CoordinatedPolicy) cloneUntyped());
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
