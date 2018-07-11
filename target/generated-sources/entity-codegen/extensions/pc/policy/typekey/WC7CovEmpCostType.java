
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WC7CovEmpCostType
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WC7CovEmpCostType> TYPE = new TypeListIntrinsicTypeCache<WC7CovEmpCostType>("WC7CovEmpCostType");
    public final static extensions.pc.policy.typekey.WC7CovEmpCostType.WC7CovEmpCostTypeCache TC_CATASTROPHELOADING = new extensions.pc.policy.typekey.WC7CovEmpCostType.WC7CovEmpCostTypeCache(extensions.pc.policy.typekey.WC7CovEmpCostType.TYPE, "CatastropheLoading");
    public final static extensions.pc.policy.typekey.WC7CovEmpCostType.WC7CovEmpCostTypeCache TC_COALMINEDISCHARGE = new extensions.pc.policy.typekey.WC7CovEmpCostType.WC7CovEmpCostTypeCache(extensions.pc.policy.typekey.WC7CovEmpCostType.TYPE, "CoalMineDisCharge");
    public final static extensions.pc.policy.typekey.WC7CovEmpCostType.WC7CovEmpCostTypeCache TC_MANUALPREMIUM = new extensions.pc.policy.typekey.WC7CovEmpCostType.WC7CovEmpCostTypeCache(extensions.pc.policy.typekey.WC7CovEmpCostType.TYPE, "ManualPremium");
    public final static extensions.pc.policy.typekey.WC7CovEmpCostType.WC7CovEmpCostTypeCache TC_SUPPLEMENTALDISEASE = new extensions.pc.policy.typekey.WC7CovEmpCostType.WC7CovEmpCostTypeCache(extensions.pc.policy.typekey.WC7CovEmpCostType.TYPE, "SupplementalDisease");
    public final static extensions.pc.policy.typekey.WC7CovEmpCostType.WC7CovEmpCostTypeCache TC_USLH = new extensions.pc.policy.typekey.WC7CovEmpCostType.WC7CovEmpCostTypeCache(extensions.pc.policy.typekey.WC7CovEmpCostType.TYPE, "USLH");

    public WC7CovEmpCostType(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7CovEmpCostType getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7CovEmpCostType> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7CovEmpCostTypeCache
        extends TypeKeyCache
    {


        public WC7CovEmpCostTypeCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7CovEmpCostType get() {
            return ((WC7CovEmpCostType) super.getKey());
        }

    }

}
