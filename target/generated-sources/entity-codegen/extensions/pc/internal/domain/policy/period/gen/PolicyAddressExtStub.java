
package extensions.pc.internal.domain.policy.period.gen;

import com.guidewire.pc.domain.policy.period.impl.PolicyAddressImpl;
import extensions.pc.internal.domain.policy.period.impl.PolicyAddressExtInternal;
import extensions.pc.internal.domain.policy.period.impl.PolicyAddressExtMethodsImpl;

public class PolicyAddressExtStub
    extends PolicyAddressImpl
    implements PolicyAddressExtInternal
{


    @Override
    public String getAddressLine1KanjiInternal() {
        return getExtensionDelegate(PolicyAddressExtMethodsImpl.class).getAddressLine1KanjiInternal();
    }

    @Override
    public void setAddressLine1KanjiInternal(String value) {
        getExtensionDelegate(PolicyAddressExtMethodsImpl.class).setAddressLine1KanjiInternal(value);
    }

    @Override
    public String getAddressLine2KanjiInternal() {
        return getExtensionDelegate(PolicyAddressExtMethodsImpl.class).getAddressLine2KanjiInternal();
    }

    @Override
    public void setAddressLine2KanjiInternal(String value) {
        getExtensionDelegate(PolicyAddressExtMethodsImpl.class).setAddressLine2KanjiInternal(value);
    }

    @Override
    public String getCityKanjiInternal() {
        return getExtensionDelegate(PolicyAddressExtMethodsImpl.class).getCityKanjiInternal();
    }

    @Override
    public void setCityKanjiInternal(String value) {
        getExtensionDelegate(PolicyAddressExtMethodsImpl.class).setCityKanjiInternal(value);
    }

    @Override
    public Boolean isCEDEXInternal() {
        return getExtensionDelegate(PolicyAddressExtMethodsImpl.class).isCEDEXInternal();
    }

    @Override
    public void setCEDEXInternal(Boolean value) {
        getExtensionDelegate(PolicyAddressExtMethodsImpl.class).setCEDEXInternal(value);
    }

    @Override
    public String getCEDEXBureauInternal() {
        return getExtensionDelegate(PolicyAddressExtMethodsImpl.class).getCEDEXBureauInternal();
    }

    @Override
    public void setCEDEXBureauInternal(String value) {
        getExtensionDelegate(PolicyAddressExtMethodsImpl.class).setCEDEXBureauInternal(value);
    }

}
