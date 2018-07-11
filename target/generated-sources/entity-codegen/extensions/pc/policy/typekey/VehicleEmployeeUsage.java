
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class VehicleEmployeeUsage
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<VehicleEmployeeUsage> TYPE = new TypeListIntrinsicTypeCache<VehicleEmployeeUsage>("VehicleEmployeeUsage");
    public final static extensions.pc.policy.typekey.VehicleEmployeeUsage.VehicleEmployeeUsageCache TC_EMPLOYEESONLY = new extensions.pc.policy.typekey.VehicleEmployeeUsage.VehicleEmployeeUsageCache(VehicleEmployeeUsage.TYPE, "employeesonly");
    public final static extensions.pc.policy.typekey.VehicleEmployeeUsage.VehicleEmployeeUsageCache TC_MULTIUSE = new extensions.pc.policy.typekey.VehicleEmployeeUsage.VehicleEmployeeUsageCache(VehicleEmployeeUsage.TYPE, "multiuse");

    public VehicleEmployeeUsage(ITypeList type, String code) {
        super(type, code);
    }

    public static VehicleEmployeeUsage getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<VehicleEmployeeUsage> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class VehicleEmployeeUsageCache
        extends TypeKeyCache
    {


        public VehicleEmployeeUsageCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public VehicleEmployeeUsage get() {
            return ((VehicleEmployeeUsage) super.getKey());
        }

    }

}
