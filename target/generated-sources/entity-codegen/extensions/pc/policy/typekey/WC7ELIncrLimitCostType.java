
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WC7ELIncrLimitCostType
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WC7ELIncrLimitCostType> TYPE = new TypeListIntrinsicTypeCache<WC7ELIncrLimitCostType>("WC7ELIncrLimitCostType");
    public final static extensions.pc.policy.typekey.WC7ELIncrLimitCostType.WC7ELIncrLimitCostTypeCache TC_INCRLIMITCHARGE = new extensions.pc.policy.typekey.WC7ELIncrLimitCostType.WC7ELIncrLimitCostTypeCache(WC7ELIncrLimitCostType.TYPE, "incrlimitcharge");
    public final static extensions.pc.policy.typekey.WC7ELIncrLimitCostType.WC7ELIncrLimitCostTypeCache TC_INCRLIMITFACTOR = new extensions.pc.policy.typekey.WC7ELIncrLimitCostType.WC7ELIncrLimitCostTypeCache(WC7ELIncrLimitCostType.TYPE, "incrlimitfactor");

    public WC7ELIncrLimitCostType(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7ELIncrLimitCostType getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7ELIncrLimitCostType> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7ELIncrLimitCostTypeCache
        extends TypeKeyCache
    {


        public WC7ELIncrLimitCostTypeCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7ELIncrLimitCostType get() {
            return ((WC7ELIncrLimitCostType) super.getKey());
        }

    }

}
