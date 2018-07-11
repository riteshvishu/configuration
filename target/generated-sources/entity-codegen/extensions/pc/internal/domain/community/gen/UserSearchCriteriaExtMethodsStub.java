
package extensions.pc.internal.domain.community.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pl.community.entity.UserSearchCriteria;

public abstract class UserSearchCriteriaExtMethodsStub
    extends AspectBase
    implements UserSearchCriteriaExtInternalMethodsStubI
{


    protected UserSearchCriteriaExtMethodsStub(UserSearchCriteria owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public UserSearchCriteria getOwner() {
        return ((UserSearchCriteria) super.getOwner());
    }

    @Override
    public String getGroupNameKanji() {
        return ((String) getFieldValueForCodegen(GROUPNAMEKANJI_PROP.get()));
    }

    @Override
    public void setGroupNameKanji(String value) {
        setFieldValueForCodegen(GROUPNAMEKANJI_PROP.get(), value);
    }

}
