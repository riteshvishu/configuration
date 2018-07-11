
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.domain.contact.impl.PersonImpl;

public abstract class AdjudicatorStub
    extends PersonImpl
    implements AdjudicatorInternalStubI
{


    @Override
    public String getAdjudicatorLicense() {
        return ((String) getFieldValueForCodegen(ADJUDICATORLICENSE_PROP.get()));
    }

    @Override
    public void setAdjudicatorLicense(String value) {
        setFieldValueForCodegen(ADJUDICATORLICENSE_PROP.get(), value);
    }

}
