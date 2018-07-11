
package extensions.pc.internal.domain.contact.gen;

import com.guidewire.commons.metadata.types.ColumnDynPropertyInfo;

public interface GlobalAddressExtMethodsStubI {

    ColumnDynPropertyInfo ADDRESSLINE1KANJI_DYNPROP = new ColumnDynPropertyInfo("AddressLine1Kanji", "AddressLine1Kanji");
    ColumnDynPropertyInfo ADDRESSLINE2KANJI_DYNPROP = new ColumnDynPropertyInfo("AddressLine2Kanji", "AddressLine2Kanji");
    ColumnDynPropertyInfo CITYKANJI_DYNPROP = new ColumnDynPropertyInfo("CityKanji", "CityKanji");
    ColumnDynPropertyInfo CEDEX_DYNPROP = new ColumnDynPropertyInfo("CEDEX", "CEDEX");
    ColumnDynPropertyInfo CEDEXBUREAU_DYNPROP = new ColumnDynPropertyInfo("CEDEXBureau", "CEDEXBureau");

    /**
     * Gets the value of the AddressLine1Kanji field.
     * First line of mailing address in kanji (used only for Japanese addresses and will be null otherwise)
     * 
     */
    String getAddressLine1Kanji();

    /**
     * Sets the value of the AddressLine1Kanji field.
     * 
     */
    void setAddressLine1Kanji(String value);

    /**
     * Gets the value of the AddressLine2Kanji field.
     * Second line of mailing address in kanji (used only for Japanese addresses and will be null otherwise)
     * 
     */
    String getAddressLine2Kanji();

    /**
     * Sets the value of the AddressLine2Kanji field.
     * 
     */
    void setAddressLine2Kanji(String value);

    /**
     * Gets the value of the CityKanji field.
     * City in kanji (used only for Japanese addresses and will be null otherwise)
     * 
     */
    String getCityKanji();

    /**
     * Sets the value of the CityKanji field.
     * 
     */
    void setCityKanji(String value);

    /**
     * Gets the value of the CEDEX field.
     * CEDEX: Special business mail delivery flag (used only for French addresses and will be null otherwise)
     * 
     */
    Boolean isCEDEX();

    /**
     * Sets the value of the CEDEX field.
     * 
     */
    void setCEDEX(Boolean value);

    /**
     * Gets the value of the CEDEXBureau field.
     * CEDEX: Special business mail delivery bureau (used only for French addresses and will be null otherwise)
     * 
     */
    String getCEDEXBureau();

    /**
     * Sets the value of the CEDEXBureau field.
     * 
     */
    void setCEDEXBureau(String value);

}
