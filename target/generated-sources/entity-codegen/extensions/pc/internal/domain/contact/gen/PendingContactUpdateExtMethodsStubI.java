
package extensions.pc.internal.domain.contact.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import gw.pc.contact.entity.PendingContactUpdate;

public interface PendingContactUpdateExtMethodsStubI {

    ColumnPropertyInfoCache COMPANYNAMEKANJI_PROP = new ColumnPropertyInfoCache(PendingContactUpdate.TYPE, "CompanyNameKanji");
    ColumnPropertyInfoCache COMPANYNAMEKANJIISNULL_PROP = new ColumnPropertyInfoCache(PendingContactUpdate.TYPE, "CompanyNameKanjiIsNull");
    ColumnPropertyInfoCache FIRSTNAMEKANJI_PROP = new ColumnPropertyInfoCache(PendingContactUpdate.TYPE, "FirstNameKanji");
    ColumnPropertyInfoCache FIRSTNAMEKANJIISNULL_PROP = new ColumnPropertyInfoCache(PendingContactUpdate.TYPE, "FirstNameKanjiIsNull");
    ColumnPropertyInfoCache LASTNAMEKANJI_PROP = new ColumnPropertyInfoCache(PendingContactUpdate.TYPE, "LastNameKanji");
    ColumnPropertyInfoCache LASTNAMEKANJIISNULL_PROP = new ColumnPropertyInfoCache(PendingContactUpdate.TYPE, "LastNameKanjiIsNull");
    ColumnPropertyInfoCache PARTICLE_PROP = new ColumnPropertyInfoCache(PendingContactUpdate.TYPE, "Particle");
    ColumnPropertyInfoCache PARTICLEISNULL_PROP = new ColumnPropertyInfoCache(PendingContactUpdate.TYPE, "ParticleIsNull");

    /**
     * Gets the value of the CompanyNameKanji field.
     * The role's kanji name, if it is a company, null otherwise.
     * 
     */
    String getCompanyNameKanji();

    /**
     * Sets the value of the CompanyNameKanji field.
     * 
     */
    void setCompanyNameKanji(String value);

    /**
     * Gets the value of the CompanyNameKanjiIsNull field.
     * True if the CompanyNameKanji should be overwritten with null.
     * 
     */
    Boolean isCompanyNameKanjiIsNull();

    /**
     * Sets the value of the CompanyNameKanjiIsNull field.
     * 
     */
    void setCompanyNameKanjiIsNull(Boolean value);

    /**
     * Gets the value of the FirstNameKanji field.
     * The role's first name kanji, if it is a person, null otherwise.
     * 
     */
    String getFirstNameKanji();

    /**
     * Sets the value of the FirstNameKanji field.
     * 
     */
    void setFirstNameKanji(String value);

    /**
     * Gets the value of the FirstNameKanjiIsNull field.
     * True if the FirstNameKanji should be overwritten with null.
     * 
     */
    Boolean isFirstNameKanjiIsNull();

    /**
     * Sets the value of the FirstNameKanjiIsNull field.
     * 
     */
    void setFirstNameKanjiIsNull(Boolean value);

    /**
     * Gets the value of the LastNameKanji field.
     * The role's last name kanji, if it is a person, null otherwise.
     * 
     */
    String getLastNameKanji();

    /**
     * Sets the value of the LastNameKanji field.
     * 
     */
    void setLastNameKanji(String value);

    /**
     * Gets the value of the LastNameKanjiIsNull field.
     * True if the LastNameKanji should be overwritten with null.
     * 
     */
    Boolean isLastNameKanjiIsNull();

    /**
     * Sets the value of the LastNameKanjiIsNull field.
     * 
     */
    void setLastNameKanjiIsNull(Boolean value);

    /**
     * Gets the value of the Particle field.
     * Particle for (French) name
     * 
     */
    String getParticle();

    /**
     * Sets the value of the Particle field.
     * 
     */
    void setParticle(String value);

    /**
     * Gets the value of the ParticleIsNull field.
     * True if the Particle should be overwritten with null.
     * 
     */
    Boolean isParticleIsNull();

    /**
     * Sets the value of the ParticleIsNull field.
     * 
     */
    void setParticleIsNull(Boolean value);

}
