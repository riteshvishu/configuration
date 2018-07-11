
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.SubtypeKey;
import gw.entity.ITypeList;

public final class WC7WorkersCompExcl
    extends SubtypeKey
{

    public final static TypeListIntrinsicTypeCache<WC7WorkersCompExcl> TYPE = new TypeListIntrinsicTypeCache<WC7WorkersCompExcl>("WC7WorkersCompExcl");
    public final static extensions.pc.policy.typekey.WC7WorkersCompExcl.WC7WorkersCompExclCache TC_WC7LINESCHEDULEEXCL = new extensions.pc.policy.typekey.WC7WorkersCompExcl.WC7WorkersCompExclCache(extensions.pc.policy.typekey.WC7WorkersCompExcl.TYPE, "WC7LineScheduleExcl");
    public final static extensions.pc.policy.typekey.WC7WorkersCompExcl.WC7WorkersCompExclCache TC_WC7WORKERSCOMPEXCL = new extensions.pc.policy.typekey.WC7WorkersCompExcl.WC7WorkersCompExclCache(extensions.pc.policy.typekey.WC7WorkersCompExcl.TYPE, "WC7WorkersCompExcl");

    public WC7WorkersCompExcl(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7WorkersCompExcl getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7WorkersCompExcl> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7WorkersCompExclCache
        extends TypeKeyCache
    {


        public WC7WorkersCompExclCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7WorkersCompExcl get() {
            return ((WC7WorkersCompExcl) super.getKey());
        }

    }

}
