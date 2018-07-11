
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WCRateStepAction
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WCRateStepAction> TYPE = new TypeListIntrinsicTypeCache<WCRateStepAction>("WCRateStepAction");
    public final static extensions.pc.policy.typekey.WCRateStepAction.WCRateStepActionCache TC_CUSTOM = new extensions.pc.policy.typekey.WCRateStepAction.WCRateStepActionCache(extensions.pc.policy.typekey.WCRateStepAction.TYPE, "custom");
    public final static extensions.pc.policy.typekey.WCRateStepAction.WCRateStepActionCache TC_FEE = new extensions.pc.policy.typekey.WCRateStepAction.WCRateStepActionCache(extensions.pc.policy.typekey.WCRateStepAction.TYPE, "fee");
    public final static extensions.pc.policy.typekey.WCRateStepAction.WCRateStepActionCache TC_MODIFIER = new extensions.pc.policy.typekey.WCRateStepAction.WCRateStepActionCache(extensions.pc.policy.typekey.WCRateStepAction.TYPE, "modifier");
    public final static extensions.pc.policy.typekey.WCRateStepAction.WCRateStepActionCache TC_SUBTOTAL = new extensions.pc.policy.typekey.WCRateStepAction.WCRateStepActionCache(extensions.pc.policy.typekey.WCRateStepAction.TYPE, "subtotal");

    public WCRateStepAction(ITypeList type, String code) {
        super(type, code);
    }

    public static WCRateStepAction getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WCRateStepAction> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WCRateStepActionCache
        extends TypeKeyCache
    {


        public WCRateStepActionCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WCRateStepAction get() {
            return ((WCRateStepAction) super.getKey());
        }

    }

}
