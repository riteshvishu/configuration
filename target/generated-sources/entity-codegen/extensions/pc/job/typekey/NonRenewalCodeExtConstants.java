
package extensions.pc.job.typekey;

import gw.pc.job.typekey.NonRenewalCode;
import gw.pc.job.typekey.NonRenewalCode.NonRenewalCodeCache;

public final class NonRenewalCodeExtConstants {

    public final static NonRenewalCodeCache TC_CHANGE = new NonRenewalCodeCache(NonRenewalCode.TYPE, "change");
    public final static NonRenewalCodeCache TC_INSUREDREQUEST = new NonRenewalCodeCache(NonRenewalCode.TYPE, "insuredrequest");
    public final static NonRenewalCodeCache TC_LOSS = new NonRenewalCodeCache(NonRenewalCode.TYPE, "loss");
    public final static NonRenewalCodeCache TC_NONCOMPLIANCE = new NonRenewalCodeCache(NonRenewalCode.TYPE, "noncompliance");
    public final static NonRenewalCodeCache TC_OUTOFBUSNESS = new NonRenewalCodeCache(NonRenewalCode.TYPE, "outofbusness");
    public final static NonRenewalCodeCache TC_PAYHISTORY = new NonRenewalCodeCache(NonRenewalCode.TYPE, "payhistory");
    public final static NonRenewalCodeCache TC_PRODUCERTERMINATION = new NonRenewalCodeCache(NonRenewalCode.TYPE, "producertermination");
    public final static NonRenewalCodeCache TC_REINSURANCE = new NonRenewalCodeCache(NonRenewalCode.TYPE, "reinsurance");

}
