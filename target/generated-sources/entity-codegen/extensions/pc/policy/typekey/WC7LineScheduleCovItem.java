
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.SubtypeKey;
import gw.entity.ITypeList;

public final class WC7LineScheduleCovItem
    extends SubtypeKey
{

    public final static TypeListIntrinsicTypeCache<WC7LineScheduleCovItem> TYPE = new TypeListIntrinsicTypeCache<WC7LineScheduleCovItem>("WC7LineScheduleCovItem");
    public final static extensions.pc.policy.typekey.WC7LineScheduleCovItem.WC7LineScheduleCovItemCache TC_WC7LINESCHEDULECOVITEM = new extensions.pc.policy.typekey.WC7LineScheduleCovItem.WC7LineScheduleCovItemCache(extensions.pc.policy.typekey.WC7LineScheduleCovItem.TYPE, "WC7LineScheduleCovItem");

    public WC7LineScheduleCovItem(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7LineScheduleCovItem getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7LineScheduleCovItem> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7LineScheduleCovItemCache
        extends TypeKeyCache
    {


        public WC7LineScheduleCovItemCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7LineScheduleCovItem get() {
            return ((WC7LineScheduleCovItem) super.getKey());
        }

    }

}
