
package extensions.pc.internal.domain.account.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.account.entity.AccountAccount;

public abstract class AccountAccountExtMethodsStub
    extends AspectBase
    implements AccountAccountExtInternalMethodsStubI
{


    protected AccountAccountExtMethodsStub(AccountAccount owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public AccountAccount getOwner() {
        return ((AccountAccount) super.getOwner());
    }

}
