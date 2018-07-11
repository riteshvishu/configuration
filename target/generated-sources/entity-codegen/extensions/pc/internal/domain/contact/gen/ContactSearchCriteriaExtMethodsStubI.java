
package extensions.pc.internal.domain.contact.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import gw.pl.contact.entity.ContactSearchCriteria;

public interface ContactSearchCriteriaExtMethodsStubI {

    ColumnPropertyInfoCache FIRSTNAMEKANJI_PROP = new ColumnPropertyInfoCache(ContactSearchCriteria.TYPE, "FirstNameKanji");
    ColumnPropertyInfoCache KEYWORDKANJI_PROP = new ColumnPropertyInfoCache(ContactSearchCriteria.TYPE, "KeywordKanji");

    /**
     * Gets the value of the FirstNameKanji field.
     * First name in kanji
     * 
     */
    String getFirstNameKanji();

    /**
     * Sets the value of the FirstNameKanji field.
     * 
     */
    void setFirstNameKanji(String value);

    /**
     * Gets the value of the KeywordKanji field.
     * KeywordKanji is the general term for NameKanji (Companies and Places) and LastNameKanji (for Persons)
     * 
     */
    String getKeywordKanji();

    /**
     * Sets the value of the KeywordKanji field.
     * 
     */
    void setKeywordKanji(String value);

}
