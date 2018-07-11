
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WC7LiabilityAct
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WC7LiabilityAct> TYPE = new TypeListIntrinsicTypeCache<WC7LiabilityAct>("WC7LiabilityAct");
    public final static extensions.pc.policy.typekey.WC7LiabilityAct.WC7LiabilityActCache TC_FEDERAL = new extensions.pc.policy.typekey.WC7LiabilityAct.WC7LiabilityActCache(WC7LiabilityAct.TYPE, "Federal");
    public final static extensions.pc.policy.typekey.WC7LiabilityAct.WC7LiabilityActCache TC_WORKERSCOMP = new extensions.pc.policy.typekey.WC7LiabilityAct.WC7LiabilityActCache(WC7LiabilityAct.TYPE, "WorkersComp");

    public WC7LiabilityAct(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7LiabilityAct getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7LiabilityAct> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7LiabilityActCache
        extends TypeKeyCache
    {


        public WC7LiabilityActCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7LiabilityAct get() {
            return ((WC7LiabilityAct) super.getKey());
        }

    }

}
