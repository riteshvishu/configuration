
package extensions.pc.internal.domain.lob.ba.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import gw.pc.lob.ba.entity.CommercialDriver;

public interface CommercialDriverExtMethodsStubI {

    ColumnPropertyInfoCache FIRSTNAMEKANJI_PROP = new ColumnPropertyInfoCache(CommercialDriver.TYPE, "FirstNameKanji");
    ColumnPropertyInfoCache LASTNAMEKANJI_PROP = new ColumnPropertyInfoCache(CommercialDriver.TYPE, "LastNameKanji");

    /**
     * Gets the value of the FirstNameKanji field.
     * First name in Kanji
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
     * Last name in Kanji.
     * 
     */
    String getLastNameKanji();

    /**
     * Sets the value of the LastNameKanji field.
     * 
     */
    void setLastNameKanji(String value);

}
