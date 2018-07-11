
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WC7FedEmpLiabAct
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WC7FedEmpLiabAct> TYPE = new TypeListIntrinsicTypeCache<WC7FedEmpLiabAct>("WC7FedEmpLiabAct");
    public final static extensions.pc.policy.typekey.WC7FedEmpLiabAct.WC7FedEmpLiabActCache TC_FELA = new extensions.pc.policy.typekey.WC7FedEmpLiabAct.WC7FedEmpLiabActCache(WC7FedEmpLiabAct.TYPE, "fela");
    public final static extensions.pc.policy.typekey.WC7FedEmpLiabAct.WC7FedEmpLiabActCache TC_MARI = new extensions.pc.policy.typekey.WC7FedEmpLiabAct.WC7FedEmpLiabActCache(WC7FedEmpLiabAct.TYPE, "mari");

    public WC7FedEmpLiabAct(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7FedEmpLiabAct getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7FedEmpLiabAct> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7FedEmpLiabActCache
        extends TypeKeyCache
    {


        public WC7FedEmpLiabActCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7FedEmpLiabAct get() {
            return ((WC7FedEmpLiabAct) super.getKey());
        }

    }

}
