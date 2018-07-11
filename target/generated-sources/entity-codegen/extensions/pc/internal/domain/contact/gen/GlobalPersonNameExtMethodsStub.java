
package extensions.pc.internal.domain.contact.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pl.contact.entity.GlobalPersonName;

public abstract class GlobalPersonNameExtMethodsStub
    extends AspectBase
    implements GlobalPersonNameExtInternalMethodsStubI
{


    protected GlobalPersonNameExtMethodsStub(GlobalPersonName owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public GlobalPersonName getOwner() {
        return ((GlobalPersonName) super.getOwner());
    }

    @Override
    public String getFirstNameKanji() {
        return ((String) getFieldValueForCodegen(FIRSTNAMEKANJI_DYNPROP.get(getOwner().getIntrinsicType())));
    }

    @Override
    public void setFirstNameKanji(String value) {
        setFieldValueForCodegen(FIRSTNAMEKANJI_DYNPROP.get(getOwner().getIntrinsicType()), value);
    }

    @Override
    public String getLastNameKanji() {
        return ((String) getFieldValueForCodegen(LASTNAMEKANJI_DYNPROP.get(getOwner().getIntrinsicType())));
    }

    @Override
    public void setLastNameKanji(String value) {
        setFieldValueForCodegen(LASTNAMEKANJI_DYNPROP.get(getOwner().getIntrinsicType()), value);
    }

    @Override
    public String getParticle() {
        return ((String) getFieldValueForCodegen(PARTICLE_DYNPROP.get(getOwner().getIntrinsicType())));
    }

    @Override
    public void setParticle(String value) {
        setFieldValueForCodegen(PARTICLE_DYNPROP.get(getOwner().getIntrinsicType()), value);
    }

}
