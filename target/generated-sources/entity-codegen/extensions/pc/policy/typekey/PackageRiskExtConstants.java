
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.PackageRisk;
import gw.pc.policy.typekey.PackageRisk.PackageRiskCache;

public final class PackageRiskExtConstants {

    public final static PackageRiskCache TC_APARTMENT = new PackageRiskCache(PackageRisk.TYPE, "apartment");
    public final static PackageRiskCache TC_CONTRACTOR = new PackageRiskCache(PackageRisk.TYPE, "contractor");
    public final static PackageRiskCache TC_INDUSTRIAL = new PackageRiskCache(PackageRisk.TYPE, "industrial");
    public final static PackageRiskCache TC_INSTITUTIONAL = new PackageRiskCache(PackageRisk.TYPE, "institutional");
    public final static PackageRiskCache TC_MERCANTILE = new PackageRiskCache(PackageRisk.TYPE, "mercantile");
    public final static PackageRiskCache TC_MOTELHOTEL = new PackageRiskCache(PackageRisk.TYPE, "motelhotel");
    public final static PackageRiskCache TC_OFFICE = new PackageRiskCache(PackageRisk.TYPE, "office");
    public final static PackageRiskCache TC_SERVICES = new PackageRiskCache(PackageRisk.TYPE, "services");

}
