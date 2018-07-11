
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WC7MaritimeCovEmpCostType
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WC7MaritimeCovEmpCostType> TYPE = new TypeListIntrinsicTypeCache<WC7MaritimeCovEmpCostType>("WC7MaritimeCovEmpCostType");
    public final static extensions.pc.policy.typekey.WC7MaritimeCovEmpCostType.WC7MaritimeCovEmpCostTypeCache TC_INCREASEDLIMITSFACTOR = new extensions.pc.policy.typekey.WC7MaritimeCovEmpCostType.WC7MaritimeCovEmpCostTypeCache(extensions.pc.policy.typekey.WC7MaritimeCovEmpCostType.TYPE, "IncreasedLimitsFactor");
    public final static extensions.pc.policy.typekey.WC7MaritimeCovEmpCostType.WC7MaritimeCovEmpCostTypeCache TC_MARITIMECOVEMP = new extensions.pc.policy.typekey.WC7MaritimeCovEmpCostType.WC7MaritimeCovEmpCostTypeCache(extensions.pc.policy.typekey.WC7MaritimeCovEmpCostType.TYPE, "MaritimeCovEmp");
    public final static extensions.pc.policy.typekey.WC7MaritimeCovEmpCostType.WC7MaritimeCovEmpCostTypeCache TC_SUPPLEMENTALDISEASE = new extensions.pc.policy.typekey.WC7MaritimeCovEmpCostType.WC7MaritimeCovEmpCostTypeCache(extensions.pc.policy.typekey.WC7MaritimeCovEmpCostType.TYPE, "SupplementalDisease");

    public WC7MaritimeCovEmpCostType(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7MaritimeCovEmpCostType getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7MaritimeCovEmpCostType> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7MaritimeCovEmpCostTypeCache
        extends TypeKeyCache
    {


        public WC7MaritimeCovEmpCostTypeCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7MaritimeCovEmpCostType get() {
            return ((WC7MaritimeCovEmpCostType) super.getKey());
        }

    }

}
