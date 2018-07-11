
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class PIPWorkLossExclusion
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<PIPWorkLossExclusion> TYPE = new TypeListIntrinsicTypeCache<PIPWorkLossExclusion>("PIPWorkLossExclusion");
    public final static extensions.pc.policy.typekey.PIPWorkLossExclusion.PIPWorkLossExclusionCache TC_EXCLUDEFAMILY = new extensions.pc.policy.typekey.PIPWorkLossExclusion.PIPWorkLossExclusionCache(PIPWorkLossExclusion.TYPE, "excludefamily");
    public final static extensions.pc.policy.typekey.PIPWorkLossExclusion.PIPWorkLossExclusionCache TC_EXCLUDEINSURED = new extensions.pc.policy.typekey.PIPWorkLossExclusion.PIPWorkLossExclusionCache(PIPWorkLossExclusion.TYPE, "excludeinsured");
    public final static extensions.pc.policy.typekey.PIPWorkLossExclusion.PIPWorkLossExclusionCache TC_NOEXCLUSION = new extensions.pc.policy.typekey.PIPWorkLossExclusion.PIPWorkLossExclusionCache(PIPWorkLossExclusion.TYPE, "noexclusion");

    public PIPWorkLossExclusion(ITypeList type, String code) {
        super(type, code);
    }

    public static PIPWorkLossExclusion getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<PIPWorkLossExclusion> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class PIPWorkLossExclusionCache
        extends TypeKeyCache
    {


        public PIPWorkLossExclusionCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public PIPWorkLossExclusion get() {
            return ((PIPWorkLossExclusion) super.getKey());
        }

    }

}
