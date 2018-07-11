
package extensions.pc.internal.domain.account.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.account.entity.Account;

public abstract class AccountExtMethodsStub
    extends AspectBase
    implements AccountExtInternalMethodsStubI
{


    protected AccountExtMethodsStub(Account owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public Account getOwner() {
        return ((Account) super.getOwner());
    }

}
