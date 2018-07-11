
package extensions.pc.internal.domain.community.gen;

import com.guidewire.pc.domain.community.impl.UserSearchCriteriaCoreExtImpl;
import extensions.pc.internal.domain.community.impl.UserSearchCriteriaExtInternal;
import extensions.pc.internal.domain.community.impl.UserSearchCriteriaExtMethodsImpl;

public class UserSearchCriteriaExtStub
    extends UserSearchCriteriaCoreExtImpl
    implements UserSearchCriteriaExtInternal
{


    @Override
    public String getGroupNameKanji() {
        return getExtensionDelegate(UserSearchCriteriaExtMethodsImpl.class).getGroupNameKanji();
    }

    @Override
    public void setGroupNameKanji(String value) {
        getExtensionDelegate(UserSearchCriteriaExtMethodsImpl.class).setGroupNameKanji(value);
    }

}
