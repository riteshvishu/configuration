
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.CovTermModelType;
import gw.pc.policy.typekey.CovTermModelType.CovTermModelTypeCache;

public final class CovTermModelTypeExtConstants {

    public final static CovTermModelTypeCache TC_COINSURANCE = new CovTermModelTypeCache(CovTermModelType.TYPE, "Coinsurance");
    public final static CovTermModelTypeCache TC_DEDUCTIBLE = new CovTermModelTypeCache(CovTermModelType.TYPE, "Deductible");
    public final static CovTermModelTypeCache TC_EXCLUSION = new CovTermModelTypeCache(CovTermModelType.TYPE, "Exclusion");
    public final static CovTermModelTypeCache TC_LIMIT = new CovTermModelTypeCache(CovTermModelType.TYPE, "Limit");
    public final static CovTermModelTypeCache TC_OTHER = new CovTermModelTypeCache(CovTermModelType.TYPE, "Other");

}
