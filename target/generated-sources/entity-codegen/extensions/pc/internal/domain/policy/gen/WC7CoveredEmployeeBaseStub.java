
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import com.guidewire.pc.domain.policy.audit.impl.AuditableInternal;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7ClassCode;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import extensions.pc.policy.typekey.WC7GoverningLaw;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.policy.audit.entity.Auditable;
import gw.pc.policy.period.entity.PolicyLocation;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.extract.entity.Extractable;
import gw.pl.persistence.core.Key;
import gw.pl.persistence.core.effdate.entity.EffDated;
import gw.pl.persistence.core.entity.KeyableBean;

public abstract class WC7CoveredEmployeeBaseStub
    extends EffDatedBeanProxy
    implements WC7CoveredEmployeeBaseInternalStubI
{


    @Override
    public extensions.pc.policy.typekey.WC7CoveredEmployeeBase getSubtype() {
        return ((extensions.pc.policy.typekey.WC7CoveredEmployeeBase) getFieldValue(SUBTYPE_PROP.get()));
    }

    @Override
    public void setSubtype(extensions.pc.policy.typekey.WC7CoveredEmployeeBase value) {
        setFieldValue(SUBTYPE_PROP.get(), value);
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
    public Boolean isIfAnyExposure() {
        return ((Boolean) getFieldValue(IFANYEXPOSURE_PROP.get()));
    }

    @Override
    public void setIfAnyExposure(Boolean value) {
        setFieldValue(IFANYEXPOSURE_PROP.get(), value);
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
    public Boolean isSupplementalDiseaseLoaded() {
        return ((Boolean) getFieldValue(SUPPLEMENTALDISEASELOADED_PROP.get()));
    }

    @Override
    public void setSupplementalDiseaseLoaded(Boolean value) {
        setFieldValue(SUPPLEMENTALDISEASELOADED_PROP.get(), value);
    }

    @Override
    public BigDecimal getSupplementalDiseaseLoadingRate() {
        return ((BigDecimal) getFieldValue(SUPPLEMENTALDISEASELOADINGRATE_PROP.get()));
    }

    @Override
    public void setSupplementalDiseaseLoadingRate(BigDecimal value) {
        setFieldValue(SUPPLEMENTALDISEASELOADINGRATE_PROP.get(), value);
    }

    @Override
    public BigDecimal getClassCodeRate() {
        return ((BigDecimal) getFieldValue(CLASSCODERATE_PROP.get()));
    }

    @Override
    public void setClassCodeRate(BigDecimal value) {
        setFieldValue(CLASSCODERATE_PROP.get(), value);
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
    public PolicyLocation getLocation() {
        return ((PolicyLocation) getFieldValue(LOCATION_PROP.get()));
    }

    @Override
    public void setLocation(PolicyLocation value) {
        setFieldValue(LOCATION_PROP.get(), value);
    }

    @Override
    public Key getLocationID() {
        return ((Key) getRawFieldValue(LOCATION_PROP.get()));
    }

    @Override
    public void setLocationID(Key value) {
        setFieldValue(LOCATION_PROP.get(), value);
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
    public extensions.pc.policy.entity.WC7CoveredEmployeeBase getBasedOn() {
        return ((extensions.pc.policy.entity.WC7CoveredEmployeeBase) getBasedOnUntyped());
    }

    @Override
    public extensions.pc.policy.entity.WC7CoveredEmployeeBase getSlice(Date sliceDate) {
        return ((extensions.pc.policy.entity.WC7CoveredEmployeeBase) getSliceUntyped(sliceDate));
    }

    @Override
    public extensions.pc.policy.entity.WC7CoveredEmployeeBase getUnsliced() {
        return ((extensions.pc.policy.entity.WC7CoveredEmployeeBase) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public extensions.pc.policy.entity.WC7CoveredEmployeeBase split(Date splitDate) {
        return ((extensions.pc.policy.entity.WC7CoveredEmployeeBase) splitUntyped(splitDate));
    }

    @Override
    public extensions.pc.policy.entity.WC7CoveredEmployeeBase clone() {
        return ((extensions.pc.policy.entity.WC7CoveredEmployeeBase) cloneUntyped());
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
