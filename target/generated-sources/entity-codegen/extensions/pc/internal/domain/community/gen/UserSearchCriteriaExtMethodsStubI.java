
package extensions.pc.internal.domain.community.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import gw.pl.community.entity.UserSearchCriteria;

public interface UserSearchCriteriaExtMethodsStubI {

    ColumnPropertyInfoCache GROUPNAMEKANJI_PROP = new ColumnPropertyInfoCache(UserSearchCriteria.TYPE, "GroupNameKanji");

    /**
     * Gets the value of the GroupNameKanji field.
     * Name of group the user belongs to in Kanji
     * 
     */
    String getGroupNameKanji();

    /**
     * Sets the value of the GroupNameKanji field.
     * 
     */
    void setGroupNameKanji(String value);

}
