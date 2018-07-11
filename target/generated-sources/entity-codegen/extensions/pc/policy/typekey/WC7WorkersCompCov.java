
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.SubtypeKey;
import gw.entity.ITypeList;

public final class WC7WorkersCompCov
    extends SubtypeKey
{

    public final static TypeListIntrinsicTypeCache<WC7WorkersCompCov> TYPE = new TypeListIntrinsicTypeCache<WC7WorkersCompCov>("WC7WorkersCompCov");
    public final static extensions.pc.policy.typekey.WC7WorkersCompCov.WC7WorkersCompCovCache TC_WC7LINESCHEDULECOV = new extensions.pc.policy.typekey.WC7WorkersCompCov.WC7WorkersCompCovCache(extensions.pc.policy.typekey.WC7WorkersCompCov.TYPE, "WC7LineScheduleCov");
    public final static extensions.pc.policy.typekey.WC7WorkersCompCov.WC7WorkersCompCovCache TC_WC7WORKERSCOMPCOV = new extensions.pc.policy.typekey.WC7WorkersCompCov.WC7WorkersCompCovCache(extensions.pc.policy.typekey.WC7WorkersCompCov.TYPE, "WC7WorkersCompCov");

    public WC7WorkersCompCov(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7WorkersCompCov getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7WorkersCompCov> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7WorkersCompCovCache
        extends TypeKeyCache
    {


        public WC7WorkersCompCovCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7WorkersCompCov get() {
            return ((WC7WorkersCompCov) super.getKey());
        }

    }

}
