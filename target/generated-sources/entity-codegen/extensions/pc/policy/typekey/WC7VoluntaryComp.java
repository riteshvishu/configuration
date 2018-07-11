
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WC7VoluntaryComp
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WC7VoluntaryComp> TYPE = new TypeListIntrinsicTypeCache<WC7VoluntaryComp>("WC7VoluntaryComp");
    public final static extensions.pc.policy.typekey.WC7VoluntaryComp.WC7VoluntaryCompCache TC_JURISDICTION = new extensions.pc.policy.typekey.WC7VoluntaryComp.WC7VoluntaryCompCache(WC7VoluntaryComp.TYPE, "Jurisdiction");
    public final static extensions.pc.policy.typekey.WC7VoluntaryComp.WC7VoluntaryCompCache TC_USLH = new extensions.pc.policy.typekey.WC7VoluntaryComp.WC7VoluntaryCompCache(WC7VoluntaryComp.TYPE, "USLH");

    public WC7VoluntaryComp(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7VoluntaryComp getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7VoluntaryComp> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7VoluntaryCompCache
        extends TypeKeyCache
    {


        public WC7VoluntaryCompCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7VoluntaryComp get() {
            return ((WC7VoluntaryComp) super.getKey());
        }

    }

}
