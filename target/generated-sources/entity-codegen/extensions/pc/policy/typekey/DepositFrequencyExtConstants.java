
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.DepositFrequency;
import gw.pc.policy.typekey.DepositFrequency.DepositFrequencyCache;

public final class DepositFrequencyExtConstants {

    public final static DepositFrequencyCache TC_2_PER_WEEK = new DepositFrequencyCache(DepositFrequency.TYPE, "2_per_week");
    public final static DepositFrequencyCache TC_3_PER_WEEK = new DepositFrequencyCache(DepositFrequency.TYPE, "3_per_week");
    public final static DepositFrequencyCache TC_DAILY = new DepositFrequencyCache(DepositFrequency.TYPE, "Daily");
    public final static DepositFrequencyCache TC_OTHER = new DepositFrequencyCache(DepositFrequency.TYPE, "Other");
    public final static DepositFrequencyCache TC_WEEKLY = new DepositFrequencyCache(DepositFrequency.TYPE, "Weekly");

}
