
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WC7FELACovEmpCostType
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WC7FELACovEmpCostType> TYPE = new TypeListIntrinsicTypeCache<WC7FELACovEmpCostType>("WC7FELACovEmpCostType");
    public final static extensions.pc.policy.typekey.WC7FELACovEmpCostType.WC7FELACovEmpCostTypeCache TC_FELACOVEMP = new extensions.pc.policy.typekey.WC7FELACovEmpCostType.WC7FELACovEmpCostTypeCache(extensions.pc.policy.typekey.WC7FELACovEmpCostType.TYPE, "FELACovEmp");
    public final static extensions.pc.policy.typekey.WC7FELACovEmpCostType.WC7FELACovEmpCostTypeCache TC_INCREASEDLIMITSFACTOR = new extensions.pc.policy.typekey.WC7FELACovEmpCostType.WC7FELACovEmpCostTypeCache(extensions.pc.policy.typekey.WC7FELACovEmpCostType.TYPE, "IncreasedLimitsFactor");
    public final static extensions.pc.policy.typekey.WC7FELACovEmpCostType.WC7FELACovEmpCostTypeCache TC_SUPPLEMENTALDISEASE = new extensions.pc.policy.typekey.WC7FELACovEmpCostType.WC7FELACovEmpCostTypeCache(extensions.pc.policy.typekey.WC7FELACovEmpCostType.TYPE, "SupplementalDisease");

    public WC7FELACovEmpCostType(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7FELACovEmpCostType getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7FELACovEmpCostType> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7FELACovEmpCostTypeCache
        extends TypeKeyCache
    {


        public WC7FELACovEmpCostTypeCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7FELACovEmpCostType get() {
            return ((WC7FELACovEmpCostType) super.getKey());
        }

    }

}
