
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WC7AffinityGroupType
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WC7AffinityGroupType> TYPE = new TypeListIntrinsicTypeCache<WC7AffinityGroupType>("WC7AffinityGroupType");
    public final static extensions.pc.policy.typekey.WC7AffinityGroupType.WC7AffinityGroupTypeCache TC_CLOSED = new extensions.pc.policy.typekey.WC7AffinityGroupType.WC7AffinityGroupTypeCache(extensions.pc.policy.typekey.WC7AffinityGroupType.TYPE, "Closed");
    public final static extensions.pc.policy.typekey.WC7AffinityGroupType.WC7AffinityGroupTypeCache TC_OPEN = new extensions.pc.policy.typekey.WC7AffinityGroupType.WC7AffinityGroupTypeCache(extensions.pc.policy.typekey.WC7AffinityGroupType.TYPE, "Open");

    public WC7AffinityGroupType(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7AffinityGroupType getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7AffinityGroupType> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7AffinityGroupTypeCache
        extends TypeKeyCache
    {


        public WC7AffinityGroupTypeCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7AffinityGroupType get() {
            return ((WC7AffinityGroupType) super.getKey());
        }

    }

}
