
package extensions.pc.validation.typekey;

import gw.pl.validation.typekey.ValidationLevel;
import gw.pl.validation.typekey.ValidationLevel.ValidationLevelCache;

public final class ValidationLevelExtConstants {

    public final static ValidationLevelCache TC_BINDABLE = new ValidationLevelCache(ValidationLevel.TYPE, "bindable");
    public final static ValidationLevelCache TC_DEFAULT = new ValidationLevelCache(ValidationLevel.TYPE, "default");
    public final static ValidationLevelCache TC_LOADSAVE = new ValidationLevelCache(ValidationLevel.TYPE, "loadsave");
    public final static ValidationLevelCache TC_QUICKQUOTABLE = new ValidationLevelCache(ValidationLevel.TYPE, "quickquotable");
    public final static ValidationLevelCache TC_QUOTABLE = new ValidationLevelCache(ValidationLevel.TYPE, "quotable");
    public final static ValidationLevelCache TC_READYFORISSUE = new ValidationLevelCache(ValidationLevel.TYPE, "readyforissue");

}
