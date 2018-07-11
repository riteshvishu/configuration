
package extensions.pc.internal.domain.lob.ba.gen;

import com.guidewire.pc.domain.lob.ba.impl.CommercialDriverImpl;
import extensions.pc.internal.domain.lob.ba.impl.CommercialDriverExtInternal;
import extensions.pc.internal.domain.lob.ba.impl.CommercialDriverExtMethodsImpl;

public class CommercialDriverExtStub
    extends CommercialDriverImpl
    implements CommercialDriverExtInternal
{


    @Override
    public String getFirstNameKanji() {
        return getExtensionDelegate(CommercialDriverExtMethodsImpl.class).getFirstNameKanji();
    }

    @Override
    public void setFirstNameKanji(String value) {
        getExtensionDelegate(CommercialDriverExtMethodsImpl.class).setFirstNameKanji(value);
    }

    @Override
    public String getLastNameKanji() {
        return getExtensionDelegate(CommercialDriverExtMethodsImpl.class).getLastNameKanji();
    }

    @Override
    public void setLastNameKanji(String value) {
        getExtensionDelegate(CommercialDriverExtMethodsImpl.class).setLastNameKanji(value);
    }

}
