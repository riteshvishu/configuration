
package extensions.pc.internal.domain.lob.ba.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.lob.ba.entity.CommercialDriver;

public abstract class CommercialDriverExtMethodsStub
    extends AspectBase
    implements CommercialDriverExtInternalMethodsStubI
{


    protected CommercialDriverExtMethodsStub(CommercialDriver owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public CommercialDriver getOwner() {
        return ((CommercialDriver) super.getOwner());
    }

    @Override
    public String getFirstNameKanji() {
        return ((String) getFieldValueForCodegen(FIRSTNAMEKANJI_PROP.get()));
    }

    @Override
    public void setFirstNameKanji(String value) {
        setFieldValueForCodegen(FIRSTNAMEKANJI_PROP.get(), value);
    }

    @Override
    public String getLastNameKanji() {
        return ((String) getFieldValueForCodegen(LASTNAMEKANJI_PROP.get()));
    }

    @Override
    public void setLastNameKanji(String value) {
        setFieldValueForCodegen(LASTNAMEKANJI_PROP.get(), value);
    }

}
