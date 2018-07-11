
package extensions.pc.internal.domain.policy.period.gen;

import com.guidewire.pc.domain.policy.period.impl.PolicyLocationImpl;
import extensions.pc.internal.domain.policy.period.impl.PolicyLocationExtInternal;
import extensions.pc.internal.domain.policy.period.impl.PolicyLocationExtMethodsImpl;

public class PolicyLocationExtStub
    extends PolicyLocationImpl
    implements PolicyLocationExtInternal
{


    @Override
    public String getAddressLine1KanjiInternal() {
        return getExtensionDelegate(PolicyLocationExtMethodsImpl.class).getAddressLine1KanjiInternal();
    }

    @Override
    public void setAddressLine1KanjiInternal(String value) {
        getExtensionDelegate(PolicyLocationExtMethodsImpl.class).setAddressLine1KanjiInternal(value);
    }

    @Override
    public String getAddressLine2KanjiInternal() {
        return getExtensionDelegate(PolicyLocationExtMethodsImpl.class).getAddressLine2KanjiInternal();
    }

    @Override
    public void setAddressLine2KanjiInternal(String value) {
        getExtensionDelegate(PolicyLocationExtMethodsImpl.class).setAddressLine2KanjiInternal(value);
    }

    @Override
    public String getCityKanjiInternal() {
        return getExtensionDelegate(PolicyLocationExtMethodsImpl.class).getCityKanjiInternal();
    }

    @Override
    public void setCityKanjiInternal(String value) {
        getExtensionDelegate(PolicyLocationExtMethodsImpl.class).setCityKanjiInternal(value);
    }

    @Override
    public Boolean isCEDEXInternal() {
        return getExtensionDelegate(PolicyLocationExtMethodsImpl.class).isCEDEXInternal();
    }

    @Override
    public void setCEDEXInternal(Boolean value) {
        getExtensionDelegate(PolicyLocationExtMethodsImpl.class).setCEDEXInternal(value);
    }

    @Override
    public String getCEDEXBureauInternal() {
        return getExtensionDelegate(PolicyLocationExtMethodsImpl.class).getCEDEXBureauInternal();
    }

    @Override
    public void setCEDEXBureauInternal(String value) {
        getExtensionDelegate(PolicyLocationExtMethodsImpl.class).setCEDEXBureauInternal(value);
    }

}
