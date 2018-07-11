
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.WindRating;
import gw.pc.policy.typekey.WindRating.WindRatingCache;

public final class WindRatingExtConstants {

    public final static WindRatingCache TC_OC = new WindRatingCache(WindRating.TYPE, "OC");
    public final static WindRatingCache TC_SC = new WindRatingCache(WindRating.TYPE, "SC");
    public final static WindRatingCache TC_SWRC = new WindRatingCache(WindRating.TYPE, "SWRC");
    public final static WindRatingCache TC_WRC = new WindRatingCache(WindRating.TYPE, "WRC");

}
