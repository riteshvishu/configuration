
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class AggLimitLevel
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<AggLimitLevel> TYPE = new TypeListIntrinsicTypeCache<AggLimitLevel>("AggLimitLevel");
    public final static extensions.pc.policy.typekey.AggLimitLevel.AggLimitLevelCache TC_BUILDING = new extensions.pc.policy.typekey.AggLimitLevel.AggLimitLevelCache(AggLimitLevel.TYPE, "building");
    public final static extensions.pc.policy.typekey.AggLimitLevel.AggLimitLevelCache TC_LOCATION = new extensions.pc.policy.typekey.AggLimitLevel.AggLimitLevelCache(AggLimitLevel.TYPE, "location");
    public final static extensions.pc.policy.typekey.AggLimitLevel.AggLimitLevelCache TC_POLICY = new extensions.pc.policy.typekey.AggLimitLevel.AggLimitLevelCache(AggLimitLevel.TYPE, "policy");

    public AggLimitLevel(ITypeList type, String code) {
        super(type, code);
    }

    public static AggLimitLevel getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<AggLimitLevel> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class AggLimitLevelCache
        extends TypeKeyCache
    {


        public AggLimitLevelCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public AggLimitLevel get() {
            return ((AggLimitLevel) super.getKey());
        }

    }

}
