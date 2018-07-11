
package extensions.pc.internal.domain.community.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pl.community.entity.Group;

public abstract class GroupExtMethodsStub
    extends AspectBase
    implements GroupExtInternalMethodsStubI
{


    protected GroupExtMethodsStub(Group owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public Group getOwner() {
        return ((Group) super.getOwner());
    }

    @Override
    public String getNameKanji() {
        return ((String) getFieldValueForCodegen(NAMEKANJI_PROP.get()));
    }

    @Override
    public void setNameKanji(String value) {
        setFieldValueForCodegen(NAMEKANJI_PROP.get(), value);
    }

}
