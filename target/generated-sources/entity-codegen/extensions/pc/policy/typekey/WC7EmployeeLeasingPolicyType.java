
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WC7EmployeeLeasingPolicyType
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WC7EmployeeLeasingPolicyType> TYPE = new TypeListIntrinsicTypeCache<WC7EmployeeLeasingPolicyType>("WC7EmployeeLeasingPolicyType");
    public final static extensions.pc.policy.typekey.WC7EmployeeLeasingPolicyType.WC7EmployeeLeasingPolicyTypeCache TC_CLIENTDIRECT = new extensions.pc.policy.typekey.WC7EmployeeLeasingPolicyType.WC7EmployeeLeasingPolicyTypeCache(extensions.pc.policy.typekey.WC7EmployeeLeasingPolicyType.TYPE, "ClientDirect");
    public final static extensions.pc.policy.typekey.WC7EmployeeLeasingPolicyType.WC7EmployeeLeasingPolicyTypeCache TC_MCP = new extensions.pc.policy.typekey.WC7EmployeeLeasingPolicyType.WC7EmployeeLeasingPolicyTypeCache(extensions.pc.policy.typekey.WC7EmployeeLeasingPolicyType.TYPE, "MCP");
    public final static extensions.pc.policy.typekey.WC7EmployeeLeasingPolicyType.WC7EmployeeLeasingPolicyTypeCache TC_MASTER = new extensions.pc.policy.typekey.WC7EmployeeLeasingPolicyType.WC7EmployeeLeasingPolicyTypeCache(extensions.pc.policy.typekey.WC7EmployeeLeasingPolicyType.TYPE, "Master");
    public final static extensions.pc.policy.typekey.WC7EmployeeLeasingPolicyType.WC7EmployeeLeasingPolicyTypeCache TC_MULTIPLEPEO = new extensions.pc.policy.typekey.WC7EmployeeLeasingPolicyType.WC7EmployeeLeasingPolicyTypeCache(extensions.pc.policy.typekey.WC7EmployeeLeasingPolicyType.TYPE, "MultiplePEO");

    public WC7EmployeeLeasingPolicyType(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7EmployeeLeasingPolicyType getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7EmployeeLeasingPolicyType> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7EmployeeLeasingPolicyTypeCache
        extends TypeKeyCache
    {


        public WC7EmployeeLeasingPolicyTypeCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7EmployeeLeasingPolicyType get() {
            return ((WC7EmployeeLeasingPolicyType) super.getKey());
        }

    }

}
