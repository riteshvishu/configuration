
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class BroadLimited
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<BroadLimited> TYPE = new TypeListIntrinsicTypeCache<BroadLimited>("BroadLimited");
    public final static extensions.pc.policy.typekey.BroadLimited.BroadLimitedCache TC_BROAD = new extensions.pc.policy.typekey.BroadLimited.BroadLimitedCache(BroadLimited.TYPE, "broad");
    public final static extensions.pc.policy.typekey.BroadLimited.BroadLimitedCache TC_LIMITED = new extensions.pc.policy.typekey.BroadLimited.BroadLimitedCache(BroadLimited.TYPE, "limited");

    public BroadLimited(ITypeList type, String code) {
        super(type, code);
    }

    public static BroadLimited getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<BroadLimited> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class BroadLimitedCache
        extends TypeKeyCache
    {


        public BroadLimitedCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public BroadLimited get() {
            return ((BroadLimited) super.getKey());
        }

    }

}
