
package extensions.pc.internal.domain.community.gen;

import com.guidewire.pc.domain.community.impl.OrganizationCoreExtImpl;
import extensions.pc.internal.domain.community.impl.OrganizationExtInternal;
import extensions.pc.internal.domain.community.impl.OrganizationExtMethodsImpl;

public class OrganizationExtStub
    extends OrganizationCoreExtImpl
    implements OrganizationExtInternal
{


    @Override
    public String getNameKanji() {
        return getExtensionDelegate(OrganizationExtMethodsImpl.class).getNameKanji();
    }

    @Override
    public void setNameKanji(String value) {
        getExtensionDelegate(OrganizationExtMethodsImpl.class).setNameKanji(value);
    }

}
