
package extensions.pc.community.typekey;

import gw.pc.community.typekey.ProducerStatus;
import gw.pc.community.typekey.ProducerStatus.ProducerStatusCache;

public final class ProducerStatusExtConstants {

    public final static ProducerStatusCache TC_ACTIVE = new ProducerStatusCache(ProducerStatus.TYPE, "Active");
    public final static ProducerStatusCache TC_LIMITED = new ProducerStatusCache(ProducerStatus.TYPE, "Limited");
    public final static ProducerStatusCache TC_SUSPENDED = new ProducerStatusCache(ProducerStatus.TYPE, "Suspended");
    public final static ProducerStatusCache TC_TERMINATED = new ProducerStatusCache(ProducerStatus.TYPE, "Terminated");
    public final static ProducerStatusCache TC_TERMINATING = new ProducerStatusCache(ProducerStatus.TYPE, "Terminating");

}
