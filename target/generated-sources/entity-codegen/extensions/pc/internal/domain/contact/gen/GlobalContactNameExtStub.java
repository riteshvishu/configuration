
package extensions.pc.internal.domain.contact.gen;

import com.guidewire.pl.domain.contact.impl.GlobalContactNameImpl;
import extensions.pc.internal.domain.contact.impl.GlobalContactNameExtInternal;
import extensions.pc.internal.domain.contact.impl.GlobalContactNameExtMethodsImpl;
import gw.pl.contact.entity.GlobalContactName;

public class GlobalContactNameExtStub
    extends GlobalContactNameImpl
    implements GlobalContactNameExtInternal
{


    protected GlobalContactNameExtStub(GlobalContactName owner) {
        super(owner);
    }

    @Override
    public String getNameKanji() {
        return getExtensionDelegate(GlobalContactNameExtMethodsImpl.class).getNameKanji();
    }

    @Override
    public void setNameKanji(String value) {
        getExtensionDelegate(GlobalContactNameExtMethodsImpl.class).setNameKanji(value);
    }

}
