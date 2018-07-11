
package extensions.pc.lob.cp.typekey;

import gw.pc.lob.cp.typekey.CPValuationMethod;
import gw.pc.lob.cp.typekey.CPValuationMethod.CPValuationMethodCache;

public final class CPValuationMethodExtConstants {

    public final static CPValuationMethodCache TC_ACTUALCASH = new CPValuationMethodCache(CPValuationMethod.TYPE, "ActualCash");
    public final static CPValuationMethodCache TC_AGREEDAMT = new CPValuationMethodCache(CPValuationMethod.TYPE, "AgreedAmt");
    public final static CPValuationMethodCache TC_FUNCVALUE = new CPValuationMethodCache(CPValuationMethod.TYPE, "FuncValue");
    public final static CPValuationMethodCache TC_REPLACECOST = new CPValuationMethodCache(CPValuationMethod.TYPE, "ReplaceCost");

}
