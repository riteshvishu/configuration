
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.SubtypeKey;
import gw.entity.ITypeList;

public final class WC7CoveredEmployeeBase
    extends SubtypeKey
{

    public final static TypeListIntrinsicTypeCache<WC7CoveredEmployeeBase> TYPE = new TypeListIntrinsicTypeCache<WC7CoveredEmployeeBase>("WC7CoveredEmployeeBase");
    public final static extensions.pc.policy.typekey.WC7CoveredEmployeeBase.WC7CoveredEmployeeBaseCache TC_WC7COVEREDEMPLOYEE = new extensions.pc.policy.typekey.WC7CoveredEmployeeBase.WC7CoveredEmployeeBaseCache(extensions.pc.policy.typekey.WC7CoveredEmployeeBase.TYPE, "WC7CoveredEmployee");
    public final static extensions.pc.policy.typekey.WC7CoveredEmployeeBase.WC7CoveredEmployeeBaseCache TC_WC7COVEREDEMPLOYEEBASE = new extensions.pc.policy.typekey.WC7CoveredEmployeeBase.WC7CoveredEmployeeBaseCache(extensions.pc.policy.typekey.WC7CoveredEmployeeBase.TYPE, "WC7CoveredEmployeeBase");
    public final static extensions.pc.policy.typekey.WC7CoveredEmployeeBase.WC7CoveredEmployeeBaseCache TC_WC7FEDCOVEREDEMPLOYEE = new extensions.pc.policy.typekey.WC7CoveredEmployeeBase.WC7CoveredEmployeeBaseCache(extensions.pc.policy.typekey.WC7CoveredEmployeeBase.TYPE, "WC7FedCoveredEmployee");
    public final static extensions.pc.policy.typekey.WC7CoveredEmployeeBase.WC7CoveredEmployeeBaseCache TC_WC7MARITIMECOVEREDEMPLOYEE = new extensions.pc.policy.typekey.WC7CoveredEmployeeBase.WC7CoveredEmployeeBaseCache(extensions.pc.policy.typekey.WC7CoveredEmployeeBase.TYPE, "WC7MaritimeCoveredEmployee");

    public WC7CoveredEmployeeBase(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7CoveredEmployeeBase getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7CoveredEmployeeBase> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7CoveredEmployeeBaseCache
        extends TypeKeyCache
    {


        public WC7CoveredEmployeeBaseCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7CoveredEmployeeBase get() {
            return ((WC7CoveredEmployeeBase) super.getKey());
        }

    }

}
