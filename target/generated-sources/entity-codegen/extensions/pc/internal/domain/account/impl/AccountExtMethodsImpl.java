
package extensions.pc.internal.domain.account.impl;

import extensions.pc.internal.domain.account.gen.AccountExtMethodsStub;
import gw.pc.account.entity.Account;

public class AccountExtMethodsImpl
    extends AccountExtMethodsStub
    implements AccountExtInternalMethods
{


    public AccountExtMethodsImpl(Account owner) {
        super(owner);
    }

}
