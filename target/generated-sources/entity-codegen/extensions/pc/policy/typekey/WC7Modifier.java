
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.SubtypeKey;
import gw.entity.ITypeList;

public final class WC7Modifier
    extends SubtypeKey
{

    public final static TypeListIntrinsicTypeCache<WC7Modifier> TYPE = new TypeListIntrinsicTypeCache<WC7Modifier>("WC7Modifier");
    public final static extensions.pc.policy.typekey.WC7Modifier.WC7ModifierCache TC_WC7MODIFIER = new extensions.pc.policy.typekey.WC7Modifier.WC7ModifierCache(extensions.pc.policy.typekey.WC7Modifier.TYPE, "WC7Modifier");

    public WC7Modifier(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7Modifier getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7Modifier> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7ModifierCache
        extends TypeKeyCache
    {


        public WC7ModifierCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7Modifier get() {
            return ((WC7Modifier) super.getKey());
        }

    }

}
