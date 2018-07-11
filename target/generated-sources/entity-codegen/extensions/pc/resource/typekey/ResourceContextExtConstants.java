
package extensions.pc.resource.typekey;

import gw.pl.resource.typekey.ResourceContext;
import gw.pl.resource.typekey.ResourceContext.ResourceContextCache;

public final class ResourceContextExtConstants {

    public final static ResourceContextCache TC_BASE = new ResourceContextCache(ResourceContext.TYPE, "base");
    public final static ResourceContextCache TC_SAMPLE = new ResourceContextCache(ResourceContext.TYPE, "sample");
    public final static ResourceContextCache TC_WC = new ResourceContextCache(ResourceContext.TYPE, "wc");

}
