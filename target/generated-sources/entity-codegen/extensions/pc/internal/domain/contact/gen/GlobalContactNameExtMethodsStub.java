
package extensions.pc.internal.domain.contact.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pl.contact.entity.GlobalContactName;

public abstract class GlobalContactNameExtMethodsStub
    extends AspectBase
    implements GlobalContactNameExtInternalMethodsStubI
{


    protected GlobalContactNameExtMethodsStub(GlobalContactName owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public GlobalContactName getOwner() {
        return ((GlobalContactName) super.getOwner());
    }

    @Override
    public String getNameKanji() {
        return ((String) getFieldValueForCodegen(NAMEKANJI_DYNPROP.get(getOwner().getIntrinsicType())));
    }

    @Override
    public void setNameKanji(String value) {
        setFieldValueForCodegen(NAMEKANJI_DYNPROP.get(getOwner().getIntrinsicType()), value);
    }

}
