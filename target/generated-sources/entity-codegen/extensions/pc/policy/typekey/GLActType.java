
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class GLActType
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<GLActType> TYPE = new TypeListIntrinsicTypeCache<GLActType>("GLActType");
    public final static extensions.pc.policy.typekey.GLActType.GLActTypeCache TC_COMPLETION = new extensions.pc.policy.typekey.GLActType.GLActTypeCache(GLActType.TYPE, "Completion");
    public final static extensions.pc.policy.typekey.GLActType.GLActTypeCache TC_DISPOSAL = new extensions.pc.policy.typekey.GLActType.GLActTypeCache(GLActType.TYPE, "Disposal");
    public final static extensions.pc.policy.typekey.GLActType.GLActTypeCache TC_DISTRIBUTION = new extensions.pc.policy.typekey.GLActType.GLActTypeCache(GLActType.TYPE, "Distribution");
    public final static extensions.pc.policy.typekey.GLActType.GLActTypeCache TC_MANUFACTURE = new extensions.pc.policy.typekey.GLActType.GLActTypeCache(GLActType.TYPE, "Manufacture");
    public final static extensions.pc.policy.typekey.GLActType.GLActTypeCache TC_SALE = new extensions.pc.policy.typekey.GLActType.GLActTypeCache(GLActType.TYPE, "Sale");

    public GLActType(ITypeList type, String code) {
        super(type, code);
    }

    public static GLActType getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<GLActType> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class GLActTypeCache
        extends TypeKeyCache
    {


        public GLActTypeCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public GLActType get() {
            return ((GLActType) super.getKey());
        }

    }

}
