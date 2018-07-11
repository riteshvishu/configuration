
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.SubtypeKey;
import gw.entity.ITypeList;

public final class WC7JurisdictionCov
    extends SubtypeKey
{

    public final static TypeListIntrinsicTypeCache<WC7JurisdictionCov> TYPE = new TypeListIntrinsicTypeCache<WC7JurisdictionCov>("WC7JurisdictionCov");
    public final static extensions.pc.policy.typekey.WC7JurisdictionCov.WC7JurisdictionCovCache TC_WC7JURISDICTIONCOV = new extensions.pc.policy.typekey.WC7JurisdictionCov.WC7JurisdictionCovCache(extensions.pc.policy.typekey.WC7JurisdictionCov.TYPE, "WC7JurisdictionCov");

    public WC7JurisdictionCov(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7JurisdictionCov getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7JurisdictionCov> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7JurisdictionCovCache
        extends TypeKeyCache
    {


        public WC7JurisdictionCovCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7JurisdictionCov get() {
            return ((WC7JurisdictionCov) super.getKey());
        }

    }

}
