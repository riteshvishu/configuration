
package extensions.pc.job.typekey;

import gw.pc.job.typekey.Job;
import gw.pc.job.typekey.Job.JobCache;

public final class JobExtConstants {

    public final static JobCache TC_AUDIT = new JobCache(Job.TYPE, "Audit");
    public final static JobCache TC_CANCELLATION = new JobCache(Job.TYPE, "Cancellation");
    public final static JobCache TC_ISSUANCE = new JobCache(Job.TYPE, "Issuance");
    public final static JobCache TC_JOB = new JobCache(Job.TYPE, "Job");
    public final static JobCache TC_POLICYCHANGE = new JobCache(Job.TYPE, "PolicyChange");
    public final static JobCache TC_REINSTATEMENT = new JobCache(Job.TYPE, "Reinstatement");
    public final static JobCache TC_RENEWAL = new JobCache(Job.TYPE, "Renewal");
    public final static JobCache TC_REWRITE = new JobCache(Job.TYPE, "Rewrite");
    public final static JobCache TC_REWRITENEWACCOUNT = new JobCache(Job.TYPE, "RewriteNewAccount");
    public final static JobCache TC_SUBMISSION = new JobCache(Job.TYPE, "Submission");

}
