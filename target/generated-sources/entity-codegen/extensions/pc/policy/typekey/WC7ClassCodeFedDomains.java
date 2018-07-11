
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WC7ClassCodeFedDomains
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WC7ClassCodeFedDomains> TYPE = new TypeListIntrinsicTypeCache<WC7ClassCodeFedDomains>("WC7ClassCodeFedDomains");
    public final static extensions.pc.policy.typekey.WC7ClassCodeFedDomains.WC7ClassCodeFedDomainsCache TC_FELA = new extensions.pc.policy.typekey.WC7ClassCodeFedDomains.WC7ClassCodeFedDomainsCache(WC7ClassCodeFedDomains.TYPE, "FELA");
    public final static extensions.pc.policy.typekey.WC7ClassCodeFedDomains.WC7ClassCodeFedDomainsCache TC_FELASTATE = new extensions.pc.policy.typekey.WC7ClassCodeFedDomains.WC7ClassCodeFedDomainsCache(WC7ClassCodeFedDomains.TYPE, "FELAState");
    public final static extensions.pc.policy.typekey.WC7ClassCodeFedDomains.WC7ClassCodeFedDomainsCache TC_FELAUSLH = new extensions.pc.policy.typekey.WC7ClassCodeFedDomains.WC7ClassCodeFedDomainsCache(WC7ClassCodeFedDomains.TYPE, "FELAUSLH");
    public final static extensions.pc.policy.typekey.WC7ClassCodeFedDomains.WC7ClassCodeFedDomainsCache TC_MARI = new extensions.pc.policy.typekey.WC7ClassCodeFedDomains.WC7ClassCodeFedDomainsCache(WC7ClassCodeFedDomains.TYPE, "Mari");
    public final static extensions.pc.policy.typekey.WC7ClassCodeFedDomains.WC7ClassCodeFedDomainsCache TC_MARISTATE = new extensions.pc.policy.typekey.WC7ClassCodeFedDomains.WC7ClassCodeFedDomainsCache(WC7ClassCodeFedDomains.TYPE, "MariState");
    public final static extensions.pc.policy.typekey.WC7ClassCodeFedDomains.WC7ClassCodeFedDomainsCache TC_MARIUSLH = new extensions.pc.policy.typekey.WC7ClassCodeFedDomains.WC7ClassCodeFedDomainsCache(WC7ClassCodeFedDomains.TYPE, "MariUSLH");

    public WC7ClassCodeFedDomains(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7ClassCodeFedDomains getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7ClassCodeFedDomains> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7ClassCodeFedDomainsCache
        extends TypeKeyCache
    {


        public WC7ClassCodeFedDomainsCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7ClassCodeFedDomains get() {
            return ((WC7ClassCodeFedDomains) super.getKey());
        }

    }

}
