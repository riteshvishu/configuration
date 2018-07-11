
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WC7PersonOrg
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WC7PersonOrg> TYPE = new TypeListIntrinsicTypeCache<WC7PersonOrg>("WC7PersonOrg");
    public final static extensions.pc.policy.typekey.WC7PersonOrg.WC7PersonOrgCache TC_ORG = new extensions.pc.policy.typekey.WC7PersonOrg.WC7PersonOrgCache(WC7PersonOrg.TYPE, "org");
    public final static extensions.pc.policy.typekey.WC7PersonOrg.WC7PersonOrgCache TC_PER = new extensions.pc.policy.typekey.WC7PersonOrg.WC7PersonOrgCache(WC7PersonOrg.TYPE, "per");

    public WC7PersonOrg(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7PersonOrg getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7PersonOrg> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7PersonOrgCache
        extends TypeKeyCache
    {


        public WC7PersonOrgCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7PersonOrg get() {
            return ((WC7PersonOrg) super.getKey());
        }

    }

}
