
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import java.util.List;
import com.guidewire.pc.domain.policy.audit.impl.AuditableInternal;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7ClassCode;
import extensions.pc.policy.entity.WC7WaiverOfSubro;
import extensions.pc.policy.entity.WC7WaiverOfSubroCost;
import extensions.pc.policy.entity.WC7WorkersCompCond;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import extensions.pc.policy.typekey.WC7GoverningLaw;
import extensions.pc.policy.typekey.WC7WaiverOfSubrogation;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.policy.audit.entity.Auditable;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.extract.entity.Extractable;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.Key;
import gw.pl.persistence.core.effdate.entity.EffDated;
import gw.pl.persistence.core.entity.KeyableBean;

public abstract class WC7WaiverOfSubroStub
    extends EffDatedBeanProxy
    implements WC7WaiverOfSubroInternalStubI
{


    @Override
    public WC7WorkersCompCond getWaiverCondition() {
        return ((WC7WorkersCompCond) getFieldValue(WAIVERCONDITION_PROP.get()));
    }

    @Override
    public void setWaiverCondition(WC7WorkersCompCond value) {
        setFieldValue(WAIVERCONDITION_PROP.get(), value);
    }

    @Override
    public Key getWaiverConditionID() {
        return ((Key) getRawFieldValue(WAIVERCONDITION_PROP.get()));
    }

    @Override
    public void setWaiverConditionID(Key value) {
        setFieldValue(WAIVERCONDITION_PROP.get(), value);
    }

    @Override
    public Integer getBasisAmount() {
        return ((Integer) getFieldValue(BASISAMOUNT_PROP.get()));
    }

    @Override
    public void setBasisAmount(Integer value) {
        setFieldValue(BASISAMOUNT_PROP.get(), value);
    }

    @Override
    public String getDescription() {
        return ((String) getFieldValueForCodegen(DESCRIPTION_PROP.get()));
    }

    @Override
    public void setDescription(String value) {
        setFieldValueForCodegen(DESCRIPTION_PROP.get(), value);
    }

    @Override
    public Boolean isIfAnyExposure() {
        return ((Boolean) getFieldValue(IFANYEXPOSURE_PROP.get()));
    }

    @Override
    public void setIfAnyExposure(Boolean value) {
        setFieldValue(IFANYEXPOSURE_PROP.get(), value);
    }

    @Override
    public String getJobID() {
        return ((String) getFieldValueForCodegen(JOBID_PROP.get()));
    }

    @Override
    public void setJobID(String value) {
        setFieldValueForCodegen(JOBID_PROP.get(), value);
    }

    @Override
    public Integer getNumEmployees() {
        return ((Integer) getFieldValue(NUMEMPLOYEES_PROP.get()));
    }

    @Override
    public void setNumEmployees(Integer value) {
        setFieldValue(NUMEMPLOYEES_PROP.get(), value);
    }

    @Override
    public Boolean isSpecificDiseaseLoaded() {
        return ((Boolean) getFieldValue(SPECIFICDISEASELOADED_PROP.get()));
    }

    @Override
    public void setSpecificDiseaseLoaded(Boolean value) {
        setFieldValue(SPECIFICDISEASELOADED_PROP.get(), value);
    }

    @Override
    public WC7GoverningLaw getGoverningLaw() {
        return ((WC7GoverningLaw) getFieldValue(GOVERNINGLAW_PROP.get()));
    }

    @Override
    public void setGoverningLaw(WC7GoverningLaw value) {
        setFieldValue(GOVERNINGLAW_PROP.get(), value);
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
    public WC7WaiverOfSubrogation getType() {
        return ((WC7WaiverOfSubrogation) getFieldValue(TYPE_PROP.get()));
    }

    @Override
    public void setType(WC7WaiverOfSubrogation value) {
        setFieldValue(TYPE_PROP.get(), value);
    }

    @Override
    public WC7ClassCode getClassCode() {
        return ((WC7ClassCode) getFieldValue(CLASSCODE_PROP.get()));
    }

    @Override
    public void setClassCode(WC7ClassCode value) {
        setFieldValue(CLASSCODE_PROP.get(), value);
    }

    @Override
    public Key getClassCodeID() {
        return ((Key) getRawFieldValue(CLASSCODE_PROP.get()));
    }

    @Override
    public void setClassCodeID(Key value) {
        setFieldValue(CLASSCODE_PROP.get(), value);
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
    public WC7WaiverOfSubroCost[] getWaiverOfSubroCosts() {
        return ((WC7WaiverOfSubroCost[]) getFieldValue(WAIVEROFSUBROCOSTS_PROP.get()));
    }

    @Override
    public void addToWaiverOfSubroCosts(WC7WaiverOfSubroCost value) {
        addArrayElement(WAIVEROFSUBROCOSTS_PROP.get(), value);
    }

    @Override
    public void removeFromWaiverOfSubroCosts(WC7WaiverOfSubroCost value) {
        removeArrayElement(WAIVEROFSUBROCOSTS_PROP.get(), value);
    }

    @Override
    public WC7WaiverOfSubro getBasedOn() {
        return ((WC7WaiverOfSubro) getBasedOnUntyped());
    }

    @Override
    public WC7WaiverOfSubro getSlice(Date sliceDate) {
        return ((WC7WaiverOfSubro) getSliceUntyped(sliceDate));
    }

    @Override
    public WC7WaiverOfSubro getUnsliced() {
        return ((WC7WaiverOfSubro) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public WC7WaiverOfSubro split(Date splitDate) {
        return ((WC7WaiverOfSubro) splitUntyped(splitDate));
    }

    @Override
    public WC7WaiverOfSubro clone() {
        return ((WC7WaiverOfSubro) cloneUntyped());
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
    public Integer getAuditedAmount() {
        return ((AuditableInternal) getEntityDelegate(Auditable.class)).getAuditedAmount();
    }

    @Override
    public void setAuditedAmount(Integer value) {
        ((AuditableInternal) getEntityDelegate(Auditable.class)).setAuditedAmount(value);
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
