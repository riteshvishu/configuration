
package extensions.pc.internal.domain.lob.pa.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.lob.pa.entity.PersonalAutoCov;

public abstract class PersonalAutoCovExtMethodsStub
    extends AspectBase
    implements PersonalAutoCovExtInternalMethodsStubI
{


    protected PersonalAutoCovExtMethodsStub(PersonalAutoCov owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public PersonalAutoCov getOwner() {
        return ((PersonalAutoCov) super.getOwner());
    }

}
