
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.policy.impl.PolicySearchCriteriaImpl;
import extensions.pc.internal.domain.policy.impl.PolicySearchCriteriaExtInternal;
import extensions.pc.internal.domain.policy.impl.PolicySearchCriteriaExtMethodsImpl;
import gw.pc.job.typekey.NonRenewalCode;
import gw.pc.policy.entity.UWCompany;
import gw.pc.policy.typekey.ReasonCode;
import gw.pl.persistence.core.Key;

public class PolicySearchCriteriaExtStub
    extends PolicySearchCriteriaImpl
    implements PolicySearchCriteriaExtInternal
{


    @Override
    public Boolean isAssignedRisk() {
        return getExtensionDelegate(PolicySearchCriteriaExtMethodsImpl.class).isAssignedRisk();
    }

    @Override
    public void setAssignedRisk(Boolean value) {
        getExtensionDelegate(PolicySearchCriteriaExtMethodsImpl.class).setAssignedRisk(value);
    }

    @Override
    public UWCompany getUWCompany() {
        return getExtensionDelegate(PolicySearchCriteriaExtMethodsImpl.class).getUWCompany();
    }

    @Override
    public void setUWCompany(UWCompany value) {
        getExtensionDelegate(PolicySearchCriteriaExtMethodsImpl.class).setUWCompany(value);
    }

    @Override
    public Key getUWCompanyID() {
        return getExtensionDelegate(PolicySearchCriteriaExtMethodsImpl.class).getUWCompanyID();
    }

    @Override
    public void setUWCompanyID(Key value) {
        getExtensionDelegate(PolicySearchCriteriaExtMethodsImpl.class).setUWCompanyID(value);
    }

    @Override
    public ReasonCode getRejectReason() {
        return getExtensionDelegate(PolicySearchCriteriaExtMethodsImpl.class).getRejectReason();
    }

    @Override
    public void setRejectReason(ReasonCode value) {
        getExtensionDelegate(PolicySearchCriteriaExtMethodsImpl.class).setRejectReason(value);
    }

    @Override
    public String getPrimaryInsuredCityKanji() {
        return getExtensionDelegate(PolicySearchCriteriaExtMethodsImpl.class).getPrimaryInsuredCityKanji();
    }

    @Override
    public void setPrimaryInsuredCityKanji(String value) {
        getExtensionDelegate(PolicySearchCriteriaExtMethodsImpl.class).setPrimaryInsuredCityKanji(value);
    }

    @Override
    public NonRenewalCode getNonRenewalCode() {
        return getExtensionDelegate(PolicySearchCriteriaExtMethodsImpl.class).getNonRenewalCode();
    }

    @Override
    public void setNonRenewalCode(NonRenewalCode value) {
        getExtensionDelegate(PolicySearchCriteriaExtMethodsImpl.class).setNonRenewalCode(value);
    }

    @Override
    public String getFirstNameKanji() {
        return getExtensionDelegate(PolicySearchCriteriaExtMethodsImpl.class).getFirstNameKanji();
    }

    @Override
    public void setFirstNameKanji(String value) {
        getExtensionDelegate(PolicySearchCriteriaExtMethodsImpl.class).setFirstNameKanji(value);
    }

    @Override
    public String getLastNameKanji() {
        return getExtensionDelegate(PolicySearchCriteriaExtMethodsImpl.class).getLastNameKanji();
    }

    @Override
    public void setLastNameKanji(String value) {
        getExtensionDelegate(PolicySearchCriteriaExtMethodsImpl.class).setLastNameKanji(value);
    }

    @Override
    public String getCompanyNameKanji() {
        return getExtensionDelegate(PolicySearchCriteriaExtMethodsImpl.class).getCompanyNameKanji();
    }

    @Override
    public void setCompanyNameKanji(String value) {
        getExtensionDelegate(PolicySearchCriteriaExtMethodsImpl.class).setCompanyNameKanji(value);
    }

    @Override
    public String getParticle() {
        return getExtensionDelegate(PolicySearchCriteriaExtMethodsImpl.class).getParticle();
    }

    @Override
    public void setParticle(String value) {
        getExtensionDelegate(PolicySearchCriteriaExtMethodsImpl.class).setParticle(value);
    }

}
