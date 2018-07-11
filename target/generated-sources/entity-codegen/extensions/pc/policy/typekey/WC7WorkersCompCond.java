
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.SubtypeKey;
import gw.entity.ITypeList;

public final class WC7WorkersCompCond
    extends SubtypeKey
{

    public final static TypeListIntrinsicTypeCache<WC7WorkersCompCond> TYPE = new TypeListIntrinsicTypeCache<WC7WorkersCompCond>("WC7WorkersCompCond");
    public final static extensions.pc.policy.typekey.WC7WorkersCompCond.WC7WorkersCompCondCache TC_WC7LINESCHEDULECOND = new extensions.pc.policy.typekey.WC7WorkersCompCond.WC7WorkersCompCondCache(extensions.pc.policy.typekey.WC7WorkersCompCond.TYPE, "WC7LineScheduleCond");
    public final static extensions.pc.policy.typekey.WC7WorkersCompCond.WC7WorkersCompCondCache TC_WC7WORKERSCOMPCOND = new extensions.pc.policy.typekey.WC7WorkersCompCond.WC7WorkersCompCondCache(extensions.pc.policy.typekey.WC7WorkersCompCond.TYPE, "WC7WorkersCompCond");

    public WC7WorkersCompCond(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7WorkersCompCond getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7WorkersCompCond> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7WorkersCompCondCache
        extends TypeKeyCache
    {


        public WC7WorkersCompCondCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7WorkersCompCond get() {
            return ((WC7WorkersCompCond) super.getKey());
        }

    }

}
