
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.SubtypeKey;
import gw.entity.ITypeList;

public final class WC7RatingWorksheet
    extends SubtypeKey
{

    public final static TypeListIntrinsicTypeCache<WC7RatingWorksheet> TYPE = new TypeListIntrinsicTypeCache<WC7RatingWorksheet>("WC7RatingWorksheet");
    public final static extensions.pc.policy.typekey.WC7RatingWorksheet.WC7RatingWorksheetCache TC_WC7RATINGWORKSHEET = new extensions.pc.policy.typekey.WC7RatingWorksheet.WC7RatingWorksheetCache(extensions.pc.policy.typekey.WC7RatingWorksheet.TYPE, "WC7RatingWorksheet");

    public WC7RatingWorksheet(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7RatingWorksheet getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7RatingWorksheet> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7RatingWorksheetCache
        extends TypeKeyCache
    {


        public WC7RatingWorksheetCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7RatingWorksheet get() {
            return ((WC7RatingWorksheet) super.getKey());
        }

    }

}
