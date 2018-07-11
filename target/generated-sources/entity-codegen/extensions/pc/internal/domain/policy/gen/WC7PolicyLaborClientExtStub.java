
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.contact.impl.PolicyContactRoleExtInternal;
import extensions.pc.internal.domain.contact.impl.PolicyContactRoleExtMethodsImpl;
import extensions.pc.internal.domain.policy.impl.WC7PolicyLaborClientImpl;

public class WC7PolicyLaborClientExtStub
    extends WC7PolicyLaborClientImpl
    implements PolicyContactRoleExtInternal
{


    @Override
    public String getCompanyNameKanjiInternal() {
        return getExtensionDelegate(PolicyContactRoleExtMethodsImpl.class).getCompanyNameKanjiInternal();
    }

    @Override
    public void setCompanyNameKanjiInternal(String value) {
        getExtensionDelegate(PolicyContactRoleExtMethodsImpl.class).setCompanyNameKanjiInternal(value);
    }

    @Override
    public String getFirstNameKanjiInternal() {
        return getExtensionDelegate(PolicyContactRoleExtMethodsImpl.class).getFirstNameKanjiInternal();
    }

    @Override
    public void setFirstNameKanjiInternal(String value) {
        getExtensionDelegate(PolicyContactRoleExtMethodsImpl.class).setFirstNameKanjiInternal(value);
    }

    @Override
    public String getLastNameKanjiInternal() {
        return getExtensionDelegate(PolicyContactRoleExtMethodsImpl.class).getLastNameKanjiInternal();
    }

    @Override
    public void setLastNameKanjiInternal(String value) {
        getExtensionDelegate(PolicyContactRoleExtMethodsImpl.class).setLastNameKanjiInternal(value);
    }

    @Override
    public String getParticleInternal() {
        return getExtensionDelegate(PolicyContactRoleExtMethodsImpl.class).getParticleInternal();
    }

    @Override
    public void setParticleInternal(String value) {
        getExtensionDelegate(PolicyContactRoleExtMethodsImpl.class).setParticleInternal(value);
    }

}
