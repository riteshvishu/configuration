
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.SubtypeKey;
import gw.entity.ITypeList;

public final class WC7SupplDiseaseExposure
    extends SubtypeKey
{

    public final static TypeListIntrinsicTypeCache<WC7SupplDiseaseExposure> TYPE = new TypeListIntrinsicTypeCache<WC7SupplDiseaseExposure>("WC7SupplDiseaseExposure");
    public final static extensions.pc.policy.typekey.WC7SupplDiseaseExposure.WC7SupplDiseaseExposureCache TC_WC7SUPPLDISEASEEXPOSURE = new extensions.pc.policy.typekey.WC7SupplDiseaseExposure.WC7SupplDiseaseExposureCache(extensions.pc.policy.typekey.WC7SupplDiseaseExposure.TYPE, "WC7SupplDiseaseExposure");

    public WC7SupplDiseaseExposure(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7SupplDiseaseExposure getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7SupplDiseaseExposure> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7SupplDiseaseExposureCache
        extends TypeKeyCache
    {


        public WC7SupplDiseaseExposureCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7SupplDiseaseExposure get() {
            return ((WC7SupplDiseaseExposure) super.getKey());
        }

    }

}
