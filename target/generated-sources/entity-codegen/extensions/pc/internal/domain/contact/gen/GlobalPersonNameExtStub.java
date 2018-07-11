
package extensions.pc.internal.domain.contact.gen;

import com.guidewire.pl.domain.contact.impl.GlobalPersonNameImpl;
import extensions.pc.internal.domain.contact.impl.GlobalPersonNameExtInternal;
import extensions.pc.internal.domain.contact.impl.GlobalPersonNameExtMethodsImpl;
import gw.pl.contact.entity.GlobalPersonName;

public class GlobalPersonNameExtStub
    extends GlobalPersonNameImpl
    implements GlobalPersonNameExtInternal
{


    protected GlobalPersonNameExtStub(GlobalPersonName owner) {
        super(owner);
    }

    @Override
    public String getFirstNameKanji() {
        return getExtensionDelegate(GlobalPersonNameExtMethodsImpl.class).getFirstNameKanji();
    }

    @Override
    public void setFirstNameKanji(String value) {
        getExtensionDelegate(GlobalPersonNameExtMethodsImpl.class).setFirstNameKanji(value);
    }

    @Override
    public String getLastNameKanji() {
        return getExtensionDelegate(GlobalPersonNameExtMethodsImpl.class).getLastNameKanji();
    }

    @Override
    public void setLastNameKanji(String value) {
        getExtensionDelegate(GlobalPersonNameExtMethodsImpl.class).setLastNameKanji(value);
    }

    @Override
    public String getParticle() {
        return getExtensionDelegate(GlobalPersonNameExtMethodsImpl.class).getParticle();
    }

    @Override
    public void setParticle(String value) {
        getExtensionDelegate(GlobalPersonNameExtMethodsImpl.class).setParticle(value);
    }

}
