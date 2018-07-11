
package extensions.pc.internal.domain.policy.period.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import gw.pc.policy.period.entity.PolicyLocation;

public interface PolicyLocationExtMethodsStubI {

    ColumnPropertyInfoCache ADDRESSLINE1KANJIINTERNAL_PROP = new ColumnPropertyInfoCache(PolicyLocation.TYPE, "AddressLine1KanjiInternal");
    ColumnPropertyInfoCache ADDRESSLINE2KANJIINTERNAL_PROP = new ColumnPropertyInfoCache(PolicyLocation.TYPE, "AddressLine2KanjiInternal");
    ColumnPropertyInfoCache CITYKANJIINTERNAL_PROP = new ColumnPropertyInfoCache(PolicyLocation.TYPE, "CityKanjiInternal");
    ColumnPropertyInfoCache CEDEXINTERNAL_PROP = new ColumnPropertyInfoCache(PolicyLocation.TYPE, "CEDEXInternal");
    ColumnPropertyInfoCache CEDEXBUREAUINTERNAL_PROP = new ColumnPropertyInfoCache(PolicyLocation.TYPE, "CEDEXBureauInternal");

    /**
     * Gets the value of the CEDEXInternal field.
     * CEDEX: Special business mail delivery flag (France)
     * 
     */
    Boolean isCEDEXInternal();

    /**
     * Sets the value of the CEDEXInternal field.
     * 
     */
    void setCEDEXInternal(Boolean value);

    /**
     * Gets the value of the CEDEXBureauInternal field.
     * CEDEX: Special business mail delivery bureau (France)
     * 
     */
    String getCEDEXBureauInternal();

    /**
     * Sets the value of the CEDEXBureauInternal field.
     * 
     */
    void setCEDEXBureauInternal(String value);

}
