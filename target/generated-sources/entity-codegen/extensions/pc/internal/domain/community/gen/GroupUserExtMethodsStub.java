
package extensions.pc.internal.domain.community.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pl.community.entity.GroupUser;

public abstract class GroupUserExtMethodsStub
    extends AspectBase
    implements GroupUserExtInternalMethodsStubI
{


    protected GroupUserExtMethodsStub(GroupUser owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public GroupUser getOwner() {
        return ((GroupUser) super.getOwner());
    }

}
