
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class CoordinateBenefits
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<CoordinateBenefits> TYPE = new TypeListIntrinsicTypeCache<CoordinateBenefits>("CoordinateBenefits");
    public final static extensions.pc.policy.typekey.CoordinateBenefits.CoordinateBenefitsCache TC_COORDINATEBOTH = new extensions.pc.policy.typekey.CoordinateBenefits.CoordinateBenefitsCache(CoordinateBenefits.TYPE, "coordinateboth");
    public final static extensions.pc.policy.typekey.CoordinateBenefits.CoordinateBenefitsCache TC_DECLINE = new extensions.pc.policy.typekey.CoordinateBenefits.CoordinateBenefitsCache(CoordinateBenefits.TYPE, "decline");
    public final static extensions.pc.policy.typekey.CoordinateBenefits.CoordinateBenefitsCache TC_DISABILITY = new extensions.pc.policy.typekey.CoordinateBenefits.CoordinateBenefitsCache(CoordinateBenefits.TYPE, "disability");
    public final static extensions.pc.policy.typekey.CoordinateBenefits.CoordinateBenefitsCache TC_HEALTH = new extensions.pc.policy.typekey.CoordinateBenefits.CoordinateBenefitsCache(CoordinateBenefits.TYPE, "health");

    public CoordinateBenefits(ITypeList type, String code) {
        super(type, code);
    }

    public static CoordinateBenefits getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<CoordinateBenefits> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class CoordinateBenefitsCache
        extends TypeKeyCache
    {


        public CoordinateBenefitsCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public CoordinateBenefits get() {
            return ((CoordinateBenefits) super.getKey());
        }

    }

}
