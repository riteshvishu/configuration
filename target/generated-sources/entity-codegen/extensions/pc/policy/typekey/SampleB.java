
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class SampleB
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<SampleB> TYPE = new TypeListIntrinsicTypeCache<SampleB>("SampleB");
    public final static extensions.pc.policy.typekey.SampleB.SampleBCache TC_COLOR_RETIRED = new extensions.pc.policy.typekey.SampleB.SampleBCache(SampleB.TYPE, "Color_retired");
    public final static extensions.pc.policy.typekey.SampleB.SampleBCache TC_BLUE = new extensions.pc.policy.typekey.SampleB.SampleBCache(SampleB.TYPE, "blue");
    public final static extensions.pc.policy.typekey.SampleB.SampleBCache TC_GREEN = new extensions.pc.policy.typekey.SampleB.SampleBCache(SampleB.TYPE, "green");
    public final static extensions.pc.policy.typekey.SampleB.SampleBCache TC_RED = new extensions.pc.policy.typekey.SampleB.SampleBCache(SampleB.TYPE, "red");

    public SampleB(ITypeList type, String code) {
        super(type, code);
    }

    public static SampleB getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<SampleB> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class SampleBCache
        extends TypeKeyCache
    {


        public SampleBCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public SampleB get() {
            return ((SampleB) super.getKey());
        }

    }

}
