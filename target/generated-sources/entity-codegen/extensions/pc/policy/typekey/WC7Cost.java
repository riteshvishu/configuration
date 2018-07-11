
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.SubtypeKey;
import gw.entity.ITypeList;

public final class WC7Cost
    extends SubtypeKey
{

    public final static TypeListIntrinsicTypeCache<WC7Cost> TYPE = new TypeListIntrinsicTypeCache<WC7Cost>("WC7Cost");
    public final static extensions.pc.policy.typekey.WC7Cost.WC7CostCache TC_WC7AIRCRAFTSEATCOST = new extensions.pc.policy.typekey.WC7Cost.WC7CostCache(extensions.pc.policy.typekey.WC7Cost.TYPE, "WC7AircraftSeatCost");
    public final static extensions.pc.policy.typekey.WC7Cost.WC7CostCache TC_WC7ATOMICENERGYCOST = new extensions.pc.policy.typekey.WC7Cost.WC7CostCache(extensions.pc.policy.typekey.WC7Cost.TYPE, "WC7AtomicEnergyCost");
    public final static extensions.pc.policy.typekey.WC7Cost.WC7CostCache TC_WC7COST = new extensions.pc.policy.typekey.WC7Cost.WC7CostCache(extensions.pc.policy.typekey.WC7Cost.TYPE, "WC7Cost");
    public final static extensions.pc.policy.typekey.WC7Cost.WC7CostCache TC_WC7COVCOST = new extensions.pc.policy.typekey.WC7Cost.WC7CostCache(extensions.pc.policy.typekey.WC7Cost.TYPE, "WC7CovCost");
    public final static extensions.pc.policy.typekey.WC7Cost.WC7CostCache TC_WC7COVEMPCOST = new extensions.pc.policy.typekey.WC7Cost.WC7CostCache(extensions.pc.policy.typekey.WC7Cost.TYPE, "WC7CovEmpCost");
    public final static extensions.pc.policy.typekey.WC7Cost.WC7CostCache TC_WC7ELINCREASEDLIMITCOST = new extensions.pc.policy.typekey.WC7Cost.WC7CostCache(extensions.pc.policy.typekey.WC7Cost.TYPE, "WC7ELIncreasedLimitCost");
    public final static extensions.pc.policy.typekey.WC7Cost.WC7CostCache TC_WC7FELACOVEMPCOST = new extensions.pc.policy.typekey.WC7Cost.WC7CostCache(extensions.pc.policy.typekey.WC7Cost.TYPE, "WC7FELACovEmpCost");
    public final static extensions.pc.policy.typekey.WC7Cost.WC7CostCache TC_WC7JURISDICTIONCOST = new extensions.pc.policy.typekey.WC7Cost.WC7CostCache(extensions.pc.policy.typekey.WC7Cost.TYPE, "WC7JurisdictionCost");
    public final static extensions.pc.policy.typekey.WC7Cost.WC7CostCache TC_WC7JURISDICTIONCOVCOST = new extensions.pc.policy.typekey.WC7Cost.WC7CostCache(extensions.pc.policy.typekey.WC7Cost.TYPE, "WC7JurisdictionCovCost");
    public final static extensions.pc.policy.typekey.WC7Cost.WC7CostCache TC_WC7MARITIMECOVEMPCOST = new extensions.pc.policy.typekey.WC7Cost.WC7CostCache(extensions.pc.policy.typekey.WC7Cost.TYPE, "WC7MaritimeCovEmpCost");
    public final static extensions.pc.policy.typekey.WC7Cost.WC7CostCache TC_WC7MODIFIERCOST = new extensions.pc.policy.typekey.WC7Cost.WC7CostCache(extensions.pc.policy.typekey.WC7Cost.TYPE, "WC7ModifierCost");
    public final static extensions.pc.policy.typekey.WC7Cost.WC7CostCache TC_WC7SUPPLDISEASECOST = new extensions.pc.policy.typekey.WC7Cost.WC7CostCache(extensions.pc.policy.typekey.WC7Cost.TYPE, "WC7SupplDiseaseCost");
    public final static extensions.pc.policy.typekey.WC7Cost.WC7CostCache TC_WC7TERRORISMCOVCOST = new extensions.pc.policy.typekey.WC7Cost.WC7CostCache(extensions.pc.policy.typekey.WC7Cost.TYPE, "WC7TerrorismCovCost");
    public final static extensions.pc.policy.typekey.WC7Cost.WC7CostCache TC_WC7WAIVEROFSUBROCOST = new extensions.pc.policy.typekey.WC7Cost.WC7CostCache(extensions.pc.policy.typekey.WC7Cost.TYPE, "WC7WaiverOfSubroCost");
    public final static extensions.pc.policy.typekey.WC7Cost.WC7CostCache TC_WC7WAIVEROFSUBROSPECIFICBALANCECOST = new extensions.pc.policy.typekey.WC7Cost.WC7CostCache(extensions.pc.policy.typekey.WC7Cost.TYPE, "WC7WaiverOfSubroSpecificBalanceCost");

    public WC7Cost(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7Cost getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7Cost> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7CostCache
        extends TypeKeyCache
    {


        public WC7CostCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7Cost get() {
            return ((WC7Cost) super.getKey());
        }

    }

}
