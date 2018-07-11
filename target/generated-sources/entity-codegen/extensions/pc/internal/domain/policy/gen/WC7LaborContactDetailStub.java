
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import java.util.List;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7LaborContact;
import gw.api.copier.EffDatedCopyable;
import gw.api.domain.account.Mergeable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.contact.typekey.OrganizationType;
import gw.pl.extract.entity.Extractable;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.Key;
import gw.pl.persistence.core.effdate.entity.EffDated;
import gw.pl.persistence.core.entity.KeyableBean;

public abstract class WC7LaborContactDetailStub
    extends EffDatedBeanProxy
    implements WC7LaborContactDetailInternalStubI
{


    @Override
    public extensions.pc.policy.typekey.WC7LaborContactDetail getSubtype() {
        return ((extensions.pc.policy.typekey.WC7LaborContactDetail) getFieldValue(SUBTYPE_PROP.get()));
    }

    @Override
    public void setSubtype(extensions.pc.policy.typekey.WC7LaborContactDetail value) {
        setFieldValue(SUBTYPE_PROP.get(), value);
    }

    @Override
    public String getWorkLocation() {
        return ((String) getFieldValueForCodegen(WORKLOCATION_PROP.get()));
    }

    @Override
    public void setWorkLocation(String value) {
        setFieldValueForCodegen(WORKLOCATION_PROP.get(), value);
    }

    @Override
    public String getDescriptionOfDuties() {
        return ((String) getFieldValueForCodegen(DESCRIPTIONOFDUTIES_PROP.get()));
    }

    @Override
    public void setDescriptionOfDuties(String value) {
        setFieldValueForCodegen(DESCRIPTIONOFDUTIES_PROP.get(), value);
    }

    @Override
    public Integer getNumberOfEmployees() {
        return ((Integer) getFieldValue(NUMBEROFEMPLOYEES_PROP.get()));
    }

    @Override
    public void setNumberOfEmployees(Integer value) {
        setFieldValue(NUMBEROFEMPLOYEES_PROP.get(), value);
    }

    @Override
    public Date getContractEffectiveDate() {
        return ((Date) getFieldValue(CONTRACTEFFECTIVEDATE_PROP.get()));
    }

    @Override
    public void setContractEffectiveDate(Date value) {
        setFieldValue(CONTRACTEFFECTIVEDATE_PROP.get(), value);
    }

    @Override
    public Date getContractExpirationDate() {
        return ((Date) getFieldValue(CONTRACTEXPIRATIONDATE_PROP.get()));
    }

    @Override
    public void setContractExpirationDate(Date value) {
        setFieldValue(CONTRACTEXPIRATIONDATE_PROP.get(), value);
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
    public String getLaborContractorPolicyNumber() {
        return ((String) getFieldValueForCodegen(LABORCONTRACTORPOLICYNUMBER_PROP.get()));
    }

    @Override
    public void setLaborContractorPolicyNumber(String value) {
        setFieldValueForCodegen(LABORCONTRACTORPOLICYNUMBER_PROP.get(), value);
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
    public OrganizationType getEntityStatus() {
        return ((OrganizationType) getFieldValue(ENTITYSTATUS_PROP.get()));
    }

    @Override
    public void setEntityStatus(OrganizationType value) {
        setFieldValue(ENTITYSTATUS_PROP.get(), value);
    }

    @Override
    public WC7LaborContact getWC7LaborContact() {
        return ((WC7LaborContact) getFieldValue(WC7LABORCONTACT_PROP.get()));
    }

    @Override
    public void setWC7LaborContact(WC7LaborContact value) {
        setFieldValue(WC7LABORCONTACT_PROP.get(), value);
    }

    @Override
    public Key getWC7LaborContactID() {
        return ((Key) getRawFieldValue(WC7LABORCONTACT_PROP.get()));
    }

    @Override
    public void setWC7LaborContactID(Key value) {
        setFieldValue(WC7LABORCONTACT_PROP.get(), value);
    }

    @Override
    public extensions.pc.policy.entity.WC7LaborContactDetail getBasedOn() {
        return ((extensions.pc.policy.entity.WC7LaborContactDetail) getBasedOnUntyped());
    }

    @Override
    public extensions.pc.policy.entity.WC7LaborContactDetail getSlice(Date sliceDate) {
        return ((extensions.pc.policy.entity.WC7LaborContactDetail) getSliceUntyped(sliceDate));
    }

    @Override
    public extensions.pc.policy.entity.WC7LaborContactDetail getUnsliced() {
        return ((extensions.pc.policy.entity.WC7LaborContactDetail) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public extensions.pc.policy.entity.WC7LaborContactDetail split(Date splitDate) {
        return ((extensions.pc.policy.entity.WC7LaborContactDetail) splitUntyped(splitDate));
    }

    @Override
    public extensions.pc.policy.entity.WC7LaborContactDetail clone() {
        return ((extensions.pc.policy.entity.WC7LaborContactDetail) cloneUntyped());
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

    @Override
    public void merge(KeyableBean p0) {
        getInterfaceDelegate(Mergeable.class).merge(p0);
    }

}
