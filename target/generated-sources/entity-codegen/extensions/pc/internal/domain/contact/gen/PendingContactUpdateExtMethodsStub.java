
package extensions.pc.internal.domain.contact.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.contact.entity.PendingContactUpdate;

public abstract class PendingContactUpdateExtMethodsStub
    extends AspectBase
    implements PendingContactUpdateExtInternalMethodsStubI
{


    protected PendingContactUpdateExtMethodsStub(PendingContactUpdate owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public PendingContactUpdate getOwner() {
        return ((PendingContactUpdate) super.getOwner());
    }

    @Override
    public String getCompanyNameKanji() {
        return ((String) getFieldValueForCodegen(COMPANYNAMEKANJI_PROP.get()));
    }

    @Override
    public void setCompanyNameKanji(String value) {
        setFieldValueForCodegen(COMPANYNAMEKANJI_PROP.get(), value);
    }

    @Override
    public Boolean isCompanyNameKanjiIsNull() {
        return ((Boolean) getFieldValue(COMPANYNAMEKANJIISNULL_PROP.get()));
    }

    @Override
    public void setCompanyNameKanjiIsNull(Boolean value) {
        setFieldValue(COMPANYNAMEKANJIISNULL_PROP.get(), value);
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
    public Boolean isFirstNameKanjiIsNull() {
        return ((Boolean) getFieldValue(FIRSTNAMEKANJIISNULL_PROP.get()));
    }

    @Override
    public void setFirstNameKanjiIsNull(Boolean value) {
        setFieldValue(FIRSTNAMEKANJIISNULL_PROP.get(), value);
    }

    @Override
    public String getLastNameKanji() {
        return ((String) getFieldValueForCodegen(LASTNAMEKANJI_PROP.get()));
    }

    @Override
    public void setLastNameKanji(String value) {
        setFieldValueForCodegen(LASTNAMEKANJI_PROP.get(), value);
    }

    @Override
    public Boolean isLastNameKanjiIsNull() {
        return ((Boolean) getFieldValue(LASTNAMEKANJIISNULL_PROP.get()));
    }

    @Override
    public void setLastNameKanjiIsNull(Boolean value) {
        setFieldValue(LASTNAMEKANJIISNULL_PROP.get(), value);
    }

    @Override
    public String getParticle() {
        return ((String) getFieldValueForCodegen(PARTICLE_PROP.get()));
    }

    @Override
    public void setParticle(String value) {
        setFieldValueForCodegen(PARTICLE_PROP.get(), value);
    }

    @Override
    public Boolean isParticleIsNull() {
        return ((Boolean) getFieldValue(PARTICLEISNULL_PROP.get()));
    }

    @Override
    public void setParticleIsNull(Boolean value) {
        setFieldValue(PARTICLEISNULL_PROP.get(), value);
    }

}
