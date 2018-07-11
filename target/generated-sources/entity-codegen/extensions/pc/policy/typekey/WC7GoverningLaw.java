
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WC7GoverningLaw
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WC7GoverningLaw> TYPE = new TypeListIntrinsicTypeCache<WC7GoverningLaw>("WC7GoverningLaw");
    public final static extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache TC_DEFENSEBASEACT = new extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache(extensions.pc.policy.typekey.WC7GoverningLaw.TYPE, "defenseBaseAct");
    public final static extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache TC_FEDCOALMINE = new extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache(extensions.pc.policy.typekey.WC7GoverningLaw.TYPE, "fedCoalMine");
    public final static extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache TC_LIMITEDMARITIME = new extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache(extensions.pc.policy.typekey.WC7GoverningLaw.TYPE, "limitedMaritime");
    public final static extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache TC_LONGSHOREANDHARBOR = new extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache(extensions.pc.policy.typekey.WC7GoverningLaw.TYPE, "longshoreAndHarbor");
    public final static extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache TC_MIGRANTANDSEASONALAGRICULTURAL = new extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache(extensions.pc.policy.typekey.WC7GoverningLaw.TYPE, "migrantAndSeasonalAgricultural");
    public final static extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache TC_NONAPPROPRIATEDFUNDINSTRUMENTALITIES = new extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache(extensions.pc.policy.typekey.WC7GoverningLaw.TYPE, "nonappropriatedFundInstrumentalities");
    public final static extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache TC_OUTERCONTINENTALSHELFLANDS = new extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache(extensions.pc.policy.typekey.WC7GoverningLaw.TYPE, "outerContinentalShelfLands");
    public final static extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache TC_STATE = new extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache(extensions.pc.policy.typekey.WC7GoverningLaw.TYPE, "state");
    public final static extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache TC_STOPGAP = new extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache(extensions.pc.policy.typekey.WC7GoverningLaw.TYPE, "stopGap");
    public final static extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache TC_VOLUNTARYCOMP = new extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache(extensions.pc.policy.typekey.WC7GoverningLaw.TYPE, "voluntaryComp");
    public final static extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache TC_VOLUNTARYCOMPFORRESIDENCEEMP = new extensions.pc.policy.typekey.WC7GoverningLaw.WC7GoverningLawCache(extensions.pc.policy.typekey.WC7GoverningLaw.TYPE, "voluntaryCompForResidenceEmp");

    public WC7GoverningLaw(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7GoverningLaw getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7GoverningLaw> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7GoverningLawCache
        extends TypeKeyCache
    {


        public WC7GoverningLawCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7GoverningLaw get() {
            return ((WC7GoverningLaw) super.getKey());
        }

    }

}
