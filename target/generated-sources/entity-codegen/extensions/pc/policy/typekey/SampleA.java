
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class SampleA
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<SampleA> TYPE = new TypeListIntrinsicTypeCache<SampleA>("SampleA");
    public final static extensions.pc.policy.typekey.SampleA.SampleACache TC_CODEONE = new extensions.pc.policy.typekey.SampleA.SampleACache(SampleA.TYPE, "codeOne");
    public final static extensions.pc.policy.typekey.SampleA.SampleACache TC_CODETHREE = new extensions.pc.policy.typekey.SampleA.SampleACache(SampleA.TYPE, "codeThree");
    public final static extensions.pc.policy.typekey.SampleA.SampleACache TC_CODETWO = new extensions.pc.policy.typekey.SampleA.SampleACache(SampleA.TYPE, "codeTwo");

    public SampleA(ITypeList type, String code) {
        super(type, code);
    }

    public static SampleA getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<SampleA> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class SampleACache
        extends TypeKeyCache
    {


        public SampleACache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public SampleA get() {
            return ((SampleA) super.getKey());
        }

    }

}
