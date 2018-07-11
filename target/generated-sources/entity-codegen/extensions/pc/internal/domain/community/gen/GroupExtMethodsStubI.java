
package extensions.pc.internal.domain.community.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import gw.pl.community.entity.Group;

public interface GroupExtMethodsStubI {

    ColumnPropertyInfoCache NAMEKANJI_PROP = new ColumnPropertyInfoCache(Group.TYPE, "NameKanji");

    /**
     * Gets the value of the NameKanji field.
     * The group name in Kanji.
     * 
     */
    String getNameKanji();

    /**
     * Sets the value of the NameKanji field.
     * 
     */
    void setNameKanji(String value);

}
