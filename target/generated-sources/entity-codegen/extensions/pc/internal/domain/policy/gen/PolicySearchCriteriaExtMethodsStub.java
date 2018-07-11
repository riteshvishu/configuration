
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.job.typekey.NonRenewalCode;
import gw.pc.policy.entity.PolicySearchCriteria;
import gw.pc.policy.entity.UWCompany;
import gw.pc.policy.typekey.ReasonCode;
import gw.pl.persistence.core.Key;

public abstract class PolicySearchCriteriaExtMethodsStub
    extends AspectBase
    implements PolicySearchCriteriaExtInternalMethodsStubI
{


    protected PolicySearchCriteriaExtMethodsStub(PolicySearchCriteria owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public PolicySearchCriteria getOwner() {
        return ((PolicySearchCriteria) super.getOwner());
    }

    @Override
    public Boolean isAssignedRisk() {
        return ((Boolean) getFieldValue(ASSIGNEDRISK_PROP.get()));
    }

    @Override
    public void setAssignedRisk(Boolean value) {
        setFieldValue(ASSIGNEDRISK_PROP.get(), value);
    }

    @Override
    public UWCompany getUWCompany() {
        return ((UWCompany) getFieldValue(UWCOMPANY_PROP.get()));
    }

    @Override
    public void setUWCompany(UWCompany value) {
        setFieldValue(UWCOMPANY_PROP.get(), value);
    }

    @Override
    public Key getUWCompanyID() {
        return ((Key) getRawFieldValue(UWCOMPANY_PROP.get()));
    }

    @Override
    public void setUWCompanyID(Key value) {
        setFieldValue(UWCOMPANY_PROP.get(), value);
    }

    @Override
    public ReasonCode getRejectReason() {
        return ((ReasonCode) getFieldValue(REJECTREASON_PROP.get()));
    }

    @Override
    public void setRejectReason(ReasonCode value) {
        setFieldValue(REJECTREASON_PROP.get(), value);
    }

    @Override
    public String getPrimaryInsuredCityKanji() {
        return ((String) getFieldValueForCodegen(PRIMARYINSUREDCITYKANJI_PROP.get()));
    }

    @Override
    public void setPrimaryInsuredCityKanji(String value) {
        setFieldValueForCodegen(PRIMARYINSUREDCITYKANJI_PROP.get(), value);
    }

    @Override
    public NonRenewalCode getNonRenewalCode() {
        return ((NonRenewalCode) getFieldValue(NONRENEWALCODE_PROP.get()));
    }

    @Override
    public void setNonRenewalCode(NonRenewalCode value) {
        setFieldValue(NONRENEWALCODE_PROP.get(), value);
    }

    @Override
    public String getFirstNameKanji() {
        return ((String) getFieldValueForCodegen(FIRSTNAMEKANJI_PROP.get()));
    }

    @Override
    public void setFirstNameKanji(String value) {
        setFieldValueForCodegen(FIRSTNAMEKANJI_PROP.get(), value);
    }

    @Override
    public String getLastNameKanji() {
        return ((String) getFieldValueForCodegen(LASTNAMEKANJI_PROP.get()));
    }

    @Override
    public void setLastNameKanji(String value) {
        setFieldValueForCodegen(LASTNAMEKANJI_PROP.get(), value);
    }

    @Override
    public String getCompanyNameKanji() {
        return ((String) getFieldValueForCodegen(COMPANYNAMEKANJI_PROP.get()));
    }

    @Override
    public void setCompanyNameKanji(String value) {
        setFieldValueForCodegen(COMPANYNAMEKANJI_PROP.get(), value);
    }

    @Override
    public String getParticle() {
        return ((String) getFieldValueForCodegen(PARTICLE_PROP.get()));
    }

    @Override
    public void setParticle(String value) {
        setFieldValueForCodegen(PARTICLE_PROP.get(), value);
    }

}
