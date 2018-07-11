
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.CreditCardType;
import gw.pc.policy.typekey.CreditCardType.CreditCardTypeCache;

public final class CreditCardTypeExtConstants {

    public final static CreditCardTypeCache TC_MASTER = new CreditCardTypeCache(CreditCardType.TYPE, "master");
    public final static CreditCardTypeCache TC_VISA = new CreditCardTypeCache(CreditCardType.TYPE, "visa");

}
