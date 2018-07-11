
package extensions.pc.internal.domain.address.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import gw.pc.address.entity.PendingAddressUpdate;

public interface PendingAddressUpdateExtMethodsStubI {

    ColumnPropertyInfoCache ADDRESSLINE1KANJI_PROP = new ColumnPropertyInfoCache(PendingAddressUpdate.TYPE, "AddressLine1Kanji");
    ColumnPropertyInfoCache ADDRESSLINE1KANJIISNULL_PROP = new ColumnPropertyInfoCache(PendingAddressUpdate.TYPE, "AddressLine1KanjiIsNull");
    ColumnPropertyInfoCache ADDRESSLINE2KANJI_PROP = new ColumnPropertyInfoCache(PendingAddressUpdate.TYPE, "AddressLine2Kanji");
    ColumnPropertyInfoCache ADDRESSLINE2KANJIISNULL_PROP = new ColumnPropertyInfoCache(PendingAddressUpdate.TYPE, "AddressLine2KanjiIsNull");
    ColumnPropertyInfoCache CITYKANJI_PROP = new ColumnPropertyInfoCache(PendingAddressUpdate.TYPE, "CityKanji");
    ColumnPropertyInfoCache CITYKANJIISNULL_PROP = new ColumnPropertyInfoCache(PendingAddressUpdate.TYPE, "CityKanjiIsNull");
    ColumnPropertyInfoCache CEDEX_PROP = new ColumnPropertyInfoCache(PendingAddressUpdate.TYPE, "CEDEX");
    ColumnPropertyInfoCache CEDEXISNULL_PROP = new ColumnPropertyInfoCache(PendingAddressUpdate.TYPE, "CEDEXIsNull");
    ColumnPropertyInfoCache CEDEXBUREAU_PROP = new ColumnPropertyInfoCache(PendingAddressUpdate.TYPE, "CEDEXBureau");
    ColumnPropertyInfoCache CEDEXBUREAUISNULL_PROP = new ColumnPropertyInfoCache(PendingAddressUpdate.TYPE, "CEDEXBureauIsNull");

    /**
     * Gets the value of the AddressLine1Kanji field.
     * Address Line 1 Kanji.
     * 
     */
    String getAddressLine1Kanji();

    /**
     * Sets the value of the AddressLine1Kanji field.
     * 
     */
    void setAddressLine1Kanji(String value);

    /**
     * Gets the value of the AddressLine1KanjiIsNull field.
     * True if Address Line 1 Kanji should be overwritten with null.
     * 
     */
    Boolean isAddressLine1KanjiIsNull();

    /**
     * Sets the value of the AddressLine1KanjiIsNull field.
     * 
     */
    void setAddressLine1KanjiIsNull(Boolean value);

    /**
     * Gets the value of the AddressLine2Kanji field.
     * Address Line 2 Kanji.
     * 
     */
    String getAddressLine2Kanji();

    /**
     * Sets the value of the AddressLine2Kanji field.
     * 
     */
    void setAddressLine2Kanji(String value);

    /**
     * Gets the value of the AddressLine2KanjiIsNull field.
     * True if Address Line 2 Kanji should be overwritten with null.
     * 
     */
    Boolean isAddressLine2KanjiIsNull();

    /**
     * Sets the value of the AddressLine2KanjiIsNull field.
     * 
     */
    void setAddressLine2KanjiIsNull(Boolean value);

    /**
     * Gets the value of the CityKanji field.
     * City Kanji
     * 
     */
    String getCityKanji();

    /**
     * Sets the value of the CityKanji field.
     * 
     */
    void setCityKanji(String value);

    /**
     * Gets the value of the CityKanjiIsNull field.
     * True if City Kanji should be overwritten with null.
     * 
     */
    Boolean isCityKanjiIsNull();

    /**
     * Sets the value of the CityKanjiIsNull field.
     * 
     */
    void setCityKanjiIsNull(Boolean value);

    /**
     * Gets the value of the CEDEX field.
     * CEDEX: Special business mail delivery flag (France)
     * 
     */
    Boolean isCEDEX();

    /**
     * Sets the value of the CEDEX field.
     * 
     */
    void setCEDEX(Boolean value);

    /**
     * Gets the value of the CEDEXIsNull field.
     * True if CEDEX should be overwritten with null.
     * 
     */
    Boolean isCEDEXIsNull();

    /**
     * Sets the value of the CEDEXIsNull field.
     * 
     */
    void setCEDEXIsNull(Boolean value);

    /**
     * Gets the value of the CEDEXBureau field.
     * CEDEX: Special business mail delivery bureau (France)
     * 
     */
    String getCEDEXBureau();

    /**
     * Sets the value of the CEDEXBureau field.
     * 
     */
    void setCEDEXBureau(String value);

    /**
     * Gets the value of the CEDEXBureauIsNull field.
     * True if CEDEX Bureau should be overwritten with null.
     * 
     */
    Boolean isCEDEXBureauIsNull();

    /**
     * Sets the value of the CEDEXBureauIsNull field.
     * 
     */
    void setCEDEXBureauIsNull(Boolean value);

}
