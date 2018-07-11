
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WorkCapacity
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WorkCapacity> TYPE = new TypeListIntrinsicTypeCache<WorkCapacity>("WorkCapacity");
    public final static extensions.pc.policy.typekey.WorkCapacity.WorkCapacityCache TC_ESTIMATEDRTW = new extensions.pc.policy.typekey.WorkCapacity.WorkCapacityCache(WorkCapacity.TYPE, "estimatedrtw");
    public final static extensions.pc.policy.typekey.WorkCapacity.WorkCapacityCache TC_FULLDUTY = new extensions.pc.policy.typekey.WorkCapacity.WorkCapacityCache(WorkCapacity.TYPE, "fullduty");
    public final static extensions.pc.policy.typekey.WorkCapacity.WorkCapacityCache TC_MODIFIEDDUTY = new extensions.pc.policy.typekey.WorkCapacity.WorkCapacityCache(WorkCapacity.TYPE, "modifiedduty");
    public final static extensions.pc.policy.typekey.WorkCapacity.WorkCapacityCache TC_STOPPED_WORK = new extensions.pc.policy.typekey.WorkCapacity.WorkCapacityCache(WorkCapacity.TYPE, "stopped_work");

    public WorkCapacity(ITypeList type, String code) {
        super(type, code);
    }

    public static WorkCapacity getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WorkCapacity> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WorkCapacityCache
        extends TypeKeyCache
    {


        public WorkCapacityCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WorkCapacity get() {
            return ((WorkCapacity) super.getKey());
        }

    }

}
