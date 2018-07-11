
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.ValuationMethod;
import gw.pc.policy.typekey.ValuationMethod.ValuationMethodCache;

public final class ValuationMethodExtConstants {

    public final static ValuationMethodCache TC_ACV = new ValuationMethodCache(ValuationMethod.TYPE, "ACV");
    public final static ValuationMethodCache TC_ACTCOST = new ValuationMethodCache(ValuationMethod.TYPE, "ActCost");
    public final static ValuationMethodCache TC_AGREEDAMT = new ValuationMethodCache(ValuationMethod.TYPE, "AgreedAmt");
    public final static ValuationMethodCache TC_APPRAISAL = new ValuationMethodCache(ValuationMethod.TYPE, "Appraisal");
    public final static ValuationMethodCache TC_COMPSALE = new ValuationMethodCache(ValuationMethod.TYPE, "CompSale");
    public final static ValuationMethodCache TC_FUNCVALUE = new ValuationMethodCache(ValuationMethod.TYPE, "FuncValue");
    public final static ValuationMethodCache TC_REPLCOST = new ValuationMethodCache(ValuationMethod.TYPE, "ReplCost");
    public final static ValuationMethodCache TC_SALEREC = new ValuationMethodCache(ValuationMethod.TYPE, "SaleRec");

}
