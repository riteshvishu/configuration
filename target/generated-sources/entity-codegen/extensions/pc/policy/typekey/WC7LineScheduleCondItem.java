
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.SubtypeKey;
import gw.entity.ITypeList;

public final class WC7LineScheduleCondItem
    extends SubtypeKey
{

    public final static TypeListIntrinsicTypeCache<WC7LineScheduleCondItem> TYPE = new TypeListIntrinsicTypeCache<WC7LineScheduleCondItem>("WC7LineScheduleCondItem");
    public final static extensions.pc.policy.typekey.WC7LineScheduleCondItem.WC7LineScheduleCondItemCache TC_WC7LINESCHEDULECONDITEM = new extensions.pc.policy.typekey.WC7LineScheduleCondItem.WC7LineScheduleCondItemCache(extensions.pc.policy.typekey.WC7LineScheduleCondItem.TYPE, "WC7LineScheduleCondItem");

    public WC7LineScheduleCondItem(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7LineScheduleCondItem getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7LineScheduleCondItem> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7LineScheduleCondItemCache
        extends TypeKeyCache
    {


        public WC7LineScheduleCondItemCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7LineScheduleCondItem get() {
            return ((WC7LineScheduleCondItem) super.getKey());
        }

    }

}
