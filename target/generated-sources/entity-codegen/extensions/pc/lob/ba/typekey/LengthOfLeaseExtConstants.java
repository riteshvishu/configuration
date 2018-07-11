
package extensions.pc.lob.ba.typekey;

import gw.pc.lob.ba.typekey.LengthOfLease;
import gw.pc.lob.ba.typekey.LengthOfLease.LengthOfLeaseCache;

public final class LengthOfLeaseExtConstants {

    public final static LengthOfLeaseCache TC_LESSSIXMONTHS = new LengthOfLeaseCache(LengthOfLease.TYPE, "LessSixMonths");
    public final static LengthOfLeaseCache TC_SIXMONTHSORMORE = new LengthOfLeaseCache(LengthOfLease.TYPE, "SixMonthsOrMore");

}
