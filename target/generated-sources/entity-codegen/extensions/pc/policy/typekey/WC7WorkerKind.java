
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WC7WorkerKind
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WC7WorkerKind> TYPE = new TypeListIntrinsicTypeCache<WC7WorkerKind>("WC7WorkerKind");
    public final static extensions.pc.policy.typekey.WC7WorkerKind.WC7WorkerKindCache TC_DOMHOS = new extensions.pc.policy.typekey.WC7WorkerKind.WC7WorkerKindCache(WC7WorkerKind.TYPE, "domhos");
    public final static extensions.pc.policy.typekey.WC7WorkerKind.WC7WorkerKindCache TC_FARMAG = new extensions.pc.policy.typekey.WC7WorkerKind.WC7WorkerKindCache(WC7WorkerKind.TYPE, "farmag");

    public WC7WorkerKind(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7WorkerKind getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7WorkerKind> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7WorkerKindCache
        extends TypeKeyCache
    {


        public WC7WorkerKindCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7WorkerKind get() {
            return ((WC7WorkerKind) super.getKey());
        }

    }

}
