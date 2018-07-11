
package extensions.pc.internal.domain.product.gen;

import com.guidewire.pc.domain.product.impl.TerritoryImpl;
import extensions.pc.internal.domain.product.impl.TerritoryExtInternal;
import extensions.pc.internal.domain.product.impl.TerritoryExtMethodsImpl;
import gw.pc.product.entity.DBTerritory;
import gw.pl.persistence.core.Key;

public class TerritoryExtStub
    extends TerritoryImpl
    implements TerritoryExtInternal
{


    @Override
    public DBTerritory getDBTerritory() {
        return getExtensionDelegate(TerritoryExtMethodsImpl.class).getDBTerritory();
    }

    @Override
    public void setDBTerritory(DBTerritory value) {
        getExtensionDelegate(TerritoryExtMethodsImpl.class).setDBTerritory(value);
    }

    @Override
    public Key getDBTerritoryID() {
        return getExtensionDelegate(TerritoryExtMethodsImpl.class).getDBTerritoryID();
    }

    @Override
    public void setDBTerritoryID(Key value) {
        getExtensionDelegate(TerritoryExtMethodsImpl.class).setDBTerritoryID(value);
    }

}
