
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.SubtypeKey;
import gw.entity.ITypeList;

public final class WC7EmployeeLeasingPlan
    extends SubtypeKey
{

    public final static TypeListIntrinsicTypeCache<WC7EmployeeLeasingPlan> TYPE = new TypeListIntrinsicTypeCache<WC7EmployeeLeasingPlan>("WC7EmployeeLeasingPlan");
    public final static extensions.pc.policy.typekey.WC7EmployeeLeasingPlan.WC7EmployeeLeasingPlanCache TC_WC7EMPLOYEELEASINGPLAN = new extensions.pc.policy.typekey.WC7EmployeeLeasingPlan.WC7EmployeeLeasingPlanCache(extensions.pc.policy.typekey.WC7EmployeeLeasingPlan.TYPE, "WC7EmployeeLeasingPlan");

    public WC7EmployeeLeasingPlan(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7EmployeeLeasingPlan getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7EmployeeLeasingPlan> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7EmployeeLeasingPlanCache
        extends TypeKeyCache
    {


        public WC7EmployeeLeasingPlanCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7EmployeeLeasingPlan get() {
            return ((WC7EmployeeLeasingPlan) super.getKey());
        }

    }

}
