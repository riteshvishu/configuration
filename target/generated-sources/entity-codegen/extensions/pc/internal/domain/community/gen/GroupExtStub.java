
package extensions.pc.internal.domain.community.gen;

import com.guidewire.pc.domain.community.impl.GroupCoreExtImpl;
import extensions.pc.internal.domain.community.impl.GroupExtInternal;
import extensions.pc.internal.domain.community.impl.GroupExtMethodsImpl;

public class GroupExtStub
    extends GroupCoreExtImpl
    implements GroupExtInternal
{


    @Override
    public String getNameKanji() {
        return getExtensionDelegate(GroupExtMethodsImpl.class).getNameKanji();
    }

    @Override
    public void setNameKanji(String value) {
        getExtensionDelegate(GroupExtMethodsImpl.class).setNameKanji(value);
    }

}
