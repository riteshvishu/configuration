
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.JobDateType;
import gw.pc.policy.typekey.JobDateType.JobDateTypeCache;

public final class JobDateTypeExtConstants {

    public final static JobDateTypeCache TC_EFFECTIVE = new JobDateTypeCache(JobDateType.TYPE, "Effective");
    public final static JobDateTypeCache TC_REFERENCE = new JobDateTypeCache(JobDateType.TYPE, "Reference");
    public final static JobDateTypeCache TC_WRITTEN = new JobDateTypeCache(JobDateType.TYPE, "Written");

}
