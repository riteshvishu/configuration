
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class RateConversionType
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<RateConversionType> TYPE = new TypeListIntrinsicTypeCache<RateConversionType>("RateConversionType");
    public final static extensions.pc.policy.typekey.RateConversionType.RateConversionTypeCache TC_AS_IS = new extensions.pc.policy.typekey.RateConversionType.RateConversionTypeCache(RateConversionType.TYPE, "as_is");
    public final static extensions.pc.policy.typekey.RateConversionType.RateConversionTypeCache TC_CREDIT = new extensions.pc.policy.typekey.RateConversionType.RateConversionTypeCache(RateConversionType.TYPE, "credit");
    public final static extensions.pc.policy.typekey.RateConversionType.RateConversionTypeCache TC_DIFF_FROM_1 = new extensions.pc.policy.typekey.RateConversionType.RateConversionTypeCache(RateConversionType.TYPE, "diff_from_1");

    public RateConversionType(ITypeList type, String code) {
        super(type, code);
    }

    public static RateConversionType getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<RateConversionType> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class RateConversionTypeCache
        extends TypeKeyCache
    {


        public RateConversionTypeCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public RateConversionType get() {
            return ((RateConversionType) super.getKey());
        }

    }

}
