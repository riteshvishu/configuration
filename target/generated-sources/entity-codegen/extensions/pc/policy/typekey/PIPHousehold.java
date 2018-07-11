
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class PIPHousehold
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<PIPHousehold> TYPE = new TypeListIntrinsicTypeCache<PIPHousehold>("PIPHousehold");
    public final static extensions.pc.policy.typekey.PIPHousehold.PIPHouseholdCache TC_DECLINE = new extensions.pc.policy.typekey.PIPHousehold.PIPHouseholdCache(PIPHousehold.TYPE, "decline");
    public final static extensions.pc.policy.typekey.PIPHousehold.PIPHouseholdCache TC_FAMILY = new extensions.pc.policy.typekey.PIPHousehold.PIPHouseholdCache(PIPHousehold.TYPE, "family");
    public final static extensions.pc.policy.typekey.PIPHousehold.PIPHouseholdCache TC_INSURED = new extensions.pc.policy.typekey.PIPHousehold.PIPHouseholdCache(PIPHousehold.TYPE, "insured");

    public PIPHousehold(ITypeList type, String code) {
        super(type, code);
    }

    public static PIPHousehold getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<PIPHousehold> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class PIPHouseholdCache
        extends TypeKeyCache
    {


        public PIPHouseholdCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public PIPHousehold get() {
            return ((PIPHousehold) super.getKey());
        }

    }

}
