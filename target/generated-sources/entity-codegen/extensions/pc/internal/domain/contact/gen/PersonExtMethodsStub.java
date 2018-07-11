
package extensions.pc.internal.domain.contact.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pl.contact.entity.Person;

public abstract class PersonExtMethodsStub
    extends AspectBase
    implements PersonExtInternalMethodsStubI
{


    protected PersonExtMethodsStub(Person owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public Person getOwner() {
        return ((Person) super.getOwner());
    }

}
