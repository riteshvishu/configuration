
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WC7ClassCodeType
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WC7ClassCodeType> TYPE = new TypeListIntrinsicTypeCache<WC7ClassCodeType>("WC7ClassCodeType");
    public final static extensions.pc.policy.typekey.WC7ClassCodeType.WC7ClassCodeTypeCache TC_ADMIRALTY = new extensions.pc.policy.typekey.WC7ClassCodeType.WC7ClassCodeTypeCache(extensions.pc.policy.typekey.WC7ClassCodeType.TYPE, "Admiralty");
    public final static extensions.pc.policy.typekey.WC7ClassCodeType.WC7ClassCodeTypeCache TC_ATOMICENERGY = new extensions.pc.policy.typekey.WC7ClassCodeType.WC7ClassCodeTypeCache(extensions.pc.policy.typekey.WC7ClassCodeType.TYPE, "AtomicEnergy");
    public final static extensions.pc.policy.typekey.WC7ClassCodeType.WC7ClassCodeTypeCache TC_FELA = new extensions.pc.policy.typekey.WC7ClassCodeType.WC7ClassCodeTypeCache(extensions.pc.policy.typekey.WC7ClassCodeType.TYPE, "FELA");
    public final static extensions.pc.policy.typekey.WC7ClassCodeType.WC7ClassCodeTypeCache TC_NONRATABLE = new extensions.pc.policy.typekey.WC7ClassCodeType.WC7ClassCodeTypeCache(extensions.pc.policy.typekey.WC7ClassCodeType.TYPE, "Nonratable");
    public final static extensions.pc.policy.typekey.WC7ClassCodeType.WC7ClassCodeTypeCache TC_USLH = new extensions.pc.policy.typekey.WC7ClassCodeType.WC7ClassCodeTypeCache(extensions.pc.policy.typekey.WC7ClassCodeType.TYPE, "USLH");

    public WC7ClassCodeType(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7ClassCodeType getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7ClassCodeType> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7ClassCodeTypeCache
        extends TypeKeyCache
    {


        public WC7ClassCodeTypeCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7ClassCodeType get() {
            return ((WC7ClassCodeType) super.getKey());
        }

    }

}
