
package extensions.pc.internal.domain.community.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import gw.pl.community.entity.GroupSearchCriteria;

public interface GroupSearchCriteriaExtMethodsStubI {

    ColumnPropertyInfoCache GROUPNAMEKANJI_PROP = new ColumnPropertyInfoCache(GroupSearchCriteria.TYPE, "GroupNameKanji");

    /**
     * Gets the value of the GroupNameKanji field.
     * Group name to search for (kanji).
     * 
     */
    String getGroupNameKanji();

    /**
     * Sets the value of the GroupNameKanji field.
     * 
     */
    void setGroupNameKanji(String value);

}
