
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WC7ProfessionalEmployeeType
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WC7ProfessionalEmployeeType> TYPE = new TypeListIntrinsicTypeCache<WC7ProfessionalEmployeeType>("WC7ProfessionalEmployeeType");
    public final static extensions.pc.policy.typekey.WC7ProfessionalEmployeeType.WC7ProfessionalEmployeeTypeCache TC_CLIENT = new extensions.pc.policy.typekey.WC7ProfessionalEmployeeType.WC7ProfessionalEmployeeTypeCache(extensions.pc.policy.typekey.WC7ProfessionalEmployeeType.TYPE, "Client");
    public final static extensions.pc.policy.typekey.WC7ProfessionalEmployeeType.WC7ProfessionalEmployeeTypeCache TC_PEO = new extensions.pc.policy.typekey.WC7ProfessionalEmployeeType.WC7ProfessionalEmployeeTypeCache(extensions.pc.policy.typekey.WC7ProfessionalEmployeeType.TYPE, "PEO");

    public WC7ProfessionalEmployeeType(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7ProfessionalEmployeeType getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7ProfessionalEmployeeType> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7ProfessionalEmployeeTypeCache
        extends TypeKeyCache
    {


        public WC7ProfessionalEmployeeTypeCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7ProfessionalEmployeeType get() {
            return ((WC7ProfessionalEmployeeType) super.getKey());
        }

    }

}
