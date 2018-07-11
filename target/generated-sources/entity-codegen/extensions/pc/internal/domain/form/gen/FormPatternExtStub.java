
package extensions.pc.internal.domain.form.gen;

import com.guidewire.pc.domain.form.impl.FormPatternImpl;
import extensions.pc.internal.domain.form.impl.FormPatternExtInternal;
import extensions.pc.internal.domain.form.impl.FormPatternExtMethodsImpl;
import extensions.pc.policy.entity.WC7FormPatternClassCode;
import extensions.pc.policy.typekey.WC7GoverningLaw;

public class FormPatternExtStub
    extends FormPatternImpl
    implements FormPatternExtInternal
{


    @Override
    public WC7GoverningLaw getGoverningLawType() {
        return getExtensionDelegate(FormPatternExtMethodsImpl.class).getGoverningLawType();
    }

    @Override
    public void setGoverningLawType(WC7GoverningLaw value) {
        getExtensionDelegate(FormPatternExtMethodsImpl.class).setGoverningLawType(value);
    }

    @Override
    public WC7FormPatternClassCode[] getWC7FormPatternClassCodes() {
        return getExtensionDelegate(FormPatternExtMethodsImpl.class).getWC7FormPatternClassCodes();
    }

    @Override
    public void addToWC7FormPatternClassCodes(WC7FormPatternClassCode value) {
        getExtensionDelegate(FormPatternExtMethodsImpl.class).addToWC7FormPatternClassCodes(value);
    }

    @Override
    public void removeFromWC7FormPatternClassCodes(WC7FormPatternClassCode value) {
        getExtensionDelegate(FormPatternExtMethodsImpl.class).removeFromWC7FormPatternClassCodes(value);
    }

}
