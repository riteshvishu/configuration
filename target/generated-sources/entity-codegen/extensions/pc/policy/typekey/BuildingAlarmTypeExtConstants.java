
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.BuildingAlarmType;
import gw.pc.policy.typekey.BuildingAlarmType.BuildingAlarmTypeCache;

public final class BuildingAlarmTypeExtConstants {

    public final static BuildingAlarmTypeCache TC_CENTRAL = new BuildingAlarmTypeCache(BuildingAlarmType.TYPE, "central");
    public final static BuildingAlarmTypeCache TC_LOCAL = new BuildingAlarmTypeCache(BuildingAlarmType.TYPE, "local");
    public final static BuildingAlarmTypeCache TC_POLICE = new BuildingAlarmTypeCache(BuildingAlarmType.TYPE, "police");

}
