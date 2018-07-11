
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.SubtypeKey;
import gw.entity.ITypeList;

public final class WC7AtomicEnergyExposure
    extends SubtypeKey
{

    public final static TypeListIntrinsicTypeCache<WC7AtomicEnergyExposure> TYPE = new TypeListIntrinsicTypeCache<WC7AtomicEnergyExposure>("WC7AtomicEnergyExposure");
    public final static extensions.pc.policy.typekey.WC7AtomicEnergyExposure.WC7AtomicEnergyExposureCache TC_WC7ATOMICENERGYEXPOSURE = new extensions.pc.policy.typekey.WC7AtomicEnergyExposure.WC7AtomicEnergyExposureCache(extensions.pc.policy.typekey.WC7AtomicEnergyExposure.TYPE, "WC7AtomicEnergyExposure");

    public WC7AtomicEnergyExposure(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7AtomicEnergyExposure getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7AtomicEnergyExposure> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7AtomicEnergyExposureCache
        extends TypeKeyCache
    {


        public WC7AtomicEnergyExposureCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7AtomicEnergyExposure get() {
            return ((WC7AtomicEnergyExposure) super.getKey());
        }

    }

}
