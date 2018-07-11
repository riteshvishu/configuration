
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class RateSubtotalType
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<RateSubtotalType> TYPE = new TypeListIntrinsicTypeCache<RateSubtotalType>("RateSubtotalType");
    public final static extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache TC_BOP_EAP = new extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache(RateSubtotalType.TYPE, "bop_eap");
    public final static extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache TC_BOP_MANUAL = new extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache(RateSubtotalType.TYPE, "bop_manual");
    public final static extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache TC_BOP_MODIFIED = new extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache(RateSubtotalType.TYPE, "bop_modified");
    public final static extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache TC_BOP_STANDARD = new extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache(RateSubtotalType.TYPE, "bop_standard");
    public final static extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache TC_BOP_SUBJECT = new extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache(RateSubtotalType.TYPE, "bop_subject");
    public final static extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache TC_TOTAL_PREMIUM = new extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache(RateSubtotalType.TYPE, "total_premium");
    public final static extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache TC_WC_EAP = new extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache(RateSubtotalType.TYPE, "wc_eap");
    public final static extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache TC_WC_MANUAL = new extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache(RateSubtotalType.TYPE, "wc_manual");
    public final static extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache TC_WC_MODIFIED = new extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache(RateSubtotalType.TYPE, "wc_modified");
    public final static extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache TC_WC_STANDARD = new extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache(RateSubtotalType.TYPE, "wc_standard");
    public final static extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache TC_WC_SUBJECT = new extensions.pc.policy.typekey.RateSubtotalType.RateSubtotalTypeCache(RateSubtotalType.TYPE, "wc_subject");

    public RateSubtotalType(ITypeList type, String code) {
        super(type, code);
    }

    public static RateSubtotalType getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<RateSubtotalType> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class RateSubtotalTypeCache
        extends TypeKeyCache
    {


        public RateSubtotalTypeCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public RateSubtotalType get() {
            return ((RateSubtotalType) super.getKey());
        }

    }

}
