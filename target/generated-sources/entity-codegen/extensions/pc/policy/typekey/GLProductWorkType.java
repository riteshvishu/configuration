
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class GLProductWorkType
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<GLProductWorkType> TYPE = new TypeListIntrinsicTypeCache<GLProductWorkType>("GLProductWorkType");
    public final static extensions.pc.policy.typekey.GLProductWorkType.GLProductWorkTypeCache TC_PRODUCT = new extensions.pc.policy.typekey.GLProductWorkType.GLProductWorkTypeCache(GLProductWorkType.TYPE, "Product");
    public final static extensions.pc.policy.typekey.GLProductWorkType.GLProductWorkTypeCache TC_WORK = new extensions.pc.policy.typekey.GLProductWorkType.GLProductWorkTypeCache(GLProductWorkType.TYPE, "Work");

    public GLProductWorkType(ITypeList type, String code) {
        super(type, code);
    }

    public static GLProductWorkType getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<GLProductWorkType> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class GLProductWorkTypeCache
        extends TypeKeyCache
    {


        public GLProductWorkTypeCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public GLProductWorkType get() {
            return ((GLProductWorkType) super.getKey());
        }

    }

}
