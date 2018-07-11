
package extensions.pc.internal.domain.community.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import gw.pl.community.entity.Organization;

public interface OrganizationExtMethodsStubI {

    ColumnPropertyInfoCache NAMEKANJI_PROP = new ColumnPropertyInfoCache(Organization.TYPE, "NameKanji");

    /**
     * Gets the value of the NameKanji field.
     * The kanji name of the organization.
     * 
     */
    String getNameKanji();

    /**
     * Sets the value of the NameKanji field.
     * 
     */
    void setNameKanji(String value);

}
