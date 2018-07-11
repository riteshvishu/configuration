
package extensions.pc.internal.domain.community.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import gw.pl.community.entity.OrganizationSearchCriteria;

public interface OrganizationSearchCriteriaExtMethodsStubI {

    ColumnPropertyInfoCache NAMEKANJI_PROP = new ColumnPropertyInfoCache(OrganizationSearchCriteria.TYPE, "NameKanji");
    ColumnPropertyInfoCache CONTACTCITYKANJI_PROP = new ColumnPropertyInfoCache(OrganizationSearchCriteria.TYPE, "ContactCityKanji");

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

    /**
     * Gets the value of the ContactCityKanji field.
     * The contact city kanji for the organization.
     * 
     */
    String getContactCityKanji();

    /**
     * Sets the value of the ContactCityKanji field.
     * 
     */
    void setContactCityKanji(String value);

}
