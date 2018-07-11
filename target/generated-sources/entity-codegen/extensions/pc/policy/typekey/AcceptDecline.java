
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class AcceptDecline
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<AcceptDecline> TYPE = new TypeListIntrinsicTypeCache<AcceptDecline>("AcceptDecline");
    public final static extensions.pc.policy.typekey.AcceptDecline.AcceptDeclineCache TC_ACCEPT = new extensions.pc.policy.typekey.AcceptDecline.AcceptDeclineCache(AcceptDecline.TYPE, "accept");
    public final static extensions.pc.policy.typekey.AcceptDecline.AcceptDeclineCache TC_DECLINE = new extensions.pc.policy.typekey.AcceptDecline.AcceptDeclineCache(AcceptDecline.TYPE, "decline");

    public AcceptDecline(ITypeList type, String code) {
        super(type, code);
    }

    public static AcceptDecline getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<AcceptDecline> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class AcceptDeclineCache
        extends TypeKeyCache
    {


        public AcceptDeclineCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public AcceptDecline get() {
            return ((AcceptDecline) super.getKey());
        }

    }

}
