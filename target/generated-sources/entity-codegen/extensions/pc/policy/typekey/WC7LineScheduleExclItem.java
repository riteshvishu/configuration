
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.SubtypeKey;
import gw.entity.ITypeList;

public final class WC7LineScheduleExclItem
    extends SubtypeKey
{

    public final static TypeListIntrinsicTypeCache<WC7LineScheduleExclItem> TYPE = new TypeListIntrinsicTypeCache<WC7LineScheduleExclItem>("WC7LineScheduleExclItem");
    public final static extensions.pc.policy.typekey.WC7LineScheduleExclItem.WC7LineScheduleExclItemCache TC_WC7LINESCHEDULEEXCLITEM = new extensions.pc.policy.typekey.WC7LineScheduleExclItem.WC7LineScheduleExclItemCache(extensions.pc.policy.typekey.WC7LineScheduleExclItem.TYPE, "WC7LineScheduleExclItem");

    public WC7LineScheduleExclItem(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7LineScheduleExclItem getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7LineScheduleExclItem> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7LineScheduleExclItemCache
        extends TypeKeyCache
    {


        public WC7LineScheduleExclItemCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7LineScheduleExclItem get() {
            return ((WC7LineScheduleExclItem) super.getKey());
        }

    }

}
