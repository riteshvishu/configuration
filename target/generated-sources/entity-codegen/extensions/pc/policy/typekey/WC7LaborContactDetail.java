
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.SubtypeKey;
import gw.entity.ITypeList;

public final class WC7LaborContactDetail
    extends SubtypeKey
{

    public final static TypeListIntrinsicTypeCache<WC7LaborContactDetail> TYPE = new TypeListIntrinsicTypeCache<WC7LaborContactDetail>("WC7LaborContactDetail");
    public final static extensions.pc.policy.typekey.WC7LaborContactDetail.WC7LaborContactDetailCache TC_WC7EXCLUDEDLABORCONTACTDETAIL = new extensions.pc.policy.typekey.WC7LaborContactDetail.WC7LaborContactDetailCache(extensions.pc.policy.typekey.WC7LaborContactDetail.TYPE, "WC7ExcludedLaborContactDetail");
    public final static extensions.pc.policy.typekey.WC7LaborContactDetail.WC7LaborContactDetailCache TC_WC7INCLUDEDLABORCONTACTDETAIL = new extensions.pc.policy.typekey.WC7LaborContactDetail.WC7LaborContactDetailCache(extensions.pc.policy.typekey.WC7LaborContactDetail.TYPE, "WC7IncludedLaborContactDetail");
    public final static extensions.pc.policy.typekey.WC7LaborContactDetail.WC7LaborContactDetailCache TC_WC7LABORCONTACTDETAIL = new extensions.pc.policy.typekey.WC7LaborContactDetail.WC7LaborContactDetailCache(extensions.pc.policy.typekey.WC7LaborContactDetail.TYPE, "WC7LaborContactDetail");

    public WC7LaborContactDetail(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7LaborContactDetail getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7LaborContactDetail> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7LaborContactDetailCache
        extends TypeKeyCache
    {


        public WC7LaborContactDetailCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7LaborContactDetail get() {
            return ((WC7LaborContactDetail) super.getKey());
        }

    }

}
