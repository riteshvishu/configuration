
package extensions.pc.account.typekey;

import gw.pc.account.typekey.AccountRelationshipType;
import gw.pc.account.typekey.AccountRelationshipType.AccountRelationshipTypeCache;

public final class AccountRelationshipTypeExtConstants {

    public final static AccountRelationshipTypeCache TC_CHILD = new AccountRelationshipTypeCache(AccountRelationshipType.TYPE, "child");
    public final static AccountRelationshipTypeCache TC_COMMONOWNER = new AccountRelationshipTypeCache(AccountRelationshipType.TYPE, "commonowner");
    public final static AccountRelationshipTypeCache TC_PARENT = new AccountRelationshipTypeCache(AccountRelationshipType.TYPE, "parent");

}
