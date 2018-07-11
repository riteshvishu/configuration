
package extensions.pc.internal.domain.community.gen;

import com.guidewire.pc.domain.community.impl.GroupSearchCriteriaCoreExtImpl;
import extensions.pc.internal.domain.community.impl.GroupSearchCriteriaExtInternal;
import extensions.pc.internal.domain.community.impl.GroupSearchCriteriaExtMethodsImpl;

public class GroupSearchCriteriaExtStub
    extends GroupSearchCriteriaCoreExtImpl
    implements GroupSearchCriteriaExtInternal
{


    @Override
    public String getGroupNameKanji() {
        return getExtensionDelegate(GroupSearchCriteriaExtMethodsImpl.class).getGroupNameKanji();
    }

    @Override
    public void setGroupNameKanji(String value) {
        getExtensionDelegate(GroupSearchCriteriaExtMethodsImpl.class).setGroupNameKanji(value);
    }

}
