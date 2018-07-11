
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WC7ClassCodeProgramType
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WC7ClassCodeProgramType> TYPE = new TypeListIntrinsicTypeCache<WC7ClassCodeProgramType>("WC7ClassCodeProgramType");
    public final static extensions.pc.policy.typekey.WC7ClassCodeProgramType.WC7ClassCodeProgramTypeCache TC_PROGRAMI = new extensions.pc.policy.typekey.WC7ClassCodeProgramType.WC7ClassCodeProgramTypeCache(extensions.pc.policy.typekey.WC7ClassCodeProgramType.TYPE, "ProgramI");
    public final static extensions.pc.policy.typekey.WC7ClassCodeProgramType.WC7ClassCodeProgramTypeCache TC_PROGRAMIISTATEACT = new extensions.pc.policy.typekey.WC7ClassCodeProgramType.WC7ClassCodeProgramTypeCache(extensions.pc.policy.typekey.WC7ClassCodeProgramType.TYPE, "ProgramIIStateAct");
    public final static extensions.pc.policy.typekey.WC7ClassCodeProgramType.WC7ClassCodeProgramTypeCache TC_PROGRAMIIUSLH = new extensions.pc.policy.typekey.WC7ClassCodeProgramType.WC7ClassCodeProgramTypeCache(extensions.pc.policy.typekey.WC7ClassCodeProgramType.TYPE, "ProgramIIUSLH");

    public WC7ClassCodeProgramType(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7ClassCodeProgramType getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7ClassCodeProgramType> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7ClassCodeProgramTypeCache
        extends TypeKeyCache
    {


        public WC7ClassCodeProgramTypeCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7ClassCodeProgramType get() {
            return ((WC7ClassCodeProgramType) super.getKey());
        }

    }

}
