
package extensions.pc.reinsurance.typekey;

import gw.pc.reinsurance.typekey.ContractEffectivePeriod;
import gw.pc.reinsurance.typekey.ContractEffectivePeriod.ContractEffectivePeriodCache;

public final class ContractEffectivePeriodExtConstants {

    public final static ContractEffectivePeriodCache TC_COMINGYEAR = new ContractEffectivePeriodCache(ContractEffectivePeriod.TYPE, "ComingYear");
    public final static ContractEffectivePeriodCache TC_CUSTOM = new ContractEffectivePeriodCache(ContractEffectivePeriod.TYPE, "Custom");
    public final static ContractEffectivePeriodCache TC_LASTYEAR = new ContractEffectivePeriodCache(ContractEffectivePeriod.TYPE, "LastYear");

}
