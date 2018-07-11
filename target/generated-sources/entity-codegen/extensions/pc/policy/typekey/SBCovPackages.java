
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class SBCovPackages
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<SBCovPackages> TYPE = new TypeListIntrinsicTypeCache<SBCovPackages>("SBCovPackages");
    public final static extensions.pc.policy.typekey.SBCovPackages.SBCovPackagesCache TC_CONTRACTORPACK = new extensions.pc.policy.typekey.SBCovPackages.SBCovPackagesCache(SBCovPackages.TYPE, "ContractorPack");
    public final static extensions.pc.policy.typekey.SBCovPackages.SBCovPackagesCache TC_FOODPACK = new extensions.pc.policy.typekey.SBCovPackages.SBCovPackagesCache(SBCovPackages.TYPE, "FoodPack");
    public final static extensions.pc.policy.typekey.SBCovPackages.SBCovPackagesCache TC_LESSORPACK = new extensions.pc.policy.typekey.SBCovPackages.SBCovPackagesCache(SBCovPackages.TYPE, "LessorPack");
    public final static extensions.pc.policy.typekey.SBCovPackages.SBCovPackagesCache TC_MERCHANTPACK = new extensions.pc.policy.typekey.SBCovPackages.SBCovPackagesCache(SBCovPackages.TYPE, "MerchantPack");
    public final static extensions.pc.policy.typekey.SBCovPackages.SBCovPackagesCache TC_RESIDENTIALPACK = new extensions.pc.policy.typekey.SBCovPackages.SBCovPackagesCache(SBCovPackages.TYPE, "ResidentialPack");
    public final static extensions.pc.policy.typekey.SBCovPackages.SBCovPackagesCache TC_TECHPACK = new extensions.pc.policy.typekey.SBCovPackages.SBCovPackagesCache(SBCovPackages.TYPE, "TechPack");

    public SBCovPackages(ITypeList type, String code) {
        super(type, code);
    }

    public static SBCovPackages getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<SBCovPackages> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class SBCovPackagesCache
        extends TypeKeyCache
    {


        public SBCovPackagesCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public SBCovPackages get() {
            return ((SBCovPackages) super.getKey());
        }

    }

}
