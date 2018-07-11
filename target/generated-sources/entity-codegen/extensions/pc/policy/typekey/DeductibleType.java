
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class DeductibleType
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<DeductibleType> TYPE = new TypeListIntrinsicTypeCache<DeductibleType>("DeductibleType");
    public final static extensions.pc.policy.typekey.DeductibleType.DeductibleTypeCache TC_PERCLAIM = new extensions.pc.policy.typekey.DeductibleType.DeductibleTypeCache(DeductibleType.TYPE, "PerClaim");
    public final static extensions.pc.policy.typekey.DeductibleType.DeductibleTypeCache TC_PEROCCURRENCE = new extensions.pc.policy.typekey.DeductibleType.DeductibleTypeCache(DeductibleType.TYPE, "PerOccurrence");

    public DeductibleType(ITypeList type, String code) {
        super(type, code);
    }

    public static DeductibleType getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<DeductibleType> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class DeductibleTypeCache
        extends TypeKeyCache
    {


        public DeductibleTypeCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public DeductibleType get() {
            return ((DeductibleType) super.getKey());
        }

    }

}
