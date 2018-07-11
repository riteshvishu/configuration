
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class PIPNJAggLimit
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<PIPNJAggLimit> TYPE = new TypeListIntrinsicTypeCache<PIPNJAggLimit>("PIPNJAggLimit");
    public final static extensions.pc.policy.typekey.PIPNJAggLimit.PIPNJAggLimitCache TC_104 = new extensions.pc.policy.typekey.PIPNJAggLimit.PIPNJAggLimitCache(PIPNJAggLimit.TYPE, "104");
    public final static extensions.pc.policy.typekey.PIPNJAggLimit.PIPNJAggLimitCache TC_UNLIMITED = new extensions.pc.policy.typekey.PIPNJAggLimit.PIPNJAggLimitCache(PIPNJAggLimit.TYPE, "unlimited");

    public PIPNJAggLimit(ITypeList type, String code) {
        super(type, code);
    }

    public static PIPNJAggLimit getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<PIPNJAggLimit> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class PIPNJAggLimitCache
        extends TypeKeyCache
    {


        public PIPNJAggLimitCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public PIPNJAggLimit get() {
            return ((PIPNJAggLimit) super.getKey());
        }

    }

}
