
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.SignType;
import gw.pc.policy.typekey.SignType.SignTypeCache;

public final class SignTypeExtConstants {

    public final static SignTypeCache TC_AUTOMATIC = new SignTypeCache(SignType.TYPE, "automatic");
    public final static SignTypeCache TC_FLUORESCENT = new SignTypeCache(SignType.TYPE, "fluorescent");
    public final static SignTypeCache TC_LAMPS = new SignTypeCache(SignType.TYPE, "lamps");
    public final static SignTypeCache TC_MECHANICAL = new SignTypeCache(SignType.TYPE, "mechanical");
    public final static SignTypeCache TC_NEON = new SignTypeCache(SignType.TYPE, "neon");
    public final static SignTypeCache TC_OTHER = new SignTypeCache(SignType.TYPE, "other");

}
