
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class CatastropheType
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<CatastropheType> TYPE = new TypeListIntrinsicTypeCache<CatastropheType>("CatastropheType");
    public final static extensions.pc.policy.typekey.CatastropheType.CatastropheTypeCache TC_INTERNAL = new extensions.pc.policy.typekey.CatastropheType.CatastropheTypeCache(CatastropheType.TYPE, "internal");
    public final static extensions.pc.policy.typekey.CatastropheType.CatastropheTypeCache TC_ISO = new extensions.pc.policy.typekey.CatastropheType.CatastropheTypeCache(CatastropheType.TYPE, "iso");

    public CatastropheType(ITypeList type, String code) {
        super(type, code);
    }

    public static CatastropheType getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<CatastropheType> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class CatastropheTypeCache
        extends TypeKeyCache
    {


        public CatastropheTypeCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public CatastropheType get() {
            return ((CatastropheType) super.getKey());
        }

    }

}
