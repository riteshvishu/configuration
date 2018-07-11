
package extensions.pc.financials.typekey;

import gw.pc.financials.typekey.ChargePattern;
import gw.pc.financials.typekey.ChargePattern.ChargePatternCache;

public final class ChargePatternExtConstants {

    public final static ChargePatternCache TC_INSTALLMENTFEE = new ChargePatternCache(ChargePattern.TYPE, "InstallmentFee");
    public final static ChargePatternCache TC_PREMIUM = new ChargePatternCache(ChargePattern.TYPE, "Premium");
    public final static ChargePatternCache TC_REINSTATEMENTFEE = new ChargePatternCache(ChargePattern.TYPE, "ReinstatementFee");
    public final static ChargePatternCache TC_TAXES = new ChargePatternCache(ChargePattern.TYPE, "Taxes");

}
