
package extensions.pc.internal.domain.product.gen;

import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import gw.pc.product.entity.DBTerritory;
import gw.pc.product.entity.Territory;

public interface TerritoryExtMethodsStubI {

    LinkPropertyInfoCache DBTERRITORY_PROP = new LinkPropertyInfoCache(Territory.TYPE, "DBTerritory");

    /**
     * Gets the value of the DBTerritory field.
     * Database Territory entity
     * 
     */
    DBTerritory getDBTerritory();

    /**
     * Sets the value of the DBTerritory field.
     * 
     */
    void setDBTerritory(DBTerritory value);

}
