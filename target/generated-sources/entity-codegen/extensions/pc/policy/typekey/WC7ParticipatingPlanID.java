
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WC7ParticipatingPlanID
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WC7ParticipatingPlanID> TYPE = new TypeListIntrinsicTypeCache<WC7ParticipatingPlanID>("WC7ParticipatingPlanID");
    public final static extensions.pc.policy.typekey.WC7ParticipatingPlanID.WC7ParticipatingPlanIDCache TC_1YSTD = new extensions.pc.policy.typekey.WC7ParticipatingPlanID.WC7ParticipatingPlanIDCache(extensions.pc.policy.typekey.WC7ParticipatingPlanID.TYPE, "1ystd");
    public final static extensions.pc.policy.typekey.WC7ParticipatingPlanID.WC7ParticipatingPlanIDCache TC_2YSTD = new extensions.pc.policy.typekey.WC7ParticipatingPlanID.WC7ParticipatingPlanIDCache(extensions.pc.policy.typekey.WC7ParticipatingPlanID.TYPE, "2ystd");
    public final static extensions.pc.policy.typekey.WC7ParticipatingPlanID.WC7ParticipatingPlanIDCache TC_3YSTD = new extensions.pc.policy.typekey.WC7ParticipatingPlanID.WC7ParticipatingPlanIDCache(extensions.pc.policy.typekey.WC7ParticipatingPlanID.TYPE, "3ystd");

    public WC7ParticipatingPlanID(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7ParticipatingPlanID getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7ParticipatingPlanID> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7ParticipatingPlanIDCache
        extends TypeKeyCache
    {


        public WC7ParticipatingPlanIDCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7ParticipatingPlanID get() {
            return ((WC7ParticipatingPlanID) super.getKey());
        }

    }

}
