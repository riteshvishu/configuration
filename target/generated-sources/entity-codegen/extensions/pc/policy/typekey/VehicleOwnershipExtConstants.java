
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.VehicleOwnership;
import gw.pc.policy.typekey.VehicleOwnership.VehicleOwnershipCache;

public final class VehicleOwnershipExtConstants {

    public final static VehicleOwnershipCache TC_LEASED = new VehicleOwnershipCache(VehicleOwnership.TYPE, "Leased");
    public final static VehicleOwnershipCache TC_NONOWNED = new VehicleOwnershipCache(VehicleOwnership.TYPE, "NonOwned");
    public final static VehicleOwnershipCache TC_OWNED = new VehicleOwnershipCache(VehicleOwnership.TYPE, "Owned");

}
