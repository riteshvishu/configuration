
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import java.util.List;
import com.guidewire.pc.domain.policy.audit.impl.AuditableInternal;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7DiseaseCode;
import extensions.pc.policy.entity.WC7SupplDiseaseCost;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.policy.audit.entity.Auditable;
import gw.pc.policy.period.entity.PolicyLocation;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.extract.entity.Extractable;
import gw.pl.persistence.core.Key;
import gw.pl.persistence.core.effdate.entity.EffDated;
import gw.pl.persistence.core.entity.KeyableBean;

public abstract class WC7SupplDiseaseExposureStub
    extends EffDatedBeanProxy
    implements WC7SupplDiseaseExposureInternalStubI
{


    @Override
    public extensions.pc.policy.typekey.WC7SupplDiseaseExposure getSubtype() {
        return ((extensions.pc.policy.typekey.WC7SupplDiseaseExposure) getFieldValue(SUBTYPE_PROP.get()));
    }

    @Override
    public void setSubtype(extensions.pc.policy.typekey.WC7SupplDiseaseExposure value) {
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
    public WC7SupplDiseaseCost[] getCosts() {
        return ((WC7SupplDiseaseCost[]) getFieldValue(COSTS_PROP.get()));
    }

    @Override
    public void addToCosts(WC7SupplDiseaseCost value) {
        addArrayElement(COSTS_PROP.get(), value);
    }

    @Override
    public void removeFromCosts(WC7SupplDiseaseCost value) {
        removeArrayElement(COSTS_PROP.get(), value);
    }

    @Override
    public WC7DiseaseCode getDiseaseCode() {
        return ((WC7DiseaseCode) getFieldValue(DISEASECODE_PROP.get()));
    }

    @Override
    public void setDiseaseCode(WC7DiseaseCode value) {
        setFieldValue(DISEASECODE_PROP.get(), value);
    }

    @Override
    public Key getDiseaseCodeID() {
        return ((Key) getRawFieldValue(DISEASECODE_PROP.get()));
    }

    @Override
    public void setDiseaseCodeID(Key value) {
        setFieldValue(DISEASECODE_PROP.get(), value);
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
    public extensions.pc.policy.entity.WC7SupplDiseaseExposure getBasedOn() {
        return ((extensions.pc.policy.entity.WC7SupplDiseaseExposure) getBasedOnUntyped());
    }

    @Override
    public extensions.pc.policy.entity.WC7SupplDiseaseExposure getSlice(Date sliceDate) {
        return ((extensions.pc.policy.entity.WC7SupplDiseaseExposure) getSliceUntyped(sliceDate));
    }

    @Override
    public extensions.pc.policy.entity.WC7SupplDiseaseExposure getUnsliced() {
        return ((extensions.pc.policy.entity.WC7SupplDiseaseExposure) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public extensions.pc.policy.entity.WC7SupplDiseaseExposure split(Date splitDate) {
        return ((extensions.pc.policy.entity.WC7SupplDiseaseExposure) splitUntyped(splitDate));
    }

    @Override
    public extensions.pc.policy.entity.WC7SupplDiseaseExposure clone() {
        return ((extensions.pc.policy.entity.WC7SupplDiseaseExposure) cloneUntyped());
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
