
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WC7WaiverOfSubrogation
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WC7WaiverOfSubrogation> TYPE = new TypeListIntrinsicTypeCache<WC7WaiverOfSubrogation>("WC7WaiverOfSubrogation");
    public final static extensions.pc.policy.typekey.WC7WaiverOfSubrogation.WC7WaiverOfSubrogationCache TC_BLANKET = new extensions.pc.policy.typekey.WC7WaiverOfSubrogation.WC7WaiverOfSubrogationCache(extensions.pc.policy.typekey.WC7WaiverOfSubrogation.TYPE, "blanket");
    public final static extensions.pc.policy.typekey.WC7WaiverOfSubrogation.WC7WaiverOfSubrogationCache TC_SPECIFIC = new extensions.pc.policy.typekey.WC7WaiverOfSubrogation.WC7WaiverOfSubrogationCache(extensions.pc.policy.typekey.WC7WaiverOfSubrogation.TYPE, "specific");

    public WC7WaiverOfSubrogation(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7WaiverOfSubrogation getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7WaiverOfSubrogation> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7WaiverOfSubrogationCache
        extends TypeKeyCache
    {


        public WC7WaiverOfSubrogationCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7WaiverOfSubrogation get() {
            return ((WC7WaiverOfSubrogation) super.getKey());
        }

    }

}
