
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class FullLimitedTort
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<FullLimitedTort> TYPE = new TypeListIntrinsicTypeCache<FullLimitedTort>("FullLimitedTort");
    public final static extensions.pc.policy.typekey.FullLimitedTort.FullLimitedTortCache TC_FULL = new extensions.pc.policy.typekey.FullLimitedTort.FullLimitedTortCache(FullLimitedTort.TYPE, "full");
    public final static extensions.pc.policy.typekey.FullLimitedTort.FullLimitedTortCache TC_LIMITED = new extensions.pc.policy.typekey.FullLimitedTort.FullLimitedTortCache(FullLimitedTort.TYPE, "limited");

    public FullLimitedTort(ITypeList type, String code) {
        super(type, code);
    }

    public static FullLimitedTort getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<FullLimitedTort> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class FullLimitedTortCache
        extends TypeKeyCache
    {


        public FullLimitedTortCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public FullLimitedTort get() {
            return ((FullLimitedTort) super.getKey());
        }

    }

}
