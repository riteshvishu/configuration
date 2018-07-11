
package extensions.pc.lob.ba.typekey;

import gw.pc.lob.ba.typekey.FleetType;
import gw.pc.lob.ba.typekey.FleetType.FleetTypeCache;

public final class FleetTypeExtConstants {

    public final static FleetTypeCache TC_FLEET = new FleetTypeCache(FleetType.TYPE, "Fleet");
    public final static FleetTypeCache TC_NONFLEET = new FleetTypeCache(FleetType.TYPE, "NonFleet");

}
