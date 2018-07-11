
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.RadiusCode;
import gw.pc.policy.typekey.RadiusCode.RadiusCodeCache;

public final class RadiusCodeExtConstants {

    public final static RadiusCodeCache TC_0 = new RadiusCodeCache(RadiusCode.TYPE, "0");
    public final static RadiusCodeCache TC_15ORLESS = new RadiusCodeCache(RadiusCode.TYPE, "15orLess");
    public final static RadiusCodeCache TC_15ORMORE = new RadiusCodeCache(RadiusCode.TYPE, "15orMore");
    public final static RadiusCodeCache TC_200PLUSMILES = new RadiusCodeCache(RadiusCode.TYPE, "200PlusMiles");
    public final static RadiusCodeCache TC_50$45$200MILES = new RadiusCodeCache(RadiusCode.TYPE, "50-200Miles");
    public final static RadiusCodeCache TC_LESSTHAN50MILES = new RadiusCodeCache(RadiusCode.TYPE, "LessThan50Miles");

}
