
package extensions.pc.job.typekey;

import gw.pc.job.typekey.RewriteType;
import gw.pc.job.typekey.RewriteType.RewriteTypeCache;

public final class RewriteTypeExtConstants {

    public final static RewriteTypeCache TC_REWRITEFULLTERM = new RewriteTypeCache(RewriteType.TYPE, "RewriteFullTerm");
    public final static RewriteTypeCache TC_REWRITENEWTERM = new RewriteTypeCache(RewriteType.TYPE, "RewriteNewTerm");
    public final static RewriteTypeCache TC_REWRITEREMAINDEROFTERM = new RewriteTypeCache(RewriteType.TYPE, "RewriteRemainderOfTerm");

}
