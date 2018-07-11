
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.policy.impl.UWCompanyImpl;
import extensions.pc.internal.domain.policy.impl.UWCompanyExtInternal;
import extensions.pc.internal.domain.policy.impl.UWCompanyExtMethodsImpl;
import gw.pl.geodata.zone.typekey.Jurisdiction;

public class UWCompanyExtStub
    extends UWCompanyImpl
    implements UWCompanyExtInternal
{


    @Override
    public String getNAICCode() {
        return getExtensionDelegate(UWCompanyExtMethodsImpl.class).getNAICCode();
    }

    @Override
    public void setNAICCode(String value) {
        getExtensionDelegate(UWCompanyExtMethodsImpl.class).setNAICCode(value);
    }

    @Override
    public Jurisdiction getState() {
        return getExtensionDelegate(UWCompanyExtMethodsImpl.class).getState();
    }

    @Override
    public void setState(Jurisdiction value) {
        getExtensionDelegate(UWCompanyExtMethodsImpl.class).setState(value);
    }

}
