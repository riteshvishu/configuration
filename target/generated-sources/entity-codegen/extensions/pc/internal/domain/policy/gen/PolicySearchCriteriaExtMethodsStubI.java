
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import gw.pc.job.typekey.NonRenewalCode;
import gw.pc.policy.entity.PolicySearchCriteria;
import gw.pc.policy.entity.UWCompany;
import gw.pc.policy.typekey.ReasonCode;

public interface PolicySearchCriteriaExtMethodsStubI {

    ColumnPropertyInfoCache ASSIGNEDRISK_PROP = new ColumnPropertyInfoCache(PolicySearchCriteria.TYPE, "AssignedRisk");
    LinkPropertyInfoCache UWCOMPANY_PROP = new LinkPropertyInfoCache(PolicySearchCriteria.TYPE, "UWCompany");
    TypekeyPropertyInfoCache REJECTREASON_PROP = new TypekeyPropertyInfoCache(PolicySearchCriteria.TYPE, "RejectReason");
    ColumnPropertyInfoCache PRIMARYINSUREDCITYKANJI_PROP = new ColumnPropertyInfoCache(PolicySearchCriteria.TYPE, "PrimaryInsuredCityKanji");
    TypekeyPropertyInfoCache NONRENEWALCODE_PROP = new TypekeyPropertyInfoCache(PolicySearchCriteria.TYPE, "NonRenewalCode");
    ColumnPropertyInfoCache FIRSTNAMEKANJI_PROP = new ColumnPropertyInfoCache(PolicySearchCriteria.TYPE, "FirstNameKanji");
    ColumnPropertyInfoCache LASTNAMEKANJI_PROP = new ColumnPropertyInfoCache(PolicySearchCriteria.TYPE, "LastNameKanji");
    ColumnPropertyInfoCache COMPANYNAMEKANJI_PROP = new ColumnPropertyInfoCache(PolicySearchCriteria.TYPE, "CompanyNameKanji");
    ColumnPropertyInfoCache PARTICLE_PROP = new ColumnPropertyInfoCache(PolicySearchCriteria.TYPE, "Particle");

    /**
     * Gets the value of the AssignedRisk field.
     * Flag for policy/risk assigned by state requirement
     * 
     */
    Boolean isAssignedRisk();

    /**
     * Sets the value of the AssignedRisk field.
     * 
     */
    void setAssignedRisk(Boolean value);

    /**
     * Gets the value of the UWCompany field.
     * Underwriting company that insures this policy
     * 
     */
    UWCompany getUWCompany();

    /**
     * Sets the value of the UWCompany field.
     * 
     */
    void setUWCompany(UWCompany value);

    /**
     * Gets the value of the RejectReason field.
     * The reason that this job was declined
     * 
     */
    ReasonCode getRejectReason();

    /**
     * Sets the value of the RejectReason field.
     * 
     */
    void setRejectReason(ReasonCode value);

    /**
     * Gets the value of the PrimaryInsuredCityKanji field.
     * Primary Insured city in Kanji for which to search
     * 
     */
    String getPrimaryInsuredCityKanji();

    /**
     * Sets the value of the PrimaryInsuredCityKanji field.
     * 
     */
    void setPrimaryInsuredCityKanji(String value);

    /**
     * Gets the value of the NonRenewalCode field.
     * NonRenewal reason codes
     * 
     */
    NonRenewalCode getNonRenewalCode();

    /**
     * Sets the value of the NonRenewalCode field.
     * 
     */
    void setNonRenewalCode(NonRenewalCode value);

    /**
     * Gets the value of the FirstNameKanji field.
     * The kanji first name, if searching for a person.
     * 
     */
    String getFirstNameKanji();

    /**
     * Sets the value of the FirstNameKanji field.
     * 
     */
    void setFirstNameKanji(String value);

    /**
     * Gets the value of the LastNameKanji field.
     * The kanji last name, if searching for a person.
     * 
     */
    String getLastNameKanji();

    /**
     * Sets the value of the LastNameKanji field.
     * 
     */
    void setLastNameKanji(String value);

    /**
     * Gets the value of the CompanyNameKanji field.
     * The kanji company name, if searching for a company.
     * 
     */
    String getCompanyNameKanji();

    /**
     * Sets the value of the CompanyNameKanji field.
     * 
     */
    void setCompanyNameKanji(String value);

    /**
     * Gets the value of the Particle field.
     * The particle of the name, if applicable to your locale.
     * 
     */
    String getParticle();

    /**
     * Sets the value of the Particle field.
     * 
     */
    void setParticle(String value);

}
