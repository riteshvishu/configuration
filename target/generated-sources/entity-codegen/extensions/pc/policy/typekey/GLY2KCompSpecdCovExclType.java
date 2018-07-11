
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class GLY2KCompSpecdCovExclType
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<GLY2KCompSpecdCovExclType> TYPE = new TypeListIntrinsicTypeCache<GLY2KCompSpecdCovExclType>("GLY2KCompSpecdCovExclType");
    public final static extensions.pc.policy.typekey.GLY2KCompSpecdCovExclType.GLY2KCompSpecdCovExclTypeCache TC_COMPLETEDOPERATION = new extensions.pc.policy.typekey.GLY2KCompSpecdCovExclType.GLY2KCompSpecdCovExclTypeCache(GLY2KCompSpecdCovExclType.TYPE, "CompletedOperation");
    public final static extensions.pc.policy.typekey.GLY2KCompSpecdCovExclType.GLY2KCompSpecdCovExclTypeCache TC_PRODUCT = new extensions.pc.policy.typekey.GLY2KCompSpecdCovExclType.GLY2KCompSpecdCovExclTypeCache(GLY2KCompSpecdCovExclType.TYPE, "Product");

    public GLY2KCompSpecdCovExclType(ITypeList type, String code) {
        super(type, code);
    }

    public static GLY2KCompSpecdCovExclType getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<GLY2KCompSpecdCovExclType> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class GLY2KCompSpecdCovExclTypeCache
        extends TypeKeyCache
    {


        public GLY2KCompSpecdCovExclTypeCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public GLY2KCompSpecdCovExclType get() {
            return ((GLY2KCompSpecdCovExclType) super.getKey());
        }

    }

}
