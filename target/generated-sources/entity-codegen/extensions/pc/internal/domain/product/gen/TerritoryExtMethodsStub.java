
package extensions.pc.internal.domain.product.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.product.entity.DBTerritory;
import gw.pc.product.entity.Territory;
import gw.pl.persistence.core.Key;

public abstract class TerritoryExtMethodsStub
    extends AspectBase
    implements TerritoryExtInternalMethodsStubI
{


    protected TerritoryExtMethodsStub(Territory owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public Territory getOwner() {
        return ((Territory) super.getOwner());
    }

    @Override
    public DBTerritory getDBTerritory() {
        return ((DBTerritory) getFieldValue(DBTERRITORY_PROP.get()));
    }

    @Override
    public void setDBTerritory(DBTerritory value) {
        setFieldValue(DBTERRITORY_PROP.get(), value);
    }

    @Override
    public Key getDBTerritoryID() {
        return ((Key) getRawFieldValue(DBTERRITORY_PROP.get()));
    }

    @Override
    public void setDBTerritoryID(Key value) {
        setFieldValue(DBTERRITORY_PROP.get(), value);
    }

}
