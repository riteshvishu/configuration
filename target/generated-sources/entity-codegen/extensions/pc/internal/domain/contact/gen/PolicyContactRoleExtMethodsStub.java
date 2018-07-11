
package extensions.pc.internal.domain.contact.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.contact.entity.PolicyContactRole;

public abstract class PolicyContactRoleExtMethodsStub
    extends AspectBase
    implements PolicyContactRoleExtInternalMethodsStubI
{


    protected PolicyContactRoleExtMethodsStub(PolicyContactRole owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public PolicyContactRole getOwner() {
        return ((PolicyContactRole) super.getOwner());
    }

    @Override
    public String getCompanyNameKanjiInternal() {
        return ((String) getFieldValueForCodegen(COMPANYNAMEKANJIINTERNAL_PROP.get()));
    }

    @Override
    public void setCompanyNameKanjiInternal(String value) {
        setFieldValueForCodegen(COMPANYNAMEKANJIINTERNAL_PROP.get(), value);
    }

    @Override
    public String getFirstNameKanjiInternal() {
        return ((String) getFieldValueForCodegen(FIRSTNAMEKANJIINTERNAL_PROP.get()));
    }

    @Override
    public void setFirstNameKanjiInternal(String value) {
        setFieldValueForCodegen(FIRSTNAMEKANJIINTERNAL_PROP.get(), value);
    }

    @Override
    public String getLastNameKanjiInternal() {
        return ((String) getFieldValueForCodegen(LASTNAMEKANJIINTERNAL_PROP.get()));
    }

    @Override
    public void setLastNameKanjiInternal(String value) {
        setFieldValueForCodegen(LASTNAMEKANJIINTERNAL_PROP.get(), value);
    }

    @Override
    public String getParticleInternal() {
        return ((String) getFieldValueForCodegen(PARTICLEINTERNAL_PROP.get()));
    }

    @Override
    public void setParticleInternal(String value) {
        setFieldValueForCodegen(PARTICLEINTERNAL_PROP.get(), value);
    }

}
