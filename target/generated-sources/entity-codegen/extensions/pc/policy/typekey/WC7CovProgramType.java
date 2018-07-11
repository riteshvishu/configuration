
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WC7CovProgramType
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WC7CovProgramType> TYPE = new TypeListIntrinsicTypeCache<WC7CovProgramType>("WC7CovProgramType");
    public final static extensions.pc.policy.typekey.WC7CovProgramType.WC7CovProgramTypeCache TC_PROGRAMI = new extensions.pc.policy.typekey.WC7CovProgramType.WC7CovProgramTypeCache(WC7CovProgramType.TYPE, "ProgramI");
    public final static extensions.pc.policy.typekey.WC7CovProgramType.WC7CovProgramTypeCache TC_PROGRAMII = new extensions.pc.policy.typekey.WC7CovProgramType.WC7CovProgramTypeCache(WC7CovProgramType.TYPE, "ProgramII");

    public WC7CovProgramType(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7CovProgramType getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7CovProgramType> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7CovProgramTypeCache
        extends TypeKeyCache
    {


        public WC7CovProgramTypeCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7CovProgramType get() {
            return ((WC7CovProgramType) super.getKey());
        }

    }

}
