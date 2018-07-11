
package extensions.pc.internal.domain.contact.gen;

import com.guidewire.commons.metadata.types.ColumnDynPropertyInfo;

public interface GlobalPersonNameExtMethodsStubI {

    ColumnDynPropertyInfo FIRSTNAMEKANJI_DYNPROP = new ColumnDynPropertyInfo("FirstNameKanji", "FirstNameKanji");
    ColumnDynPropertyInfo LASTNAMEKANJI_DYNPROP = new ColumnDynPropertyInfo("LastNameKanji", "LastNameKanji");
    ColumnDynPropertyInfo PARTICLE_DYNPROP = new ColumnDynPropertyInfo("Particle", "Particle");

    /**
     * Gets the value of the FirstNameKanji field.
     * First name in kanji (used only for Japanese names and will be null otherwise)
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
     * Last name in kanji (used only for Japanese names and will be null otherwise)
     * 
     */
    String getLastNameKanji();

    /**
     * Sets the value of the LastNameKanji field.
     * 
     */
    void setLastNameKanji(String value);

    /**
     * Gets the value of the Particle field.
     * Particle, such as 'de', 'von' (used for French names and will be null otherwise)
     * 
     */
    String getParticle();

    /**
     * Sets the value of the Particle field.
     * 
     */
    void setParticle(String value);

}
