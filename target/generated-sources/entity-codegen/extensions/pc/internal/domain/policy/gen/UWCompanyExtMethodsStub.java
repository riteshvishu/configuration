
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.policy.entity.UWCompany;
import gw.pl.geodata.zone.typekey.Jurisdiction;

public abstract class UWCompanyExtMethodsStub
    extends AspectBase
    implements UWCompanyExtInternalMethodsStubI
{


    protected UWCompanyExtMethodsStub(UWCompany owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public UWCompany getOwner() {
        return ((UWCompany) super.getOwner());
    }

    @Override
    public String getNAICCode() {
        return ((String) getFieldValueForCodegen(NAICCODE_PROP.get()));
    }

    @Override
    public void setNAICCode(String value) {
        setFieldValueForCodegen(NAICCODE_PROP.get(), value);
    }

    @Override
    public Jurisdiction getState() {
        return ((Jurisdiction) getFieldValue(STATE_PROP.get()));
    }

    @Override
    public void setState(Jurisdiction value) {
        setFieldValue(STATE_PROP.get(), value);
    }

}
