
package extensions.pc.account.typekey;

import gw.pc.account.typekey.AccountStatus;
import gw.pc.account.typekey.AccountStatus.AccountStatusCache;

public final class AccountStatusExtConstants {

    public final static AccountStatusCache TC_ACTIVE = new AccountStatusCache(AccountStatus.TYPE, "Active");
    public final static AccountStatusCache TC_MERGED = new AccountStatusCache(AccountStatus.TYPE, "Merged");
    public final static AccountStatusCache TC_PENDING = new AccountStatusCache(AccountStatus.TYPE, "Pending");
    public final static AccountStatusCache TC_WITHDRAWN = new AccountStatusCache(AccountStatus.TYPE, "Withdrawn");

}
